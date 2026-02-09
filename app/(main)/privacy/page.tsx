import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/footer'

export default function PrivacyPage() {
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
            href="/signup"
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
          <h1 className="text-5xl font-bold text-black mb-4 font-slab">Privacy Policy</h1>
          <p className="text-gray-500 mb-12 font-flex">Last Updated: December 8, 2024</p>

          <div className="prose prose-lg max-w-none font-flex text-gray-700 space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">Introduction</h2>
              <p>
                Welcome to Petsfriendz (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
              <p className="mt-4">
                <strong>Contact Information:</strong><br />
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a>.
              </p>
              <br />
              <p>
                <strong>Business Location:</strong> New York, NY
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">1. Information We Collect</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">1.1 Information from Pet Sitters (Account Holders)</h3>
              <p>When you create an account and profile, we collect:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Uploaded photos</li>
                <li>Any other information you choose to include on your profile</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">1.2 Information from Clients (Booking Form Submissions)</h3>
              <p>When potential clients submit booking or meet & greet requests through your profile page, we collect:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Name</li>
                <li>Phone number</li>
                <li>Any other information included in form submissions</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">1.3 Automatically Collected Information</h3>
              <p>When you visit our website, we automatically collect:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages viewed and time spent on pages</li>
                <li>Referring website</li>
                <li>Date and time of visits</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">1.4 Cookies and Tracking Technologies</h3>
              <p>We use cookies and similar tracking technologies to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Keep you logged into your account</li>
                <li>Remember your preferences</li>
                <li>Analyze how our service is used</li>
                <li>Improve our website functionality</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings, but disabling cookies may limit your ability to use certain features.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Create and display profile pages</strong> for pet sitters</li>
                <li><strong>Process and deliver booking requests</strong> via email to pet sitters</li>
                <li><strong>Send notifications</strong> about bookings, account activity, and service updates</li>
                <li><strong>Provide customer support</strong> and respond to inquiries</li>
                <li><strong>Improve our services</strong> through analytics and user feedback</li>
                <li><strong>Communicate with you</strong> about new features, updates, or promotional offers (you can opt out at any time)</li>
                <li><strong>Ensure security</strong> and prevent fraud or abuse</li>
                <li><strong>Comply with legal obligations</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">3. How We Share Your Information</h2>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">3.1 Public Information</h3>
              <p>When you create a profile as a pet sitter, the following information is publicly visible on your profile page:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Name or business name</li>
                <li>Profile photo</li>
                <li>Service area(s)</li>
                <li>Services offered and pricing</li>
                <li>About me / bio</li>
                <li>Portfolio photos</li>
              </ul>
              <p className="mt-4">
                <strong>Your email address and phone number are NOT displayed publicly.</strong> Clients can only contact you by submitting a booking form, which is sent directly to your email.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">3.2 Information Shared with Service Providers</h3>
              <p>We share information with trusted third-party service providers who help us operate our platform:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Supabase</strong> - Database and user authentication</li>
                <li><strong>Vercel</strong> - Website hosting</li>
                <li><strong>Bytescale</strong> - Image storage and management</li>
                <li><strong>Resend / Google Workspace</strong> - Email delivery services</li>
              </ul>
              <p className="mt-4">
                These service providers are contractually obligated to protect your information and only use it to provide services to us.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">3.3 Legal Requirements</h3>
              <p>We may disclose your information if required by law, court order, or government request, or if we believe disclosure is necessary to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Comply with legal obligations</li>
                <li>Protect our rights or property</li>
                <li>Prevent fraud or illegal activity</li>
                <li>Protect the safety of our users or the public</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">3.4 Business Transfers</h3>
              <p>
                If Petsfriendz is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">3.5 With Your Consent</h3>
              <p>
                We will not share your information with third parties for marketing purposes without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">4. Your Rights and Choices</h2>
              <p>You have the following rights regarding your personal information:</p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">4.1 Access and Update</h3>
              <p>
                You can access and update your profile information at any time by logging into your account and editing your profile.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">4.2 Delete Your Account</h3>
              <p>You have the right to delete your account and all associated data. To request account deletion:</p>
              <ol className="list-decimal pl-6 space-y-2 mt-4">
                <li>Email <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a> with &ldquo;Delete My Account&rdquo; in the subject line</li>
                <li>Include your account email address</li>
                <li>We will process your request within 30 days and confirm deletion via email</li>
              </ol>
              <p className="mt-4">When you delete your account, we will permanently delete:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Your profile information</li>
                <li>Your photos</li>
                <li>Your account credentials</li>
                <li>Booking requests associated with your profile</li>
              </ul>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">4.3 Export Your Data</h3>
              <p>
                You have the right to receive a copy of your personal data. To request a data export, email <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a> with &ldquo;Export My Data&rdquo; in the subject line. We will provide your data in a portable format within 30 days.
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">4.4 Opt Out of Marketing</h3>
              <p>You can opt out of promotional emails at any time by:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Clicking the &ldquo;unsubscribe&rdquo; link at the bottom of any marketing email</li>
                <li>Emailing <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a> with &ldquo;Unsubscribe&rdquo; in the subject line</li>
              </ul>
              <p className="mt-4">
                <strong>Note:</strong> You will still receive important account-related emails (e.g., booking notifications, security alerts).
              </p>

              <h3 className="text-xl font-bold text-black mb-2 mt-6">4.5 California and European Residents</h3>
              <p>If you are a California resident (under CCPA) or European resident (under GDPR), you have additional rights:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Right to know what personal data we collect and how we use it</li>
                <li>Right to request deletion of your personal data</li>
                <li>Right to opt out of the &ldquo;sale&rdquo; of personal data (note: we do not sell your data)</li>
                <li>Right to non-discrimination for exercising your privacy rights</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">5. Data Security</h2>
              <p>We take reasonable measures to protect your information from unauthorized access, loss, misuse, or alteration, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Encrypted connections (HTTPS)</li>
                <li>Secure database storage with encryption at rest</li>
                <li>Password hashing and secure authentication</li>
                <li>Limited employee access to personal data</li>
                <li>Regular security updates and monitoring</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">6. Data Retention</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Active Accounts:</strong> We retain your information for as long as your account is active or as needed to provide services.</li>
                <li><strong>Deleted Accounts:</strong> When you delete your account, we permanently delete your data within 30 days.</li>
                <li><strong>Booking Requests:</strong> We retain booking form submissions for as long as the associated pet sitter account is active.</li>
                <li><strong>Legal Retention:</strong> We may retain certain information as required by law or for legitimate business purposes (e.g., fraud prevention, legal disputes).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">7. Children&apos;s Privacy</h2>
              <p>
                Petsfriendz is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If you are under 18, please do not use our services or provide any information to us.
              </p>
              <p className="mt-4">
                If we learn that we have collected information from a child under 18, we will delete it immediately. If you believe we have collected information from a child, please contact us at <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information to them.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">9. International Users</h2>
              <p>
                Petsfriendz is based in the United States. If you are accessing our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States, where data protection laws may differ from those in your country.
              </p>
              <p className="mt-4">
                By using our services, you consent to the transfer of your information to the United States.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">10. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make changes, we will:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Update the &ldquo;Last Updated&rdquo; date at the top of this policy</li>
                <li>Notify you via email if the changes are significant</li>
                <li>Post a notice on our website</li>
              </ul>
              <p className="mt-4">
                Your continued use of our services after changes are posted constitutes your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-black mb-4 font-slab">11. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> <a href="mailto:admin@petsfriendz.com">admin@petsfriendz.com</a><br />
                <strong>Response Time:</strong> We will respond to your inquiry within 30 days.
              </p>
              <p className="mt-6">
                <strong>By using Pets Friendz, you acknowledge that you have read and understood this Privacy Policy.</strong>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
