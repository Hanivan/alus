import { server } from '@alus-ui/mcp-server';
import { StdioTransport } from '@tmcp/transport-stdio';

const transport = new StdioTransport(server);
transport.listen();
