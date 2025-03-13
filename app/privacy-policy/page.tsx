'use client';

import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow">
          <nav className="mb-8">
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              &larr; Back to Home
            </Link>
          </nav>
          
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="mb-4 text-gray-300">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-100">1. Introduction</h2>
            <p className="text-gray-300">
              Welcome to our AI Image Generator. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you about how we look after your personal data when you visit our website
              and tell you about your privacy rights and how the law protects you.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-100">2. Data We Collect</h2>
            <p className="text-gray-300">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Identity Data: includes first name, last name, username or similar identifier</li>
              <li>Contact Data: includes email address</li>
              <li>Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform</li>
              <li>Usage Data: includes information about how you use our website and services</li>
              <li>Content Data: includes images you generate and prompts you provide</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-100">3. How We Use Your Data</h2>
            <p className="text-gray-300">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-100">4. Data Retention</h2>
            <p className="text-gray-300">
              We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for,
              including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-100">5. Your Rights</h2>
            <p className="text-gray-300">
              Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-100">6. Changes to This Privacy Policy</h2>
            <p className="text-gray-300">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-100">7. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                Contact Page
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 