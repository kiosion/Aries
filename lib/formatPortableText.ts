import { 
  Gemtext,
  LineText,
  LinePreformattingToggle,
  LineHeading,
  LineQuote,
  LineListItem
} from 'https://deno.land/x/kaksik/mod.ts';

export const format = (sanityRes: any): Promise<Gemtext> => new Promise (async (resolve, reject) => {
  // TODO
  // Format sanity response w/ portabletext into an array of Gemtext-formatted strings
  let content = new Gemtext();

  // ...

  resolve(content);
});

