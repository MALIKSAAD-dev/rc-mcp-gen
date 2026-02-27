// ============================================================
// Rocket.Chat API Registry — synced with CLI (src/registry/endpoints.ts)
// IMPORTANT: descriptions MUST match CLI exactly for token consistency
// ============================================================

export interface ApiParameter {
    name: string;
    type: string;
    required: boolean;
    description: string;
}

export interface ApiEndpoint {
    id: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    description: string;
    category: string;
    requiresAuth: boolean;
    parameters: ApiParameter[];
}

export const ENDPOINTS: ApiEndpoint[] = [
    // Auth
    { id: 'login', method: 'POST', path: '/api/v1/login', description: 'Authenticate a user with username/email and password. Returns authToken and userId.', category: 'auth', requiresAuth: false, parameters: [{ name: 'user', type: 'string', required: true, description: 'Username or email' }, { name: 'password', type: 'string', required: true, description: 'User password' }] },
    { id: 'logout', method: 'POST', path: '/api/v1/logout', description: 'Invalidate the current authentication token and log out.', category: 'auth', requiresAuth: true, parameters: [] },
    { id: 'me', method: 'GET', path: '/api/v1/me', description: "Get the authenticated user's profile information including username, email, and roles.", category: 'auth', requiresAuth: true, parameters: [] },

    // Channels
    { id: 'channels.list', method: 'GET', path: '/api/v1/channels.list', description: 'List all public channels on the server. Supports pagination with offset and count.', category: 'channels', requiresAuth: true, parameters: [{ name: 'offset', type: 'number', required: false, description: 'Number of items to skip' }, { name: 'count', type: 'number', required: false, description: 'Number of items to return' }] },
    { id: 'channels.info', method: 'GET', path: '/api/v1/channels.info', description: 'Get detailed information about a specific channel by its ID or name.', category: 'channels', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: false, description: 'The channel ID' }, { name: 'roomName', type: 'string', required: false, description: 'The channel name' }] },
    { id: 'channels.create', method: 'POST', path: '/api/v1/channels.create', description: 'Create a new public channel with specified name and optional members.', category: 'channels', requiresAuth: true, parameters: [{ name: 'name', type: 'string', required: true, description: 'Channel name' }, { name: 'members', type: 'array', required: false, description: 'Array of usernames to invite' }, { name: 'readOnly', type: 'boolean', required: false, description: 'Whether the channel is read-only' }] },
    { id: 'channels.history', method: 'GET', path: '/api/v1/channels.history', description: 'Retrieve message history for a specific channel. Supports pagination and date filtering.', category: 'channels', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: true, description: 'The channel ID' }, { name: 'count', type: 'number', required: false, description: 'Number of messages to return' }, { name: 'offset', type: 'number', required: false, description: 'Number of messages to skip' }, { name: 'latest', type: 'string', required: false, description: 'ISO timestamp — newest message date' }, { name: 'oldest', type: 'string', required: false, description: 'ISO timestamp — oldest message date' }] },
    { id: 'channels.members', method: 'GET', path: '/api/v1/channels.members', description: 'List all members of a specific channel.', category: 'channels', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: true, description: 'The channel ID' }, { name: 'offset', type: 'number', required: false, description: 'Number of items to skip' }, { name: 'count', type: 'number', required: false, description: 'Number of items to return' }] },
    { id: 'channels.join', method: 'POST', path: '/api/v1/channels.join', description: 'Join a public channel by its ID.', category: 'channels', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: true, description: 'The channel ID to join' }] },
    { id: 'channels.leave', method: 'POST', path: '/api/v1/channels.leave', description: 'Leave a channel by its ID.', category: 'channels', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: true, description: 'The channel ID to leave' }] },

    // Messaging
    { id: 'chat.sendMessage', method: 'POST', path: '/api/v1/chat.sendMessage', description: 'Send a new message to a channel or direct message. Supports attachments and formatting.', category: 'messaging', requiresAuth: true, parameters: [{ name: 'message', type: 'object', required: true, description: 'Message object with rid (room ID) and msg (text)' }] },
    { id: 'chat.postMessage', method: 'POST', path: '/api/v1/chat.postMessage', description: 'Post a message to a channel using channel name or ID. Simpler alternative to sendMessage.', category: 'messaging', requiresAuth: true, parameters: [{ name: 'channel', type: 'string', required: false, description: 'Channel name (e.g., #general)' }, { name: 'roomId', type: 'string', required: false, description: 'Room ID' }, { name: 'text', type: 'string', required: true, description: 'Message text' }, { name: 'alias', type: 'string', required: false, description: 'Display name alias' }, { name: 'emoji', type: 'string', required: false, description: 'Emoji avatar (e.g., :smirk:)' }, { name: 'avatar', type: 'string', required: false, description: 'Avatar URL' }] },
    { id: 'chat.getMessage', method: 'GET', path: '/api/v1/chat.getMessage', description: 'Retrieve a single message by its ID.', category: 'messaging', requiresAuth: true, parameters: [{ name: 'msgId', type: 'string', required: true, description: 'The message ID' }] },
    { id: 'chat.update', method: 'POST', path: '/api/v1/chat.update', description: 'Update/edit an existing message by its ID.', category: 'messaging', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: true, description: 'The room ID' }, { name: 'msgId', type: 'string', required: true, description: 'The message ID to update' }, { name: 'text', type: 'string', required: true, description: 'New message text' }] },
    { id: 'chat.delete', method: 'POST', path: '/api/v1/chat.delete', description: 'Delete a message by its ID from a specific room.', category: 'messaging', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: true, description: 'The room ID' }, { name: 'msgId', type: 'string', required: true, description: 'The message ID to delete' }] },
    { id: 'chat.search', method: 'GET', path: '/api/v1/chat.search', description: 'Search for messages in a specific room matching a search term.', category: 'messaging', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: true, description: 'The room ID' }, { name: 'searchText', type: 'string', required: true, description: 'Text to search for' }, { name: 'count', type: 'number', required: false, description: 'Number of results to return' }] },

    // Users
    { id: 'users.info', method: 'GET', path: '/api/v1/users.info', description: 'Get detailed information about a user by ID or username.', category: 'users', requiresAuth: true, parameters: [{ name: 'userId', type: 'string', required: false, description: 'The user ID' }, { name: 'username', type: 'string', required: false, description: 'The username' }] },
    { id: 'users.list', method: 'GET', path: '/api/v1/users.list', description: 'List all users on the server. Supports pagination and filtering.', category: 'users', requiresAuth: true, parameters: [{ name: 'offset', type: 'number', required: false, description: 'Number of items to skip' }, { name: 'count', type: 'number', required: false, description: 'Number of items to return' }] },
    { id: 'users.create', method: 'POST', path: '/api/v1/users.create', description: 'Create a new user account (requires admin privileges).', category: 'users', requiresAuth: true, parameters: [{ name: 'email', type: 'string', required: true, description: 'User email' }, { name: 'name', type: 'string', required: true, description: 'Display name' }, { name: 'password', type: 'string', required: true, description: 'User password' }, { name: 'username', type: 'string', required: true, description: 'Username' }, { name: 'roles', type: 'array', required: false, description: 'Array of role names' }] },
    { id: 'users.update', method: 'POST', path: '/api/v1/users.update', description: "Update an existing user's data (requires admin privileges).", category: 'users', requiresAuth: true, parameters: [{ name: 'userId', type: 'string', required: true, description: 'The user ID to update' }, { name: 'data', type: 'object', required: true, description: 'Object with fields to update (name, email, etc.)' }] },
    { id: 'users.setAvatar', method: 'POST', path: '/api/v1/users.setAvatar', description: "Set a user's avatar from a URL.", category: 'users', requiresAuth: true, parameters: [{ name: 'avatarUrl', type: 'string', required: true, description: 'URL of the avatar image' }, { name: 'userId', type: 'string', required: false, description: 'User ID (admin only)' }] },

    // Groups
    { id: 'groups.list', method: 'GET', path: '/api/v1/groups.list', description: 'List all private groups the authenticated user is part of.', category: 'groups', requiresAuth: true, parameters: [{ name: 'offset', type: 'number', required: false, description: 'Number of items to skip' }, { name: 'count', type: 'number', required: false, description: 'Number of items to return' }] },
    { id: 'groups.create', method: 'POST', path: '/api/v1/groups.create', description: 'Create a new private group with specified name and optional members.', category: 'groups', requiresAuth: true, parameters: [{ name: 'name', type: 'string', required: true, description: 'Group name' }, { name: 'members', type: 'array', required: false, description: 'Array of usernames to invite' }, { name: 'readOnly', type: 'boolean', required: false, description: 'Whether the group is read-only' }] },
    { id: 'groups.info', method: 'GET', path: '/api/v1/groups.info', description: 'Get detailed information about a private group by its ID or name.', category: 'groups', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: false, description: 'The group ID' }, { name: 'roomName', type: 'string', required: false, description: 'The group name' }] },
    { id: 'groups.history', method: 'GET', path: '/api/v1/groups.history', description: 'Retrieve message history for a private group.', category: 'groups', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: true, description: 'The group ID' }, { name: 'count', type: 'number', required: false, description: 'Number of messages to return' }, { name: 'offset', type: 'number', required: false, description: 'Number of messages to skip' }] },
    { id: 'groups.members', method: 'GET', path: '/api/v1/groups.members', description: 'List all members of a private group.', category: 'groups', requiresAuth: true, parameters: [{ name: 'roomId', type: 'string', required: true, description: 'The group ID' }, { name: 'offset', type: 'number', required: false, description: 'Number of items to skip' }, { name: 'count', type: 'number', required: false, description: 'Number of items to return' }] },

    // Misc
    { id: 'info', method: 'GET', path: '/api/v1/info', description: 'Get the Rocket.Chat server information including version and build details.', category: 'misc', requiresAuth: false, parameters: [] },
    { id: 'statistics', method: 'GET', path: '/api/v1/statistics', description: 'Get server statistics including total users, messages, rooms, and online users.', category: 'misc', requiresAuth: true, parameters: [] },
    { id: 'settings.public', method: 'GET', path: '/api/v1/settings.public', description: 'Get all public server settings (does not require authentication).', category: 'misc', requiresAuth: false, parameters: [{ name: 'offset', type: 'number', required: false, description: 'Number of items to skip' }, { name: 'count', type: 'number', required: false, description: 'Number of items to return' }] },
    { id: 'emoji-custom.list', method: 'GET', path: '/api/v1/emoji-custom.list', description: 'List all custom emojis available on the server.', category: 'misc', requiresAuth: true, parameters: [] },
    { id: 'subscriptions.getAll', method: 'GET', path: '/api/v1/subscriptions.getAll', description: 'Get all subscriptions (rooms the user has joined) for the authenticated user.', category: 'misc', requiresAuth: true, parameters: [{ name: 'updatedSince', type: 'string', required: false, description: 'ISO date — only return subscriptions updated after this date' }] },
];

