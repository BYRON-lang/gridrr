import React from 'react';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const AdsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Ads on Gridrr | Creative Platform</title>
        <meta name="description" content="Information about advertising on Gridrr. Learn how ads support our creative community and upcoming features for advertisers." />
        <link rel="canonical" href="https://gridrr.com/ads" />
      </Helmet>
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="max-w-2xl mx-auto pt-40 pl-[50px] pr-8">
        <h1 className="mb-4 text-black" style={{ fontSize: '32px', fontWeight: 300 }}>Ads on Gridrr</h1>
        <p className="text-lg text-gray-700 mb-4">
          We are excited to announce that Gridrr will soon be introducing ads to support our platform and community. However, before we launch this feature, we are in the process of applying for the necessary documents and approvals to ensure we can collect funds from users in a secure and compliant manner.
        </p>
        <p className="text-lg text-gray-700">
          Stay tuned for updates! We are committed to transparency and will share more information as soon as we are ready to launch ads on Gridrr.
        </p>
      </div>
    </div>
  );
};

export default AdsPage; 