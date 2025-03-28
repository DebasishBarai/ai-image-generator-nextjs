'use client';

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Image Generator",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Create stunning AI-generated images with just a text prompt. Transform your ideas into beautiful, unique visuals using state-of-the-art AI models.",
    "featureList": [
      "Text-to-image generation",
      "Multiple AI models",
      "High-quality image outputs",
      "Free to use"
    ],
    "screenshot": "/app-screenshot.jpg",
    "author": {
      "@type": "Person",
      "name": "Debasish Barai"
    }
  };

  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="col-span-1">
              <h3 className="text-white text-lg font-semibold mb-4">AI Image Generator</h3>
              <p className="text-gray-400 text-sm mb-4">
                Create stunning AI-generated images with just a text prompt. Powered by state-of-the-art AI models.
              </p>
              
              {/* SEO-friendly keywords */}
              <div className="text-xs text-gray-500 mt-4">
                <p>Keywords: AI image generator, text to image, AI art generator, stable diffusion, AI art creation, AI visualization tool</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-1">
              <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional SEO content */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500">
            <p className="mb-2">
              The AI Image Generator is a free online tool that lets you create images from text descriptions using 
              artificial intelligence. Our platform leverages advanced models like Stable Diffusion to transform your 
              ideas into visual art in seconds.
            </p>
            <p>
              Whether you need images for personal projects, content creation, design inspiration, or just for fun, 
              our AI tool makes it easy to generate unique visuals without any technical knowledge or design skills.
            </p>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} AI Image Generator. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Add JSON-LD structured data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
};

export default Footer; 
