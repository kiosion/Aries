import {
  Gemtext,
  LineText,
  LineLink,
  LinePreformattingToggle,
  LineHeading,
  LineQuote,
  LineListItem
} from 'https://deno.land/x/kaksik/mod.ts';

export const buildPage: any = ((title: string, body: string[]) => {
  let content = new Gemtext(
    new LineHeading(`${title} - kio.dev`, 1),
    new LineText(),
  );

  for (let i = 0; i < body.length; i++) {

    content.append(new LineText(body[i]));
  }

  content.append(
    new LineText(),
    new LineText('~~~~~~~~~'),
    new LineText('copyright 2022 kiosion'),
  );

  return content;
});

