import React from 'react';
import Header from '../components/Header';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="max-w-2xl mx-auto mt-20 px-4 pb-20" style={{ paddingTop: '90px' }}>
        <h1 className="text-3xl font-bold mb-6 text-black">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">1. Introduction</h2>
          <p className="text-gray-700 text-base">
            Your privacy is important to us. This Privacy Policy explains how Gridrr collects, uses, shares, and protects your information when you use our platform. By using Gridrr, you agree to this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">2. Information We Collect</h2>
          <ul className="list-disc pl-6 text-gray-700 text-base">
            <li>
              <b>Account Information:</b> Name, email address, password, and profile details you provide when registering.
            </li>
            <li>
              <b>Content:</b> Designs, images, comments, and other content you upload or share.
            </li>
            <li>
              <b>Usage Data:</b> Pages visited, features used, interactions, device and browser information, IP address, and cookies.
            </li>
            <li>
              <b>Communications:</b> Messages, support requests, and feedback you send us.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">3. How We Use Information</h2>
          <ul className="list-disc pl-6 text-gray-700 text-base">
            <li>To provide, maintain, and improve our services and features.</li>
            <li>To personalize your experience and show relevant content.</li>
            <li>To communicate with you about your account, updates, and marketing (you may opt out).</li>
            <li>To monitor and protect the security and integrity of our platform.</li>
            <li>To comply with legal obligations and enforce our policies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">4. Information Sharing</h2>
          <ul className="list-disc pl-6 text-gray-700 text-base">
            <li>
              <b>Public Content:</b> Content you post (such as designs, comments, or profile info) may be visible to other users and the public.
            </li>
            <li>
              <b>Service Providers:</b> We may share information with trusted third parties who help us operate our platform (e.g., hosting, analytics, email delivery).
            </li>
            <li>
              <b>Legal Requirements:</b> We may disclose information if required by law, regulation, legal process, or governmental request.
            </li>
            <li>
              <b>Business Transfers:</b> If Gridrr is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">5. Cookies & Tracking</h2>
          <p className="text-gray-700 text-base">
            We use cookies and similar technologies to recognize you, remember your preferences, and analyze site traffic. You can control cookies through your browser settings, but disabling them may affect your experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">6. Data Security</h2>
          <p className="text-gray-700 text-base">
            We implement reasonable security measures to protect your information. However, no method of transmission or storage is 100% secure. Please use strong passwords and protect your account credentials.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">7. User Rights</h2>
          <ul className="list-disc pl-6 text-gray-700 text-base">
            <li>You may access, update, or delete your personal information in your account settings.</li>
            <li>You may request a copy of your data or ask us to delete your account by contacting us.</li>
            <li>You may opt out of marketing emails at any time by using the unsubscribe link or contacting us.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">8. Children’s Privacy</h2>
          <p className="text-gray-700 text-base">
            Our services are not intended for children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with information, please contact us for removal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">9. Changes to This Policy</h2>
          <p className="text-gray-700 text-base">
            We may update this privacy policy from time to time. We will notify you of significant changes by posting a notice on our site or contacting you directly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-black">10. Contact Us</h2>
          <p className="text-gray-700 text-base">
            If you have questions, concerns, or requests regarding your privacy or this policy, please contact us at <a href="mailto:privacy@gridrr.com" className="text-blue-600 underline">privacy@gridrr.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage; 