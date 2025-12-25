'use client';

import { useState } from 'react';
import { DisclaimerData, defaultDisclaimerData } from '@/lib/generators/disclaimer';
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

interface DisclaimerFormProps {
  onGenerate: (data: DisclaimerData) => void;
}

export function DisclaimerForm({ onGenerate }: DisclaimerFormProps) {
  const [formData, setFormData] = useState<DisclaimerData>(defaultDisclaimerData);
  const [step, setStep] = useState(1);

  const updateField = <K extends keyof DisclaimerData>(
    field: K,
    value: DisclaimerData[K]
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
            <CardDescription>Basic details about your website or business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company / Website Name *</Label>
              <Input
                id="companyName"
                placeholder="Acme Blog"
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
                placeholder="contact@example.com"
                value={formData.contactEmail}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Business Type</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => updateField('businessType', value as DisclaimerData['businessType'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Website</SelectItem>
                  <SelectItem value="blog">Blog / Content Site</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="saas">SaaS / Software</SelectItem>
                  <SelectItem value="consulting">Consulting / Services</SelectItem>
                  <SelectItem value="health">Health / Wellness</SelectItem>
                  <SelectItem value="finance">Finance / Investment</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
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
              Next: Content Types
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Content Types */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Content Types</CardTitle>
            <CardDescription>What types of content does your site have?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 mb-4">
              <h4 className="font-medium text-sm">Professional Content</h4>
              <p className="text-xs text-muted-foreground">Content that may require special disclaimers</p>
            </div>
            <div className="space-y-4">
              <CheckboxField
                id="hasMedicalContent"
                label="Medical / Health content"
                description="Health advice, nutrition, symptoms, treatments"
                checked={formData.hasMedicalContent}
                onChange={(checked) => updateField('hasMedicalContent', checked)}
              />
              <CheckboxField
                id="hasFinancialContent"
                label="Financial / Investment content"
                description="Investment advice, stock tips, financial planning"
                checked={formData.hasFinancialContent}
                onChange={(checked) => updateField('hasFinancialContent', checked)}
              />
              <CheckboxField
                id="hasLegalContent"
                label="Legal content"
                description="Legal information, explanations, guidance"
                checked={formData.hasLegalContent}
                onChange={(checked) => updateField('hasLegalContent', checked)}
              />
              <CheckboxField
                id="hasFitnessContent"
                label="Fitness / Exercise content"
                description="Workout routines, exercise guides, fitness advice"
                checked={formData.hasFitnessContent}
                onChange={(checked) => updateField('hasFitnessContent', checked)}
              />
              <CheckboxField
                id="hasTechnicalContent"
                label="Technical / Programming content"
                description="Code tutorials, technical guides, software"
                checked={formData.hasTechnicalContent}
                onChange={(checked) => updateField('hasTechnicalContent', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-1 mb-4">
              <h4 className="font-medium text-sm">User & Third-Party Content</h4>
            </div>
            <div className="space-y-4">
              <CheckboxField
                id="hasUserContent"
                label="User-generated content"
                description="Comments, forum posts, user reviews"
                checked={formData.hasUserContent}
                onChange={(checked) => updateField('hasUserContent', checked)}
              />
              <CheckboxField
                id="hasProductReviews"
                label="Product reviews"
                description="Reviews of products or services"
                checked={formData.hasProductReviews}
                onChange={(checked) => updateField('hasProductReviews', checked)}
              />
              <CheckboxField
                id="hasTestimonials"
                label="Testimonials"
                description="Customer testimonials or success stories"
                checked={formData.hasTestimonials}
                onChange={(checked) => updateField('hasTestimonials', checked)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(3)}>
                Next: Monetization
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Monetization & Affiliates */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Monetization & Disclosures</CardTitle>
            <CardDescription>Configure affiliate and sponsorship disclosures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <CheckboxField
                id="hasAffiliateLinks"
                label="Affiliate links"
                description="Earn commissions from product recommendations"
                checked={formData.hasAffiliateLinks}
                onChange={(checked) => {
                  updateField('hasAffiliateLinks', checked);
                  if (checked) updateField('includeAffiliateDisclosure', true);
                }}
              />

              {formData.hasAffiliateLinks && (
                <div className="ml-6 space-y-4 border-l-2 pl-4">
                  <div className="space-y-2">
                    <Label htmlFor="affiliateNetworks">Affiliate Networks (Optional)</Label>
                    <Textarea
                      id="affiliateNetworks"
                      placeholder="e.g., Amazon Associates, ShareASale, Commission Junction..."
                      value={formData.affiliateNetworks}
                      onChange={(e) => updateField('affiliateNetworks', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <CheckboxField
                id="hasSponsored"
                label="Sponsored content"
                description="Paid partnerships and sponsored posts"
                checked={formData.hasSponsored}
                onChange={(checked) => {
                  updateField('hasSponsored', checked);
                  if (checked) updateField('includeSponsoredDisclosure', true);
                }}
              />

              {formData.hasSponsored && (
                <div className="ml-6 space-y-4 border-l-2 pl-4">
                  <div className="space-y-2">
                    <Label htmlFor="sponsoredPartners">Sponsored Partners (Optional)</Label>
                    <Textarea
                      id="sponsoredPartners"
                      placeholder="List your sponsorship partners..."
                      value={formData.sponsoredPartners}
                      onChange={(e) => updateField('sponsoredPartners', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(4)}>
                Next: Disclaimer Options
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Disclaimer Options */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Disclaimer Options</CardTitle>
            <CardDescription>Select which disclaimers to include</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 mb-4">
              <h4 className="font-medium text-sm">Core Disclaimers</h4>
            </div>
            <div className="space-y-4">
              <CheckboxField
                id="includeGeneralDisclaimer"
                label="General disclaimer"
                description="General limitation of liability"
                checked={formData.includeGeneralDisclaimer}
                onChange={(checked) => updateField('includeGeneralDisclaimer', checked)}
              />
              <CheckboxField
                id="includeNoGuarantee"
                label="No guarantees disclaimer"
                description="No guarantee of results or accuracy"
                checked={formData.includeNoGuarantee}
                onChange={(checked) => updateField('includeNoGuarantee', checked)}
              />
              <CheckboxField
                id="includeProfessionalAdvice"
                label="No professional advice"
                description="Content is not professional advice"
                checked={formData.includeProfessionalAdvice}
                onChange={(checked) => updateField('includeProfessionalAdvice', checked)}
              />
              <CheckboxField
                id="includeErrorsOmissions"
                label="Errors and omissions"
                description="Not responsible for errors or outdated info"
                checked={formData.includeErrorsOmissions}
                onChange={(checked) => updateField('includeErrorsOmissions', checked)}
              />
              <CheckboxField
                id="includeExternalLinks"
                label="External links disclaimer"
                description="Not responsible for third-party sites"
                checked={formData.includeExternalLinks}
                onChange={(checked) => updateField('includeExternalLinks', checked)}
              />
              <CheckboxField
                id="includeViewsExpressed"
                label="Views expressed disclaimer"
                description="Opinions are personal, not institutional"
                checked={formData.includeViewsExpressed}
                onChange={(checked) => updateField('includeViewsExpressed', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-1 mb-4">
              <h4 className="font-medium text-sm">Additional Disclaimers</h4>
            </div>
            <div className="space-y-4">
              <CheckboxField
                id="includeFairUse"
                label="Fair use disclaimer"
                description="For sites using copyrighted material"
                checked={formData.includeFairUse}
                onChange={(checked) => updateField('includeFairUse', checked)}
              />
              <CheckboxField
                id="includeProductDisclaimer"
                label="Product information disclaimer"
                description="Product specs may vary, colors may differ"
                checked={formData.includeProductDisclaimer}
                onChange={(checked) => updateField('includeProductDisclaimer', checked)}
              />
              <CheckboxField
                id="includeEmailDisclaimer"
                label="Email disclaimer"
                description="Confidentiality notice for emails"
                checked={formData.includeEmailDisclaimer}
                onChange={(checked) => updateField('includeEmailDisclaimer', checked)}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">Auto-Included Based on Your Selections</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {formData.hasMedicalContent && <li>- Medical disclaimer</li>}
                {formData.hasFinancialContent && <li>- Financial disclaimer</li>}
                {formData.hasLegalContent && <li>- Legal disclaimer</li>}
                {formData.hasFitnessContent && <li>- Fitness/exercise disclaimer</li>}
                {formData.hasTechnicalContent && <li>- Technical information disclaimer</li>}
                {formData.hasUserContent && <li>- User-generated content disclaimer</li>}
                {formData.hasProductReviews && <li>- Product reviews disclaimer</li>}
                {formData.hasTestimonials && <li>- Testimonials disclaimer</li>}
                {formData.hasAffiliateLinks && <li>- FTC affiliate disclosure</li>}
                {formData.hasSponsored && <li>- Sponsored content disclosure</li>}
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Generate Disclaimer
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
