import React from 'react';
import Header from '../components/Header';
import { Helmet } from 'react-helmet-async';

const values = [
  {
    title: 'We are all owners',
    desc: 'At Gridrr, everyone takes initiative and responsibility. We believe in empowering each team member to make impactful decisions, drive innovation, and help shape the future of our platform. Ownership means you care deeply about our mission and your work.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80', // Team collaborating in office
  },
  {
    title: 'Help users succeed',
    desc: 'Our community is at the heart of everything we do. We listen to our users, build meaningful solutions, and deliver exceptional results. Helping users succeed means going the extra mile to solve problems and create value for creatives everywhere.',
    img: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80', // Team helping each other
  },
  {
    title: 'Take action, deliver results',
    desc: 'We are proactive, results-driven, and always striving to improve. We set ambitious goals, measure our impact, and celebrate progress. Taking action means being relentless in pursuit of excellence and learning from every challenge.',
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80', // Team working at table
  },
  {
    title: 'Bring good vibes',
    desc: 'We foster a positive, inclusive, and supportive environment. Good vibes mean building trust, celebrating wins, and lifting each other up. We believe that kindness, respect, and authentic relationships are the foundation of great teamwork.',
    img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80', // Happy team in office
  },
];

const perks = [
  'Work from anywhere (remote-friendly)',
  'Flexible time off and holidays',
  'Learning & development budget',
  'Modern tools and tech',
  'Supportive, inclusive team culture',
  'Opportunities to make a real impact',
];

const stackDetails = [
  'Node.js and Express.js for backend services and APIs',
  'PostgreSQL for database management',
  'Firebase for authentication and file storage',
  'React and TypeScript for frontend development',
  'React Query for data fetching and state management',
  'Tailwind CSS for styling and responsive design',
  'CI/CD pipelines and cloud deployment (AWS, GCP, or Azure)',
  'Docker and containerization for DevOps',
];

const positions = [
  {
    title: 'Social Media Marketer',
    description: 'Drive our brand presence and engagement across platforms.',
    requirements: [
      'Proven experience in social media marketing and content creation',
      'Strong understanding of Instagram, Twitter, Facebook, and LinkedIn',
      'Ability to create engaging posts, campaigns, and analyze metrics',
      'Excellent written and verbal communication skills',
      'Creative mindset and passion for design/creative communities',
      'Familiarity with design tools (e.g., Canva, Figma) is a plus',
    ],
  },
  {
    title: 'Backend Developer',
    description: 'Build and scale our platform’s core services and APIs.',
    requirements: [
      'Strong experience with Node.js and Express.js',
      'Experience with PostgreSQL and writing efficient SQL queries',
      'Familiarity with Firebase (Authentication, Storage, etc.)',
      'Understanding of authentication, authorization, and security best practices',
      'Experience with cloud deployment, CI/CD, and Docker',
      'Must be comfortable working with our stack: Node.js, Express.js, PostgreSQL, Firebase, and deployment pipelines',
    ],
  },
  {
    title: 'Frontend Developer',
    description: 'Craft beautiful, responsive user experiences for Gridrr.',
    requirements: [
      'Strong experience with React and TypeScript',
      'Familiarity with React Query for data fetching',
      'Experience with Tailwind CSS and modern UI/UX principles',
      'Understanding of responsive design and accessibility',
      'Experience with Figma or similar design tools is a plus',
      'Must be comfortable working with our stack: React, TypeScript, React Query, Tailwind CSS, and Firebase',
    ],
  },
  {
    title: 'DevOps Engineer',
    description: 'Ensure smooth deployment, monitoring, and scaling of our platform.',
    requirements: [
      'Experience with CI/CD pipelines and automation',
      'Familiarity with cloud platforms (AWS, GCP, or Azure)',
      'Knowledge of Docker and container orchestration',
      'Experience with monitoring, logging, and alerting tools',
      'Ability to collaborate with backend/frontend teams for seamless releases',
      'Security and performance optimization mindset',
      'Must be comfortable with our infrastructure: Node.js, Express.js, PostgreSQL, Firebase, React, and cloud deployment',
    ],
  },
];

const CareersPage: React.FC = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Helmet>
      <title>Careers at Gridrr | Join Our Creative Team</title>
      <meta name="description" content="Explore career opportunities at Gridrr. Join our mission to empower creatives and help shape the future of design and innovation." />
      <link rel="canonical" href="https://gridrr.com/careers" />
    </Helmet>
    <Header />
    <div className="max-w-7xl mx-auto pt-40 pb-20 px-4">
      {/* Mission & Welcome */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Join us in helping bring the world’s creative ideas to life</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Our mission is to support creatives at every stage—learning, showcasing, and connecting. We’re building a platform that helps designers and creators level up their careers.
      </p>
      {/* Culture & Values - Horizontal with Office Images */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">Our Culture & Values</h2>
        <div className="flex flex-col gap-16">
          {values.map((v, idx) => (
            <div key={v.title} className={`flex flex-col-reverse md:flex-row items-center md:items-center gap-8 md:gap-12 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <div className="flex-1 w-full">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-left">{v.title}</h3>
                <p className="text-gray-600 text-lg text-left max-w-xl">{v.desc}</p>
              </div>
              <img src={v.img} alt={v.title} className="w-full max-w-[800px] h-64 md:w-[800px] md:h-80 object-cover rounded-xl shadow" />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center text-gray-700 text-base">
          We’re committed to diversity, inclusion, and supporting everyone to do their best work—wherever they are.
        </div>
      </div>
      {/* Perks & Benefits */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Perks & Benefits</h2>
        <ul className="list-disc pl-6 text-blue-900 text-base space-y-1">
          {perks.map((perk, idx) => <li key={idx}>{perk}</li>)}
        </ul>
      </div>
      {/* Tech Stack */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Our Tech Stack & Infrastructure</h2>
        <ul className="list-disc pl-6 text-blue-900 text-base space-y-1">
          {stackDetails.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      {/* Open Positions - Vertical */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Open Positions</h2>
        <div className="flex flex-col gap-8">
          {positions.map((pos) => (
            <div key={pos.title} className="bg-white p-6 rounded-lg border border-gray-200 w-full">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{pos.title}</h3>
              <p className="text-gray-600 mb-3">{pos.description}</p>
              <ul className="list-disc pl-5 text-gray-700 mb-3 space-y-1">
                {pos.requirements.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded text-xs font-semibold">1 Position</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-lg">
          To apply, send your CV to <a href="mailto:careers@gridrr.com" className="text-blue-600 underline">careers@gridrr.com</a>
        </div>
      </div>
    </div>
  </div>
);

export default CareersPage; 