import {
  Gemtext,
  LineText,
  LineLink,
  LinePreformattingToggle,
  LineHeading,
  LineQuote,
  LineListItem
} from 'https://deno.land/x/kaksik/mod.ts';

export const buildPage: any = (title: string, body: string[]): Promise<any> => new Promise (async (resolve, reject) => {
  let content = new Gemtext(
    new LineHeading(`${title} - kio.dev`, 1),
  );
  
  const navFile = await Deno.readTextFile('./templates/nav.gmi');
  
  let nav = new Gemtext();
  
  for (let i = 0; i < navFile.split('\n').length; i++) {
    nav.append(new LineText(navFile.split('\n')[i]));
  }
  
  content.append(nav);
  
  for (let i = 0; i < body.length; i++) {
    content.append(new LineText(body[i]));
  }
  
  let footerFile = await Deno.readTextFile('./templates/footer.gmi');
  
  let footer = new Gemtext();
  
  for (let i = 0; i < footerFile.split('\n').length; i++) {
    footer.append(new LineText(footerFile.split('\n')[i]));
  }

  content.append(footer);
  
  resolve(content);
});

