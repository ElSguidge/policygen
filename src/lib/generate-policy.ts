import { PolicyFormData } from './types';

export function generatePrivacyPolicy(data: PolicyFormData): string {
  const {
    companyName,
    websiteUrl,
    contactEmail,
    contactAddress,
    collectsEmail,
    collectsName,
    collectsPhone,
    collectsAddress,
    collectsPaymentInfo,
    collectsUsageData,
    collectsCookies,
    collectsLocationData,
    collectsDeviceInfo,
    collectsSocialProfiles,
    collectsEmploymentInfo,
    collectsHealthInfo,
    usesGoogleAnalytics,
    usesStripe,
    usesPaypal,
    usesSocialLogin,
    usesMailchimp,
    usesIntercom,
    usesHotjar,
    usesCloudflare,
    usesAWS,
    customThirdParties,
    usesAnalytics,
    usesMarketing,
    usesPersonalization,
    usesAutomatedDecisions,
    sharesWithThirdParties,
    sellsData,
    transfersInternationally,
    gdprCompliant,
    ccpaCompliant,
    childrenUnder13,
    hipaaRelevant,
    retentionPeriod,
    effectiveDate,
    hasDataProtectionOfficer,
    dpoEmail,
  } = data;

  const formattedDate = new Date(effectiveDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const retentionText: Record<string, string> = {
    session: 'only for the duration of your session',
    '1year': 'for up to one (1) year',
    '3years': 'for up to three (3) years',
    '5years': 'for up to five (5) years',
    '7years': 'for up to seven (7) years',
    indefinite: 'indefinitely, unless you request deletion',
  };

  // Build collected data list with categories
  const personalIdentifiers: string[] = [];
  const financialInfo: string[] = [];
  const technicalData: string[] = [];
  const sensitiveData: string[] = [];

  if (collectsName) personalIdentifiers.push('Full name');
  if (collectsEmail) personalIdentifiers.push('Email address');
  if (collectsPhone) personalIdentifiers.push('Phone number');
  if (collectsAddress) personalIdentifiers.push('Postal address');
  if (collectsSocialProfiles) personalIdentifiers.push('Social media handles and profile information');

  if (collectsPaymentInfo) {
    financialInfo.push('Payment card information (processed securely by our payment processors)');
    financialInfo.push('Billing address');
    financialInfo.push('Transaction history');
  }

  if (collectsUsageData) {
    technicalData.push('Pages visited and features used');
    technicalData.push('Time spent on pages');
    technicalData.push('Click patterns and navigation paths');
    technicalData.push('Referring website or source');
  }
  if (collectsDeviceInfo) {
    technicalData.push('IP address');
    technicalData.push('Browser type and version');
    technicalData.push('Operating system');
    technicalData.push('Device type and identifiers');
    technicalData.push('Screen resolution');
  }
  if (collectsLocationData) {
    technicalData.push('Approximate geographic location (derived from IP address)');
    technicalData.push('Precise location data (only with your explicit consent)');
  }
  if (collectsCookies) {
    technicalData.push('Cookie identifiers and session data');
  }

  if (collectsEmploymentInfo) sensitiveData.push('Employment information and professional history');
  if (collectsHealthInfo) sensitiveData.push('Health-related information (collected only with explicit consent)');

  // Build third party services list
  const thirdPartyServices: { name: string; purpose: string; privacy: string }[] = [];

  if (usesGoogleAnalytics) {
    thirdPartyServices.push({
      name: 'Google Analytics',
      purpose: 'Website analytics and usage tracking',
      privacy: 'https://policies.google.com/privacy',
    });
  }
  if (usesStripe) {
    thirdPartyServices.push({
      name: 'Stripe',
      purpose: 'Payment processing',
      privacy: 'https://stripe.com/privacy',
    });
  }
  if (usesPaypal) {
    thirdPartyServices.push({
      name: 'PayPal',
      purpose: 'Payment processing',
      privacy: 'https://www.paypal.com/us/legalhub/privacy-full',
    });
  }
  if (usesSocialLogin) {
    thirdPartyServices.push({
      name: 'Social Login Providers (Google, Facebook, Apple, etc.)',
      purpose: 'Authentication and account creation',
      privacy: 'See respective provider privacy policies',
    });
  }
  if (usesMailchimp) {
    thirdPartyServices.push({
      name: 'Mailchimp',
      purpose: 'Email marketing and communications',
      privacy: 'https://mailchimp.com/legal/privacy/',
    });
  }
  if (usesIntercom) {
    thirdPartyServices.push({
      name: 'Intercom',
      purpose: 'Customer support and messaging',
      privacy: 'https://www.intercom.com/legal/privacy',
    });
  }
  if (usesHotjar) {
    thirdPartyServices.push({
      name: 'Hotjar',
      purpose: 'User behavior analytics and heatmaps',
      privacy: 'https://www.hotjar.com/legal/policies/privacy/',
    });
  }
  if (usesCloudflare) {
    thirdPartyServices.push({
      name: 'Cloudflare',
      purpose: 'Security, performance, and content delivery',
      privacy: 'https://www.cloudflare.com/privacypolicy/',
    });
  }
  if (usesAWS) {
    thirdPartyServices.push({
      name: 'Amazon Web Services (AWS)',
      purpose: 'Cloud hosting and infrastructure',
      privacy: 'https://aws.amazon.com/privacy/',
    });
  }

  // Start building the policy
  let policy = `# Privacy Policy

**Last Updated:** ${formattedDate}

**Effective Date:** ${formattedDate}

---

## 1. Introduction and Overview

Welcome to ${companyName}. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit ${websiteUrl} (the "Website") and use our services.

**Please read this Privacy Policy carefully.** By accessing or using our Website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Website.

We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.

---

## 2. Data Controller Information

For the purposes of applicable data protection laws, the data controller is:

**${companyName}**
${contactAddress ? `${contactAddress}\n` : ''}Email: ${contactEmail}
Website: ${websiteUrl}

`;

  if (hasDataProtectionOfficer && dpoEmail) {
    policy += `**Data Protection Officer:**
Email: ${dpoEmail}

`;
  }

  policy += `---

## 3. Information We Collect

We collect information in several ways: information you provide directly to us, information collected automatically when you use our Website, and information from third-party sources.

### 3.1 Information You Provide to Us

When you register for an account, make a purchase, subscribe to our newsletter, fill out a form, or otherwise interact with us, you may provide us with:

`;

  if (personalIdentifiers.length > 0) {
    policy += `**Personal Identifiers:**
${personalIdentifiers.map(item => `- ${item}`).join('\n')}

`;
  }

  if (financialInfo.length > 0) {
    policy += `**Financial Information:**
${financialInfo.map(item => `- ${item}`).join('\n')}

`;
  }

  if (sensitiveData.length > 0) {
    policy += `**Sensitive Personal Information:**
${sensitiveData.map(item => `- ${item}`).join('\n')}

We only collect sensitive personal information when strictly necessary and with your explicit consent.

`;
  }

  if (technicalData.length > 0) {
    policy += `### 3.2 Information Collected Automatically

When you access our Website, we automatically collect certain information about your device and your use of the Website, including:

**Technical and Usage Data:**
${technicalData.map(item => `- ${item}`).join('\n')}

This information is primarily needed to maintain the security and operation of our Website, and for our internal analytics and reporting purposes.

`;
  }

  if (collectsCookies) {
    policy += `### 3.3 Cookies and Tracking Technologies

We use cookies, web beacons, tracking pixels, and other tracking technologies to collect information about your browsing activities. For detailed information about the cookies we use and your choices regarding cookies, please see Section 9 (Cookie Policy) below.

`;
  }

  policy += `---

## 4. Legal Basis for Processing (GDPR)

`;

  if (gdprCompliant) {
    policy += `If you are located in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, we are required to inform you about the legal basis on which we process your personal data. We process your personal data under the following legal bases:

**Consent:** Where you have given us clear consent to process your personal data for a specific purpose.

**Contract Performance:** Where the processing is necessary for the performance of a contract with you (e.g., to provide you with our services, process payments, or fulfill orders).

**Legal Obligation:** Where we need to comply with a legal obligation (e.g., tax laws, fraud prevention, or responding to lawful requests from public authorities).

**Legitimate Interests:** Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests. Our legitimate interests include:
- Improving and personalizing our services
- Marketing our products and services (where permitted)
- Preventing fraud and ensuring security
- Exercising or defending legal claims

You have the right to withdraw consent at any time. Withdrawing consent does not affect the lawfulness of processing based on consent before its withdrawal.

`;
  } else {
    policy += `We process your personal data based on:
- Your consent
- The necessity to perform a contract with you
- Compliance with legal obligations
- Our legitimate business interests

`;
  }

  policy += `---

## 5. How We Use Your Information

We use the information we collect for various purposes, including:

**Service Delivery and Operations:**
- To create and manage your account
- To process transactions and send related information
- To provide customer support and respond to inquiries
- To deliver the products and services you request

**Communication:**
- To send you administrative information (e.g., service updates, security alerts)
- To respond to your comments, questions, and requests
${usesMarketing ? '- To send marketing and promotional communications (with your consent where required)\n' : ''}
**Improvement and Development:**
- To understand how users interact with our Website
- To develop new products, services, features, and functionality
- To identify usage trends and areas for improvement
${usesAnalytics ? '- To conduct analytics and generate aggregate reports\n' : ''}
${usesPersonalization ? '**Personalization:**\n- To personalize your experience based on your preferences and interests\n- To deliver targeted content and recommendations\n\n' : ''}
**Security and Legal:**
- To detect, prevent, and address technical issues
- To protect against malicious, deceptive, fraudulent, or illegal activity
- To enforce our terms of service and other legal rights
- To comply with applicable laws and regulations

`;

  if (usesAutomatedDecisions) {
    policy += `---

## 6. Automated Decision-Making and Profiling

We may use automated decision-making technologies, including profiling, in the following circumstances:

- **Fraud Detection:** We use automated systems to detect and prevent fraudulent transactions
- **Content Personalization:** We use algorithms to personalize the content you see
- **Risk Assessment:** We may use automated tools to assess risk in connection with our services

**Your Rights:** If you are subject to a decision based solely on automated processing (including profiling) that produces legal effects or significantly affects you, you have the right to:
- Request human intervention
- Express your point of view
- Contest the decision

To exercise these rights, please contact us at ${contactEmail}.

`;
  }

  policy += `---

## 7. Sharing and Disclosure of Your Information

We may share your information in the following situations:

### 7.1 Service Providers

We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf. These parties are obligated to protect your information and may only use it for the specific purposes for which it was disclosed.

`;

  if (thirdPartyServices.length > 0) {
    policy += `**Third-Party Services We Use:**

| Service | Purpose | Privacy Policy |
|---------|---------|----------------|
${thirdPartyServices.map(s => `| ${s.name} | ${s.purpose} | ${s.privacy} |`).join('\n')}

`;
  }

  if (customThirdParties) {
    policy += `**Additional Third-Party Services:**
${customThirdParties}

`;
  }

  policy += `### 7.2 Business Transfers

If ${companyName} is involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our Website of any change in ownership or uses of your personal information.

### 7.3 Legal Requirements

We may disclose your information where required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency), including to:
- Comply with a legal obligation
- Protect and defend our rights or property
- Prevent or investigate possible wrongdoing in connection with the Website
- Protect the personal safety of users of the Website or the public
- Protect against legal liability

### 7.4 With Your Consent

We may share your information for other purposes with your consent or at your direction.

`;

  if (sellsData) {
    policy += `### 7.5 Sale of Personal Information

We may sell certain categories of personal information to third parties. Under applicable privacy laws (including the CCPA), you have the right to opt-out of the sale of your personal information.

**To opt-out of the sale of your personal information**, please contact us at ${contactEmail} or use the "Do Not Sell My Personal Information" link on our Website.

`;
  } else {
    policy += `### 7.5 We Do Not Sell Your Personal Information

We do not sell, rent, or trade your personal information to third parties for their commercial purposes.

`;
  }

  if (transfersInternationally) {
    policy += `---

## 8. International Data Transfers

Your information may be transferred to, stored, and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country.

**Safeguards:** When we transfer personal data internationally, we implement appropriate safeguards to protect your information, including:
- Standard Contractual Clauses approved by the European Commission
- Binding Corporate Rules where applicable
- Certification schemes such as the EU-US Data Privacy Framework

By using our Website, you consent to the transfer of your information to countries outside your country of residence, including the United States, which may have different data protection rules than your country.

`;
  }

  if (collectsCookies) {
    policy += `---

## 9. Cookie Policy

### 9.1 What Are Cookies?

Cookies are small data files placed on your device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.

### 9.2 Types of Cookies We Use

**Strictly Necessary Cookies**
These cookies are essential for you to browse the Website and use its features. Without these cookies, services you have asked for cannot be provided. These cookies do not gather information about you that could be used for marketing purposes.
- Duration: Session

**Performance/Analytics Cookies**
These cookies collect information about how visitors use our Website, such as which pages visitors go to most often. We use this information to improve our Website.
- Duration: Up to 2 years
${usesGoogleAnalytics ? '- Provider: Google Analytics\n' : ''}
**Functionality Cookies**
These cookies allow the Website to remember choices you make (such as your language or the region you are in) and provide enhanced, more personalized features.
- Duration: Up to 1 year

${usesMarketing ? `**Targeting/Advertising Cookies**
These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of advertising campaigns.
- Duration: Up to 2 years
` : ''}
### 9.3 Your Cookie Choices

Most web browsers are set to accept cookies by default. You can choose to set your browser to remove or reject cookies. Please note that if you choose to remove or reject cookies, this could affect the availability and functionality of our Website.

**To manage your cookie preferences:**
- **Browser settings:** Most browsers allow you to control cookies through their settings preferences
- **Google Analytics Opt-out:** Install the Google Analytics Opt-out Browser Add-on
- **Advertising networks:** Visit the Digital Advertising Alliance's opt-out page at http://www.aboutads.info/choices/

### 9.4 Do Not Track Signals

Some browsers have a "Do Not Track" feature that signals to websites that you do not want to have your online activity tracked. Due to the lack of a common standard for interpreting DNT signals, our Website does not currently respond to DNT signals.

`;
  }

  if (gdprCompliant) {
    policy += `---

## 10. Your Privacy Rights Under GDPR

If you are a resident of the European Economic Area (EEA), United Kingdom, or Switzerland, you have certain data protection rights under the General Data Protection Regulation (GDPR):

**Right to Access:** You have the right to request copies of your personal data. We may charge a small fee for this service.

**Right to Rectification:** You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.

**Right to Erasure (Right to be Forgotten):** You have the right to request that we erase your personal data, under certain conditions, including:
- The personal data is no longer necessary for the purpose it was collected
- You withdraw consent (where processing was based on consent)
- You object to the processing and there are no overriding legitimate grounds
- The personal data has been unlawfully processed

**Right to Restrict Processing:** You have the right to request that we restrict the processing of your personal data, under certain conditions.

**Right to Data Portability:** You have the right to request that we transfer the data we have collected to another organization, or directly to you, in a structured, commonly used, machine-readable format.

**Right to Object:** You have the right to object to our processing of your personal data, under certain conditions, including:
- Processing based on legitimate interests or public interest
- Direct marketing (including profiling)
- Processing for scientific/historical research and statistics

**Right to Withdraw Consent:** Where we rely on consent as the legal basis for processing your personal data, you have the right to withdraw that consent at any time.

**Right to Lodge a Complaint:** You have the right to lodge a complaint with a supervisory authority, in particular in the EU Member State of your habitual residence, place of work, or place of the alleged infringement.

**To exercise any of these rights,** please contact us at ${contactEmail}. We will respond to your request within one month, though we may extend this period for complex requests as permitted by law.

`;
  }

  if (ccpaCompliant) {
    policy += `---

## 11. Your Privacy Rights Under CCPA/CPRA

If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA):

**Right to Know:** You have the right to request that we disclose:
- The categories of personal information we collected about you
- The categories of sources from which the personal information is collected
- Our business or commercial purpose for collecting or selling personal information
- The categories of third parties with whom we share personal information
- The specific pieces of personal information we have collected about you

**Right to Delete:** You have the right to request deletion of your personal information, subject to certain exceptions.

**Right to Correct:** You have the right to request that we correct inaccurate personal information.

**Right to Opt-Out:** You have the right to opt-out of:
- The sale of your personal information
- Sharing of your personal information for cross-context behavioral advertising

**Right to Limit Use of Sensitive Personal Information:** You have the right to limit the use and disclosure of your sensitive personal information.

**Right to Non-Discrimination:** We will not discriminate against you for exercising any of your CCPA rights. We will not:
- Deny you goods or services
- Charge you different prices or rates
- Provide you with a different level or quality of goods or services
- Suggest that you may receive a different price or rate

**Categories of Personal Information Collected (Past 12 Months):**
- Identifiers (name, email, IP address)
- Commercial information (transaction history)
- Internet or network activity (browsing history, interactions with our Website)
- Geolocation data (if enabled)

${sellsData ? '**We may sell the following categories of personal information:** Identifiers, commercial information, and internet activity data.\n\n**To opt-out of the sale of your personal information,** please contact us at ' + contactEmail + ' or click the "Do Not Sell My Personal Information" link on our Website.\n\n' : '**We do not sell your personal information.**\n\n'}

**To exercise your rights,** please submit a verifiable consumer request by contacting us at ${contactEmail}. You may also designate an authorized agent to make a request on your behalf.

`;
  }

  // CalOPPA (California Online Privacy Protection Act)
  policy += `---

## 12. CalOPPA Compliance (California Online Privacy Protection Act)

In accordance with CalOPPA, we agree to the following:

**Conspicuous Posting:** Our Privacy Policy link is prominently displayed on our home page and is accessible from every page of our Website.

**Privacy Policy Updates:** Users will be notified of any Privacy Policy changes on our Privacy Policy page. Users can visit our Website after logging in to check their personal information.

**Do Not Track Signals:** We honor Do Not Track signals and Do Not Track, plant cookies, or use advertising when a Do Not Track (DNT) browser mechanism is in place. However, please note that not all browsers offer a Do Not Track option and there is no industry consensus on how to respond to DNT signals. As such, we describe our practices in the "Do Not Track" section of our Cookie Policy above.

**Third-Party Behavioral Tracking:** We ${usesMarketing || usesGoogleAnalytics || usesHotjar ? 'do' : 'do not'} allow third-party behavioral tracking on our Website.

**Access to Personal Information:** Users can request access to their personal information by contacting us at ${contactEmail}. We will provide the requested information within a reasonable timeframe.

`;

  // Additional state laws
  policy += `---

## 13. Additional U.S. State Privacy Rights

**Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), and Utah (UCPA) Residents:**

If you are a resident of Virginia, Colorado, Connecticut, or Utah, you may have similar rights to those described above, including the right to:
- Confirm whether we are processing your personal data
- Access your personal data
- Correct inaccuracies in your personal data
- Delete your personal data
- Obtain a copy of your personal data in a portable format
- Opt-out of targeted advertising, sale of personal data, and profiling

To exercise these rights, please contact us at ${contactEmail}.

**Nevada Residents:**

Nevada residents may opt out of the sale of certain personal information to third parties. To submit a request, please contact us at ${contactEmail}.

`;

  policy += `---

## 14. Data Retention

We will retain your personal information ${retentionText[retentionPeriod] || 'for a reasonable period'} after your last interaction with us, or as necessary to:
- Provide our services to you
- Comply with our legal obligations
- Resolve disputes
- Enforce our agreements

When personal data is no longer needed, we will securely delete or anonymize it.

`;

  if (childrenUnder13) {
    policy += `---

## 15. Children's Privacy (COPPA)

Our Website may collect information from children under 13 years of age. We comply with the Children's Online Privacy Protection Act (COPPA).

**Parental Consent:** We require verifiable parental consent before collecting, using, or disclosing personal information from children under 13.

**Parental Rights:** Parents have the right to:
- Review their child's personal information
- Request deletion of their child's information
- Refuse further collection or use of their child's information

**To exercise these rights,** please contact us at ${contactEmail} with proof of your relationship to the child.

`;
  } else {
    policy += `---

## 15. Children's Privacy

Our Website is not intended for children under 13 years of age (or 16 in the EEA). We do not knowingly collect personal information from children under these ages. If you are a parent or guardian and believe that your child has provided us with personal information without your consent, please contact us at ${contactEmail}. If we learn we have collected personal information from a child under the applicable age, we will take steps to delete that information as quickly as possible.

`;
  }

  if (hipaaRelevant) {
    policy += `---

## 16. Health Information (HIPAA Notice)

If we collect health-related information that is protected under the Health Insurance Portability and Accountability Act (HIPAA), we will handle such information in accordance with HIPAA requirements.

Protected Health Information (PHI) will be:
- Used and disclosed only as permitted or required by HIPAA
- Protected by appropriate administrative, technical, and physical safeguards
- Subject to the minimum necessary standard

You have specific rights regarding your PHI, including the right to access, amend, and receive an accounting of disclosures. For more information, please contact us at ${contactEmail}.

`;
  }

  policy += `---

## ${hipaaRelevant ? '17' : '16'}. Data Security

We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. These measures include:

**Technical Safeguards:**
- Encryption of data in transit (TLS/SSL) and at rest
- Secure server infrastructure
- Regular security assessments and penetration testing
- Access controls and authentication mechanisms
- Firewall and intrusion detection systems

**Organizational Safeguards:**
- Employee training on data protection
- Access limited to personnel who need it to perform their job duties
- Confidentiality agreements with employees and contractors
- Incident response procedures

However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.

**Data Breach Notification:** In the event of a data breach that affects your personal information, we will notify you and the relevant authorities as required by applicable law.

---

## ${hipaaRelevant ? '18' : '17'}. Third-Party Links

Our Website may contain links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you.

We do not control these third-party websites and are not responsible for their privacy statements. When you leave our Website, we encourage you to read the privacy policy of every website you visit.

---

## ${hipaaRelevant ? '19' : '18'}. Changes to This Privacy Policy

We may update this Privacy Policy from time to time in response to changing legal, technical, or business developments. When we update our Privacy Policy, we will take appropriate measures to inform you, consistent with the significance of the changes we make.

We will obtain your consent to any material Privacy Policy changes if and where this is required by applicable data protection laws.

You can see when this Privacy Policy was last updated by checking the "Last Updated" date displayed at the top of this Privacy Policy.

---

## ${hipaaRelevant ? '20' : '19'}. Contact Us

If you have questions, concerns, or complaints about this Privacy Policy or our data practices, or if you wish to exercise any of your rights, please contact us at:

**${companyName}**
${contactAddress ? `${contactAddress}\n` : ''}
**Email:** ${contactEmail}
**Website:** ${websiteUrl}

${hasDataProtectionOfficer && dpoEmail ? `**Data Protection Officer:** ${dpoEmail}\n` : ''}

We will endeavor to respond to your inquiry within 30 days (or sooner if required by applicable law).

${gdprCompliant ? `**EU/EEA Representative:** If required under GDPR, you may contact our EU representative at ${contactEmail}.\n\n` : ''}

---

*This Privacy Policy was generated by PolicyGen. While this document covers standard legal requirements, we recommend having a qualified attorney review it for your specific situation.*
`;

  return policy;
}

export function generatePlainText(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gm, '\n$1\n')
    .replace(/^## (.*$)/gm, '\n\n$1\n' + '='.repeat(50))
    .replace(/^# (.*$)/gm, '$1\n' + '='.repeat(50))
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^- /gm, '• ')
    .replace(/\|.*\|/g, '') // Remove table syntax
    .replace(/---/g, '\n' + '-'.repeat(50) + '\n');
}

export function generateHTML(markdown: string): string {
  let html = markdown
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
  <title>Privacy Policy</title>
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
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
    th { background: #f5f5f5; }
    a { color: #0066cc; }
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
