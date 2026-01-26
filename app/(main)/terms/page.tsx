import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Pets Friendz Logo"
            width={50}
            height={50}
          />
          <span className="text-2xl text-black font-bold font-slab">Pets Friendz</span>
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/blog" className="text-lg text-black hover:text-gray-600 transition-colors">
            Blog
          </Link>
          <Link href="/login" className="text-lg text-black hover:text-gray-600 transition-colors">
            Login
          </Link>
          <Link
            href="/waitlist"
            className="bg-black text-white px-6 py-2.5 rounded text-base flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            Build your page
            <span className="text-lg">→</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <h1 className="text-5xl font-bold text-black mb-4 font-slab">Terms of Service</h1>
          <p className="text-gray-500 mb-12 font-flex">Last Updated: December 8, 2024</p>

          <div className="prose prose-lg max-w-none font-flex text-gray-700 space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">Welcome to Pets Friendz!</h2>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Pets Friendz (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), including our website, services, and platform. By accessing or using Pets Friendz, you agree to be bound by these Terms and our Privacy Policy.
              </p>
              <p className="mt-4">
                <strong>If you do not agree to these Terms, do not use our services.</strong>
              </p>
              <p className="mt-4">
                <strong>Contact:</strong> <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a><br />
                <strong>Location:</strong> New York, NY, United States
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">1. Acceptance of Terms</h2>
              <p>By creating an account, accessing our website, or using our services, you acknowledge that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>You have read and understood these Terms</li>
                <li>You agree to be bound by these Terms and our Privacy Policy</li>
                <li>You are at least 18 years of age</li>
                <li>You are legally capable of entering into binding contracts</li>
              </ul>
              <p className="mt-4">
                We may update these Terms at any time. We will notify you of significant changes via email or by posting a notice on our website at least 30 days before the changes take effect. Your continued use of Pets Friendz after changes are posted constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">2. Description of Service</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">2.1 What We Provide</h3>
              <p>Pets Friendz is an online platform that allows pet sitters and pet care providers (&ldquo;Sitters&rdquo;) to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Create professional profile pages showcasing their services</li>
                <li>Share their profile via custom URLs and QR codes</li>
                <li>Receive booking and meet & greet requests from potential clients via email</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">2.2 What We Are NOT</h3>
              <p><strong>Pets Friendz is a platform only.</strong> We are NOT:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>A pet sitting or pet care service provider</li>
                <li>An employer or agency for pet sitters</li>
                <li>Responsible for the quality, safety, or legality of services provided by Sitters</li>
                <li>A party to any agreements between Sitters and clients</li>
                <li>Responsible for verifying the identity, credentials, or background of Sitters</li>
              </ul>
              <p className="mt-4">
                <strong>Pets Friendz does not employ, recommend, endorse, or guarantee any Sitter listed on our platform.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">3. Eligibility</h2>
              <p>To use Pets Friendz, you must:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Be at least <strong>18 years of age</strong></li>
                <li>Be located in the <strong>United States</strong></li>
                <li>Provide accurate and truthful information</li>
                <li>Have the legal authority to enter into these Terms</li>
                <li>Not be prohibited from using our services under applicable law</li>
              </ul>
              <p className="mt-4">
                By using our services, you represent and warrant that you meet these eligibility requirements.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">4. Account Registration and Security</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">4.1 Account Creation</h3>
              <p>To create a profile as a Sitter, you must:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Create only <strong>one account per person or business</strong></li>
                <li>Not impersonate any person or entity</li>
                <li>Not create an account on behalf of someone else without authorization</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">4.2 Account Security</h3>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Maintaining the confidentiality of your password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access or security breach</li>
                <li>Ensuring your account is not used by anyone else</li>
              </ul>
              <p className="mt-4">
                <strong>We are not liable for any loss or damage arising from your failure to protect your account credentials.</strong>
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">4.3 Account Termination</h3>
              <p>
                <strong>You may terminate your account at any time</strong> by emailing <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a> with &ldquo;Delete My Account&rdquo; in the subject line. Upon termination:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Your account and profile will be deleted within 30 days</li>
                <li>You will receive email confirmation of deletion</li>
                <li>All data will be permanently removed per our Privacy Policy</li>
              </ul>
              <p className="mt-4">
                <strong>We may suspend or terminate your account at any time, with or without notice, if:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>You violate these Terms</li>
                <li>You engage in fraudulent, abusive, or illegal activity</li>
                <li>Your account has been inactive for 6+ months (after email warning)</li>
                <li>We determine, in our sole discretion, that termination is necessary</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">5. User Content and Conduct</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">5.1 Your Content</h3>
              <p>You retain ownership of all content you create and upload to Pets Friendz, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Profile photos and images</li>
                <li>Business descriptions and service information</li>
                <li>Text, pricing, and other profile details (&ldquo;Your Content&rdquo;)</li>
              </ul>
              <p className="mt-4">
                <strong>By uploading Your Content, you grant Pets Friendz a worldwide, non-exclusive, royalty-free license to:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Display Your Content on your profile page</li>
                <li>Store and process Your Content to provide our services</li>
                <li>Use Your Content in our marketing materials, website, and promotional content</li>
                <li>Modify or reformat Your Content for display purposes</li>
              </ul>
              <p className="mt-4">
                This license continues until you delete your account or remove the specific content.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">5.2 Content You Cannot Upload</h3>
              <p>You agree NOT to upload or post content that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Is false, misleading, or fraudulent</li>
                <li>Infringes on any intellectual property rights</li>
                <li>Contains personal information of others without consent</li>
                <li>Is illegal, harmful, threatening, abusive, or harassing</li>
                <li>Contains viruses, malware, or harmful code</li>
                <li>Violates any applicable laws or regulations</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">5.3 Acceptable Use Policy</h3>
              <p>You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provide false, inaccurate, or misleading information about yourself or your services</li>
                <li>Post fake reviews, testimonials, or endorsements</li>
                <li>Engage in spam or unsolicited marketing</li>
                <li>Harass, threaten, or discriminate against any person</li>
                <li>Offer or promote illegal services</li>
                <li>Use the platform to compete with or create a similar service to Pets Friendz</li>
                <li>Use automated tools (bots, scrapers, etc.) to access our platform</li>
                <li>Impersonate any person or entity</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">5.4 Content Standards</h3>
              <p>You are allowed to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Link to external websites and social media profiles</li>
                <li>Include your contact information on your profile</li>
                <li>Advertise services beyond pet sitting (e.g., dog grooming, pet training)</li>
                <li>Share your profile URL and QR code for commercial purposes</li>
              </ul>
              <p className="mt-4">
                <strong>However, we reserve the right to remove any content that violates these Terms or is otherwise inappropriate.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">6. Intellectual Property</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">6.1 Pets Friendz Intellectual Property</h3>
              <p>All rights, title, and interest in Pets Friendz, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>The Pets Friendz name, logo, and branding</li>
                <li>Website design, layout, and functionality</li>
                <li>Software, code, and algorithms</li>
                <li>All other intellectual property</li>
              </ul>
              <p className="mt-4">
                are owned by Pets Friendz and protected by copyright, trademark, and other laws.
              </p>
              <p className="mt-4">
                <strong>You may not:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Copy, modify, or create derivative works of our platform</li>
                <li>Remove, alter, or obscure any copyright or trademark notices</li>
                <li>Use our branding without written permission</li>
                <li>Reverse engineer or attempt to extract our source code</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">6.2 User-Generated Content Rights</h3>
              <p>You represent and warrant that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>You own or have the rights to all content you upload</li>
                <li>Your content does not infringe on any third-party rights</li>
                <li>You have obtained all necessary permissions, licenses, and consents</li>
              </ul>
              <p className="mt-4">
                <strong>If you upload content you do not have rights to, you may be liable for infringement.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">7. Booking Requests and Transactions</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">7.1 Booking Process</h3>
              <p>When a potential client submits a booking request through your profile:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>The request is sent directly to your email address</li>
                <li>You are responsible for responding to and coordinating with the client</li>
                <li>All agreements, payments, and services occur directly between you and the client</li>
                <li>Pets Friendz is not a party to any transaction or agreement</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">7.2 Sitter-Client Relationship</h3>
              <p><strong>Pets Friendz does not:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Facilitate or process payments between Sitters and clients</li>
                <li>Provide contracts or agreements between Sitters and clients</li>
                <li>Mediate disputes between Sitters and clients</li>
                <li>Guarantee the quality, safety, or legality of any services</li>
                <li>Verify information provided by Sitters or clients</li>
              </ul>
              <p className="mt-4">
                <strong>You are solely responsible for:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Screening potential clients and pets</li>
                <li>Negotiating pricing and terms</li>
                <li>Ensuring you have appropriate insurance and licenses</li>
                <li>Complying with all applicable laws and regulations</li>
                <li>Resolving disputes with clients</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">7.3 Insurance and Licensing</h3>
              <p><strong>We strongly recommend that all Sitters:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Obtain appropriate liability insurance</li>
                <li>Comply with local business licensing requirements</li>
                <li>Verify their legal ability to provide pet care services</li>
              </ul>
              <p className="mt-4">
                <strong>Pets Friendz does not require, verify, or provide insurance or licensing for Sitters.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">8. Disclaimers and Limitation of Liability</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">8.1 Service &ldquo;As-Is&rdquo;</h3>
              <p>
                <strong>PETSFRIENDZ IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the service will be uninterrupted, secure, or error-free</li>
                <li>Warranties regarding the accuracy or reliability of any information</li>
              </ul>
              <p className="mt-4">
                <strong>We do not guarantee:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Uptime or availability of our platform</li>
                <li>That our services will be free from bugs or errors</li>
                <li>That your data will not be lost or corrupted</li>
                <li>That the platform will meet your specific needs</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">8.2 No Background Checks or Verification</h3>
              <p><strong>Pets Friendz does NOT:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Conduct background checks on Sitters</li>
                <li>Verify credentials, licenses, or insurance</li>
                <li>Verify the accuracy of profile information</li>
                <li>Monitor or supervise services provided by Sitters</li>
              </ul>
              <p className="mt-4">
                <strong>ALL USERS AND VISITORS ARE RESPONSIBLE FOR CONDUCTING THEIR OWN DUE DILIGENCE.</strong>
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">8.3 Limitation of Liability</h3>
              <p>
                <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, PETSFRIENDZ SHALL NOT BE LIABLE FOR:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Any indirect, incidental, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Personal injury, property damage, or death</li>
                <li>Quality of services provided by Sitters</li>
                <li>Disputes between Sitters and clients</li>
                <li>Lost, injured, or deceased pets</li>
                <li>Any damages arising from your use or inability to use our services</li>
              </ul>
              <p className="mt-4">
                <strong>OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM THESE TERMS SHALL NOT EXCEED $100.</strong>
              </p>
              <p className="mt-4">
                Some jurisdictions do not allow limitations on liability, so some of these limitations may not apply to you.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">8.4 User Responsibility</h3>
              <p><strong>YOU ACKNOWLEDGE AND AGREE THAT:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>You use Pets Friendz at your own risk</li>
                <li>You are solely responsible for your interactions with other users</li>
                <li>Pets Friendz is not liable for the conduct of any user</li>
                <li>You should exercise caution and common sense when using our platform</li>
                <li>You are responsible for verifying the qualifications and trustworthiness of any Sitter</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">9. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Pets Friendz, its officers, directors, employees, and agents from any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Your use of our services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another person or entity</li>
                <li>Your provision of pet care services</li>
                <li>Any content you upload or post</li>
                <li>Any disputes between you and clients or other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">10. Fees and Payment</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">10.1 Current Pricing</h3>
              <p>
                <strong>Pets Friendz is currently free to use.</strong> There are no fees to create an account, build a profile, or receive booking requests.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">10.2 Future Fees</h3>
              <p>We reserve the right to introduce fees, subscription plans, or transaction charges in the future. If we do:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>We will provide at least <strong>30 days&apos; advance notice</strong> via email</li>
                <li>You will have the opportunity to accept the new fees or terminate your account</li>
                <li>Continued use after the notice period constitutes acceptance of the new fees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">11. Third-Party Services</h2>
              <p>Pets Friendz uses third-party services for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Image storage and management</li>
                <li>Email delivery</li>
                <li>Website hosting</li>
                <li>QR code generation</li>
                <li>Analytics</li>
              </ul>
              <p className="mt-4">
                <strong>We are not responsible for:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>The availability or performance of third-party services</li>
                <li>Any damages or losses resulting from third-party service failures</li>
                <li>The privacy practices or terms of third-party services</li>
              </ul>
              <p className="mt-4">
                You are responsible for complying with the terms of any third-party services you use in connection with Pets Friendz.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">12. Dispute Resolution</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">12.1 Informal Resolution</h3>
              <p>
                Before filing a claim, you agree to contact us at <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a> to attempt to resolve the dispute informally. We will work with you in good faith to reach a resolution.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">12.2 Binding Arbitration</h3>
              <p>
                <strong>If we cannot resolve a dispute informally, you agree that any dispute arising from these Terms or your use of Pets Friendz shall be resolved through binding arbitration, rather than in court.</strong>
              </p>
              <p className="mt-4">
                Arbitration will be conducted by a neutral arbitrator in accordance with the American Arbitration Association (AAA) rules. The arbitration will take place in New York, NY, or remotely via video conference.
              </p>
              <p className="mt-4">
                <strong>By agreeing to arbitration, you waive your right to:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Have disputes heard by a judge or jury</li>
                <li>Participate in a class action lawsuit</li>
              </ul>
              <p className="mt-4">
                <strong>Small claims court exception:</strong> You may bring claims in small claims court if they qualify.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">12.3 Governing Law and Jurisdiction</h3>
              <p>
                These Terms are governed by the laws of the <strong>State of New York</strong>, without regard to conflict of law principles.
              </p>
              <p className="mt-4">
                If arbitration is not applicable or is deemed unenforceable, you agree that any legal action must be brought exclusively in the state or federal courts located in <strong>New York, NY</strong>, and you consent to the jurisdiction of those courts.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">13. Inactive Accounts</h2>
              <p>If your account is inactive for <strong>6 months or more</strong>, we may:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Send a warning email to your registered email address</li>
                <li>Delete your account and associated data if you do not respond within 30 days</li>
              </ul>
              <p className="mt-4">
                You can prevent deletion by logging in or contacting us at <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">14. Miscellaneous</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">14.1 Entire Agreement</h3>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Pets Friendz and supersede any prior agreements.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">14.2 Severability</h3>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">14.3 No Waiver</h3>
              <p>
                Our failure to enforce any provision of these Terms does not constitute a waiver of that provision.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">14.4 Assignment</h3>
              <p>
                You may not assign or transfer these Terms or your account without our written consent. We may assign these Terms to any successor or affiliate.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">14.5 Communications</h3>
              <p>By using Pets Friendz, you consent to receive:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Service-related emails (booking notifications, account updates, security alerts)</li>
                <li>Administrative communications about changes to our Terms or Privacy Policy</li>
              </ul>
              <p className="mt-4">
                You may opt out of marketing emails, but you cannot opt out of essential service communications.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">14.6 Force Majeure</h3>
              <p>
                We are not liable for any failure to perform due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, labor disputes, or internet outages.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">14.7 Survival</h3>
              <p>
                Sections of these Terms that by their nature should survive termination (including liability disclaimers, indemnification, dispute resolution, and intellectual property provisions) will survive termination of your account or these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">15. Contact Us</h2>
              <p>If you have questions about these Terms, please contact us:</p>
              <p className="mt-4">
                <strong>Email:</strong> <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a><br />
                <strong>Response Time:</strong> We will respond within 5-7 business days.
              </p>
              <p className="mt-6">
                <strong>By using Pets Friendz, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
