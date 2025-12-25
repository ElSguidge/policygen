'use client';

import { useState } from 'react';
import { PolicyForm } from '@/components/policy-form';
import { TermsForm } from '@/components/terms-form';
import { CookieForm } from '@/components/cookie-form';
import { EulaForm } from '@/components/eula-form';
import { RefundForm } from '@/components/refund-form';
import { DisclaimerForm } from '@/components/disclaimer-form';
import { PolicyOutput } from '@/components/policy-output';
import { PolicyFormData } from '@/lib/types';
import { generatePrivacyPolicy } from '@/lib/generate-policy';
import { TermsOfServiceData, generateTermsOfService } from '@/lib/generators/terms-of-service';
import { CookiePolicyData, generateCookiePolicy } from '@/lib/generators/cookie-policy';
import { EulaData, generateEula } from '@/lib/generators/eula';
import { RefundPolicyData, generateRefundPolicy } from '@/lib/generators/refund-policy';
import { DisclaimerData, generateDisclaimer } from '@/lib/generators/disclaimer';

type DocumentType = 'privacy' | 'terms' | 'cookie' | 'eula' | 'refund' | 'disclaimer' | null;

const documentTypes = [
  {
    id: 'privacy' as const,
    title: 'Privacy Policy',
    description: 'GDPR, CCPA & CalOPPA compliant privacy policies for websites and applications.',
    icon: ShieldIcon,
  },
  {
    id: 'terms' as const,
    title: 'Terms of Service',
    description: 'Comprehensive terms and conditions to protect your business and users.',
    icon: DocumentIcon,
  },
  {
    id: 'cookie' as const,
    title: 'Cookie Policy',
    description: 'Cookie consent policies compliant with GDPR, PECR and ePrivacy regulations.',
    icon: CookieIcon,
  },
  {
    id: 'eula' as const,
    title: 'EULA',
    description: 'End-user license agreements for software, apps and digital products.',
    icon: CodeIcon,
  },
  {
    id: 'refund' as const,
    title: 'Refund Policy',
    description: 'Clear return and refund policies for e-commerce and subscription services.',
    icon: RefundIcon,
  },
  {
    id: 'disclaimer' as const,
    title: 'Disclaimer',
    description: 'Liability disclaimers for content, advice and professional services.',
    icon: AlertIcon,
  },
];

