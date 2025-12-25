export interface TermsOfServiceData {
  // Company Info
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  contactAddress: string;
  country: string;
  state: string;

  // Service Type
  serviceType: 'website' | 'saas' | 'ecommerce' | 'marketplace' | 'mobile_app';
  serviceName: string;
  serviceDescription: string;

  // User Requirements
  minimumAge: number;
  requiresAccount: boolean;
  allowsUserContent: boolean;

  // Business Model
  hasFreeTier: boolean;
  hasPaidServices: boolean;
  hasSubscriptions: boolean;
  acceptsPayments: boolean;
  currency: string;

  // Policies
  allowsRefunds: boolean;
  refundPeriodDays: number;
  autoRenewal: boolean;
  freeTrialDays: number;

  // Legal
  governingLaw: string;
  disputeResolution: 'arbitration' | 'litigation' | 'mediation_first';
  arbitrationProvider: string;
  classActionWaiver: boolean;
  limitLiability: boolean;
  liabilityCapType: 'fees_paid' | 'fixed_amount' | 'none';
  liabilityCapAmount: number;

  // Content & IP
  ownsUserContent: boolean;
  grantsLicense: boolean;
  dmcaCompliant: boolean;

  // Additional
  effectiveDate: string;
  allowsApiAccess: boolean;
  hasAffiliate: boolean;
}

export const defaultTermsData: TermsOfServiceData = {
  companyName: '',
  websiteUrl: '',
  contactEmail: '',
  contactAddress: '',
  country: 'United States',
  state: 'Delaware',

  serviceType: 'website',
  serviceName: '',
  serviceDescription: '',

  minimumAge: 18,
  requiresAccount: true,
  allowsUserContent: false,

  hasFreeTier: true,
  hasPaidServices: false,
  hasSubscriptions: false,
  acceptsPayments: false,
  currency: 'USD',

  allowsRefunds: true,
  refundPeriodDays: 30,
  autoRenewal: true,
  freeTrialDays: 0,

  governingLaw: 'Delaware',
  disputeResolution: 'arbitration',
  arbitrationProvider: 'American Arbitration Association',
  classActionWaiver: true,
  limitLiability: true,
  liabilityCapType: 'fees_paid',
  liabilityCapAmount: 100,

  ownsUserContent: false,
  grantsLicense: true,
  dmcaCompliant: true,

  effectiveDate: new Date().toISOString().split('T')[0],
  allowsApiAccess: false,
  hasAffiliate: false,
};

