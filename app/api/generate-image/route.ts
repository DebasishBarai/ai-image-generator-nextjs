import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    // Add randomization through one or more of these methods:
    // 1. Add a random seed to the prompt
    const randomSeed = Math.floor(Math.random() * 1000000);
    const promptWithSeed = `${prompt} (seed: ${randomSeed})`;

    // 2. Add random style variations
    const styles = ['realistic', 'artistic', 'detailed', 'minimalist', 'vibrant'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const promptWithStyle = `${promptWithSeed}, ${randomStyle} style`;

    // 3. Add optional parameters to the API call
    const parameters = {
      prompt: promptWithStyle,
      num_samples: 1,  // if the API supports multiple samples
      seed: randomSeed,  // if the API supports seed parameter
      // Add any other parameters the API supports for variation
    };

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.VITE_CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.VITE_CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
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
        image: `data:image/jpeg;base64,${data.result.image}`,
        seed: randomSeed  // Return the seed for reproducibility if needed
      }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      error: { err }
    });
  }
}
