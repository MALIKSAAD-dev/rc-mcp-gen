// ============================================================
// Token Benchmark — Full vs. Minimal MCP Server Comparison
// Proves the value of minimal-cover servers with hard numbers.
// ============================================================

import { encode } from "gpt-tokenizer";
import { ApiEndpoint, ENDPOINTS } from "../registry/endpoints";

export interface BenchmarkResult {
    fullToolCount: number;
    minimalToolCount: number;
    fullTokens: number;
    minimalTokens: number;
    savedTokens: number;
    savingsPercent: number;
    fullEstCost: number;
    minimalEstCost: number;
    savedCost: number;
    details: {
        endpointId: string;
        tokens: number;
    }[];
}

// GPT-4o pricing: $2.50 per 1M input tokens
const COST_PER_TOKEN = 2.5 / 1_000_000;

/**
 * Generate the MCP tool definition text for a single endpoint
 * (what gets sent into the LLM context window)
 */
function toolDefinitionText(ep: ApiEndpoint): string {
    const params = ep.parameters.map((p) => {
        return `    - ${p.name} (${p.type}${p.required ? ", required" : ", optional"}): ${p.description}`;
    });

    return [
        `Tool: ${ep.id}`,
        `  Description: ${ep.description}`,
        `  Method: ${ep.method} ${ep.path}`,
        `  RequiresAuth: ${ep.requiresAuth}`,
        params.length > 0 ? `  Parameters:\n${params.join("\n")}` : `  Parameters: none`,
    ].join("\n");
}

/**
 * Count tokens for a set of tool definitions
 */
function countTokens(endpoints: ApiEndpoint[]): { totalTokens: number; perEndpoint: { endpointId: string; tokens: number }[] } {
    const perEndpoint = endpoints.map((ep) => {
        const text = toolDefinitionText(ep);
        const tokens = encode(text).length;
        return { endpointId: ep.id, tokens };
    });

    const totalTokens = perEndpoint.reduce((sum, e) => sum + e.tokens, 0);
    return { totalTokens, perEndpoint };
}

/**
 * Run benchmark comparing full server vs. minimal server
 */
export function runBenchmark(selectedEndpoints: ApiEndpoint[]): BenchmarkResult {
    const full = countTokens(ENDPOINTS);
    const minimal = countTokens(selectedEndpoints);

    const savedTokens = full.totalTokens - minimal.totalTokens;
    const savingsPercent = Math.round((savedTokens / full.totalTokens) * 100);

    return {
        fullToolCount: ENDPOINTS.length,
        minimalToolCount: selectedEndpoints.length,
        fullTokens: full.totalTokens,
        minimalTokens: minimal.totalTokens,
        savedTokens,
        savingsPercent,
        fullEstCost: full.totalTokens * COST_PER_TOKEN,
        minimalEstCost: minimal.totalTokens * COST_PER_TOKEN,
        savedCost: savedTokens * COST_PER_TOKEN,
        details: minimal.perEndpoint,
    };
}

/**
 * Format benchmark result as a nice table
 */
export function formatBenchmarkTable(result: BenchmarkResult, profileName: string): string {
    const lines: string[] = [];

    lines.push("");
    lines.push("╔══════════════════════════════════════════════════════════════════╗");
    lines.push("║        🔬 MCP SERVER TOKEN BENCHMARK — MINIMAL vs FULL         ║");
    lines.push("╠══════════════════════════════════════════════════════════════════╣");
    lines.push(`║  Profile: ${profileName.padEnd(53)}║`);
    lines.push("╠══════════════════════════╦═══════════╦═══════════╦══════════════╣");
    lines.push("║ Metric                   ║ Full      ║ Minimal   ║ Savings      ║");
    lines.push("╠══════════════════════════╬═══════════╬═══════════╬══════════════╣");
    lines.push(
        `║ Tool definitions         ║ ${String(result.fullToolCount).padStart(7)}   ║ ${String(result.minimalToolCount).padStart(7)}   ║ ${String(result.fullToolCount - result.minimalToolCount).padStart(5)} fewer   ║`
    );
    lines.push(
        `║ Token count              ║ ${String(result.fullTokens).padStart(7).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   ║ ${String(result.minimalTokens).padStart(7).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}   ║ ${String(result.savingsPercent).padStart(4)}% saved  ║`
    );
    lines.push(
        `║ Est. cost/call (GPT-4o)  ║ $${result.fullEstCost.toFixed(5).padStart(7)}   ║ $${result.minimalEstCost.toFixed(5).padStart(7)}   ║ $${result.savedCost.toFixed(5).padStart(7)}     ║`
    );
    lines.push("╚══════════════════════════╩═══════════╩═══════════╩══════════════╝");

    lines.push("");
    lines.push("📊 Per-tool token breakdown (minimal server):");
    lines.push("┌────────────────────────┬────────┐");
    lines.push("│ Tool                   │ Tokens │");
    lines.push("├────────────────────────┼────────┤");
    for (const d of result.details) {
        lines.push(`│ ${d.endpointId.padEnd(22)} │ ${String(d.tokens).padStart(6)} │`);
    }
    lines.push("└────────────────────────┴────────┘");

    lines.push("");
    lines.push(`💡 Bottom line: Using a minimal "${profileName}" server saves ${result.savingsPercent}% of tokens`);
    lines.push(`   compared to loading all ${result.fullToolCount} tools. That's ${result.savedTokens} fewer tokens`);
    lines.push(`   in the LLM context window per request.`);
    lines.push("");

    return lines.join("\n");
}
