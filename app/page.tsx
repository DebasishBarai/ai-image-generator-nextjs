'use client';

import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Loader2, Download } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setGeneratedImage('');

    try {
      console.log('Starting direct Cloudflare API request...');
      const response = await fetch(
        `/api/generate-image`,
        {
          method: 'POST',
          body: JSON.stringify({ prompt })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.statusText}`);
      }

      const data = await response.json();

      setGeneratedImage(`${data.result.image}`);
    } catch (err) {
      const errorDetails = {
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
        stack: err instanceof Error ? err.stack : undefined,
        raw: err
      };
      console.error('Detailed Error:', errorDetails);
      setError(errorDetails.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ai-generated-${Date.now()}.jpg`; // Generate unique filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-2 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold flex items-center justify-center gap-4 mb-3">
            AI Image Generator
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </h1>
          <p className="text-gray-400 text-lg">Create stunning images with Flux AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
          {/* Left side - Input form */}
          <div className="md:pr-4 max-w-xl">
            <form onSubmit={generateImage} className="mb-8">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className={clsx(
                    "w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2",
                    loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  )}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Right side - Generated image */}
          <div className="md:pl-4 w-full">
            {generatedImage && (
              <div className="bg-gray-800 p-2 rounded-lg w-full">
                <div className="relative w-full aspect-square">
                  <Image
                    src={generatedImage}
                    alt={prompt}
                    fill
                    className="object-contain rounded-lg shadow-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <button
                    onClick={handleDownload}
                    className="absolute top-4 right-4 p-2 bg-gray-900/80 hover:bg-gray-900 rounded-lg transition-colors"
                    title="Download Image"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {!generatedImage && !loading && !error && (
              <div className="bg-gray-800 p-8 rounded-lg text-center aspect-square w-full flex flex-col items-center justify-center">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">
                  Your generated image will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
