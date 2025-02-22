// GET /api/model/:model
// Returns a JSON object with the model information, including the schema for interacting with it

import type { NextRequest } from "next/server";
import Cloudflare from "cloudflare";

export async function GET(request: NextRequest) {
  const model = request.nextUrl.searchParams.get("model");
  if (!model) return new Response("Model not specified", { status: 400 });

  try {
    const client = new Cloudflare({
      apiToken: process.env.VITE_CLOUDFLARE_API_TOKEN,
    });

    const schema = await (client as any).ai.models.schema.get({
      account_id: process.env.VITE_CLOUDFLARE_ACCOUNT_ID!,
      model,
    });

    console.log('Full Schema:', JSON.stringify(schema, null, 2));

    return new Response(JSON.stringify(schema), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error({ error });
    return new Response(error.message, { status: 500 });
  }
}
