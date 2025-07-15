import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="max-w-2xl mx-auto mt-20 px-4 pb-20" style={{ paddingTop: '90px' }}>
        <h1 className="text-3xl font-bold mb-6 text-black">Cookies Policy</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">1. Introduction</h2>
          <p className="text-gray-700 text-base">
            This Cookies Policy explains how Gridrr uses cookies and similar technologies to recognize you when you visit our website. By using Gridrr, you agree to our use of cookies as described in this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">2. What Are Cookies?</h2>
          <p className="text-gray-700 text-base">
            Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve your experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">3. How We Use Cookies</h2>
          <ul className="list-disc pl-6 text-gray-700 text-base">
            <li>To remember your preferences and settings.</li>
            <li>To keep you logged in and maintain your session.</li>
            <li>To analyze site traffic and usage for improvement.</li>
            <li>To provide personalized content and features.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">4. Types of Cookies We Use</h2>
          <ul className="list-disc pl-6 text-gray-700 text-base">
            <li><b>Essential Cookies:</b> Necessary for the website to function and cannot be switched off.</li>
            <li><b>Performance Cookies:</b> Help us understand how visitors interact with the site.</li>
            <li><b>Functionality Cookies:</b> Remember your preferences and choices.</li>
            <li><b>Targeting/Advertising Cookies:</b> Used to deliver relevant ads and track ad performance (if applicable).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">5. Managing Cookies</h2>
          <p className="text-gray-700 text-base">
            You can control and delete cookies through your browser settings. Please note that disabling cookies may affect your experience on Gridrr.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">6. Changes to This Policy</h2>
          <p className="text-gray-700 text-base">
            We may update this Cookies Policy from time to time. We will notify you of significant changes by posting a notice on our site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">7. Contact Us</h2>
          <p className="text-gray-700 text-base">
            If you have questions or concerns about our use of cookies, please contact us at <a href="mailto:privacy@gridrr.com" className="text-blue-600 underline">privacy@gridrr.com</a>.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CookiesPage; 