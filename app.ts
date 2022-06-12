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
  new Route<{slug?: string}>('/post/:slug', async (ctx) => {
    // Need to add some logic here; check if slug exists as a page
    // already under /static/posts, if so, serve content from that.
    // Otherwise, implement 'fetch.ts' and write to file for
    // future use.

    ctx.response.body = await pageBuilder(
      'Parametrized page',
      [ 'page slug: ' + ctx.pathParams.slug ]
    );
  }),
  new Route('/blog', async (ctx) => {
    // Need to fetch static header/desc, then append list fetched
    // from Sanity.io, using 'fetch.ts' util. Same for title.

    // const blog = await Deno.readTextFile('./static/blog.gmi');
    
    // Filler text for now
    ctx.response.body = await pageBuilder(
      'Blog posts',
      [ 'To-do, check back later :)', '## Recent', '', '## All posts', 'Page 1 of ?', '', '=> /blog Prev', '=> /blog/2 Next' ]
    );
  }),
  new Route<{page?: string}>('/blog/:page', async (ctx) => {
    // For pagination of 'all pots' section on blog page
    // Also to-do :)
    
    const pageNum: number = (ctx?.pathParams?.page && +ctx?.pathParams?.page > 1) ? +ctx?.pathParams?.page : 1;

    ctx.response.body = await pageBuilder(
      'Blog posts',
      [ 'To-do, check back later :)', '## Recent', '', '## All posts', 'Page ' + pageNum + ' of ?', '', '=> /blog/' + ((pageNum - 1) > 1 ? pageNum - 1 : 1) + ' Prev', '=> /blog/' + (pageNum + 1) + ' Next']
    );
  }),
  new Route('/pub.gpg', async (ctx) => {
    const gpg = await Deno.readTextFile('./static/gpg.gmi');

    ctx.response.body = await pageBuilder(
      'GPG',
      gpg.split('\n'),
    );
  }),
  new Route('/', async (ctx) => {
    const index = await Deno.readTextFile('./static/index.gmi');

    ctx.response.body = await pageBuilder(
      'Home',
      index.split('\n'),
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

