export interface CookiePolicyData {
  // Company Info
  companyName: string;
  websiteUrl: string;
  contactEmail: string;

  // Cookie Types Used
  usesEssentialCookies: boolean;
  usesPerformanceCookies: boolean;
  usesFunctionalCookies: boolean;
  usesTargetingCookies: boolean;
  usesSocialMediaCookies: boolean;

  // Third-Party Cookies
  usesGoogleAnalytics: boolean;
  usesGoogleAds: boolean;
  usesFacebookPixel: boolean;
  usesHotjar: boolean;
  usesLinkedIn: boolean;
  usesTwitter: boolean;
  usesStripe: boolean;
  customCookies: string;

  // Cookie Management
  hasCookieBanner: boolean;
  allowsGranularConsent: boolean;
  respectsDoNotTrack: boolean;

  // Jurisdiction
  appliesGdpr: boolean;
  appliesCcpa: boolean;
  appliesPecr: boolean; // UK Privacy and Electronic Communications Regulations

  // Retention
  sessionCookieLifetime: string;
  persistentCookieMaxDays: number;

  // Additional
  effectiveDate: string;
}

export const defaultCookieData: CookiePolicyData = {
  companyName: '',
  websiteUrl: '',
  contactEmail: '',

  usesEssentialCookies: true,
  usesPerformanceCookies: true,
  usesFunctionalCookies: true,
  usesTargetingCookies: false,
  usesSocialMediaCookies: false,

  usesGoogleAnalytics: true,
  usesGoogleAds: false,
  usesFacebookPixel: false,
  usesHotjar: false,
  usesLinkedIn: false,
  usesTwitter: false,
  usesStripe: false,
  customCookies: '',

  hasCookieBanner: true,
  allowsGranularConsent: true,
  respectsDoNotTrack: true,

  appliesGdpr: true,
  appliesCcpa: true,
  appliesPecr: false,

  sessionCookieLifetime: 'browser session',
  persistentCookieMaxDays: 365,

  effectiveDate: new Date().toISOString().split('T')[0],
};

