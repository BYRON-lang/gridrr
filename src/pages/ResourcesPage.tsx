import React from 'react';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';

const ResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Resources | Gridrr Creative Platform</title>
        <meta name="description" content="Explore resources, guides, and tools for designers and creators on Gridrr. Find tips, best practices, and community guidelines." />
        <link rel="canonical" href="https://gridrr.com/resources" />
      </Helmet>
      <Header />
      <div className="max-w-2xl mx-auto pt-40 pl-[50px] pr-8">
        <h1 className="mb-4 text-black" style={{ fontSize: '32px', fontWeight: 300 }}>Resources</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to the Gridrr Resources page! Here you'll find helpful guides, articles, and tools to support your creative journey. More resources coming soon.
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
          <li><b>Getting Started Guide:</b> <span className="text-gray-600">Learn how to make the most of Gridrr. (Coming soon)</span></li>
          <li><b>Design Inspiration Tips:</b> <span className="text-gray-600">Best practices for finding and sharing creative work. (Coming soon)</span></li>
          <li><b>Community Guidelines:</b> <span className="text-gray-600">How to participate and collaborate respectfully. (Coming soon)</span></li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default ResourcesPage; 