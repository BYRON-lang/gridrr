import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="max-w-2xl mx-auto mt-20 px-4 pb-20" style={{ paddingTop: '90px' }}>
        <h1 className="text-3xl font-bold mb-6 text-black">Terms & Conditions</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">1. Acceptance of Terms</h2>
          <p className="text-gray-700 text-base">
            By accessing or using Gridrr, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">2. User Responsibilities</h2>
          <ul className="list-disc pl-6 text-gray-700 text-base">
            <li>You must provide accurate and complete information when creating an account.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You are responsible for all activities that occur under your account.</li>
            <li>You agree to comply with all applicable laws and regulations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">3. Intellectual Property</h2>
          <ul className="list-disc pl-6 text-gray-700 text-base">
            <li>All content on Gridrr, including designs, images, text, and logos, is owned by Gridrr or its users and is protected by copyright and other intellectual property laws.</li>
            <li>You retain ownership of content you upload, but you grant Gridrr a license to display and share it on the platform.</li>
            <li>You may use, copy, or republish posts from Gridrr only when you have obtained explicit permission from the content owner. Otherwise, you may not use, copy, or distribute content from Gridrr without such permission.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">4. Prohibited Activities</h2>
          <ul className="list-disc pl-6 text-gray-700 text-base">
            <li>Do not upload unlawful, harmful, or infringing content.</li>
            <li>Do not harass, abuse, or harm other users.</li>
            <li>Do not attempt to gain unauthorized access to Gridrr or its systems.</li>
            <li>Do not use Gridrr for any illegal or unauthorized purpose.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">5. Account Termination</h2>
          <p className="text-gray-700 text-base">
            We reserve the right to suspend or terminate your account at our discretion, with or without notice, for violation of these terms or for any other reason.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">6. Disclaimers</h2>
          <p className="text-gray-700 text-base">
            Gridrr is provided "as is" and "as available." We make no warranties regarding the platform's availability, accuracy, or reliability. Use Gridrr at your own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">7. Limitation of Liability</h2>
          <p className="text-gray-700 text-base">
            To the fullest extent permitted by law, Gridrr and its affiliates are not liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">8. Governing Law</h2>
          <p className="text-gray-700 text-base">
            These terms are governed by the laws of your jurisdiction. Any disputes will be resolved in the courts of that jurisdiction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">9. Changes to Terms</h2>
          <p className="text-gray-700 text-base">
            We may update these terms from time to time. We will notify you of significant changes by posting a notice on our site or contacting you directly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">10. Contact Us</h2>
          <p className="text-gray-700 text-base">
            If you have questions or concerns about these terms, please contact us at <a href="mailto:privacy@gridrr.com" className="text-blue-600 underline">privacy@gridrr.com</a>.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage; 