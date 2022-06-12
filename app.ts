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
    ctx.response.body = await pageBuilder(
      'Home',
      ['Blank for now :)']
    );
  }),
));

app.use(async ctx => {
  ctx.response.body = await pageBuilder(
    'Error 404',
    ['', 'No routes matched :(', '', '=> / return home']
  );
});

await app.start();

