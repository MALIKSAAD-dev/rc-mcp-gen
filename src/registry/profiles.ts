// ============================================================
// Preset profiles — curated endpoint subsets for common tasks
// ============================================================

export interface Profile {
    id: string;
    name: string;
    description: string;
    endpoints: string[];
}

export const PROFILES: Profile[] = [
    {
        id: "messaging",
        name: "Messaging",
        description: "Send, read, and search messages in channels. Lean setup for chatbot workflows.",
        endpoints: [
            "login",
            "me",
            "channels.list",
            "channels.history",
            "chat.sendMessage",
            "chat.postMessage",
            "chat.getMessage",
            "chat.search",
        ],
    },
    {
        id: "channels",
        name: "Channel Management",
        description: "Full channel lifecycle — list, create, join, leave, and read history.",
        endpoints: [
            "login",
            "me",
            "channels.list",
            "channels.info",
            "channels.create",
            "channels.history",
            "channels.members",
            "channels.join",
            "channels.leave",
        ],
    },
    {
        id: "admin",
        name: "Admin & Users",
        description: "User management, server stats, and settings. For admin-facing agentic workflows.",
        endpoints: [
            "login",
            "me",
            "users.info",
            "users.list",
            "users.create",
            "users.update",
            "users.setAvatar",
            "info",
            "statistics",
            "settings.public",
        ],
    },
    {
        id: "readonly",
        name: "Read-Only Observer",
        description: "Minimal read-only access — browse channels, read history, search messages. Zero writes.",
        endpoints: [
            "login",
            "me",
            "channels.list",
            "channels.info",
            "channels.history",
            "channels.members",
            "chat.getMessage",
            "chat.search",
        ],
    },
    {
        id: "full",
        name: "Full Server",
        description: "All 30 endpoints. Maximum capability, maximum token cost. Not recommended for agents.",
        endpoints: "ALL" as any, // Special marker — resolved at runtime
    },
];

export function getProfileById(id: string): Profile | undefined {
    return PROFILES.find((p) => p.id === id);
}

export function getProfileIds(): string[] {
    return PROFILES.map((p) => p.id);
}
