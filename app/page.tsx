'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, Image as ImageIcon, Loader2, Download } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { z } from 'zod';

type Model = {
  id: string
  name: string
}

type SchemaProperty = {
  type: string
  description: string
  default?: any
  minimum?: number
  maximum?: number
  minLength?: number
  maxLength?: number
}

type Schema = {
  input: {
    properties: Record<string, SchemaProperty>
    required: string[]
  }
}

function createZodSchema(schema: Schema) {
  const properties: Record<string, z.ZodType> = {};
  
  Object.entries(schema.input.properties).forEach(([key, prop]) => {
    let zodType: z.ZodType;
    
    if (prop.type === 'number' || prop.type === 'integer') {
      zodType = z.number().describe(prop.description || '');
      if (prop.type === 'integer') {
        zodType = (zodType as z.ZodNumber).int('Must be an integer');
      }
      if (prop.minimum !== undefined) {
        zodType = (zodType as z.ZodNumber).min(prop.minimum);
      }
      if (prop.maximum !== undefined) {
        zodType = (zodType as z.ZodNumber).max(prop.maximum);
      }
    } else if (prop.type === 'boolean') {
      zodType = z.boolean().describe(prop.description || '');
    } else {
      zodType = z.string().describe(prop.description || '');
      if (prop.minLength !== undefined) {
        zodType = (zodType as z.ZodString).min(prop.minLength);
      }
      if (prop.maxLength !== undefined) {
        zodType = (zodType as z.ZodString).max(prop.maxLength);
      }
    }

    if (!schema.input.required.includes(key)) {
      zodType = zodType.optional();
    }

    properties[key] = zodType;
  });

  return z.object(properties);
}

function SchemaInputs({ 
  schema, 
  inputValues, 
  setInputValues,
  prompt,
  setPrompt
}: { 
  schema: Schema | null, 
  inputValues: Record<string, any>,
  setInputValues: (values: Record<string, any>) => void,
  prompt: string,
  setPrompt: (value: string) => void
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!schema) return null;

  const zodSchema = createZodSchema(schema);

  const handleInputChange = (key: string, value: any) => {
    const parsedValue = schema.input.properties[key].type === 'number' || 
                       schema.input.properties[key].type === 'integer' 
                       ? Number(value)
                       : value;

    if (key === 'prompt') {
      setPrompt(parsedValue);
    } else {
      const newValues = { ...inputValues, [key]: parsedValue };
      setInputValues(newValues);
    }

    try {
      zodSchema.shape[key].parse(parsedValue);
      setErrors(prev => ({ ...prev, [key]: '' }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(prev => ({ 
          ...prev, 
          [key]: err.errors[0]?.message || 'Invalid value' 
        }));
      }
    }
  };

  const isFieldRequired = (key: string) => schema.input.required.includes(key);

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(schema.input.properties).map(([key, prop]) => {
        const required = isFieldRequired(key);
        return (
          <div key={key} className="flex flex-col gap-2">
            <label htmlFor={key} className="text-sm text-gray-300">
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {required && <span className="text-red-500 ml-1">*</span>}
              {prop.description && (
                <span className="ml-2 text-xs text-gray-400">({prop.description})</span>
              )}
            </label>
            {prop.type === 'number' ? (
              <input
                type="number"
                id={key}
                value={key === 'prompt' ? prompt : (inputValues[key] ?? prop.default ?? '')}
                onChange={(e) => handleInputChange(key, Number(e.target.value))}
                min={prop.minimum}
                max={prop.maximum}
                required={required}
                className={clsx(
                  "w-full px-4 py-3 rounded-lg bg-gray-700 border focus:ring-2 focus:outline-none text-white",
                  errors[key] 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                )}
              />
            ) : prop.type === 'boolean' ? (
              <select
                id={key}
                value={inputValues[key] ?? prop.default ?? false}
                onChange={(e) => handleInputChange(key, e.target.value === 'true')}
                required={required}
                className={clsx(
                  "w-full px-4 py-3 rounded-lg bg-gray-700 border focus:ring-2 focus:outline-none text-white",
                  errors[key] 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                )}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            ) : (
              <input
                type="text"
                id={key}
                value={key === 'prompt' ? prompt : (inputValues[key] ?? prop.default ?? '')}
                onChange={(e) => handleInputChange(key, e.target.value)}
                required={required}
                placeholder={key === 'prompt' ? "Describe the image you want to generate..." : ""}
                className={clsx(
                  "w-full px-4 py-3 rounded-lg bg-gray-700 border focus:ring-2 focus:outline-none text-white",
                  errors[key] 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                )}
              />
            )}
            {errors[key] && (
              <p className="text-sm text-red-500 mt-1">{errors[key]}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [schema, setSchema] = useState<Schema | null>(null)
  const [inputValues, setInputValues] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/models")
      .then((res) => res.json())
      .then((data) => setModels(data as Model[]))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (selectedModel) {
      fetch(`/api/schema?model=${selectedModel}`)
        .then((res) => res.json())
        .then((ns) => {
          const newSchema = ns as Schema
          setSchema(newSchema)
          const defaultValues = Object.entries(newSchema.input.properties).reduce((acc, [key, prop]) => {
            if (prop.default !== undefined) acc[key] = prop.default
            return acc
          }, {} as Record<string, any>)
          setInputValues(defaultValues)
        })
        .catch(console.error)
    }
  }, [selectedModel])


  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !selectedModel) return;

    // Validate all inputs before submission
    if (schema) {
      try {
        const zodSchema = createZodSchema(schema);
        // Include prompt in validation
        zodSchema.parse({ ...inputValues, prompt });
      } catch (err) {
        if (err instanceof z.ZodError) {
          const newErrors = err.errors.reduce((acc, error) => {
            if (error.path[0]) {
              acc[error.path[0].toString()] = error.message;
            }
            return acc;
          }, {} as Record<string, string>);
          setErrors(newErrors);
          return;
        }
      }
    }

    setLoading(true);
    setError('');
    setGeneratedImage('');

    try {
      console.log('Starting direct Cloudflare API request...');
      const response = await fetch(
        `/api/generate-image`,
        {
          method: 'POST',
          body: JSON.stringify({ 
            ...inputValues,
            prompt,
            model: selectedModel,
          })
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
          <div className="md:pr-4 max-w-xl flex flex-col h-[calc(100vh-200px)]">
            <form onSubmit={generateImage} className="flex flex-col h-full">
              <div className="overflow-y-auto flex-1 mb-4">
                <div className="flex flex-col gap-2 mb-4">
                  <label htmlFor="model-select" className="text-sm text-gray-300">
                    Select Model
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    id="model-select"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
                  >
                    <option value="" disabled>
                      Select an AI model
                    </option>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>

                <SchemaInputs 
                  schema={schema} 
                  inputValues={inputValues} 
                  setInputValues={setInputValues}
                  prompt={prompt}
                  setPrompt={setPrompt}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !selectedModel || !prompt.trim() || Object.keys(errors).length > 0}
                className={clsx(
                  "w-full px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2",
                  (loading || !selectedModel || !prompt.trim() || Object.keys(errors).length > 0) 
                    ? "bg-gray-600 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700"
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
            </form>

            {error && (
              <div className="mt-4 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
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
