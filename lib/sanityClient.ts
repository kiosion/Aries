// sanity client

type ClientProps = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
  useCdn?: boolean;
};

type QueryParams = Record<string, string | number>;

const sanityCreds = {
  projectId: Deno.env.get('SANITY_PROJECT_ID'),
  dataset: "production",
  token: Deno.env.get('SANITY_API_TOKEN'),
};

const sanityClient = (props: ClientProps) => {
  const { useCdn, projectId, dataset, token, apiVersion } = props;
  const hasToken = token && token.length > 0;
  const baseHost = useCdn && !hasToken ? "apicdn.sanity.io" : "api.sanity.io";
  const endpoint = `https://${projectId}.${baseHost}/v${apiVersion}/data/query/${dataset}`;

  // parse json and throw error on bad res
  const responseHandler = (response: Response) => {
    if (response.status >= 400) {
      throw new Error([response.status, response.statusText].join(" "));
    }
    return response.json();
  };

  // prefix groq query params with `$` and escape (quote) the strings
  const transformedParams = (parameters: QueryParams) =>
    Object.keys(parameters).reduce<QueryParams>((prev, key) => {
      prev[`$${key}`] = JSON.stringify(parameters[key]);
      return prev;
    }, {});

  return {
    fetch: async (query: string, parameters?: QueryParams) => {
      const urlParams = new URLSearchParams({
        query,
        ...(parameters && transformedParams(parameters)),
      });

      const url = new URL([endpoint, urlParams].join("?"));
      const request = new Request(url.toString());

      if (hasToken) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }

      return (
        fetch(request)
          .then(responseHandler)
          // the query results are in the `result` property
          .then((json) => json.result)
      );
    },
  };
};

export const runQuery = async (
  query: string,
  callback: (json: any[]) => void
) => {
  const client = sanityClient({
    ...sanityCreds,
    useCdn: false,
    apiVersion: '2021-05-04'
  });
  await client.fetch(query).then(callback);
};

export const urlFor = (source: any) => {
  imageURLBuilder(sanityCreds).image(source);
};

