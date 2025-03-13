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
    let parameters

    if (model.includes('dreamshaper')) {
      parameters = {
        prompt: promptWithStyle,
        num_samples: 1,  // if the API supports multiple samples
        seed: randomSeed,
        num_inference_steps: inputValues.num_steps || 20,
        guidance_scale: inputValues.guidance || 7.5,
      };
    } else {
      parameters = {
        prompt: promptWithStyle,
        num_samples: 1,  // if the API supports multiple samples
        seed: randomSeed,
        ...inputValues,
      };
    }

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

    const contentType = response.headers.get('content-type');
    console.log('Response content-type:', contentType);

    if (contentType?.includes('image')) {
      const arrayBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      return NextResponse.json({
        success: true,
        result: {
          image: `data:${contentType};base64,${base64}`
        }
      });
    }

    const data = await response.json();
    console.log({ data: `JSON response: ${JSON.stringify(data, null, 2)}` });

    if (!response.ok || (data && !data.success)) {
      throw new Error(
        data?.errors?.[0]?.message ||
        data?.error ||
        `API error: ${response.statusText}`
      );
    }

    if (model.includes('flux')) {
      return NextResponse.json({
        success: true,
        result: {
          image: `data:image/jpeg;base64,${data.result.image}`,
        }
      });
    }

    const imageData = Array.isArray(data.result) ? data.result[0] : data.result;
    console.log({ imageData: `Image data: ${imageData}` });
    return NextResponse.json({
      success: true,
      result: {
        image: `data:image/png;base64,${imageData}`
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
