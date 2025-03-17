import { deepinfra } from "@ai-sdk/deepinfra";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  const result = streamText({
    // deepinfra('model') expects that DEEPINFRA_API_KEY environment variable
    // is set to a valid Deep Infra api token key.
    // See .env.local.example
    //
    // For list of available models visit https://deepinfra.com/models
    model: deepinfra(model),
    system: "Be a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse();
}