export const CATEGORY_META: Record<string, { icon: string; label: string; color: string }> = {
    auth: { icon: '🔐', label: 'Authentication', color: '#f59e0b' },
    channels: { icon: '📢', label: 'Channels', color: '#3b82f6' },
    messaging: { icon: '💬', label: 'Messaging', color: '#10b981' },
    users: { icon: '👤', label: 'Users', color: '#8b5cf6' },
    groups: { icon: '🔒', label: 'Private Groups', color: '#ec4899' },
    misc: { icon: '⚙️', label: 'Misc / System', color: '#6b7280' },
};

export const PROFILES = [
    { id: 'messaging', label: 'Messaging', description: 'Send, read & search messages', endpoints: ['login', 'me', 'channels.list', 'channels.history', 'chat.sendMessage', 'chat.postMessage', 'chat.getMessage', 'chat.search'] },
    { id: 'channels', label: 'Channels', description: 'Full channel lifecycle', endpoints: ['login', 'me', 'channels.list', 'channels.info', 'channels.create', 'channels.history', 'channels.members', 'channels.join', 'channels.leave'] },
    { id: 'admin', label: 'Admin', description: 'User mgmt, stats & settings', endpoints: ['login', 'me', 'users.info', 'users.list', 'users.create', 'users.update', 'users.setAvatar', 'info', 'statistics', 'settings.public'] },
    { id: 'readonly', label: 'Read-Only', description: 'Browse & read — zero writes', endpoints: ['login', 'me', 'channels.list', 'channels.info', 'channels.history', 'channels.members', 'chat.getMessage', 'chat.search'] },
];

