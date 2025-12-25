'use client';

import { useState } from 'react';
import { PolicyFormData, defaultFormData } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PolicyFormProps {
  onGenerate: (data: PolicyFormData) => void;
}

export function PolicyForm({ onGenerate }: PolicyFormProps) {
  const [formData, setFormData] = useState<PolicyFormData>(defaultFormData);
  const [step, setStep] = useState(1);

  const updateField = <K extends keyof PolicyFormData>(
    field: K,
    value: PolicyFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const isStep1Valid = formData.companyName && formData.websiteUrl && formData.contactEmail;

  const totalSteps = 6;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: Company Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic details about your company or website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company / Website Name *</Label>
              <Input
                id="companyName"
                placeholder="Acme Inc."
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL *</Label>
              <Input
                id="websiteUrl"
                type="url"
                placeholder="https://example.com"
                value={formData.websiteUrl}
                onChange={(e) => updateField('websiteUrl', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="privacy@example.com"
                value={formData.contactEmail}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactAddress">Business Address (Optional)</Label>
              <Input
                id="contactAddress"
                placeholder="123 Main St, City, State, ZIP, Country"
                value={formData.contactAddress}
                onChange={(e) => updateField('contactAddress', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="effectiveDate">Effective Date</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => updateField('effectiveDate', e.target.value)}
              />
            </div>

            <div className="pt-4 border-t">
              <CheckboxField
                id="hasDataProtectionOfficer"
                label="We have a Data Protection Officer (DPO)"
                description="Required for certain organizations under GDPR"
                checked={formData.hasDataProtectionOfficer}
                onChange={(checked) => updateField('hasDataProtectionOfficer', checked)}
              />
              {formData.hasDataProtectionOfficer && (
                <div className="mt-3 ml-6">
                  <Label htmlFor="dpoEmail">DPO Email</Label>
                  <Input
                    id="dpoEmail"
                    type="email"
                    placeholder="dpo@example.com"
                    value={formData.dpoEmail}
                    onChange={(e) => updateField('dpoEmail', e.target.value)}
                  />
                </div>
              )}
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
            >
              Next: Data Collection
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Data Collection */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Data Collection</CardTitle>
            <CardDescription>What information do you collect from users?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 mb-4">
              <h4 className="font-medium text-sm">Personal Identifiers</h4>
              <p className="text-xs text-muted-foreground">Basic contact and identity information</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                id="collectsName"
                label="Name"
                checked={formData.collectsName}
                onChange={(checked) => updateField('collectsName', checked)}
              />
              <CheckboxField
                id="collectsEmail"
                label="Email Address"
                checked={formData.collectsEmail}
                onChange={(checked) => updateField('collectsEmail', checked)}
              />
              <CheckboxField
                id="collectsPhone"
                label="Phone Number"
                checked={formData.collectsPhone}
                onChange={(checked) => updateField('collectsPhone', checked)}
              />
              <CheckboxField
                id="collectsAddress"
                label="Mailing Address"
                checked={formData.collectsAddress}
                onChange={(checked) => updateField('collectsAddress', checked)}
              />
              <CheckboxField
                id="collectsSocialProfiles"
                label="Social Media Profiles"
                checked={formData.collectsSocialProfiles}
                onChange={(checked) => updateField('collectsSocialProfiles', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-1 mb-4">
              <h4 className="font-medium text-sm">Technical & Usage Data</h4>
              <p className="text-xs text-muted-foreground">Automatically collected information</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                id="collectsUsageData"
                label="Usage Data (pages, clicks)"
                checked={formData.collectsUsageData}
                onChange={(checked) => updateField('collectsUsageData', checked)}
              />
              <CheckboxField
                id="collectsDeviceInfo"
                label="Device Information"
                checked={formData.collectsDeviceInfo}
                onChange={(checked) => updateField('collectsDeviceInfo', checked)}
              />
              <CheckboxField
                id="collectsCookies"
                label="Cookies"
                checked={formData.collectsCookies}
                onChange={(checked) => updateField('collectsCookies', checked)}
              />
              <CheckboxField
                id="collectsLocationData"
                label="Location Data"
                checked={formData.collectsLocationData}
                onChange={(checked) => updateField('collectsLocationData', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-1 mb-4">
              <h4 className="font-medium text-sm">Sensitive Information</h4>
              <p className="text-xs text-muted-foreground">Requires extra care and explicit consent</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                id="collectsPaymentInfo"
                label="Payment Information"
                checked={formData.collectsPaymentInfo}
                onChange={(checked) => updateField('collectsPaymentInfo', checked)}
              />
              <CheckboxField
                id="collectsEmploymentInfo"
                label="Employment Information"
                checked={formData.collectsEmploymentInfo}
                onChange={(checked) => updateField('collectsEmploymentInfo', checked)}
              />
              <CheckboxField
                id="collectsHealthInfo"
                label="Health Information"
                description="Triggers HIPAA considerations"
                checked={formData.collectsHealthInfo}
                onChange={(checked) => {
                  updateField('collectsHealthInfo', checked);
                  if (checked) updateField('hipaaRelevant', true);
                }}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(3)}>
                Next: Third-Party Services
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Third-Party Services */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
            <CardDescription>What services do you use that process user data?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 mb-4">
              <h4 className="font-medium text-sm">Analytics & Tracking</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                id="usesGoogleAnalytics"
                label="Google Analytics"
                checked={formData.usesGoogleAnalytics}
                onChange={(checked) => updateField('usesGoogleAnalytics', checked)}
              />
              <CheckboxField
                id="usesHotjar"
                label="Hotjar"
                checked={formData.usesHotjar}
                onChange={(checked) => updateField('usesHotjar', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-1 mb-4">
              <h4 className="font-medium text-sm">Payment Processing</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                id="usesStripe"
                label="Stripe"
                checked={formData.usesStripe}
                onChange={(checked) => updateField('usesStripe', checked)}
              />
              <CheckboxField
                id="usesPaypal"
                label="PayPal"
                checked={formData.usesPaypal}
                onChange={(checked) => updateField('usesPaypal', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-1 mb-4">
              <h4 className="font-medium text-sm">Communication & Support</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                id="usesMailchimp"
                label="Mailchimp"
                checked={formData.usesMailchimp}
                onChange={(checked) => updateField('usesMailchimp', checked)}
              />
              <CheckboxField
                id="usesIntercom"
                label="Intercom"
                checked={formData.usesIntercom}
                onChange={(checked) => updateField('usesIntercom', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-1 mb-4">
              <h4 className="font-medium text-sm">Infrastructure</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                id="usesCloudflare"
                label="Cloudflare"
                checked={formData.usesCloudflare}
                onChange={(checked) => updateField('usesCloudflare', checked)}
              />
              <CheckboxField
                id="usesAWS"
                label="Amazon Web Services"
                checked={formData.usesAWS}
                onChange={(checked) => updateField('usesAWS', checked)}
              />
              <CheckboxField
                id="usesSocialLogin"
                label="Social Login (Google, Facebook, etc.)"
                checked={formData.usesSocialLogin}
                onChange={(checked) => updateField('usesSocialLogin', checked)}
              />
            </div>

            <div className="pt-4 border-t">
              <Label htmlFor="customThirdParties">Other Third-Party Services</Label>
              <Textarea
                id="customThirdParties"
                placeholder="List any other services that process user data..."
                value={formData.customThirdParties}
                onChange={(e) => updateField('customThirdParties', e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(4)}>
                Next: Data Usage
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Data Usage */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Data Usage & Sharing</CardTitle>
            <CardDescription>How do you use and share collected data?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <CheckboxField
                id="usesAnalytics"
                label="Analytics and reporting"
                description="Analyze usage patterns to improve your services"
                checked={formData.usesAnalytics}
                onChange={(checked) => updateField('usesAnalytics', checked)}
              />
              <CheckboxField
                id="usesMarketing"
                label="Marketing communications"
                description="Send promotional emails or run ad campaigns"
                checked={formData.usesMarketing}
                onChange={(checked) => updateField('usesMarketing', checked)}
              />
              <CheckboxField
                id="usesPersonalization"
                label="Personalization"
                description="Customize content based on user behavior"
                checked={formData.usesPersonalization}
                onChange={(checked) => updateField('usesPersonalization', checked)}
              />
              <CheckboxField
                id="usesAutomatedDecisions"
                label="Automated decision-making"
                description="Use algorithms for fraud detection, recommendations, etc."
                checked={formData.usesAutomatedDecisions}
                onChange={(checked) => updateField('usesAutomatedDecisions', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm">Data Sharing</h4>
              <CheckboxField
                id="sharesWithThirdParties"
                label="Share data with third parties"
                description="Beyond service providers necessary for operations"
                checked={formData.sharesWithThirdParties}
                onChange={(checked) => updateField('sharesWithThirdParties', checked)}
              />
              <CheckboxField
                id="sellsData"
                label="Sell personal data"
                description="Important: Requires prominent opt-out mechanism"
                checked={formData.sellsData}
                onChange={(checked) => updateField('sellsData', checked)}
              />
              <CheckboxField
                id="transfersInternationally"
                label="Transfer data internationally"
                description="Store or process data outside user's country"
                checked={formData.transfersInternationally}
                onChange={(checked) => updateField('transfersInternationally', checked)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(5)}>
                Next: Data Retention
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Data Retention */}
      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Data Retention</CardTitle>
            <CardDescription>How long do you keep user data?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Retention Period</Label>
              <Select
                value={formData.retentionPeriod}
                onValueChange={(value) =>
                  updateField('retentionPeriod', value as PolicyFormData['retentionPeriod'])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="session">Session only (deleted when user leaves)</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="3years">3 years (common default)</SelectItem>
                  <SelectItem value="5years">5 years</SelectItem>
                  <SelectItem value="7years">7 years (tax/legal compliance)</SelectItem>
                  <SelectItem value="indefinite">Indefinite (until deletion requested)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose how long you retain personal data after the user&apos;s last interaction.
                Shorter periods are more privacy-friendly.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(4)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(6)}>
                Next: Compliance
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 6: Compliance */}
      {step === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>Compliance & Regulations</CardTitle>
            <CardDescription>Which regulations apply to your business?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <CheckboxField
                id="gdprCompliant"
                label="GDPR Compliance"
                description="For users in the EU, UK, or Switzerland. Adds detailed rights section."
                checked={formData.gdprCompliant}
                onChange={(checked) => updateField('gdprCompliant', checked)}
              />
              <CheckboxField
                id="ccpaCompliant"
                label="CCPA/CPRA Compliance"
                description="For California residents. Adds California-specific rights."
                checked={formData.ccpaCompliant}
                onChange={(checked) => updateField('ccpaCompliant', checked)}
              />
              <CheckboxField
                id="childrenUnder13"
                label="May collect data from children under 13"
                description="Adds COPPA compliance section with parental consent requirements"
                checked={formData.childrenUnder13}
                onChange={(checked) => updateField('childrenUnder13', checked)}
              />
              <CheckboxField
                id="hipaaRelevant"
                label="Handle health information (HIPAA)"
                description="Adds health information handling section"
                checked={formData.hipaaRelevant}
                onChange={(checked) => updateField('hipaaRelevant', checked)}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">Automatically Included</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>- Virginia VCDPA, Colorado CPA, Connecticut CTDPA, Utah UCPA rights</li>
                <li>- Nevada opt-out rights</li>
                <li>- Data security measures section</li>
                <li>- Data breach notification procedures</li>
                <li>- Third-party links disclaimer</li>
                <li>- Policy update procedures</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(5)}>
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Generate Privacy Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress indicator */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(s)}
            className={`h-2 w-8 rounded-full transition-colors ${
              s <= step ? 'bg-primary' : 'bg-gray-200'
            }`}
            aria-label={`Go to step ${s}`}
          />
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Step {step} of {totalSteps}
      </p>
    </form>
  );
}

function CheckboxField({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start space-x-3">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        className="mt-0.5"
      />
      <div className="space-y-0.5">
        <Label htmlFor={id} className="cursor-pointer font-medium">
          {label}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
