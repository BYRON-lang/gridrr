import React, { useState } from 'react';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const faqs = [
  {
    question: 'How do I reset my password?',
    answer: 'Click on the “Forgot password?” link on the login page and follow the instructions sent to your email.'
  },
  {
    question: 'How can I contact the Gridrr team?',
    answer: 'You can use the support form below or email us at support@gridrr.com.'
  },
  {
    question: 'How do I report a bug or issue?',
    answer: 'Please describe the issue in the support form below, and our team will get back to you as soon as possible.'
  },
  {
    question: 'Where can I find more information about using Gridrr?',
    answer: 'Check out our Resources page for guides, tips, and more.'
  },
];

const SupportPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        <title>Support | Gridrr Creative Platform</title>
        <meta name="description" content="Need help with Gridrr? Contact our support team, browse FAQs, and get assistance for your creative journey on Gridrr." />
        <link rel="canonical" href="https://gridrr.com/support" />
      </Helmet>
      <Header />
      <div className="max-w-2xl mx-auto pt-40 pb-20 px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Support</h1>
        <p className="text-lg text-gray-700 mb-10 text-center">
          Need help? We’re here for you. Browse our FAQs or reach out using the form below and our team will get back to you as soon as possible.
        </p>
        {/* Contact Form */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Contact Us</h2>
          {submitted ? (
            <div className="text-green-700 text-lg font-semibold">Thank you for reaching out! We’ll get back to you soon.</div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
              <textarea
                name="message"
                placeholder="How can we help you?"
                value={form.message}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[120px]"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold rounded px-6 py-2 mt-2 hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{faq.question}</h3>
                <p className="text-gray-600 text-base">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 