export function getCategories(): string[] {
    return [...new Set(ENDPOINTS.map(e => e.category))];
}

/**
 * Hardcoded token counts from CLI benchmark (gpt-tokenizer, Node.js).
 * These were generated by running: npx ts-node src/index.ts benchmark
 * Using these ensures web UI shows IDENTICAL numbers to CLI output.
 */
const CLI_TOKEN_COUNTS: Record<string, number> = {
    'login': 62, 'logout': 36, 'me': 42,
    'channels.list': 71, 'channels.info': 66, 'channels.create': 80,
    'channels.history': 112, 'channels.members': 76, 'channels.join': 50, 'channels.leave': 49,
    'chat.sendMessage': 65, 'chat.postMessage': 125, 'chat.getMessage': 48,
    'chat.update': 75, 'chat.delete': 65, 'chat.search': 78,
    'users.info': 61, 'users.list': 67, 'users.create': 93,
    'users.update': 73, 'users.setAvatar': 68,
    'groups.list': 66, 'groups.create': 79, 'groups.info': 65,
    'groups.history': 75, 'groups.members': 75,
    'info': 39, 'statistics': 43, 'settings.public': 66,
    'emoji-custom.list': 41, 'subscriptions.getAll': 63,
};

export function estimateTokens(ep: ApiEndpoint): number {
    return CLI_TOKEN_COUNTS[ep.id] ?? 40; // fallback for any unknown
}

export function getTotalTokens(endpoints: ApiEndpoint[]): number {
    return endpoints.reduce((sum, ep) => sum + estimateTokens(ep), 0);
}

export const FULL_TOKENS = getTotalTokens(ENDPOINTS);

