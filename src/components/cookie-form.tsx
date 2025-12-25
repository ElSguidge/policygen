'use client';

import { useState } from 'react';
import { CookiePolicyData, defaultCookieData } from '@/lib/generators/cookie-policy';
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

interface CookieFormProps {
  onGenerate: (data: CookiePolicyData) => void;
}

export function CookieForm({ onGenerate }: CookieFormProps) {
  const [formData, setFormData] = useState<CookiePolicyData>(defaultCookieData);
  const [step, setStep] = useState(1);

  const updateField = <K extends keyof CookiePolicyData>(
    field: K,
    value: CookiePolicyData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const isStep1Valid = formData.companyName && formData.websiteUrl && formData.contactEmail;

  const totalSteps = 4;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: Company Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic details about your website</CardDescription>
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
              <Label htmlFor="effectiveDate">Effective Date</Label>
              <Input
                id="effectiveDate"
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => updateField('effectiveDate', e.target.value)}
              />
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
            >
              Next: Cookie Types
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Cookie Types */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Cookie Types</CardTitle>
            <CardDescription>What types of cookies does your website use?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <CheckboxField
                id="usesEssentialCookies"
                label="Essential Cookies"
                description="Required for website to function (login, security, cart)"
                checked={formData.usesEssentialCookies}
                onChange={(checked) => updateField('usesEssentialCookies', checked)}
              />
              <CheckboxField
                id="usesPerformanceCookies"
                label="Performance / Analytics Cookies"
                description="Measure website performance and usage patterns"
                checked={formData.usesPerformanceCookies}
                onChange={(checked) => updateField('usesPerformanceCookies', checked)}
              />
              <CheckboxField
                id="usesFunctionalCookies"
                label="Functionality Cookies"
                description="Remember preferences like language and theme"
                checked={formData.usesFunctionalCookies}
                onChange={(checked) => updateField('usesFunctionalCookies', checked)}
              />
              <CheckboxField
                id="usesTargetingCookies"
                label="Targeting / Advertising Cookies"
                description="Deliver personalized ads and track ad performance"
                checked={formData.usesTargetingCookies}
                onChange={(checked) => updateField('usesTargetingCookies', checked)}
              />
              <CheckboxField
                id="usesSocialMediaCookies"
                label="Social Media Cookies"
                description="Enable social sharing and embedded content"
                checked={formData.usesSocialMediaCookies}
                onChange={(checked) => updateField('usesSocialMediaCookies', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm">Cookie Retention</h4>
              <div className="space-y-2">
                <Label htmlFor="persistentCookieMaxDays">Maximum Cookie Lifetime (days)</Label>
                <Select
                  value={formData.persistentCookieMaxDays.toString()}
                  onValueChange={(value) => updateField('persistentCookieMaxDays', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cookie lifetime" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year (365 days)</SelectItem>
                    <SelectItem value="730">2 years (730 days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            <CardTitle>Third-Party Cookie Services</CardTitle>
            <CardDescription>Which third-party services set cookies on your site?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 mb-4">
              <h4 className="font-medium text-sm">Analytics</h4>
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
              <h4 className="font-medium text-sm">Advertising</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                id="usesGoogleAds"
                label="Google Ads"
                checked={formData.usesGoogleAds}
                onChange={(checked) => updateField('usesGoogleAds', checked)}
              />
              <CheckboxField
                id="usesFacebookPixel"
                label="Facebook/Meta Pixel"
                checked={formData.usesFacebookPixel}
                onChange={(checked) => updateField('usesFacebookPixel', checked)}
              />
              <CheckboxField
                id="usesLinkedIn"
                label="LinkedIn Insight Tag"
                checked={formData.usesLinkedIn}
                onChange={(checked) => updateField('usesLinkedIn', checked)}
              />
              <CheckboxField
                id="usesTwitter"
                label="Twitter/X Pixel"
                checked={formData.usesTwitter}
                onChange={(checked) => updateField('usesTwitter', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-1 mb-4">
              <h4 className="font-medium text-sm">Payment</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                id="usesStripe"
                label="Stripe"
                checked={formData.usesStripe}
                onChange={(checked) => updateField('usesStripe', checked)}
              />
            </div>

            <div className="pt-4 border-t">
              <Label htmlFor="customCookies">Other Cookies (Optional)</Label>
              <Textarea
                id="customCookies"
                placeholder="Describe any other cookies your site uses..."
                value={formData.customCookies}
                onChange={(e) => updateField('customCookies', e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(4)}>
                Next: Compliance
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Compliance & Management */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Compliance & Cookie Management</CardTitle>
            <CardDescription>Configure compliance and user consent options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 mb-4">
              <h4 className="font-medium text-sm">Cookie Management</h4>
            </div>
            <div className="space-y-4">
              <CheckboxField
                id="hasCookieBanner"
                label="Cookie consent banner"
                description="Display a cookie consent banner to visitors"
                checked={formData.hasCookieBanner}
                onChange={(checked) => updateField('hasCookieBanner', checked)}
              />
              <CheckboxField
                id="allowsGranularConsent"
                label="Granular consent options"
                description="Allow users to choose which cookie categories to accept"
                checked={formData.allowsGranularConsent}
                onChange={(checked) => updateField('allowsGranularConsent', checked)}
              />
              <CheckboxField
                id="respectsDoNotTrack"
                label="Respect Do Not Track signals"
                description="Honor browser DNT settings"
                checked={formData.respectsDoNotTrack}
                onChange={(checked) => updateField('respectsDoNotTrack', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-1 mb-4">
              <h4 className="font-medium text-sm">Applicable Regulations</h4>
              <p className="text-xs text-muted-foreground">Select all that apply to your users</p>
            </div>
            <div className="space-y-4">
              <CheckboxField
                id="appliesGdpr"
                label="GDPR (European Union)"
                description="Users in EU/EEA/UK/Switzerland"
                checked={formData.appliesGdpr}
                onChange={(checked) => updateField('appliesGdpr', checked)}
              />
              <CheckboxField
                id="appliesCcpa"
                label="CCPA/CPRA (California)"
                description="Users in California, USA"
                checked={formData.appliesCcpa}
                onChange={(checked) => updateField('appliesCcpa', checked)}
              />
              <CheckboxField
                id="appliesPecr"
                label="PECR (United Kingdom)"
                description="UK Privacy and Electronic Communications Regulations"
                checked={formData.appliesPecr}
                onChange={(checked) => updateField('appliesPecr', checked)}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">Automatically Included</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>- Cookie types explained with detailed tables</li>
                <li>- Browser management instructions</li>
                <li>- Industry opt-out tool links</li>
                <li>- Mobile device instructions</li>
                <li>- Third-party cookie details with privacy policy links</li>
                <li>- Consequences of disabling cookies</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Generate Cookie Policy
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
