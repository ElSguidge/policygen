export interface DisclaimerData {
  // Company Info
  companyName: string;
  websiteUrl: string;
  contactEmail: string;

  // Business Type
  businessType: 'blog' | 'ecommerce' | 'saas' | 'consulting' | 'health' | 'finance' | 'legal' | 'education' | 'general';

  // Content Types
  hasUserContent: boolean;
  hasProductReviews: boolean;
  hasAffiliateLinks: boolean;
  hasSponsored: boolean;
  hasMedicalContent: boolean;
  hasFinancialContent: boolean;
  hasLegalContent: boolean;
  hasFitnessContent: boolean;
  hasTechnicalContent: boolean;
  hasTestimonials: boolean;

  // Disclaimers Needed
  includeGeneralDisclaimer: boolean;
  includeNoGuarantee: boolean;
  includeProfessionalAdvice: boolean;
  includeExternalLinks: boolean;
  includeAffiliateDisclosure: boolean;
  includeSponsoredDisclosure: boolean;
  includeTestimonialsDisclaimer: boolean;
  includeErrorsOmissions: boolean;
  includeFairUse: boolean;
  includeViewsExpressed: boolean;
  includeProductDisclaimer: boolean;
  includeEmailDisclaimer: boolean;

  // Specifics
  affiliateNetworks: string;
  sponsoredPartners: string;

  // Additional
  effectiveDate: string;
}

export const defaultDisclaimerData: DisclaimerData = {
  companyName: '',
  websiteUrl: '',
  contactEmail: '',

  businessType: 'general',

  hasUserContent: false,
  hasProductReviews: false,
  hasAffiliateLinks: false,
  hasSponsored: false,
  hasMedicalContent: false,
  hasFinancialContent: false,
  hasLegalContent: false,
  hasFitnessContent: false,
  hasTechnicalContent: false,
  hasTestimonials: false,

  includeGeneralDisclaimer: true,
  includeNoGuarantee: true,
  includeProfessionalAdvice: true,
  includeExternalLinks: true,
  includeAffiliateDisclosure: false,
  includeSponsoredDisclosure: false,
  includeTestimonialsDisclaimer: false,
  includeErrorsOmissions: true,
  includeFairUse: false,
  includeViewsExpressed: true,
  includeProductDisclaimer: false,
  includeEmailDisclaimer: false,

  affiliateNetworks: '',
  sponsoredPartners: '',

  effectiveDate: new Date().toISOString().split('T')[0],
};

