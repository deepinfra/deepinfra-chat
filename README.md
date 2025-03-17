This is a sample Next.js ai chat application that uses [Deep Infra models](https://deepinfra.com/models) for inference and [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction).

## Table of Contents

- [Deploy](#deploy)
- [Getting Started](#getting-started): Use the Deep Infra Vercel integration to quickly setup and run this sample app
- [Manual Setup](#manual-setup): Detailed instruction for local development
- [Experiment](#experiment): Try diffenet models and inference options
  
## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdeepinfra%2Fdeepinfra-chat&products=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22deepiinfra%22%2C%22productSlug%22%3A%22api-token%22%2C%22protocol%22%3A%22ai%22%7D%5D")

## Getting Started

This section assumes you have set up a Deep Infra account and project using the Vercel Integration (press deploy button above).

### Step 1. Pull environment variables

You'll need a Deep Infra API key in your environment variables to connect to the model. Run the following command to pull them from Vercel:

```bash
vercel env pull
```

### Step 2. Run the app

Run `npm run dev`. You can start chatting with the ai model immediately.

## Manual Setup

### Step 1. Deep Infra account

Create a Deep Infra account either through the [Vercel marketplace integration](https://vercel.com/marketplace/deepinfra) or by directly registering at [Deep Infra](https://deepinfra.com)

### Step 2. Clone the sample app

```bash
git clone git@github.com:deepinfra/deepinfra-chat.git
```

```bash
cd deepinfra-chat
```

```bash
npm install
```

### Step 3. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

From the [api keys page](https://deepinfra.com/dash/api_keys) in your Deep Infra dashboard, create a new token or use an existing one. Use that token to set the `DEEPINFRA_API_KEY` variable in `.env.local`

## Experiment

By default the sample app uses model `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo` specified in `app/page.tsx`:
```typescript
const DI_MODEL = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo";
```

The actual inference calls to the model happen in `app/api/chat/route.ts`:
```typescript
export async function POST(req: Request) {
  const { messages, model } = await req.json();

  const result = streamText({
    model: deepinfra(model),
    system: "Be a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
```

You can experiment with different [Deep Infra models](https://deepinfra.com/models), prompts and options. See the [Deep Infra docs](https://deepinfra.com/docs), [Vercel AI SDK docs](https://sdk.vercel.ai/docs/introduction) and [Deep Infra AI SDK Provider docs](https://sdk.vercel.ai/providers/ai-sdk-providers/deepinfra).


