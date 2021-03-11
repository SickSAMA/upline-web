This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Config Public Env Variables

Create `.env.local` in local directory to override the default envs.

To create new public envs, put them into `.env.local & .env (stag) & .env-production (prod)`

## Download & Generate Graphql Schema Types

Only download schema if the schema on server side changes

`npm run schema:download`

Use codegen once a new graphql query is added

`npm run schema:codegen`
