<div align=center>
  <h1>Aries</h1>
  <p>Deno app to serve gmi pages on-the-fly for a gemini instance of my portfolio &amp; blog</p>
</div>

## About


## Usage
In order to run locally, you'll need SSL certs. You can generate self-signed ones using the `openssl` command.

Then, install the node deps using:
```
yarn install
```

Finally, run with Deno using:
```
deno run --allow-net --allow-read --allow-env --unstable ./app.ts
```

## Credits
Many thanks to sergetymo for their amazing work with [kaksik](https://github.com/sergetymo/kaksik)!
