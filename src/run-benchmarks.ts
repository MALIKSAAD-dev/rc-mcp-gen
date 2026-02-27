import { ENDPOINTS, getEndpointById } from "./registry/endpoints";
import { getProfileById } from "./registry/profiles";
import { runBenchmark, formatBenchmarkTable } from "./benchmark/benchmark";

// Run benchmarks for all profiles
const profiles = ["messaging", "readonly", "channels", "admin"];

for (const pid of profiles) {
    const profile = getProfileById(pid)!;
    const selected = (profile.endpoints as string[])
        .map((id: string) => getEndpointById(id))
        .filter((ep): ep is NonNullable<typeof ep> => ep !== undefined);

    const result = runBenchmark(selected);
    console.log(formatBenchmarkTable(result, profile.name));
    console.log(`\n${"=".repeat(70)}\n`);
}

// Print summary JSON
console.log("\n📋 Summary Data (for presentation):\n");
const summaryData = profiles.map((pid) => {
    const profile = getProfileById(pid)!;
    const selected = (profile.endpoints as string[])
        .map((id: string) => getEndpointById(id))
        .filter((ep): ep is NonNullable<typeof ep> => ep !== undefined);
    const r = runBenchmark(selected);
    return {
        profile: profile.name,
        tools: r.minimalToolCount,
        fullTools: r.fullToolCount,
        tokens: r.minimalTokens,
        fullTokens: r.fullTokens,
        savings: `${r.savingsPercent}%`,
    };
});
console.log(JSON.stringify(summaryData, null, 2));
