import { http_transport } from '$lib/mcp/index.js';
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname !== '/mcp') return resolve(event);

	// redirect browser GET requests to README
	if (event.request.method === 'GET') {
		const accept = event.request.headers.get('accept') ?? '';
		if (!accept.includes('text/event-stream')) {
			redirect(302, 'https://github.com/Hanivan/alus#readme');
		}
	}

	const mcp_response = await http_transport.respond(event.request);
	return mcp_response ?? resolve(event);
};
