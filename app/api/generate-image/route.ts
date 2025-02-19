import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { model, prompt } = await request.json()

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.VITE_CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.VITE_CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(`Cloudflare API error: ${data.errors?.[0]?.message || response.statusText}`);
    }

    if (!data.result?.image) {
      throw new Error('No image data received from the server');
    }

    return NextResponse.json({
      success: true,
      result: {
        image: `data:image/jpeg;base64,${data.result.image}`
      }
    })
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      error: { err }
    })
  }
}
