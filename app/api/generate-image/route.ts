import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, model, ...inputValues } = await request.json();

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
      ...inputValues,
    };

    

    console.log('Request parameters:', JSON.stringify(parameters, null, 2));

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.VITE_CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`,
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
    console.log('Full API Response:', JSON.stringify(data, null, 2));

    if (!response.ok || !data.success) {
      throw new Error(`Cloudflare API error: ${JSON.stringify(data.errors, null, 2)}`);
    }

    // Handle different model response formats
    let imageData;
    if (model.includes('flux')) {
      imageData = data.result.image;
    } else {
      // For other models, the image might be in a different format or array
      imageData = Array.isArray(data.result) ? data.result[0] : data.result;
    }

    if (!imageData) {
      throw new Error('No image data received from the server');
    }

    return NextResponse.json({
      success: true,
      result: {
        image: `data:image/jpeg;base64,${imageData}`,
      }
    });
  } catch (err) {
    console.error('Error details:', err);
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}