export function generateDisclaimer(data: DisclaimerData): string {
  const {
    companyName,
    websiteUrl,
    contactEmail,
    businessType,
    hasUserContent,
    hasProductReviews,
    hasAffiliateLinks,
    hasSponsored,
    hasMedicalContent,
    hasFinancialContent,
    hasLegalContent,
    hasFitnessContent,
    hasTechnicalContent,
    hasTestimonials,
    includeGeneralDisclaimer,
    includeNoGuarantee,
    includeProfessionalAdvice,
    includeExternalLinks,
    includeAffiliateDisclosure,
    includeSponsoredDisclosure,
    includeTestimonialsDisclaimer,
    includeErrorsOmissions,
    includeFairUse,
    includeViewsExpressed,
    includeProductDisclaimer,
    includeEmailDisclaimer,
    affiliateNetworks,
    sponsoredPartners,
    effectiveDate,
  } = data;

  const formattedDate = new Date(effectiveDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let disclaimer = `# Disclaimer

**Last Updated:** ${formattedDate}

**Effective Date:** ${formattedDate}

---

## Introduction

The information provided by ${companyName} ("we," "us," or "our") on ${websiteUrl} (the "Website") is for general informational purposes only. All information on the Website is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website.

**UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE WEBSITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE WEBSITE.** Your use of the Website and your reliance on any information on the Website is solely at your own risk.

`;

  if (includeGeneralDisclaimer) {
    disclaimer += `---

## General Disclaimer

The Website may contain (or you may be sent through the Website) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.

**WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING.**

`;
  }

  if (includeProfessionalAdvice) {
    disclaimer += `---

## No Professional Advice

The Website cannot and does not contain ${businessType === 'health' || hasMedicalContent ? 'medical' : businessType === 'finance' || hasFinancialContent ? 'financial' : businessType === 'legal' || hasLegalContent ? 'legal' : 'professional'} advice. The ${businessType === 'health' || hasMedicalContent ? 'health' : businessType === 'finance' || hasFinancialContent ? 'financial' : businessType === 'legal' || hasLegalContent ? 'legal' : ''} information is provided for general informational and educational purposes only and is not a substitute for professional advice.

Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of ${businessType === 'health' || hasMedicalContent ? 'medical' : businessType === 'finance' || hasFinancialContent ? 'financial' : businessType === 'legal' || hasLegalContent ? 'legal' : 'professional'} advice.

**THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THE WEBSITE IS SOLELY AT YOUR OWN RISK.**

`;
  }

  if (hasMedicalContent) {
    disclaimer += `---

## Medical Disclaimer

The information provided on this Website is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

**NEVER DISREGARD PROFESSIONAL MEDICAL ADVICE OR DELAY IN SEEKING IT BECAUSE OF SOMETHING YOU HAVE READ ON THIS WEBSITE.**

If you think you may have a medical emergency, call your doctor, go to the emergency department, or call 911 immediately.

${companyName} does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Website. Reliance on any information provided by ${companyName}, ${companyName} employees, or other visitors to the Website is solely at your own risk.

The Website may contain health- or medical-related materials that are sexually explicit. If you find these materials offensive, you may not want to use our Website.

`;
  }

  if (hasFinancialContent) {
    disclaimer += `---

## Financial Disclaimer

The information provided on this Website does not constitute investment advice, financial advice, trading advice, or any other sort of advice, and you should not treat any of the Website's content as such.

${companyName} does not recommend that any cryptocurrency, security, or financial instrument should be bought, sold, or held by you. Do conduct your own due diligence and consult your financial advisor before making any investment decisions.

**PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.**

By using this Website, you agree that ${companyName} is not responsible for any investment decision made by you. You should not make any financial, legal, or other decisions without first conducting your own research and due diligence.

Nothing contained on the Website should be construed as a recommendation to buy or sell any investment. Any decision made shall be at your own risk and ${companyName} shall not be liable for any losses you may incur.

`;
  }

  if (hasLegalContent) {
    disclaimer += `---

## Legal Disclaimer

The information provided on this Website is not legal advice and should not be relied upon as such. Legal information is not the same as legal advice. Consult a licensed attorney for legal advice.

${companyName} does not recommend or endorse any specific attorneys or law firms. The information provided is for general informational purposes only and may not reflect current legal developments.

**IF YOU REQUIRE LEGAL ADVICE, PLEASE CONSULT A LICENSED ATTORNEY IN YOUR JURISDICTION.**

`;
  }

  if (hasFitnessContent) {
    disclaimer += `---

## Fitness and Exercise Disclaimer

The fitness and exercise information provided on this Website is for general informational purposes only. Always consult your physician or qualified health professional before beginning any new exercise program, diet, or wellness routine, especially if you have pre-existing health conditions.

**YOU SHOULD UNDERSTAND THAT WHEN PARTICIPATING IN ANY EXERCISE OR EXERCISE PROGRAM, THERE IS THE POSSIBILITY OF PHYSICAL INJURY.**

If you engage in any exercise or exercise program from this Website, you agree that you do so at your own risk, are voluntarily participating in these activities, and assume all risk of injury to yourself.

${companyName} is not a licensed medical care provider and represents that it has no expertise in diagnosing, examining, or treating medical conditions of any kind.

`;
  }

  if (includeNoGuarantee) {
    disclaimer += `---

## No Guarantees

While we strive to provide accurate and up-to-date information, we make no guarantees about the completeness, reliability, or accuracy of this information. Any action you take upon the information on this Website is strictly at your own risk, and we will not be liable for any losses or damages in connection with the use of our Website.

This Website may contain information about products, services, or results that may not be typical. Results vary and depend on many factors. We do not guarantee that you will achieve similar results.

`;
  }

  if (includeErrorsOmissions) {
    disclaimer += `---

## Errors and Omissions

While we have made every attempt to ensure that the information contained on the Website is correct, ${companyName} is not responsible for any errors or omissions, or for the results obtained from the use of this information.

All information on the Website is provided "as is," with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information, and without warranty of any kind, express or implied.

In no event will ${companyName}, its related partnerships or corporations, or the partners, agents, or employees thereof, be liable to you or anyone else for any decision made or action taken in reliance on the information in this Website.

`;
  }

  if (includeExternalLinks) {
    disclaimer += `---

## External Links Disclaimer

This Website may contain links to external websites that are not provided or maintained by or in any way affiliated with ${companyName}.

Please note that ${companyName} does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.

We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.

`;
  }

  if (hasUserContent) {
    disclaimer += `---

## User-Generated Content Disclaimer

This Website may include content provided by users, including comments, forum posts, reviews, and other submissions. The views and opinions expressed in user-generated content are those of the authors and do not necessarily reflect the views of ${companyName}.

${companyName} does not endorse and has no control over the content posted by users. We are not responsible for any user-generated content and expressly disclaim all liability in connection with such content.

Users are solely responsible for any content they post and the consequences of posting or publishing it.

`;
  }

  if (includeAffiliateDisclosure || hasAffiliateLinks) {
    disclaimer += `---

## Affiliate Disclosure

This Website may contain affiliate links. This means if you click on the link and purchase an item, ${companyName} may receive an affiliate commission at no extra cost to you.

${affiliateNetworks ? `We are a participant in ${affiliateNetworks} and other affiliate advertising programs designed to provide a means for us to earn advertising fees by advertising and linking to partner sites.\n\n` : ''}

**FTC Disclosure:** In accordance with the Federal Trade Commission's guidelines concerning the use of endorsements and testimonials in advertising, please be aware that:

- Affiliate links/codes are used throughout this Website
- ${companyName} may receive compensation for products or services mentioned
- All opinions expressed are our own and not influenced by compensation
- We only recommend products/services we believe will add value to our readers

The affiliate relationships do not influence our editorial content. Our reviews and recommendations are based on our honest opinions and experiences.

`;
  }

  if (includeSponsoredDisclosure || hasSponsored) {
    disclaimer += `---

## Sponsored Content Disclosure

Some content on this Website may be sponsored by third parties. Sponsored content is created in collaboration with partners who compensate us for creating such content.

${sponsoredPartners ? `Our sponsored content partners include: ${sponsoredPartners}\n\n` : ''}

**Sponsored content will always be clearly marked** as "Sponsored," "Paid Partnership," "Ad," or similar designation to distinguish it from editorial content.

While we maintain editorial standards for sponsored content, the sponsoring party may have input on the subject matter and messaging. All sponsored content reflects our honest opinions.

`;
  }

  if (hasProductReviews) {
    disclaimer += `---

## Product Reviews Disclaimer

Product reviews on this Website represent the personal opinions and experiences of the reviewer. Individual results may vary.

Reviews may be based on:
- Products received free of charge for review purposes
- Products purchased by the reviewer
- Products provided through affiliate programs

Where products were received free of charge or where affiliate relationships exist, this will be disclosed in the review.

We do not guarantee that you will experience the same results as the reviewer. Your experience may vary based on factors including but not limited to: usage conditions, individual needs, and product variations.

`;
  }

  if (includeTestimonialsDisclaimer || hasTestimonials) {
    disclaimer += `---

## Testimonials Disclaimer

This Website may contain testimonials from customers and users of our products or services. These testimonials reflect the personal experiences and opinions of the individuals who provided them.

**Testimonials are not a guarantee of future results.** Individual results will vary. The experiences described in testimonials may not be typical of all users, and we do not make any claims that you will achieve similar results.

Some testimonials may have been edited for clarity or brevity. Where testimonials describe specific results, we have made reasonable efforts to verify them, but we cannot guarantee their accuracy.

Testimonials do not constitute a guarantee, warranty, or prediction regarding the outcome of any consultation with us.

`;
  }

  if (hasTechnicalContent) {
    disclaimer += `---

## Technical Information Disclaimer

Technical information, tutorials, code samples, and programming guidance provided on this Website are for educational and informational purposes only.

${companyName} makes no representations or warranties regarding the accuracy, reliability, or security of any technical information provided. We are not responsible for any damage, data loss, or security vulnerabilities that may result from implementing any technical guidance from this Website.

**ALWAYS TEST CODE AND TECHNICAL IMPLEMENTATIONS IN A SAFE ENVIRONMENT BEFORE DEPLOYING TO PRODUCTION.**

You are solely responsible for ensuring that any technical implementations comply with applicable laws, regulations, and security standards.

`;
  }

  if (includeProductDisclaimer) {
    disclaimer += `---

## Product Information Disclaimer

Product descriptions, specifications, pricing, and availability are subject to change without notice. We make reasonable efforts to display accurate information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.

If a product offered by ${companyName} is not as described, your sole remedy is to return it in unused condition in accordance with our Return Policy.

Colors, sizes, and dimensions shown may vary slightly from actual products due to photography, screen display variations, and manufacturing tolerances.

`;
  }

  if (includeFairUse) {
    disclaimer += `---

## Fair Use Disclaimer

This Website may contain copyrighted material, the use of which may not have been specifically authorized by the copyright owner. This material is made available for the purposes of news reporting, education, research, commentary, and criticism, which we believe constitutes "fair use" under Section 107 of the U.S. Copyright Law.

If you wish to use copyrighted material from this Website for purposes that go beyond "fair use," you must obtain permission from the copyright owner.

We make every effort to credit copyright holders where possible. If you believe that any content on this Website infringes upon your copyright, please contact us at ${contactEmail}.

`;
  }

  if (includeViewsExpressed) {
    disclaimer += `---

## Views Expressed Disclaimer

Any views or opinions represented on this Website are personal and belong solely to ${companyName} and do not represent those of people, institutions, or organizations that the owner may or may not be associated with in professional or personal capacity, unless explicitly stated.

Any views or opinions are not intended to malign any religion, ethnic group, club, organization, company, or individual.

`;
  }

  if (includeEmailDisclaimer) {
    disclaimer += `---

## Email Disclaimer

The information contained in any email sent from ${companyName} or obtained from this Website is intended only for the personal and confidential use of the designated recipient(s).

If you are not an intended recipient of an email, you are hereby notified that you have received this document in error, and any review, dissemination, distribution, or copying of this message is strictly prohibited. If you have received an email in error, please notify the sender immediately and delete the original message.

Emails may contain confidential and/or privileged information. The recipient should check emails and any attachments for viruses. ${companyName} accepts no liability for any damage caused by any virus transmitted by email.

`;
  }

  disclaimer += `---

## Changes to This Disclaimer

We reserve the right to modify this Disclaimer at any time. Changes will be posted on this page with an updated effective date.

We encourage you to review this Disclaimer periodically for any changes. Changes to this Disclaimer are effective when they are posted on this page.

---

## Contact Us

If you have any questions about this Disclaimer, please contact us:

**${companyName}**

**Email:** ${contactEmail}
**Website:** ${websiteUrl}

---

*This Disclaimer was generated by SafeDocGen. While this document covers common scenarios, we recommend having a qualified attorney review it for your specific situation.*
`;

  return disclaimer;
}

export function generateDisclaimerPlainText(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gm, '\n$1\n')
    .replace(/^## (.*$)/gm, '\n\n$1\n' + '='.repeat(50))
    .replace(/^# (.*$)/gm, '$1\n' + '='.repeat(50))
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^- /gm, '• ')
    .replace(/---/g, '\n' + '-'.repeat(50) + '\n');
}

export function generateDisclaimerHTML(markdown: string): string {
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
  <title>Disclaimer</title>
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
