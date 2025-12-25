export interface RefundPolicyData {
  // Company Info
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;

  // Business Type
  businessType: 'ecommerce' | 'saas' | 'services' | 'digital_products' | 'subscriptions' | 'physical_products';

  // Refund Terms
  offersRefunds: boolean;
  refundPeriodDays: number;
  refundConditions: 'unconditional' | 'conditional' | 'case_by_case';

  // For Physical Products
  shipsPhysicalProducts: boolean;
  acceptsReturns: boolean;
  returnPeriodDays: number;
  customerPaysReturnShipping: boolean;
  requiresOriginalPackaging: boolean;
  acceptsOpenedProducts: boolean;
  restockingFeePercent: number;

  // For Digital Products/Services
  sellsDigitalProducts: boolean;
  refundsDigitalProducts: boolean;
  digitalRefundConditions: string;

  // For Subscriptions
  hasSubscriptions: boolean;
  proratesRefunds: boolean;
  allowsCancellationAnytime: boolean;
  cancellationNoticeDays: number;

  // Refund Process
  refundMethod: 'original_payment' | 'store_credit' | 'choice';
  processingTimeDays: number;
  requiresProofOfPurchase: boolean;

  // Exceptions
  hasNonRefundableItems: boolean;
  nonRefundableItems: string[];

  // Exchanges
  offersExchanges: boolean;
  exchangePeriodDays: number;

  // Chargebacks
  addressesChargebacks: boolean;

  // Legal
  governingLaw: string;

  // Additional
  effectiveDate: string;
}

export const defaultRefundData: RefundPolicyData = {
  companyName: '',
  websiteUrl: '',
  contactEmail: '',
  contactPhone: '',
  contactAddress: '',

  businessType: 'ecommerce',

  offersRefunds: true,
  refundPeriodDays: 30,
  refundConditions: 'conditional',

  shipsPhysicalProducts: true,
  acceptsReturns: true,
  returnPeriodDays: 30,
  customerPaysReturnShipping: false,
  requiresOriginalPackaging: true,
  acceptsOpenedProducts: true,
  restockingFeePercent: 0,

  sellsDigitalProducts: false,
  refundsDigitalProducts: false,
  digitalRefundConditions: '',

  hasSubscriptions: false,
  proratesRefunds: false,
  allowsCancellationAnytime: true,
  cancellationNoticeDays: 0,

  refundMethod: 'original_payment',
  processingTimeDays: 7,
  requiresProofOfPurchase: true,

  hasNonRefundableItems: true,
  nonRefundableItems: ['Gift cards', 'Downloadable software products', 'Personalized or custom items', 'Perishable goods', 'Health and personal care items'],

  offersExchanges: true,
  exchangePeriodDays: 30,

  addressesChargebacks: true,

  governingLaw: 'Delaware',

  effectiveDate: new Date().toISOString().split('T')[0],
};

