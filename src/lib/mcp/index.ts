import { HttpTransport } from '@tmcp/transport-http';

let http_transport: HttpTransport | null = null;

export async function get_http_transport(): Promise<HttpTransport | null> {
	if (http_transport) return http_transport;
	try {
		const { server } = await import('@alus-ui/mcp-server');
		http_transport = new HttpTransport(server, {
			cors: true,
			path: '/mcp',
			disableSse: true,
		});
		return http_transport;
	} catch {
		return null;
	}
}