export function generateCookiePolicy(data: CookiePolicyData): string {
  const {
    companyName,
    websiteUrl,
    contactEmail,
    usesEssentialCookies,
    usesPerformanceCookies,
    usesFunctionalCookies,
    usesTargetingCookies,
    usesSocialMediaCookies,
    usesGoogleAnalytics,
    usesGoogleAds,
    usesFacebookPixel,
    usesHotjar,
    usesLinkedIn,
    usesTwitter,
    usesStripe,
    customCookies,
    hasCookieBanner,
    allowsGranularConsent,
    respectsDoNotTrack,
    appliesGdpr,
    appliesCcpa,
    appliesPecr,
    persistentCookieMaxDays,
    effectiveDate,
  } = data;

  const formattedDate = new Date(effectiveDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let policy = `# Cookie Policy

**Last Updated:** ${formattedDate}

**Effective Date:** ${formattedDate}

---

## 1. Introduction

This Cookie Policy explains how ${companyName} ("we," "us," or "our") uses cookies and similar tracking technologies when you visit ${websiteUrl} (the "Website"). This policy provides you with clear and comprehensive information about the cookies we use and the purposes for which we use them.

By continuing to use our Website, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree to our use of cookies, you should set your browser settings accordingly or not use the Website.

---

## 2. What Are Cookies?

Cookies are small text files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently and to provide reporting information.

Cookies set by the website owner (in this case, ${companyName}) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website, such as advertising, interactive content, and analytics.

### 2.1 Types of Cookies by Duration

**Session Cookies:** Temporary cookies that are erased when you close your browser. They do not collect information from your computer.

**Persistent Cookies:** Cookies that remain on your device for a set period of time or until you delete them. They are activated each time you visit the website that created the particular cookie.

---

## 3. Types of Cookies We Use

`;

  if (usesEssentialCookies) {
    policy += `### 3.1 Strictly Necessary (Essential) Cookies

These cookies are essential for the Website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies as the Website cannot function properly without them.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
| session_id | User session management | Session | First-party |
| csrf_token | Security - prevents cross-site request forgery | Session | First-party |
| cookie_consent | Stores your cookie preferences | 1 year | First-party |
| auth_token | Authentication status | Session/30 days | First-party |

**Legal Basis:** Legitimate interest (necessary for website operation)

`;
  }

  if (usesPerformanceCookies) {
    policy += `### 3.2 Performance/Analytics Cookies

These cookies collect information about how visitors use our Website, such as which pages are visited most often and if visitors receive error messages. These cookies help us improve how our Website works.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
${usesGoogleAnalytics ? '| _ga | Google Analytics - distinguishes users | 2 years | Third-party |\n| _gid | Google Analytics - distinguishes users | 24 hours | Third-party |\n| _gat | Google Analytics - throttles request rate | 1 minute | Third-party |\n' : ''}${usesHotjar ? '| _hjid | Hotjar - user identification | 1 year | Third-party |\n| _hjSessionUser | Hotjar - session data | 1 year | Third-party |\n' : ''}
**Legal Basis:** Consent

`;
  }

  if (usesFunctionalCookies) {
    policy += `### 3.3 Functionality Cookies

These cookies allow the Website to remember choices you make (such as your language preference or the region you are in) and provide enhanced, more personalized features.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
| language | Stores language preference | 1 year | First-party |
| timezone | Stores timezone preference | 1 year | First-party |
| theme | Stores display theme preference | 1 year | First-party |

**Legal Basis:** Consent

`;
  }

  if (usesTargetingCookies) {
    policy += `### 3.4 Targeting/Advertising Cookies

These cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and to help measure the effectiveness of advertising campaigns.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
${usesGoogleAds ? '| _gcl_au | Google Ads conversion tracking | 90 days | Third-party |\n| IDE | Google DoubleClick advertising | 1 year | Third-party |\n' : ''}${usesFacebookPixel ? '| _fbp | Facebook Pixel - ad targeting | 90 days | Third-party |\n| fr | Facebook advertising | 90 days | Third-party |\n' : ''}${usesLinkedIn ? '| li_sugr | LinkedIn ad analytics | 90 days | Third-party |\n| bcookie | LinkedIn browser ID | 2 years | Third-party |\n' : ''}${usesTwitter ? '| personalization_id | Twitter advertising | 2 years | Third-party |\n' : ''}
**Legal Basis:** Consent

**Important:** These cookies track your browsing habits to enable us to show advertising which is more likely to be of interest to you. You can opt out of these cookies at any time.

`;
  }

  if (usesSocialMediaCookies) {
    policy += `### 3.5 Social Media Cookies

These cookies are set by social media services that we have added to the Website to enable you to share our content with your friends and networks. They are capable of tracking your browser across other sites and building a profile of your interests.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
| Social share buttons | Enable sharing to social platforms | Varies | Third-party |

**Legal Basis:** Consent

`;
  }

  if (usesStripe) {
    policy += `### 3.6 Payment Cookies

These cookies are used by our payment processor to enable secure transactions.

| Cookie Name | Purpose | Duration | Type |
|-------------|---------|----------|------|
| __stripe_mid | Stripe fraud prevention | 1 year | Third-party |
| __stripe_sid | Stripe fraud prevention | Session | Third-party |

**Legal Basis:** Legitimate interest (payment security)

`;
  }

  if (customCookies) {
    policy += `### 3.7 Additional Cookies

${customCookies}

`;
  }

  policy += `---

## 4. Third-Party Cookies

Some cookies are placed by third-party services that appear on our pages. We do not control the dissemination of these cookies. You should check the third party websites for more information about these cookies.

### 4.1 Third-Party Services We Use

`;

  const thirdParties: { name: string; purpose: string; privacy: string }[] = [];

  if (usesGoogleAnalytics) {
    thirdParties.push({
      name: 'Google Analytics',
      purpose: 'Website analytics and performance measurement',
      privacy: 'https://policies.google.com/privacy',
    });
  }
  if (usesGoogleAds) {
    thirdParties.push({
      name: 'Google Ads',
      purpose: 'Advertising and conversion tracking',
      privacy: 'https://policies.google.com/privacy',
    });
  }
  if (usesFacebookPixel) {
    thirdParties.push({
      name: 'Facebook/Meta Pixel',
      purpose: 'Advertising and conversion tracking',
      privacy: 'https://www.facebook.com/privacy/policy',
    });
  }
  if (usesHotjar) {
    thirdParties.push({
      name: 'Hotjar',
      purpose: 'User behavior analytics',
      privacy: 'https://www.hotjar.com/privacy/',
    });
  }
  if (usesLinkedIn) {
    thirdParties.push({
      name: 'LinkedIn',
      purpose: 'B2B advertising and analytics',
      privacy: 'https://www.linkedin.com/legal/privacy-policy',
    });
  }
  if (usesTwitter) {
    thirdParties.push({
      name: 'Twitter/X',
      purpose: 'Social media advertising',
      privacy: 'https://twitter.com/privacy',
    });
  }
  if (usesStripe) {
    thirdParties.push({
      name: 'Stripe',
      purpose: 'Payment processing and fraud prevention',
      privacy: 'https://stripe.com/privacy',
    });
  }

  if (thirdParties.length > 0) {
    policy += `| Service | Purpose | Privacy Policy |
|---------|---------|----------------|
${thirdParties.map(tp => `| ${tp.name} | ${tp.purpose} | ${tp.privacy} |`).join('\n')}

`;
  }

  policy += `---

## 5. How to Manage Cookies

### 5.1 Cookie Consent Banner

${hasCookieBanner ? `When you first visit our Website, you will be shown a cookie consent banner that allows you to accept or reject non-essential cookies.${allowsGranularConsent ? ' You can also choose which categories of cookies to accept.' : ''}` : 'We are committed to providing you with control over cookies.'}

### 5.2 Browser Settings

Most web browsers allow you to control cookies through their settings. The following links provide information on how to manage cookies in popular browsers:

- **Google Chrome:** https://support.google.com/chrome/answer/95647
- **Mozilla Firefox:** https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer
- **Safari:** https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471
- **Microsoft Edge:** https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09
- **Opera:** https://help.opera.com/en/latest/web-preferences/#cookies

### 5.3 Opt-Out Tools

You can also opt out of certain cookies using the following industry tools:

- **Google Analytics Opt-out:** https://tools.google.com/dlpage/gaoptout
- **Network Advertising Initiative:** https://optout.networkadvertising.org/
- **Digital Advertising Alliance:** https://optout.aboutads.info/
- **European Interactive Digital Advertising Alliance:** https://www.youronlinechoices.eu/

### 5.4 Mobile Devices

On mobile devices, you can manage cookie settings through your device settings:

- **iOS:** Settings > Safari > Privacy & Security
- **Android:** Chrome > Settings > Privacy and Security > Cookies

${respectsDoNotTrack ? `### 5.5 Do Not Track

Our Website respects "Do Not Track" (DNT) signals sent by your browser. When DNT is enabled, we will disable non-essential cookies and limit tracking.` : `### 5.5 Do Not Track

Please note that we do not currently respond to "Do Not Track" signals due to the lack of a consistent industry standard. However, you can still manage cookies using the methods described above.`}

---

## 6. Consequences of Disabling Cookies

If you choose to disable cookies, please note that some features of our Website may not function properly. Specifically:

- **Essential cookies disabled:** The Website may not function at all
- **Performance cookies disabled:** We cannot improve the Website based on usage patterns
- **Functionality cookies disabled:** Your preferences may not be remembered
- **Targeting cookies disabled:** You may still see ads, but they will be less relevant

---

## 7. Cookie Retention

- **Session cookies:** Deleted when you close your browser
- **Persistent cookies:** Retained for up to ${persistentCookieMaxDays} days, or until you delete them

We review our cookie usage regularly and remove cookies that are no longer necessary.

`;

  if (appliesGdpr) {
    policy += `---

## 8. GDPR Compliance (European Users)

If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland:

### 8.1 Legal Basis for Cookies

- **Strictly necessary cookies:** Legitimate interest (website operation)
- **All other cookies:** Your explicit consent

### 8.2 Your Rights

Under GDPR, you have the right to:
- Access information about cookies we use
- Withdraw your consent at any time
- Request deletion of your data
- Lodge a complaint with a supervisory authority

### 8.3 Consent

We obtain your consent before placing non-essential cookies on your device. You can withdraw consent at any time by:
- Using our cookie settings panel
- Clearing cookies in your browser
- Contacting us at ${contactEmail}

`;
  }

  if (appliesCcpa) {
    policy += `---

## ${appliesGdpr ? '9' : '8'}. CCPA Compliance (California Users)

If you are a California resident:

### ${appliesGdpr ? '9' : '8'}.1 Sale of Personal Information

${usesTargetingCookies ? `Some cookies we use may constitute a "sale" of personal information under the CCPA. You have the right to opt out of this sale.` : `We do not "sell" personal information as defined under the CCPA.`}

### ${appliesGdpr ? '9' : '8'}.2 Your Rights

Under CCPA, you have the right to:
- Know what personal information is collected
- Know whether personal information is sold or disclosed
- Opt out of the sale of personal information
- Access your personal information
- Request deletion of your personal information
- Not be discriminated against for exercising your rights

To exercise these rights, contact us at ${contactEmail}.

`;
  }

  if (appliesPecr) {
    policy += `---

## ${appliesGdpr && appliesCcpa ? '10' : appliesGdpr || appliesCcpa ? '9' : '8'}. PECR Compliance (UK Users)

Under the Privacy and Electronic Communications Regulations (PECR), we:
- Clearly inform you about cookies before they are set
- Obtain your consent for non-essential cookies
- Provide an easy way to change your cookie preferences

`;
  }

  const updateSection = (() => {
    let section = 8;
    if (appliesGdpr) section++;
    if (appliesCcpa) section++;
    if (appliesPecr) section++;
    return section;
  })();

  policy += `---

## ${updateSection}. Updates to This Cookie Policy

We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. When we make material changes, we will:

- Update the "Last Updated" date at the top of this policy
- Display a notice on our Website
- Where required by law, obtain your consent to material changes

We encourage you to review this Cookie Policy periodically.

---

## ${updateSection + 1}. Contact Us

If you have any questions about our use of cookies or this Cookie Policy, please contact us:

**${companyName}**

**Email:** ${contactEmail}
**Website:** ${websiteUrl}

---

*This Cookie Policy was generated by SafeDocGen. While this document covers standard requirements, we recommend having a qualified attorney review it for your specific situation.*
`;

  return policy;
}

export function generateCookiePlainText(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gm, '\n$1\n')
    .replace(/^## (.*$)/gm, '\n\n$1\n' + '='.repeat(50))
    .replace(/^# (.*$)/gm, '$1\n' + '='.repeat(50))
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^- /gm, '• ')
    .replace(/\|.*\|/g, '')
    .replace(/---/g, '\n' + '-'.repeat(50) + '\n');
}

export function generateCookieHTML(markdown: string): string {
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
  <title>Cookie Policy</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; max-width: 900px; margin: 0 auto; padding: 40px 20px; color: #333; }
    h1 { font-size: 2.5em; border-bottom: 3px solid #333; padding-bottom: 15px; }
    h2 { font-size: 1.5em; margin-top: 40px; color: #222; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
    h3 { font-size: 1.2em; margin-top: 25px; color: #444; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9em; }
    th, td { padding: 12px; border: 1px solid #ddd; text-align: left; }
    th { background: #f5f5f5; }
    hr { border: none; border-top: 1px solid #eee; margin: 30px 0; }
  </style>
</head>
<body><article><p>${html}</p></article></body>
</html>`;
}