export function generateRefundPolicy(data: RefundPolicyData): string {
  const {
    companyName,
    websiteUrl,
    contactEmail,
    contactPhone,
    contactAddress,
    businessType,
    offersRefunds,
    refundPeriodDays,
    refundConditions,
    shipsPhysicalProducts,
    acceptsReturns,
    returnPeriodDays,
    customerPaysReturnShipping,
    requiresOriginalPackaging,
    acceptsOpenedProducts,
    restockingFeePercent,
    sellsDigitalProducts,
    refundsDigitalProducts,
    digitalRefundConditions,
    hasSubscriptions,
    proratesRefunds,
    allowsCancellationAnytime,
    cancellationNoticeDays,
    refundMethod,
    processingTimeDays,
    requiresProofOfPurchase,
    hasNonRefundableItems,
    nonRefundableItems,
    offersExchanges,
    exchangePeriodDays,
    addressesChargebacks,
    governingLaw,
    effectiveDate,
  } = data;

  const formattedDate = new Date(effectiveDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let policy = `# Refund and Return Policy

**Last Updated:** ${formattedDate}

**Effective Date:** ${formattedDate}

---

## 1. Overview

Thank you for shopping at ${companyName}. We value your business and want you to be completely satisfied with your purchase. This Refund and Return Policy outlines the terms and conditions for refunds, returns, and exchanges.

**Please read this policy carefully before making a purchase.** By completing a purchase, you acknowledge that you have read, understood, and agree to be bound by this policy.

`;

  if (offersRefunds) {
    policy += `---

## 2. Our Refund Guarantee

${refundConditions === 'unconditional' ? `
We offer a **${refundPeriodDays}-day unconditional money-back guarantee**. If you are not 100% satisfied with your purchase for any reason, you may return it within ${refundPeriodDays} days for a full refund, no questions asked.
` : refundConditions === 'conditional' ? `
We offer refunds within **${refundPeriodDays} days** of purchase, subject to the conditions outlined in this policy. To be eligible for a refund, items must meet the criteria specified below.
` : `
Refund requests are evaluated on a **case-by-case basis**. We review each request individually and will work with you to reach a fair resolution. Please contact us to discuss your specific situation.
`}

`;
  } else {
    policy += `---

## 2. Refund Policy

**All sales are final.** We do not offer refunds except where required by applicable law. Please review your order carefully before completing your purchase.

If you believe you have received a defective or incorrect item, please contact us at ${contactEmail}.

`;
  }

  if (shipsPhysicalProducts && acceptsReturns) {
    policy += `---

## 3. Returns (Physical Products)

### 3.1 Return Eligibility

To be eligible for a return, items must:

- Be returned within **${returnPeriodDays} days** of delivery
${requiresProofOfPurchase ? '- Include proof of purchase (order confirmation, receipt, or order number)\n' : ''}${requiresOriginalPackaging ? '- Be in original packaging\n' : ''}${acceptsOpenedProducts ? '- Be in original or gently used condition\n' : '- Be unopened and unused\n'}- Not be on our list of non-refundable items (see Section ${sellsDigitalProducts ? '5' : hasSubscriptions ? '5' : '4'})

### 3.2 Return Process

**To initiate a return:**

1. **Contact us** at ${contactEmail}${contactPhone ? ` or call ${contactPhone}` : ''} to request a return authorization
2. **Pack the item** securely in ${requiresOriginalPackaging ? 'its original packaging' : 'appropriate packaging'}
3. **Ship the item** to our return address (provided in your return authorization)
4. **Include** your order number and return authorization number with the shipment

### 3.3 Return Shipping

${customerPaysReturnShipping ? `
**You are responsible for return shipping costs.** We recommend using a trackable shipping method, as we cannot guarantee that we will receive your returned item.

Return shipping costs are non-refundable, except in cases where:
- We shipped the wrong item
- The item was defective or damaged upon arrival
` : `
**We will cover return shipping costs** for:
- Defective or damaged items
- Incorrect items shipped
- Returns within our satisfaction guarantee period

For all other returns, return shipping costs may be deducted from your refund.
`}

### 3.4 Condition of Returned Items

${acceptsOpenedProducts ? `
We accept returns of opened items, provided they are:
- In good condition
- Include all original components and accessories
- Not damaged beyond normal inspection
` : `
Items must be **unopened and unused** to qualify for a return. Opened items cannot be returned except in cases of defect or damage.
`}

${restockingFeePercent > 0 ? `
### 3.5 Restocking Fee

A **${restockingFeePercent}% restocking fee** may be deducted from your refund for:
- Items returned in opened packaging
- Items missing original accessories or documentation
- Items showing signs of use
` : ''}

### 3.${restockingFeePercent > 0 ? '6' : '5'} Inspection and Processing

Once we receive your return, we will:
1. Inspect the item to ensure it meets our return criteria
2. Process your refund or exchange within **${processingTimeDays} business days**
3. Send you an email confirmation of the refund or exchange

`;
  }

  if (sellsDigitalProducts) {
    const digitalSection = shipsPhysicalProducts ? 4 : 3;

    policy += `---

## ${digitalSection}. Digital Products

### ${digitalSection}.1 Nature of Digital Products

Digital products (including but not limited to software, downloadable content, online courses, and digital subscriptions) are delivered electronically and cannot be physically returned.

### ${digitalSection}.2 Refund Policy for Digital Products

${refundsDigitalProducts ? `
We offer refunds for digital products under the following conditions:

${digitalRefundConditions || `- The product does not function as described
- Technical issues prevent you from accessing or using the product
- Refund request is made within ${refundPeriodDays} days of purchase`}

**To request a refund for a digital product:**
1. Contact us at ${contactEmail}
2. Provide your order number and describe the issue
3. Allow up to ${processingTimeDays} business days for review

**Please note:** Once a refund is issued, your access to the digital product will be revoked.
` : `
**Digital product sales are final.** Due to the nature of digital products, we cannot offer refunds once the product has been delivered or accessed.

Exceptions may be made for:
- Products that do not function as described
- Accidental duplicate purchases
- Technical issues preventing product access
`}

`;
  }

  if (hasSubscriptions) {
    const subSection = (() => {
      let s = 3;
      if (shipsPhysicalProducts) s++;
      if (sellsDigitalProducts) s++;
      return s;
    })();

    policy += `---

## ${subSection}. Subscription Refunds and Cancellations

### ${subSection}.1 Cancellation Policy

${allowsCancellationAnytime ? `
You may cancel your subscription **at any time** through your account settings or by contacting us at ${contactEmail}.
` : `
To cancel your subscription, you must provide **${cancellationNoticeDays} days notice** before your next billing date.
`}

### ${subSection}.2 Effect of Cancellation

When you cancel your subscription:
- You will retain access to your subscription benefits until the end of your current billing period
- Your subscription will not renew at the end of the billing period
- ${proratesRefunds ? 'You may receive a prorated refund for unused time' : 'No refund will be issued for the current billing period'}

### ${subSection}.3 Refunds for Subscriptions

${proratesRefunds ? `
**Prorated refunds** are available for annual subscriptions cancelled within ${refundPeriodDays} days of purchase. Monthly subscriptions are not eligible for prorated refunds.

Prorated refunds are calculated based on the remaining full months in your subscription term, minus any discounts received.
` : `
Subscription payments are **non-refundable**. When you cancel, you will continue to have access until the end of your current billing period, but no refund will be issued.

Exceptions may be made for:
- Billing errors
- Service outages exceeding 48 hours
- Account security breaches
`}

`;
  }

  const nonRefundSection = (() => {
    let s = 3;
    if (shipsPhysicalProducts) s++;
    if (sellsDigitalProducts) s++;
    if (hasSubscriptions) s++;
    return s;
  })();

  if (hasNonRefundableItems && nonRefundableItems.length > 0) {
    policy += `---

## ${nonRefundSection}. Non-Refundable Items

The following items are **not eligible for refund or return**:

${nonRefundableItems.map(item => `- ${item}`).join('\n')}

- Items marked as "Final Sale" or "Non-Refundable" at the time of purchase
- Items damaged due to misuse, neglect, or unauthorized modification
- Items returned without prior authorization

`;
  }

  if (offersExchanges) {
    const exchangeSection = hasNonRefundableItems ? nonRefundSection + 1 : nonRefundSection;

    policy += `---

## ${exchangeSection}. Exchanges

### ${exchangeSection}.1 Exchange Policy

We offer exchanges within **${exchangePeriodDays} days** of ${shipsPhysicalProducts ? 'delivery' : 'purchase'}. To qualify for an exchange:

- The item must meet our return eligibility requirements
- The replacement item must be of equal or lesser value
- Additional payment may be required for items of greater value

### ${exchangeSection}.2 How to Request an Exchange

1. Contact us at ${contactEmail} to initiate an exchange
2. Specify the item you wish to exchange and your preferred replacement
3. Follow our return process to send back the original item
4. We will ship the replacement once we receive and inspect the return

**Note:** If the replacement item is unavailable, we will offer a refund instead.

`;
  }

  policy += `---

## ${offersExchanges ? (hasNonRefundableItems ? nonRefundSection + 2 : nonRefundSection + 1) : (hasNonRefundableItems ? nonRefundSection + 1 : nonRefundSection)}. Refund Methods and Processing

### How Refunds Are Issued

${refundMethod === 'original_payment' ? `
Refunds are issued to the **original payment method** used for the purchase:
- Credit/debit card refunds: 5-10 business days to appear on your statement
- PayPal refunds: 3-5 business days
- Bank transfers: 5-10 business days
` : refundMethod === 'store_credit' ? `
Refunds are issued as **store credit** that can be used for future purchases. Store credit:
- Never expires
- Cannot be redeemed for cash
- Is non-transferable
` : `
You may choose to receive your refund as:
- Credit to your original payment method
- Store credit for future purchases

Store credit refunds are processed immediately, while payment method refunds may take 5-10 business days.
`}

### Processing Time

- We will process your refund within **${processingTimeDays} business days** of receiving and inspecting your return
- You will receive an email confirmation when your refund has been processed
- ${shipsPhysicalProducts ? 'Return shipping time is not included in processing time' : ''}

`;

  if (addressesChargebacks) {
    const chargebackSection = offersExchanges ?
      (hasNonRefundableItems ? nonRefundSection + 3 : nonRefundSection + 2) :
      (hasNonRefundableItems ? nonRefundSection + 2 : nonRefundSection + 1);

    policy += `---

## ${chargebackSection}. Chargebacks

We kindly request that you contact us at ${contactEmail} before initiating a chargeback with your bank or credit card company.

**Why contact us first?**
- We can often resolve issues faster than the chargeback process
- We are committed to finding a fair resolution
- Chargebacks can result in additional fees and complications

If you initiate a chargeback for a purchase that does not qualify for a refund under this policy, we reserve the right to:
- Suspend or terminate your account
- Dispute the chargeback with the payment processor
- Pursue recovery of any fees incurred

`;
  }

  const contactSection = (() => {
    let s = nonRefundSection;
    if (hasNonRefundableItems) s++;
    if (offersExchanges) s++;
    s++; // For the refund methods section
    if (addressesChargebacks) s++;
    return s;
  })();

  policy += `---

## ${contactSection}. Damaged or Defective Items

If you receive a damaged or defective item:

1. **Contact us immediately** at ${contactEmail}
2. **Provide photos** of the damage or defect
3. **Include your order number** in your message

We will:
- Arrange for a replacement or refund at no additional cost to you
- Cover return shipping costs for damaged/defective items
- Process your claim within ${processingTimeDays} business days

**Please report damaged items within 48 hours of delivery** to ensure the fastest resolution.

---

## ${contactSection + 1}. Questions and Contact Information

If you have any questions about our Refund and Return Policy, please contact us:

**${companyName}**
${contactAddress ? `${contactAddress}\n\n` : ''}**Email:** ${contactEmail}
${contactPhone ? `**Phone:** ${contactPhone}\n` : ''}**Website:** ${websiteUrl}

Our customer service team is available Monday through Friday, 9 AM to 5 PM (EST).

---

## ${contactSection + 2}. Policy Updates

We reserve the right to modify this Refund and Return Policy at any time. Changes will be posted on this page with an updated effective date.

The policy in effect at the time of your purchase will apply to that transaction.

---

**Governing Law:** This policy is governed by the laws of the State of ${governingLaw}, United States.

---

*This Refund Policy was generated by PolicyGen. While this document covers standard requirements, we recommend having a qualified attorney review it for your specific situation.*
`;

  return policy;
}

export function generateRefundPlainText(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gm, '\n$1\n')
    .replace(/^## (.*$)/gm, '\n\n$1\n' + '='.repeat(50))
    .replace(/^# (.*$)/gm, '$1\n' + '='.repeat(50))
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^- /gm, '• ')
    .replace(/---/g, '\n' + '-'.repeat(50) + '\n');
}

export function generateRefundHTML(markdown: string): string {
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
  <title>Refund and Return Policy</title>
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
