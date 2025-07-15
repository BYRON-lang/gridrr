import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const headingClass = "mb-4 text-black";
const headingStyle = { fontSize: '32px', fontWeight: 300 };

const sections = [
  { id: 'about', label: 'About Gridrr', content: (
    <>
      <h1 className={headingClass} style={headingStyle}>About Gridrr</h1>
      <p className="text-lg text-gray-700">
        Gridrr is a platform built for designers, creators, and innovators to discover, share, and be inspired by world-class creative work. We connect creative minds, foster inspiration, and make great design accessible to everyone. Whether you want to showcase your portfolio, find new ideas, or connect with other creatives, Gridrr is your gateway to a vibrant design community.
      </p>
    </>
  ) },
  { id: 'why', label: 'Why We Exist', content: (
    <>
      <h2 className={headingClass} style={headingStyle}>Why We Exist</h2>
      <p className="text-lg text-gray-700 mb-4">
        Gridrr was born out of a desire to break down the barriers that often separate creative people. We saw that designers and creators needed a space where they could not only showcase their work, but also find genuine inspiration, connect with like-minded individuals, and grow together as a community.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Too often, creative talent goes unnoticed, and great ideas are lost in the noise. We built Gridrr to solve this problem—to provide a platform where every creative voice can be heard, where inspiration is easy to find, and where collaboration is encouraged.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Our vision is to create a global hub for creativity, where designers, developers, and innovators can share their work, learn from each other, and push the boundaries of what’s possible. We believe that by bringing people together, we can spark new ideas, foster growth, and make the world a more creative place.
      </p>
      <p className="text-lg text-gray-700">
        Gridrr exists to empower you—to help you find inspiration, connect with others, and turn your creative dreams into reality.
      </p>
    </>
  ) },
  { id: 'offer', label: 'What We Offer', content: (
    <>
      <h2 className={headingClass} style={headingStyle}>What We Offer</h2>
      <ul className="list-disc pl-6 text-lg text-gray-700 mb-4 space-y-4">
        <li>
          <b>Inspiration Gallery:</b> <br/>
          Explore a handpicked, ever-growing collection of world-class designs, creative projects, and innovative ideas from designers and creators around the globe. Our gallery is curated to spark your imagination, help you discover new trends, and provide fresh perspectives for your own work. Whether you’re looking for UI/UX, branding, illustration, or product design, Gridrr’s gallery is your go-to source for inspiration.
        </li>
        <li>
          <b>Showcase Your Work:</b> <br/>
          Upload your own designs, build a beautiful portfolio, and share your creative journey with a supportive community. Gridrr makes it easy to present your work in the best light, attract feedback, and gain recognition from peers and potential clients. Your portfolio is more than just a collection—it’s your creative story.
        </li>
        <li>
          <b>Community & Collaboration:</b> <br/>
          Connect with other creatives, exchange feedback, and collaborate on projects to grow your skills and network. Our platform is built around community—ask questions, join discussions, and find collaborators for your next big idea. At Gridrr, you’re never creating alone.
        </li>
        <li>
          <b>Personalized Discovery:</b> <br/>
          Find inspiration tailored to your interests, with smart filters, trending topics, and personalized recommendations. Gridrr learns what you love and helps you discover content that matches your style and goals, making every visit rewarding and relevant.
        </li>
        <li>
          <b>Learning & Growth:</b> <br/>
          Access a growing library of resources, tips, and insights to help you improve your craft and stay ahead in the creative world. From expert articles to tutorials and case studies, Gridrr supports your journey of continuous learning and professional development.
        </li>
        <li>
          <b>Events & Challenges:</b> <br/>
          Participate in design challenges, community events, and creative competitions to showcase your talent, win recognition, and push your skills to new heights. Gridrr’s events are designed to motivate, connect, and celebrate the creative spirit in everyone.
        </li>
      </ul>
      <p className="text-lg text-gray-700">Gridrr is more than just a platform—it's a creative ecosystem designed to help you thrive, whether you're a seasoned designer or just starting your journey. Every feature is built with your growth, inspiration, and success in mind.</p>
    </>
  ) },
  { id: 'stand', label: 'What We Stand For', content: (
    <>
      <h2 className={headingClass} style={headingStyle}>What We Stand For</h2>
      <ul className="list-disc pl-6 text-lg text-gray-700 mb-4 space-y-2">
        <li><b>Creativity:</b> We believe in the power of original ideas and encourage everyone to express their unique vision.</li>
        <li><b>Community:</b> We foster a supportive, inclusive environment where everyone can learn, share, and grow together.</li>
        <li><b>Collaboration:</b> We value teamwork and believe that great things happen when creative minds come together.</li>
        <li><b>Inspiration:</b> We strive to make inspiration accessible to all, helping users discover new ideas and push boundaries.</li>
        <li><b>Integrity:</b> We are committed to honesty, transparency, and respect in all our interactions.</li>
        <li><b>Growth:</b> We support continuous learning and personal development for every member of our community.</li>
      </ul>
      <p className="text-lg text-gray-700">At Gridrr, our values guide everything we do. We are dedicated to building a platform that uplifts, inspires, and empowers creative people everywhere.</p>
    </>
  ) },
  { id: 'ahead', label: 'Looking Ahead', content: (
    <>
      <h2 className={headingClass} style={headingStyle}>Looking Ahead</h2>
      <p className="text-lg text-gray-700 mb-4">
        At Gridrr, we’re always looking to the future. Our commitment is to continually improve the platform, introduce new features, and respond to the needs of our creative community.
      </p>
      <ul className="list-disc pl-6 text-lg text-gray-700 mb-4 space-y-2">
        <li>Expanding our inspiration gallery with more diverse and global content.</li>
        <li>Launching new tools for collaboration and creative feedback.</li>
        <li>Introducing advanced discovery and personalization features.</li>
        <li>Hosting more events, challenges, and learning opportunities for our users.</li>
        <li>Building partnerships with creative organizations and industry leaders.</li>
      </ul>
      <p className="text-lg text-gray-700">
        We believe the best is yet to come. Thank you for being part of the Gridrr journey—together, we’ll shape the future of creative inspiration.
      </p>
    </>
  ) },
  { id: 'team', label: 'Who Built It', content: (
    <>
      <h2 className={headingClass} style={headingStyle}>Who Built It</h2>
      <p className="text-lg text-gray-700 mb-4">
        <b>Founding Team</b><br/>
        Gridrr began as a passion project by Byron Pfukwa (Founder & CEO) and Byron Kennedy Pfukwa (Lead Developer), who envisioned a platform to empower and connect creative minds. They dedicated countless hours—often late at night and on weekends—crafting the foundation of Gridrr. Byron focused on the vision, product direction, and community, while Kennedy ensured the platform was robust, scalable, and technically sound.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        As Gridrr's vision grew, Devon Nill (Product Developer) joined the founding team, bringing expertise in building user-focused features and helping shape the product experience. Tamary Gutu (Community Manager) soon followed, nurturing the Gridrr community and ensuring that every user felt welcome and inspired.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Together, the founding team laid the groundwork for Gridrr to become a vibrant hub for designers, creators, and innovators worldwide.
      </p>
      <h3 className="text-xl font-light mb-2 mt-6 text-black">Meet the Team</h3>
      <ul className="text-lg text-gray-700 mb-4 space-y-2">
        <li><span className="font-semibold">Byron Pfukwa</span> – Founder & CEO<br/><span className="text-base text-gray-500">Drives Gridrr's vision, product strategy, and community growth.</span></li>
        <li><span className="font-semibold">Byron Kennedy Pfukwa</span> – Lead Developer<br/><span className="text-base text-gray-500">Ensures the platform is stable, scalable, and technically robust.</span></li>
        <li><span className="font-semibold">Devon Nill</span> – Product Developer<br/><span className="text-base text-gray-500">Builds and optimizes user-focused features and experiences.</span></li>
        <li><span className="font-semibold">Tamary Gutu</span> – Community Manager<br/><span className="text-base text-gray-500">Fosters a welcoming, inspiring community for all users.</span></li>
      </ul>
      <p className="text-gray-700 mb-2">Beyond the core team, Gridrr is shaped by the contributions of many creative minds—contributors, advisors, and community members—who help make Gridrr a valuable resource for designers and creators everywhere.</p>
      <p className="text-gray-700 mt-2">Want to join us or collaborate? Email us at <a href="mailto:info@gridrr.com" className="text-blue-600 underline">info@gridrr.com</a>.</p>
    </>
  ) },
  // Add more sections here as needed
];

const AboutPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Gridrr | Creative Community & Platform</title>
        <meta name="description" content="Learn about Gridrr, the creative platform for designers, creators, and innovators. Discover our mission, vision, and the team behind the world's leading design community." />
        <link rel="canonical" href="https://gridrr.com/about" />
      </Helmet>
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <Sidebar setActiveSection={setActiveSection} />
      <div className="max-w-2xl mx-auto pt-40 pl-[50px] pr-8">
        {sections.map(section => (
          section.id === activeSection && (
            <section key={section.id} className="mb-12">
              {section.content}
            </section>
          )
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage; 