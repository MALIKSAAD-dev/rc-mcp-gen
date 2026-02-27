#!/usr/bin/env node
// ============================================================
// rc-mcp-gen — Minimal MCP Server Generator for Rocket.Chat
// CLI Entry Point
// ============================================================

import { Command } from "commander";
import { ENDPOINTS, getEndpointById, getCategories, ApiEndpoint } from "./registry/endpoints";
import { PROFILES, getProfileById } from "./registry/profiles";
import { generateMcpServer } from "./generator/generator";
import { runBenchmark, formatBenchmarkTable } from "./benchmark/benchmark";

const program = new Command();

// Helper: parse endpoint IDs from variadic args (handles PowerShell comma-splitting)
function parseApiIds(apis: string[]): string[] {
    return apis.flatMap((a) => a.split(",")).map((s) => s.trim()).filter(Boolean);
}

program
    .name("rc-mcp-gen")
    .description(
        "Generate minimal MCP servers for Rocket.Chat. Pick only the API tools you need — cut token bloat by 70-85%."
    )
    .version("1.0.0");

// ── List command ────────────────────────────────────────────
program
    .command("list")
    .description("List all available Rocket.Chat API endpoints and profiles")
    .action(() => {
        console.log("\n🚀 Available Rocket.Chat API Endpoints\n");
        console.log(`Total: ${ENDPOINTS.length} endpoints across ${getCategories().length} categories\n`);

        for (const category of getCategories()) {
            const categoryEndpoints = ENDPOINTS.filter((e) => e.category === category);
            console.log(`  📁 ${category.toUpperCase()} (${categoryEndpoints.length})`);
            for (const ep of categoryEndpoints) {
                console.log(`     ${ep.method.padEnd(6)} ${ep.id.padEnd(24)} ${ep.description.slice(0, 55)}`);
            }
            console.log();
        }

        console.log("🎯 Preset Profiles\n");
        for (const profile of PROFILES) {
            const count = profile.endpoints === ("ALL" as any) ? ENDPOINTS.length : profile.endpoints.length;
            console.log(`  ${profile.id.padEnd(12)} (${count} tools)  ${profile.description}`);
        }
        console.log();
    });

// ── Generate command ────────────────────────────────────────
program
    .command("generate")
    .description("Generate a minimal MCP server with selected endpoints")
    .option("-a, --apis <endpoints...>", "Endpoint IDs (e.g., login channels.list chat.sendMessage)")
    .option("-p, --profile <name>", "Use a preset profile (messaging, channels, admin, readonly, full)")
    .option("-o, --output <dir>", "Output directory", "./generated-server")
    .option("-n, --name <name>", "Server name", "rocketchat-mcp-server")
    .action(async (opts) => {
        let selectedEndpoints: ApiEndpoint[] = [];

        if (opts.profile) {
            const profile = getProfileById(opts.profile);
            if (!profile) {
                console.error(`❌ Unknown profile: ${opts.profile}`);
                console.error(`   Available: ${PROFILES.map((p) => p.id).join(", ")}`);
                process.exit(1);
            }

            if (profile.endpoints === ("ALL" as any)) {
                selectedEndpoints = [...ENDPOINTS];
            } else {
                selectedEndpoints = profile.endpoints
                    .map((id) => getEndpointById(id))
                    .filter((ep): ep is ApiEndpoint => ep !== undefined);
            }

            console.log(`\n📦 Using profile: ${profile.name} — ${profile.description}`);
        } else if (opts.apis) {
            const ids = parseApiIds(opts.apis);
            for (const id of ids) {
                const ep = getEndpointById(id);
                if (!ep) {
                    console.error(`❌ Unknown endpoint: ${id}`);
                    console.error(`   Run 'rc-mcp-gen list' to see available endpoints.`);
                    process.exit(1);
                }
                selectedEndpoints.push(ep);
            }

            // Auto-include login if any authenticated endpoint is selected
            const needsAuth = selectedEndpoints.some((ep) => ep.requiresAuth);
            const hasLogin = selectedEndpoints.some((ep) => ep.id === "login");
            if (needsAuth && !hasLogin) {
                const loginEp = getEndpointById("login")!;
                selectedEndpoints.unshift(loginEp);
                console.log(`\n⚡ Auto-included 'login' (required for authenticated endpoints)`);
            }
        } else {
            console.error("❌ Please specify --apis or --profile");
            console.error("   Example: rc-mcp-gen generate --profile messaging");
            console.error("   Example: rc-mcp-gen generate --apis login,channels.list,chat.sendMessage");
            process.exit(1);
        }

        console.log(`\n🔧 Generating MCP server with ${selectedEndpoints.length} tools...`);
        await generateMcpServer({
            endpoints: selectedEndpoints,
            outputDir: opts.output,
            serverName: opts.name,
        });
    });

// ── Benchmark command ───────────────────────────────────────
program
    .command("benchmark")
    .description("Run token benchmark: compare full vs. minimal server token costs")
    .option("-p, --profile <name>", "Profile to benchmark against full", "messaging")
    .option("-a, --apis <endpoints...>", "Endpoint IDs to benchmark")
    .action((opts) => {
        let selectedEndpoints: ApiEndpoint[] = [];
        let profileName = "custom";

        if (opts.apis) {
            const ids = parseApiIds(opts.apis);
            for (const id of ids) {
                const ep = getEndpointById(id);
                if (!ep) {
                    console.error(`❌ Unknown endpoint: ${id}`);
                    process.exit(1);
                }
                selectedEndpoints.push(ep);
            }
            profileName = `custom (${ids.join(", ")})`;
        } else {
            const profile = getProfileById(opts.profile);
            if (!profile) {
                console.error(`❌ Unknown profile: ${opts.profile}`);
                process.exit(1);
            }
            if (profile.endpoints === ("ALL" as any)) {
                selectedEndpoints = [...ENDPOINTS];
            } else {
                selectedEndpoints = profile.endpoints
                    .map((id) => getEndpointById(id))
                    .filter((ep): ep is ApiEndpoint => ep !== undefined);
            }
            profileName = profile.name;
        }

        const result = runBenchmark(selectedEndpoints);
        console.log(formatBenchmarkTable(result, profileName));
    });

// ── Parse & Run ─────────────────────────────────────────────
program.parse(process.argv);

// Default: show help if no command
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