export function generateTermsOfService(data: TermsOfServiceData): string {
  const {
    companyName,
    websiteUrl,
    contactEmail,
    contactAddress,
    serviceType,
    serviceName,
    serviceDescription,
    minimumAge,
    requiresAccount,
    allowsUserContent,
    hasFreeTier,
    hasPaidServices,
    hasSubscriptions,
    acceptsPayments,
    currency,
    allowsRefunds,
    refundPeriodDays,
    autoRenewal,
    freeTrialDays,
    governingLaw,
    disputeResolution,
    arbitrationProvider,
    classActionWaiver,
    limitLiability,
    liabilityCapType,
    liabilityCapAmount,
    ownsUserContent,
    grantsLicense,
    dmcaCompliant,
    effectiveDate,
    allowsApiAccess,
    hasAffiliate,
  } = data;

  const formattedDate = new Date(effectiveDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const displayServiceName = serviceName || companyName;
  const serviceTypeLabel = {
    website: 'website',
    saas: 'software-as-a-service platform',
    ecommerce: 'e-commerce platform',
    marketplace: 'marketplace platform',
    mobile_app: 'mobile application',
  }[serviceType];

  let terms = `# Terms of Service

**Last Updated:** ${formattedDate}

**Effective Date:** ${formattedDate}

---

## 1. Agreement to Terms

These Terms of Service ("Terms") constitute a legally binding agreement between you ("you," "your," or "User") and ${companyName} ("Company," "we," "us," or "our") governing your access to and use of ${websiteUrl} and the ${displayServiceName} ${serviceTypeLabel}${serviceDescription ? ` (${serviceDescription})` : ''}, including any content, functionality, and services offered (collectively, the "Service").

**PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE SERVICE.**

By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Service.

We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of the Service after such modifications constitutes your acceptance of the revised Terms.

---

## 2. Eligibility

### 2.1 Age Requirement

You must be at least ${minimumAge} years old to use the Service. By using the Service, you represent and warrant that you are at least ${minimumAge} years of age. If you are under ${minimumAge}, you may not use the Service under any circumstances.

${minimumAge < 18 ? `If you are between ${minimumAge} and 18 years old, you represent that you have reviewed these Terms with your parent or legal guardian, and they have agreed to these Terms on your behalf.\n\n` : ''}

### 2.2 Legal Capacity

By using the Service, you represent and warrant that you have the legal capacity to enter into a binding agreement in your jurisdiction.

### 2.3 Compliance with Laws

You agree to use the Service only for lawful purposes and in accordance with these Terms and all applicable local, state, national, and international laws and regulations.

`;

  if (requiresAccount) {
    terms += `---

## 3. Account Registration and Security

### 3.1 Account Creation

To access certain features of the Service, you may be required to create an account. When you create an account, you agree to:

- Provide accurate, current, and complete information
- Maintain and promptly update your account information
- Keep your password confidential and secure
- Notify us immediately of any unauthorized access to your account
- Accept responsibility for all activities that occur under your account

### 3.2 Account Security

You are solely responsible for maintaining the confidentiality of your account credentials and for any activities or actions under your account. We are not liable for any loss or damage arising from your failure to protect your account credentials.

### 3.3 Account Termination

We reserve the right to suspend or terminate your account at any time, with or without notice, for any reason, including but not limited to:

- Violation of these Terms
- Fraudulent, abusive, or illegal activity
- Conduct harmful to other users or the Service
- Extended periods of inactivity
- Request by law enforcement or government agencies

You may terminate your account at any time by contacting us at ${contactEmail}.

`;
  }

  terms += `---

## ${requiresAccount ? '4' : '3'}. Acceptable Use Policy

### ${requiresAccount ? '4' : '3'}.1 Prohibited Activities

You agree NOT to use the Service to:

**Illegal or Harmful Activities:**
- Violate any applicable law, regulation, or third-party rights
- Engage in fraud, deception, or misrepresentation
- Promote or facilitate illegal activities
- Harass, abuse, threaten, or intimidate others
- Distribute malware, viruses, or harmful code

**Content Violations:**
- Post, upload, or transmit content that is unlawful, defamatory, obscene, pornographic, or offensive
- Infringe upon intellectual property rights of others
- Impersonate any person or entity
- Collect or harvest personal information without consent

**Technical Violations:**
- Attempt to gain unauthorized access to the Service or related systems
- Interfere with or disrupt the Service or servers
- Use automated systems (bots, scrapers, crawlers) without permission
- Circumvent any security or access controls
- Reverse engineer, decompile, or disassemble the Service
${allowsApiAccess ? '- Exceed rate limits or abuse API access\n' : ''}
**Commercial Violations:**
- Use the Service for unauthorized commercial purposes
- Resell or redistribute the Service without permission
- Engage in competitive intelligence gathering

### ${requiresAccount ? '4' : '3'}.2 Enforcement

We reserve the right to:
- Remove any content that violates these Terms
- Suspend or terminate accounts for violations
- Report illegal activities to law enforcement
- Take legal action against violators

`;

  if (allowsUserContent) {
    terms += `---

## ${requiresAccount ? '5' : '4'}. User-Generated Content

### ${requiresAccount ? '5' : '4'}.1 Your Content

The Service may allow you to post, submit, upload, or otherwise make available content, including but not limited to text, images, videos, and other materials ("User Content").

You retain ownership of your User Content. However, by submitting User Content to the Service, you grant ${companyName}:

${ownsUserContent ? `
**Full Assignment:** You hereby assign to ${companyName} all rights, title, and interest in and to your User Content.
` : `
**License Grant:** A ${grantsLicense ? 'worldwide, non-exclusive, royalty-free, sublicensable, and transferable' : 'limited'} license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display your User Content in connection with operating and providing the Service.
`}

### ${requiresAccount ? '5' : '4'}.2 Content Standards

You represent and warrant that your User Content:
- Is accurate and not misleading
- Does not violate any law or regulation
- Does not infringe any third-party rights
- Does not contain viruses or harmful code
- Does not violate these Terms

### ${requiresAccount ? '5' : '4'}.3 Content Moderation

We have the right, but not the obligation, to monitor, edit, or remove User Content at our sole discretion. We are not responsible for User Content posted by users.

### ${requiresAccount ? '5' : '4'}.4 Content Removal

You may delete your User Content at any time. However, we may retain copies for:
- Legal compliance
- Backup and recovery purposes
- Cached or archived versions

`;
  }

  if (acceptsPayments || hasPaidServices || hasSubscriptions) {
    const paymentSection = requiresAccount ? (allowsUserContent ? '6' : '5') : (allowsUserContent ? '5' : '4');

    terms += `---

## ${paymentSection}. Payments and Billing

### ${paymentSection}.1 Fees and Pricing

${hasFreeTier ? 'The Service offers both free and paid features. ' : ''}${hasPaidServices ? `By purchasing paid features or services, you agree to pay all applicable fees as described on our pricing page.` : ''}

- All fees are quoted in ${currency}
- Prices are subject to change with reasonable notice
- Taxes may apply based on your location

### ${paymentSection}.2 Payment Methods

We accept payment through our authorized payment processors. By providing payment information, you:
- Authorize us to charge your selected payment method
- Represent that you are authorized to use that payment method
- Agree to keep your payment information current

### ${paymentSection}.3 Billing

${hasSubscriptions ? `
**Subscription Billing:** Subscriptions are billed ${autoRenewal ? 'automatically on a recurring basis' : 'for each billing period'} until cancelled.

${autoRenewal ? `**Auto-Renewal:** Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date. You can cancel auto-renewal at any time through your account settings or by contacting us.` : ''}

${freeTrialDays > 0 ? `**Free Trial:** New users may be eligible for a ${freeTrialDays}-day free trial. After the trial period, you will be charged the applicable subscription fee unless you cancel before the trial ends.` : ''}
` : ''}

### ${paymentSection}.4 Refunds

${allowsRefunds ? `
We offer refunds under the following conditions:

- Refund requests must be made within ${refundPeriodDays} days of purchase
- Refunds are processed to the original payment method
- Refunds may take 5-10 business days to appear

To request a refund, contact us at ${contactEmail} with your order details.

**Non-Refundable Items:**
- Partially used subscription periods (unless required by law)
- Services already rendered
- Customized or personalized items
` : `
All sales are final. We do not offer refunds except where required by applicable law.
`}

### ${paymentSection}.5 Failed Payments

If a payment fails, we may:
- Retry the payment
- Suspend your access to paid features
- Terminate your account after multiple failures

`;
  }

  const ipSection = (() => {
    let section = requiresAccount ? 4 : 3;
    if (allowsUserContent) section++;
    if (acceptsPayments || hasPaidServices || hasSubscriptions) section++;
    return section;
  })();

  terms += `---

## ${ipSection}. Intellectual Property Rights

### ${ipSection}.1 Our Intellectual Property

The Service and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, audio, design, selection, and arrangement) are owned by ${companyName}, its licensors, or other providers and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws.

### ${ipSection}.2 Trademarks

The ${companyName} name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of ${companyName} or its affiliates. You may not use such marks without our prior written permission.

### ${ipSection}.3 Limited License to Use

Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal, non-commercial use${hasPaidServices ? ' (or commercial use if you have purchased a commercial license)' : ''}.

This license does not include:
- Modification or copying of materials
- Use for commercial purposes (unless authorized)
- Reverse engineering or decompilation
- Removal of copyright or proprietary notices
- Transfer to another person or "mirroring" on any other server

`;

  if (dmcaCompliant) {
    terms += `### ${ipSection}.4 DMCA Notice and Procedure

We respect the intellectual property rights of others. If you believe that any content on the Service infringes your copyright, please submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information:

1. A physical or electronic signature of the copyright owner or authorized agent
2. Identification of the copyrighted work claimed to be infringed
3. Identification of the infringing material and its location on the Service
4. Your contact information (address, telephone number, email)
5. A statement that you have a good faith belief that the use is not authorized
6. A statement, under penalty of perjury, that the information is accurate and you are authorized to act on behalf of the copyright owner

**DMCA Agent Contact:**
Email: ${contactEmail}
${contactAddress ? `Address: ${contactAddress}` : ''}

`;
  }

  const disclaimerSection = ipSection + 1;

  terms += `---

## ${disclaimerSection}. Disclaimers

### ${disclaimerSection}.1 "AS IS" and "AS AVAILABLE"

THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.

### ${disclaimerSection}.2 No Warranty

${companyName.toUpperCase()}, ITS SUBSIDIARIES, AFFILIATES, AND LICENSORS DO NOT WARRANT THAT:

- THE SERVICE WILL FUNCTION UNINTERRUPTED, SECURE, OR ERROR-FREE
- THE RESULTS OBTAINED FROM THE SERVICE WILL BE ACCURATE OR RELIABLE
- THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL OBTAINED THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS
- ANY ERRORS IN THE SERVICE WILL BE CORRECTED

### ${disclaimerSection}.3 Third-Party Content

The Service may contain links to third-party websites, content, or services. We do not control and are not responsible for third-party content. Your use of third-party services is at your own risk.

`;

  const liabilitySection = disclaimerSection + 1;

  if (limitLiability) {
    terms += `---

## ${liabilitySection}. Limitation of Liability

### ${liabilitySection}.1 Limitation of Damages

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ${companyName.toUpperCase()}, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:

- LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES
- DAMAGES RESULTING FROM UNAUTHORIZED ACCESS TO OR USE OF OUR SERVERS
- DAMAGES RESULTING FROM INTERRUPTION OR CESSATION OF TRANSMISSION
- DAMAGES RESULTING FROM BUGS, VIRUSES, OR SIMILAR HARMFUL CODE
- DAMAGES RESULTING FROM ANY CONTENT OR CONDUCT OF ANY THIRD PARTY

### ${liabilitySection}.2 Cap on Liability

${liabilityCapType === 'fees_paid' ? `
TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRIOR TO THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100).
` : liabilityCapType === 'fixed_amount' ? `
TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED ${currency === 'USD' ? '$' : ''}${liabilityCapAmount.toLocaleString()} ${currency}.
` : `
TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
`}

### ${liabilitySection}.3 Exceptions

THE LIMITATIONS IN THIS SECTION DO NOT AFFECT LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW, INCLUDING LIABILITY FOR:
- DEATH OR PERSONAL INJURY CAUSED BY NEGLIGENCE
- FRAUD OR FRAUDULENT MISREPRESENTATION
- ANY OTHER LIABILITY THAT CANNOT BE EXCLUDED BY LAW

`;
  }

  const indemnitySection = limitLiability ? liabilitySection + 1 : disclaimerSection + 1;

  terms += `---

## ${indemnitySection}. Indemnification

You agree to defend, indemnify, and hold harmless ${companyName}, its officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:

- Your violation of these Terms
- Your use of the Service
- Your violation of any third-party rights
- ${allowsUserContent ? 'Your User Content\n- ' : ''}Any activity under your account

`;

  const disputeSection = indemnitySection + 1;

  terms += `---

## ${disputeSection}. Dispute Resolution

### ${disputeSection}.1 Governing Law

These Terms shall be governed by and construed in accordance with the laws of the State of ${governingLaw}, United States, without regard to its conflict of law provisions.

### ${disputeSection}.2 ${disputeResolution === 'arbitration' ? 'Binding Arbitration' : disputeResolution === 'mediation_first' ? 'Mediation and Arbitration' : 'Litigation'}

${disputeResolution === 'arbitration' ? `
**PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.**

Any dispute, controversy, or claim arising out of or relating to these Terms or the Service shall be resolved by binding arbitration administered by the ${arbitrationProvider} in accordance with its Commercial Arbitration Rules.

- The arbitration shall be conducted in ${governingLaw}
- The arbitrator's award shall be final and binding
- Judgment on the award may be entered in any court of competent jurisdiction
- Each party shall bear its own costs and expenses

**YOU UNDERSTAND AND AGREE THAT BY ENTERING INTO THESE TERMS, YOU AND ${companyName.toUpperCase()} ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY.**
` : disputeResolution === 'mediation_first' ? `
Any dispute arising out of or relating to these Terms shall first be submitted to non-binding mediation. If mediation is unsuccessful, the dispute shall be resolved by binding arbitration administered by the ${arbitrationProvider}.
` : `
Any dispute arising out of or relating to these Terms shall be resolved exclusively in the state and federal courts located in ${governingLaw}. You consent to the personal jurisdiction and venue of such courts.
`}

${classActionWaiver ? `
### ${disputeSection}.3 Class Action Waiver

YOU AND ${companyName.toUpperCase()} AGREE THAT ANY PROCEEDINGS TO RESOLVE DISPUTES WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.

If for any reason a claim proceeds in court rather than in arbitration, both parties waive any right to a jury trial.
` : ''}

### ${disputeSection}.${classActionWaiver ? '4' : '3'} Time Limitation

Any cause of action or claim you may have arising out of or relating to these Terms or the Service must be commenced within one (1) year after the cause of action accrues. Otherwise, such cause of action or claim is permanently barred.

`;

  const terminationSection = disputeSection + 1;

  terms += `---

## ${terminationSection}. Termination

### ${terminationSection}.1 Termination by You

You may terminate your use of the Service at any time by:
${requiresAccount ? '- Deleting your account through your account settings\n- Contacting us at ' + contactEmail : '- Discontinuing use of the Service'}

### ${terminationSection}.2 Termination by Us

We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including:
- Breach of these Terms
- At the request of law enforcement or government agencies
- Extended periods of inactivity
- Technical or security issues
- Discontinuation of the Service

### ${terminationSection}.3 Effect of Termination

Upon termination:
- Your right to use the Service will immediately cease
- ${requiresAccount ? 'We may delete your account and associated data\n- ' : ''}Any provisions of these Terms which by their nature should survive will survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability

`;

  const generalSection = terminationSection + 1;

  terms += `---

## ${generalSection}. General Provisions

### ${generalSection}.1 Entire Agreement

These Terms, together with our Privacy Policy and any other legal notices or agreements published by us on the Service, constitute the entire agreement between you and ${companyName} regarding the Service.

### ${generalSection}.2 Severability

If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law.

### ${generalSection}.3 Waiver

Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. Any waiver of any provision of these Terms will be effective only if in writing and signed by us.

### ${generalSection}.4 Assignment

You may not assign or transfer these Terms or your rights under these Terms without our prior written consent. We may assign our rights and obligations under these Terms without restriction.

### ${generalSection}.5 Force Majeure

We shall not be liable for any failure to perform our obligations where such failure results from circumstances beyond our reasonable control, including but not limited to acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials.

### ${generalSection}.6 Headings

The headings in these Terms are for convenience only and shall not affect the interpretation of these Terms.

### ${generalSection}.7 Contact Information

If you have any questions about these Terms, please contact us:

**${companyName}**
${contactAddress ? `${contactAddress}\n` : ''}
**Email:** ${contactEmail}
**Website:** ${websiteUrl}

`;

  if (hasAffiliate) {
    terms += `---

## ${generalSection + 1}. Affiliate Disclosure

The Service may contain affiliate links. If you click on an affiliate link and make a purchase, we may receive a commission at no additional cost to you. This does not influence our recommendations or opinions.

`;
  }

  terms += `---

*These Terms of Service were generated by PolicyGen. While this document covers standard legal requirements, we recommend having a qualified attorney review it for your specific situation.*
`;

  return terms;
}

export function generateTermsPlainText(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gm, '\n$1\n')
    .replace(/^## (.*$)/gm, '\n\n$1\n' + '='.repeat(50))
    .replace(/^# (.*$)/gm, '$1\n' + '='.repeat(50))
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^- /gm, '• ')
    .replace(/---/g, '\n' + '-'.repeat(50) + '\n');
}

export function generateTermsHTML(markdown: string): string {
  const html = markdown
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/---/g, '<hr>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.7;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
      color: #333;
      background: #fff;
    }
    h1 { font-size: 2.5em; border-bottom: 3px solid #333; padding-bottom: 15px; margin-bottom: 30px; }
    h2 { font-size: 1.5em; margin-top: 40px; color: #222; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
    h3 { font-size: 1.2em; margin-top: 25px; color: #444; }
    ul { padding-left: 25px; }
    li { margin-bottom: 8px; }
    hr { border: none; border-top: 1px solid #eee; margin: 30px 0; }
    p { margin-bottom: 15px; }
    strong { color: #222; }
  </style>
</head>
<body>
<article>
<p>${html}</p>
</article>
</body>
</html>`;
}
