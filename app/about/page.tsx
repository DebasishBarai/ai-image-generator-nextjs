'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow">
          <nav className="mb-8">
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              &larr; Back to Home
            </Link>
          </nav>
          
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-100">Our Mission</h2>
              <p className="text-gray-300">
                At AI Image Generator, our mission is to democratize creative expression through artificial intelligence. 
                We believe that everyone should have access to powerful tools that can bring their imagination to life, 
                regardless of their artistic background or technical skills.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-100">Our Technology</h2>
              <p className="text-gray-300 mb-4">
                Our platform is built on Cloudflare Workers AI, a powerful edge computing platform that allows us to run 
                state-of-the-art AI models directly on Cloudflare's global network. This architecture provides several key advantages:
              </p>
              
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li className="mb-2">
                  <span className="font-medium text-gray-200">Edge Computing:</span> By running our AI models at the edge of the network, 
                  we can generate images with minimal latency, regardless of your location.
                </li>
                <li className="mb-2">
                  <span className="font-medium text-gray-200">Scalability:</span> Cloudflare's distributed infrastructure allows our 
                  application to scale automatically, handling traffic spikes without performance degradation.
                </li>
                <li className="mb-2">
                  <span className="font-medium text-gray-200">Advanced AI Models:</span> We leverage Cloudflare's integration with 
                  leading AI models like Stable Diffusion, enabling high-quality image generation from text prompts.
                </li>
                <li className="mb-2">
                  <span className="font-medium text-gray-200">Security:</span> Our infrastructure benefits from Cloudflare's 
                  robust security features, ensuring your data and interactions are protected.
                </li>
              </ul>
              
              <p className="text-gray-300 mb-4">
                The front-end of our application is built with Next.js and React, providing a responsive and intuitive user 
                interface that works seamlessly across devices. We use Tailwind CSS for styling, ensuring a modern and 
                consistent design throughout the application.
              </p>
              
              <p className="text-gray-300">
                We're committed to responsible AI development and use, ensuring that our technology is used ethically 
                and that we implement appropriate safeguards to prevent misuse.
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-100">Contact Us</h2>
              <p className="text-gray-300">
                Have questions or feedback? We'd love to hear from you! Visit our 
                <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors ml-1">
                  Contact Page
                </Link> to get in touch with our team.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 