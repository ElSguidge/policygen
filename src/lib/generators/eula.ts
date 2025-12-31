export interface EulaData {
  // Company Info
  companyName: string;
  contactEmail: string;
  contactAddress: string;
  country: string;
  state: string;

  // Product Info
  productName: string;
  productType: 'desktop_app' | 'mobile_app' | 'web_app' | 'saas' | 'plugin' | 'game';
  productDescription: string;
  currentVersion: string;

  // License Type
  licenseType: 'perpetual' | 'subscription' | 'freemium' | 'free' | 'trial';
  licenseTerm: 'unlimited' | '1_year' | 'monthly' | 'custom';
  maxInstallations: number;
  allowsCommercialUse: boolean;
  allowsModification: boolean;
  allowsRedistribution: boolean;

  // Restrictions
  prohibitsReverseEngineering: boolean;
  prohibitsSublicensing: boolean;
  prohibitsCompetitiveUse: boolean;
  prohibitsExport: boolean;
  requiresAttribution: boolean;

  // Technical
  requiresActivation: boolean;
  collectsUsageData: boolean;
  hasAutoUpdates: boolean;
  requiresInternetConnection: boolean;

  // Payment (if applicable)
  hasPaidVersion: boolean;
  subscriptionPrice: string;
  hasFreeTrial: boolean;
  trialDays: number;
  allowsRefunds: boolean;
  refundDays: number;

  // Support & Warranty
  providesSupport: boolean;
  supportDuration: string;
  warrantyPeriodDays: number;

  // Legal
  governingLaw: string;
  disputeResolution: 'arbitration' | 'litigation';
  limitLiability: boolean;

  // Additional
  effectiveDate: string;
  includesOpenSource: boolean;
  openSourceLicenses: string;
}

export const defaultEulaData: EulaData = {
  companyName: '',
  contactEmail: '',
  contactAddress: '',
  country: 'United States',
  state: 'Delaware',

  productName: '',
  productType: 'desktop_app',
  productDescription: '',
  currentVersion: '1.0.0',

  licenseType: 'perpetual',
  licenseTerm: 'unlimited',
  maxInstallations: 1,
  allowsCommercialUse: true,
  allowsModification: false,
  allowsRedistribution: false,

  prohibitsReverseEngineering: true,
  prohibitsSublicensing: true,
  prohibitsCompetitiveUse: true,
  prohibitsExport: true,
  requiresAttribution: false,

  requiresActivation: false,
  collectsUsageData: true,
  hasAutoUpdates: true,
  requiresInternetConnection: false,

  hasPaidVersion: true,
  subscriptionPrice: '',
  hasFreeTrial: false,
  trialDays: 14,
  allowsRefunds: true,
  refundDays: 30,

  providesSupport: true,
  supportDuration: '1 year',
  warrantyPeriodDays: 90,

  governingLaw: 'Delaware',
  disputeResolution: 'arbitration',
  limitLiability: true,

  effectiveDate: new Date().toISOString().split('T')[0],
  includesOpenSource: false,
  openSourceLicenses: '',
};

