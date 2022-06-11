import { 
  Application,
  handleRoutes,
  Route
} from 'https://deno.land/x/kaksik/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';

import { client as sanityClient, urlFor as sanityUrlFor } from './lib/client.ts';
import { buildPage as pageBuilder } from './lib/builder.ts';

const app = new Application({
  keyFile: './key.pem',
  certFile: './cert.pem',
});

app.use(handleRoutes(
  new Route('/test', async (ctx) => {
    ctx.response.body = await pageBuilder(
      'Test page', 
      [ 'Some one-line test content', 'Another line of test content' ]
    );
  }),
  new Route<{id?: string}>('/param/:id', async (ctx) => {
    ctx.response.body = '# Parametrized page\r\n' +
      'id = ' + ctx.pathParams.id;
  }),
  new Route('/', async (ctx) => {
    ctx.response.body = '# Home - kio.dev\r\n' +
      '=> /test Test page served by other route\r\n' +
      '=> /param/7 Parametrized page, where id=7\r\n' +
      '=> /404 No routes matched';
  }),
));

app.use(ctx => {
  ctx.response.body = '# Error 404\r\n' + 
    'No routes matched :(';
});

await app.start();

