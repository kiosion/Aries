import { createRequire } from 'https://deno.land/std/node/module.ts';

const require = createRequire(import.meta.url);
const sanityClient = require('@sanity/client');
const imageBuilder = require('@sanity/image-url');

export const client = sanityClient({
  projectId: Deno.env.get("SANITY_PROJECT_ID"),
  dataset: 'production',
  apiVersion: '2022-05-04',
  useCdn: true,
});

const builder = imageBuilder(client);

export const urlFor = (source: any) => builder.image(source);

