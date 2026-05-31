import { server } from '@alus-ui/mcp-server';
import { HttpTransport } from '@tmcp/transport-http';

export const http_transport = new HttpTransport(server, {
	cors: true,
	path: '/mcp',
	// Cloudflare Workers have a 30s CPU limit — disable SSE to avoid stale connections
	disableSse: true,
});