export function generateEula(data: EulaData): string {
  const {
    companyName,
    contactEmail,
    contactAddress,
    state,
    productName,
    productType,
    productDescription,
    currentVersion,
    licenseType,
    licenseTerm,
    maxInstallations,
    allowsCommercialUse,
    allowsModification,
    allowsRedistribution,
    prohibitsReverseEngineering,
    prohibitsSublicensing,
    prohibitsCompetitiveUse,
    prohibitsExport,
    requiresAttribution,
    requiresActivation,
    collectsUsageData,
    hasAutoUpdates,
    requiresInternetConnection,
    hasPaidVersion,
    subscriptionPrice,
    hasFreeTrial,
    trialDays,
    allowsRefunds,
    refundDays,
    providesSupport,
    supportDuration,
    warrantyPeriodDays,
    governingLaw,
    disputeResolution,
    limitLiability,
    effectiveDate,
    includesOpenSource,
    openSourceLicenses,
  } = data;

  const formattedDate = new Date(effectiveDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const productTypeLabel = {
    desktop_app: 'desktop application',
    mobile_app: 'mobile application',
    web_app: 'web application',
    saas: 'software-as-a-service',
    plugin: 'software plugin/extension',
    game: 'video game',
  }[productType];

  const licenseTermLabel = {
    unlimited: 'perpetual (unlimited duration)',
    '1_year': 'one (1) year',
    monthly: 'one (1) month, automatically renewing',
    custom: 'as specified in your purchase agreement',
  }[licenseTerm];

  let eula = `# End-User License Agreement (EULA)

**Software:** ${productName}${currentVersion ? ` (Version ${currentVersion})` : ''}

**Last Updated:** ${formattedDate}

**Effective Date:** ${formattedDate}

---

## IMPORTANT: PLEASE READ THIS AGREEMENT CAREFULLY

This End-User License Agreement ("Agreement" or "EULA") is a legal agreement between you (either an individual or a single entity, referred to as "you," "your," or "User") and ${companyName} ("Company," "we," "us," or "our") for the use of ${productName}${productDescription ? `, ${productDescription}` : ''} (the "Software"), which includes the ${productTypeLabel} and may include associated media, printed materials, and electronic documentation.

**BY INSTALLING, COPYING, OR OTHERWISE USING THE SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THE TERMS OF THIS AGREEMENT.**

**IF YOU DO NOT AGREE TO THESE TERMS, DO NOT INSTALL OR USE THE SOFTWARE.**

---

## 1. Grant of License

### 1.1 License Grant

Subject to the terms and conditions of this Agreement, ${companyName} grants you a ${licenseType === 'free' ? 'free, ' : ''}limited, non-exclusive, non-transferable${licenseType === 'perpetual' ? ', perpetual' : ''} license to:

- Download, install, and use the Software on ${maxInstallations === 1 ? 'a single device' : `up to ${maxInstallations} devices`} owned or controlled by you
- Use the Software for ${allowsCommercialUse ? 'personal and commercial purposes' : 'personal, non-commercial purposes only'}
- Make one (1) copy of the Software for backup or archival purposes

### 1.2 License Type

This license is granted as a **${licenseType.replace('_', ' ').toUpperCase()}** license${licenseType !== 'free' ? ` for a term of ${licenseTermLabel}` : ''}.

${licenseType === 'subscription' ? `
**Subscription Terms:**
- Your subscription begins on the date of purchase
- ${subscriptionPrice ? `The subscription fee is ${subscriptionPrice}` : 'Subscription fees are as specified at the time of purchase'}
- ${licenseTerm === 'monthly' ? 'Your subscription will automatically renew each month unless cancelled' : 'Your subscription will renew at the end of each term unless cancelled'}
- You may cancel your subscription at any time through your account settings or by contacting us
` : ''}

${licenseType === 'freemium' ? `
**Freemium Terms:**
- Basic features are available free of charge
- Premium features require a paid subscription or one-time purchase
- Free features may be limited in functionality or usage
` : ''}

${hasFreeTrial ? `
### 1.3 Free Trial

We offer a free trial period of ${trialDays} days. During the trial:
- You have access to all features of the Software
- The trial begins when you first activate the Software
- After the trial period, you must purchase a license to continue using the Software
- Some features may be disabled after the trial ends
` : ''}

---

## 2. Restrictions

### 2.1 You May NOT:

`;

  const restrictions: string[] = [];

  if (prohibitsReverseEngineering) {
    restrictions.push('Reverse engineer, decompile, disassemble, or attempt to derive the source code of the Software');
  }
  if (!allowsModification) {
    restrictions.push('Modify, adapt, alter, translate, or create derivative works based on the Software');
  }
  if (!allowsRedistribution) {
    restrictions.push('Distribute, sell, resell, rent, lease, lend, or sublicense the Software to any third party');
  }
  if (prohibitsSublicensing) {
    restrictions.push('Sublicense, assign, or transfer the Software or this license to any third party');
  }
  if (prohibitsCompetitiveUse) {
    restrictions.push('Use the Software to develop a competing product or service');
  }
  if (prohibitsExport) {
    restrictions.push('Export or re-export the Software in violation of any applicable export laws or regulations');
  }
  if (!allowsCommercialUse) {
    restrictions.push('Use the Software for any commercial purpose without prior written consent');
  }

  restrictions.push(
    'Remove, alter, or obscure any proprietary notices, labels, or marks on the Software',
    'Use the Software for any unlawful purpose or in violation of any applicable laws',
    'Use the Software to infringe upon the rights of any third party',
    'Circumvent any technological protection measures in the Software',
    'Use the Software to transmit any viruses, malware, or other harmful code'
  );

  eula += restrictions.map(r => `- ${r}`).join('\n');

  eula += `

### 2.2 Installation Limits

You may install and use the Software on up to **${maxInstallations}** ${maxInstallations === 1 ? 'device' : 'devices'} at any time. If you need to install the Software on additional devices, you must purchase additional licenses.

${requiresActivation ? `
### 2.3 Activation

The Software requires activation to verify your license. Activation may require an internet connection and may transmit certain information to our servers, including:
- Your license key
- Device identifiers
- Operating system information

Activation is required each time you install the Software on a new device.
` : ''}

${requiresAttribution ? `
### 2.4 Attribution

When using the Software in any published work or public display, you must include appropriate attribution to ${companyName} in a form reasonably acceptable to us.
` : ''}

---

## 3. Intellectual Property

### 3.1 Ownership

The Software is licensed, not sold. ${companyName} and its licensors retain all right, title, and interest in and to the Software, including all intellectual property rights. This Agreement does not grant you any rights to trademarks or service marks of ${companyName}.

### 3.2 Copyright

The Software is protected by copyright laws and international copyright treaties, as well as other intellectual property laws and treaties. Unauthorized copying of the Software, or failure to comply with the restrictions above, will result in automatic termination of this license and may result in criminal and/or civil penalties.

### 3.3 Feedback

If you provide any feedback, suggestions, or ideas regarding the Software ("Feedback"), you grant ${companyName} a perpetual, irrevocable, worldwide, royalty-free license to use, modify, and incorporate such Feedback into the Software without any obligation to you.

`;

  if (includesOpenSource) {
    eula += `### 3.4 Open Source Components

The Software may include open source software components that are subject to their own license terms. A list of these components and their licenses is provided below:

${openSourceLicenses || 'Please refer to the THIRD_PARTY_LICENSES file included with the Software.'}

To the extent any open source license requires us to make the corresponding source code available, you may obtain such source code by contacting us at ${contactEmail}.

`;
  }

  if (collectsUsageData || hasAutoUpdates) {
    eula += `---

## 4. Data Collection and Privacy

`;

    if (collectsUsageData) {
      eula += `### 4.1 Usage Data

The Software may collect certain usage data to help us improve the Software, including:
- Feature usage statistics
- Error reports and crash logs
- Performance data
- System configuration information

This data is collected anonymously and does not include personal information. You can opt out of usage data collection in the Software settings.

`;
    }

    if (hasAutoUpdates) {
      eula += `### 4.2 Automatic Updates

The Software may automatically check for and install updates. Updates may:
- Fix bugs and security vulnerabilities
- Add new features
- Modify existing functionality

${requiresInternetConnection ? 'An internet connection is required for updates.' : 'Updates are downloaded when an internet connection is available.'} You may disable automatic updates in the Software settings, but we recommend keeping updates enabled for security reasons.

`;
    }

    eula += `### 4.3 Privacy

Our collection and use of personal information is governed by our Privacy Policy, available at our website. By using the Software, you consent to such collection and use.

`;
  }

  const warrantySection = (collectsUsageData || hasAutoUpdates) ? 5 : 4;

  eula += `---

## ${warrantySection}. Warranty Disclaimer

### ${warrantySection}.1 Limited Warranty

${warrantyPeriodDays > 0 ? `
${companyName} warrants that for a period of ${warrantyPeriodDays} days from the date of original purchase ("Warranty Period"), the Software will perform substantially in accordance with the accompanying documentation.

**Warranty Remedies:** If the Software fails to meet this warranty, your exclusive remedy and ${companyName}'s sole liability shall be, at ${companyName}'s option:
- Repair or replacement of the Software
- Refund of the purchase price

This warranty is void if the failure results from accident, abuse, misapplication, modification, or use not in accordance with documentation.
` : `
THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
`}

### ${warrantySection}.2 Disclaimer of Warranties

EXCEPT FOR THE LIMITED WARRANTY SET FORTH ABOVE (IF ANY), THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND. ${companyName.toUpperCase()} EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO:

- IMPLIED WARRANTIES OF MERCHANTABILITY
- FITNESS FOR A PARTICULAR PURPOSE
- NON-INFRINGEMENT
- ACCURACY OR COMPLETENESS
- QUIET ENJOYMENT
- CORRESPONDENCE TO DESCRIPTION

${companyName.toUpperCase()} DOES NOT WARRANT THAT THE SOFTWARE WILL MEET YOUR REQUIREMENTS, OPERATE WITHOUT INTERRUPTION, OR BE ERROR-FREE.

`;

  if (limitLiability) {
    const liabilitySection = warrantySection + 1;

    eula += `---

## ${liabilitySection}. Limitation of Liability

### ${liabilitySection}.1 Exclusion of Damages

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ${companyName.toUpperCase()}, ITS AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR:

- ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
- LOSS OF PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES
- DAMAGES ARISING FROM YOUR USE OR INABILITY TO USE THE SOFTWARE
- DAMAGES ARISING FROM ANY UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA
- DAMAGES ARISING FROM THIRD-PARTY CONDUCT OR CONTENT
- ANY OTHER DAMAGES ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT

### ${liabilitySection}.2 Cap on Liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${companyName.toUpperCase()}'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THIS AGREEMENT OR THE SOFTWARE SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SOFTWARE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.

### ${liabilitySection}.3 Essential Purpose

THE LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN ${companyName.toUpperCase()} AND YOU. ${companyName.toUpperCase()} WOULD NOT BE ABLE TO PROVIDE THE SOFTWARE ON AN ECONOMIC BASIS WITHOUT SUCH LIMITATIONS.

`;
  }

  const terminationSection = limitLiability ? warrantySection + 2 : warrantySection + 1;

  eula += `---

## ${terminationSection}. Termination

### ${terminationSection}.1 Termination by You

You may terminate this Agreement at any time by:
- Uninstalling the Software from all devices
- Destroying all copies in your possession
- Deleting any backup copies

### ${terminationSection}.2 Termination by Us

We may terminate this Agreement immediately if:
- You breach any term of this Agreement
- You fail to pay any applicable fees
- We discontinue the Software

### ${terminationSection}.3 Effect of Termination

Upon termination:
- All rights granted to you under this Agreement will immediately cease
- You must cease all use of the Software
- You must uninstall and destroy all copies of the Software
- ${hasPaidVersion ? 'No refund will be provided for the remaining term of any prepaid subscription' : ''}

Sections regarding intellectual property, warranty disclaimer, limitation of liability, and general provisions shall survive termination.

`;

  if (providesSupport) {
    eula += `---

## ${terminationSection + 1}. Support and Maintenance

### ${terminationSection + 1}.1 Technical Support

${companyName} provides technical support for the Software:
- **Support Period:** ${supportDuration}
- **Support Channels:** Email (${contactEmail})
- **Response Time:** We aim to respond within 2 business days

### ${terminationSection + 1}.2 Maintenance Updates

During your support period, you will receive:
- Bug fixes and security patches
- Minor version updates
- Access to documentation updates

Major version upgrades may require an additional purchase.

`;
  }

  if (hasPaidVersion && allowsRefunds) {
    const refundSection = providesSupport ? terminationSection + 2 : terminationSection + 1;

    eula += `---

## ${refundSection}. Refund Policy

If you are not satisfied with the Software, you may request a refund within ${refundDays} days of purchase.

**To request a refund:**
1. Contact us at ${contactEmail}
2. Provide your order number and reason for refund
3. Uninstall the Software from all devices

**Refund Limitations:**
- Refunds are not available after ${refundDays} days
- Refunds apply only to the original purchaser
- Refunds may take 5-10 business days to process

`;
  }

  const governingSection = (() => {
    let section = terminationSection + 1;
    if (providesSupport) section++;
    if (hasPaidVersion && allowsRefunds) section++;
    return section;
  })();

  eula += `---

## ${governingSection}. Governing Law and Disputes

### ${governingSection}.1 Governing Law

This Agreement shall be governed by and construed in accordance with the laws of the State of ${governingLaw}, United States, without regard to its conflict of law principles.

### ${governingSection}.2 Dispute Resolution

${disputeResolution === 'arbitration' ? `
Any dispute arising out of or relating to this Agreement shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in ${state}. The arbitrator's decision shall be final and binding.

**YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.**
` : `
Any dispute arising out of or relating to this Agreement shall be resolved exclusively in the state and federal courts located in ${state}. You consent to the personal jurisdiction of such courts.
`}

---

## ${governingSection + 1}. General Provisions

### ${governingSection + 1}.1 Entire Agreement

This Agreement constitutes the entire agreement between you and ${companyName} regarding the Software and supersedes all prior agreements and understandings.

### ${governingSection + 1}.2 Amendment

We may modify this Agreement at any time by posting the revised Agreement on our website. Your continued use of the Software after such modifications constitutes acceptance of the revised Agreement.

### ${governingSection + 1}.3 Severability

If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.

### ${governingSection + 1}.4 Waiver

Our failure to enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision.

### ${governingSection + 1}.5 Assignment

You may not assign or transfer this Agreement or your rights hereunder without our prior written consent. We may assign our rights and obligations without restriction.

### ${governingSection + 1}.6 Export Compliance

You agree to comply with all applicable export laws and regulations. You may not export or re-export the Software to any country or person prohibited by applicable laws.

### ${governingSection + 1}.7 U.S. Government Rights

If you are a U.S. Government entity, the Software is provided with "RESTRICTED RIGHTS." Use, duplication, or disclosure by the Government is subject to restrictions as set forth in subparagraph (c)(1)(ii) of the Rights in Technical Data and Computer Software clause at DFARS 252.227-7013 or subparagraphs (c)(1) and (2) of the Commercial Computer Software - Restricted Rights at 48 CFR 52.227-19.

---

## ${governingSection + 2}. Contact Information

If you have any questions about this Agreement, please contact us:

**${companyName}**
${contactAddress ? `${contactAddress}\n` : ''}
**Email:** ${contactEmail}

---

**BY INSTALLING OR USING THE SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND IT, AND AGREE TO BE BOUND BY ITS TERMS AND CONDITIONS.**

---

*This EULA was generated by SafeDocGen. While this document covers standard legal requirements, we recommend having a qualified attorney review it for your specific situation.*
`;

  return eula;
}

export function generateEulaPlainText(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gm, '\n$1\n')
    .replace(/^## (.*$)/gm, '\n\n$1\n' + '='.repeat(50))
    .replace(/^# (.*$)/gm, '$1\n' + '='.repeat(50))
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^- /gm, '• ')
    .replace(/---/g, '\n' + '-'.repeat(50) + '\n');
}

export function generateEulaHTML(markdown: string): string {
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
  <title>End-User License Agreement</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; max-width: 900px; margin: 0 auto; padding: 40px 20px; color: #333; }
    h1 { font-size: 2.5em; border-bottom: 3px solid #333; padding-bottom: 15px; }
    h2 { font-size: 1.5em; margin-top: 40px; color: #222; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
    h3 { font-size: 1.2em; margin-top: 25px; color: #444; }
    ul { padding-left: 25px; }
    li { margin-bottom: 8px; }
    hr { border: none; border-top: 1px solid #eee; margin: 30px 0; }
  </style>
</head>
<body><article><p>${html}</p></article></body>
</html>`;
}