export default function Home() {
  const [selectedType, setSelectedType] = useState<DocumentType>(null);
  const [generatedPolicy, setGeneratedPolicy] = useState<string | null>(null);

  const handleGeneratePrivacy = (data: PolicyFormData) => {
    const policy = generatePrivacyPolicy(data);
    setGeneratedPolicy(policy);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateTerms = (data: TermsOfServiceData) => {
    const terms = generateTermsOfService(data);
    setGeneratedPolicy(terms);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateCookie = (data: CookiePolicyData) => {
    const cookie = generateCookiePolicy(data);
    setGeneratedPolicy(cookie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateEula = (data: EulaData) => {
    const eula = generateEula(data);
    setGeneratedPolicy(eula);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateRefund = (data: RefundPolicyData) => {
    const refund = generateRefundPolicy(data);
    setGeneratedPolicy(refund);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateDisclaimer = (data: DisclaimerData) => {
    const disclaimer = generateDisclaimer(data);
    setGeneratedPolicy(disclaimer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setGeneratedPolicy(null);
  };

  const handleBack = () => {
    setSelectedType(null);
    setGeneratedPolicy(null);
  };

  const getDocumentTitle = () => {
    switch (selectedType) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Service';
      case 'cookie': return 'Cookie Policy';
      case 'eula': return 'End-User License Agreement';
      case 'refund': return 'Refund Policy';
      case 'disclaimer': return 'Disclaimer';
      default: return '';
    }
  };

  const getDocumentDescription = () => {
    switch (selectedType) {
      case 'privacy': return 'Generate a comprehensive privacy policy that complies with GDPR, CCPA, CalOPPA and other major privacy regulations.';
      case 'terms': return 'Create professional terms of service tailored to your website, application or online service.';
      case 'cookie': return 'Build a GDPR and PECR compliant cookie policy with detailed consent management provisions.';
      case 'eula': return 'Generate a robust end-user license agreement for your software or digital product.';
      case 'refund': return 'Create a clear, comprehensive refund and return policy for your products or services.';
      case 'disclaimer': return 'Generate appropriate disclaimers to protect your business from liability.';
      default: return '';
    }
  };

  // Show document type selector
  if (!selectedType) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight">PolicyGen</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
              <a href="#documents" className="hover:text-gray-900 transition-colors">Documents</a>
              <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
              <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 mb-8">
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
              <span>Trusted by 10,000+ businesses worldwide</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Professional Legal Documents<br className="hidden md:block" /> for Your Business
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Generate legally compliant privacy policies, terms of service, and other essential documents in minutes. No legal expertise required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#documents"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Started Free
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Compliance Bar */}
        <section className="py-8 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <span className="text-sm text-gray-500 font-medium">Compliant with:</span>
              {['GDPR', 'CCPA', 'CalOPPA', 'COPPA', 'VCDPA', 'PECR', 'HIPAA'].map((badge) => (
                <span key={badge} className="text-sm font-medium text-gray-700">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Grid */}
        <section id="documents" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
                Choose Your Document
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select the type of legal document you need. Our guided wizard will help you create a customized, professionally formatted document.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTypes.map((doc) => {
                const Icon = doc.icon;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedType(doc.id)}
                    className="group text-left p-8 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gray-900 transition-colors">
                      <Icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{doc.description}</p>
                    <div className="mt-5 flex items-center text-sm font-medium text-gray-900">
                      <span>Generate now</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
                Why Choose PolicyGen
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Built for businesses that need professional legal documents without the legal fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                  <ClockIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready in Minutes</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our step-by-step wizard guides you through the process. Generate complete documents in under 5 minutes.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-5">
                  <ScaleIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Legally Comprehensive</h3>
                <p className="text-gray-600 leading-relaxed">
                  Documents cover all major privacy regulations including GDPR, CCPA, CalOPPA, COPPA, and more.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-200">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-5">
                  <DownloadIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Formats</h3>
                <p className="text-gray-600 leading-relaxed">
                  Download your documents as HTML, Markdown, or plain text. Easy to integrate into any website or app.
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">100%</div>
                <div className="text-sm text-gray-600">Free to Use</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">0</div>
                <div className="text-sm text-gray-600">Signup Required</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">6</div>
                <div className="text-sm text-gray-600">Document Types</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">7+</div>
                <div className="text-sm text-gray-600">Regulations Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about our legal document generator.
              </p>
            </div>

            <div className="space-y-6">
              <FAQItem
                question="Are these documents legally binding?"
                answer="Yes, the documents generated by PolicyGen are professionally drafted templates that cover standard legal requirements. They are designed to be legally enforceable when properly implemented. However, we recommend having a qualified attorney review documents for complex business situations or specific jurisdictional requirements."
              />
              <FAQItem
                question="Which privacy regulations are covered?"
                answer="Our Privacy Policy generator covers GDPR (European Union), CCPA/CPRA (California), CalOPPA (California), VCDPA (Virginia), CPA (Colorado), CTDPA (Connecticut), UCPA (Utah), COPPA (children's privacy), and HIPAA considerations. Each document is customized based on your specific selections."
              />
              <FAQItem
                question="Is this service really free?"
                answer="Yes, PolicyGen is completely free to use. There are no hidden fees, no signup required, and no limitations on the number of documents you can generate. We believe every business should have access to proper legal documentation."
              />
              <FAQItem
                question="Can I customize the generated documents?"
                answer="Absolutely. All documents are generated in editable formats (HTML, Markdown, and plain text). You can download and modify them to suit your specific business needs. The generated documents serve as comprehensive starting points."
              />
              <FAQItem
                question="How often should I update my legal documents?"
                answer="We recommend reviewing your legal documents at least annually, or whenever you make significant changes to your business practices, data collection methods, or when new regulations come into effect. Our generator makes it easy to create updated versions."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gray-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
              Ready to Protect Your Business?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Generate your first legal document in minutes. No signup, no credit card, no commitment.
            </p>
            <a
              href="#documents"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Now
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold">PolicyGen</span>
              </div>
              <p className="text-sm text-gray-500 text-center md:text-right">
                Documents are provided as templates for informational purposes.<br className="hidden md:block" />
                Consult a qualified attorney for specific legal requirements.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Show the generator for selected type
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-semibold">PolicyGen</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {!generatedPolicy ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
                {getDocumentTitle()} Generator
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {getDocumentDescription()}
              </p>
            </div>

            {selectedType === 'privacy' && <PolicyForm onGenerate={handleGeneratePrivacy} />}
            {selectedType === 'terms' && <TermsForm onGenerate={handleGenerateTerms} />}
            {selectedType === 'cookie' && <CookieForm onGenerate={handleGenerateCookie} />}
            {selectedType === 'eula' && <EulaForm onGenerate={handleGenerateEula} />}
            {selectedType === 'refund' && <RefundForm onGenerate={handleGenerateRefund} />}
            {selectedType === 'disclaimer' && <DisclaimerForm onGenerate={handleGenerateDisclaimer} />}
          </>
        ) : (
          <PolicyOutput policy={generatedPolicy} onReset={handleReset} />
        )}
      </main>

      <footer className="py-8 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            This document is provided as a template for informational purposes only.
            Consult a qualified attorney for specific legal requirements.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Icon Components
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="14,2 14,8 20,8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CookieIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8" cy="9" r="1" fill="currentColor"/>
      <circle cx="15" cy="8" r="1" fill="currentColor"/>
      <circle cx="10" cy="14" r="1" fill="currentColor"/>
      <circle cx="16" cy="14" r="1" fill="currentColor"/>
      <circle cx="12" cy="11" r="1" fill="currentColor"/>
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16,18 22,12 16,6" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="8,6 2,12 8,18" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RefundIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23,4 23,10 17,10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="12,5 19,12 12,19" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="22,4 12,14.01 9,11.01" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 21h10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 3v18" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="7,10 12,15 17,10" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6,9 12,15 18,9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 bg-white">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
