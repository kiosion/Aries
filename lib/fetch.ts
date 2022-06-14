import { client as sanityClient } from './client.ts';

module fetch {
  export const post = (urlSlug: string): Promise<any> => new Promise ((resolve, reject) => {
    // sanity query for single post
    const query = `*[_type == "post" && urlSlug == ${urlSlug}]`;
    
    sanityClient.fetch(query)
      .then((data: any) => {
        console.log('Returned post(s):');
        data.forEach((post: any) => {
          console.log(post);
        });
      });
  });

  export const posts = (): Promise<any> => new Promise ((resolve, reject) => {
    // sanity query for all posts
  });

  export const page = (page: number): Promise<any> => new Promise ((resolve, reject) => {
    // query for 'page' of posts, do some quick maths for total num (.length or something
    // of results for all, divided by number per page, 6 or something idk), from that find
    // which range should be queried for current page
  });
}

export default fetch;
