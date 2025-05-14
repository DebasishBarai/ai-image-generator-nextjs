'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Zap, Shield, Code } from 'lucide-react';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              AI Image Generator
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your ideas into stunning visuals with our state-of-the-art AI image generation platform.
              Create unique, high-quality images in seconds.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
            <p className="text-gray-300">Experience the power of AI-driven image generation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-blue-400" />,
                title: "Lightning Fast",
                description: "Generate high-quality images in seconds with our optimized AI models"
              },
              {
                icon: <Shield className="w-8 h-8 text-green-400" />,
                title: "Secure & Private",
                description: "Your data and creations are protected with enterprise-grade security"
              },
              {
                icon: <Code className="w-8 h-8 text-purple-400" />,
                title: "Advanced API",
                description: "Integrate our powerful image generation capabilities into your applications"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-700/50 p-6 rounded-lg hover:transform hover:-translate-y-1 transition-transform"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Create Amazing Images?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using our platform to bring their ideas to life.
            </p>
            <Link
              href="/auth/signup"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Sign Up Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}