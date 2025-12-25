export interface PolicyFormData {
  // Company Info
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  contactAddress: string;
  country: string;

  // Data Collection
  collectsEmail: boolean;
  collectsName: boolean;
  collectsPhone: boolean;
  collectsAddress: boolean;
  collectsPaymentInfo: boolean;
  collectsUsageData: boolean;
  collectsCookies: boolean;
  collectsLocationData: boolean;
  collectsDeviceInfo: boolean;
  collectsSocialProfiles: boolean;
  collectsEmploymentInfo: boolean;
  collectsHealthInfo: boolean;

  // Third Party Services
  usesGoogleAnalytics: boolean;
  usesStripe: boolean;
  usesPaypal: boolean;
  usesSocialLogin: boolean;
  usesMailchimp: boolean;
  usesIntercom: boolean;
  usesHotjar: boolean;
  usesCloudflare: boolean;
  usesAWS: boolean;
  customThirdParties: string;

  // Data Usage
  usesAnalytics: boolean;
  usesMarketing: boolean;
  usesPersonalization: boolean;
  usesAutomatedDecisions: boolean;
  sharesWithThirdParties: boolean;
  sellsData: boolean;
  transfersInternationally: boolean;

  // Compliance
  gdprCompliant: boolean;
  ccpaCompliant: boolean;
  childrenUnder13: boolean;
  hipaaRelevant: boolean;

  // Data Retention
  retentionPeriod: 'session' | '1year' | '3years' | '5years' | '7years' | 'indefinite';

  // Additional
  effectiveDate: string;
  hasDataProtectionOfficer: boolean;
  dpoEmail: string;
}

export const defaultFormData: PolicyFormData = {
  companyName: '',
  websiteUrl: '',
  contactEmail: '',
  contactAddress: '',
  country: 'United States',

  collectsEmail: true,
  collectsName: true,
  collectsPhone: false,
  collectsAddress: false,
  collectsPaymentInfo: false,
  collectsUsageData: true,
  collectsCookies: true,
  collectsLocationData: false,
  collectsDeviceInfo: true,
  collectsSocialProfiles: false,
  collectsEmploymentInfo: false,
  collectsHealthInfo: false,

  usesGoogleAnalytics: true,
  usesStripe: false,
  usesPaypal: false,
  usesSocialLogin: false,
  usesMailchimp: false,
  usesIntercom: false,
  usesHotjar: false,
  usesCloudflare: false,
  usesAWS: false,
  customThirdParties: '',

  usesAnalytics: true,
  usesMarketing: false,
  usesPersonalization: false,
  usesAutomatedDecisions: false,
  sharesWithThirdParties: false,
  sellsData: false,
  transfersInternationally: false,

  gdprCompliant: true,
  ccpaCompliant: true,
  childrenUnder13: false,
  hipaaRelevant: false,

  retentionPeriod: '3years',

  effectiveDate: new Date().toISOString().split('T')[0],
  hasDataProtectionOfficer: false,
  dpoEmail: '',
};
