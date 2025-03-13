'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow">
          <nav className="mb-8">
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              &larr; Back to Home
            </Link>
          </nav>
          
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          
          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-100">Get in Touch</h2>
                <p className="text-gray-300 mb-6">
                  Have questions about our AI Image Generator? We're here to help! For any queries, please contact us via email.
                </p>
              </div>
              
              <div className="flex items-center justify-center p-6 bg-gray-700 rounded-lg">
                <Mail className="w-6 h-6 text-blue-400 mr-4" />
                <div>
                  <h3 className="font-medium text-gray-200 mb-1">Email</h3>
                  <a 
                    href="mailto:debasishbarai.developer@gmail.com" 
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    debasishbarai.developer@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-300">
                  We'll get back to you as soon as possible. Thank you for your interest in our AI Image Generator!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 