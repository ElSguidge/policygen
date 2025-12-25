'use client';

import { useState } from 'react';
import { EulaData, defaultEulaData } from '@/lib/generators/eula';
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

interface EulaFormProps {
  onGenerate: (data: EulaData) => void;
}

export function EulaForm({ onGenerate }: EulaFormProps) {
  const [formData, setFormData] = useState<EulaData>(defaultEulaData);
  const [step, setStep] = useState(1);

  const updateField = <K extends keyof EulaData>(
    field: K,
    value: EulaData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const isStep1Valid = formData.companyName && formData.productName && formData.contactEmail;

  const totalSteps = 6;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: Company & Product Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Company & Product Information</CardTitle>
            <CardDescription>Basic details about your company and software</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Acme Software Inc."
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productName">Software / Product Name *</Label>
              <Input
                id="productName"
                placeholder="Acme Pro"
                value={formData.productName}
                onChange={(e) => updateField('productName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productDescription">Product Description (Optional)</Label>
              <Textarea
                id="productDescription"
                placeholder="A brief description of what your software does..."
                value={formData.productDescription}
                onChange={(e) => updateField('productDescription', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Product Type</Label>
                <Select
                  value={formData.productType}
                  onValueChange={(value) => updateField('productType', value as EulaData['productType'])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop_app">Desktop Application</SelectItem>
                    <SelectItem value="mobile_app">Mobile Application</SelectItem>
                    <SelectItem value="web_app">Web Application</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="plugin">Plugin / Extension</SelectItem>
                    <SelectItem value="game">Video Game</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentVersion">Current Version</Label>
                <Input
                  id="currentVersion"
                  placeholder="1.0.0"
                  value={formData.currentVersion}
                  onChange={(e) => updateField('currentVersion', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="support@example.com"
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

            <Button
              type="button"
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
            >
              Next: License Type
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: License Type */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>License Type</CardTitle>
            <CardDescription>Define how your software is licensed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>License Type</Label>
              <Select
                value={formData.licenseType}
                onValueChange={(value) => updateField('licenseType', value as EulaData['licenseType'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select license type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perpetual">Perpetual (One-time purchase)</SelectItem>
                  <SelectItem value="subscription">Subscription (Recurring)</SelectItem>
                  <SelectItem value="freemium">Freemium (Free + Paid tiers)</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="trial">Trial Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.licenseType !== 'free' && (
              <div className="space-y-2">
                <Label>License Term</Label>
                <Select
                  value={formData.licenseTerm}
                  onValueChange={(value) => updateField('licenseTerm', value as EulaData['licenseTerm'])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unlimited">Unlimited (Perpetual)</SelectItem>
                    <SelectItem value="1_year">1 Year</SelectItem>
                    <SelectItem value="monthly">Monthly (Auto-renew)</SelectItem>
                    <SelectItem value="custom">Custom (per purchase)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="maxInstallations">Maximum Installations</Label>
              <Select
                value={formData.maxInstallations.toString()}
                onValueChange={(value) => updateField('maxInstallations', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select max installations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 device</SelectItem>
                  <SelectItem value="2">2 devices</SelectItem>
                  <SelectItem value="3">3 devices</SelectItem>
                  <SelectItem value="5">5 devices</SelectItem>
                  <SelectItem value="10">10 devices</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm">Permitted Uses</h4>
              <CheckboxField
                id="allowsCommercialUse"
                label="Allow commercial use"
                description="User can use software for business purposes"
                checked={formData.allowsCommercialUse}
                onChange={(checked) => updateField('allowsCommercialUse', checked)}
              />
              <CheckboxField
                id="allowsModification"
                label="Allow modification"
                description="User can modify the software (rare for commercial)"
                checked={formData.allowsModification}
                onChange={(checked) => updateField('allowsModification', checked)}
              />
              <CheckboxField
                id="allowsRedistribution"
                label="Allow redistribution"
                description="User can share or resell the software"
                checked={formData.allowsRedistribution}
                onChange={(checked) => updateField('allowsRedistribution', checked)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(3)}>
                Next: Restrictions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Restrictions */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Restrictions</CardTitle>
            <CardDescription>What users are prohibited from doing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <CheckboxField
                id="prohibitsReverseEngineering"
                label="Prohibit reverse engineering"
                description="Prevent decompiling, disassembling, or deriving source code"
                checked={formData.prohibitsReverseEngineering}
                onChange={(checked) => updateField('prohibitsReverseEngineering', checked)}
              />
              <CheckboxField
                id="prohibitsSublicensing"
                label="Prohibit sublicensing"
                description="User cannot grant licenses to third parties"
                checked={formData.prohibitsSublicensing}
                onChange={(checked) => updateField('prohibitsSublicensing', checked)}
              />
              <CheckboxField
                id="prohibitsCompetitiveUse"
                label="Prohibit competitive use"
                description="Cannot use to develop competing products"
                checked={formData.prohibitsCompetitiveUse}
                onChange={(checked) => updateField('prohibitsCompetitiveUse', checked)}
              />
              <CheckboxField
                id="prohibitsExport"
                label="Prohibit export violations"
                description="Must comply with export laws and regulations"
                checked={formData.prohibitsExport}
                onChange={(checked) => updateField('prohibitsExport', checked)}
              />
              <CheckboxField
                id="requiresAttribution"
                label="Require attribution"
                description="User must credit your company when using publicly"
                checked={formData.requiresAttribution}
                onChange={(checked) => updateField('requiresAttribution', checked)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(4)}>
                Next: Technical Features
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Technical Features */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Technical Features</CardTitle>
            <CardDescription>Technical requirements and data collection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <CheckboxField
                id="requiresActivation"
                label="Requires license activation"
                description="Software must be activated with a license key"
                checked={formData.requiresActivation}
                onChange={(checked) => updateField('requiresActivation', checked)}
              />
              <CheckboxField
                id="requiresInternetConnection"
                label="Requires internet connection"
                description="Software needs internet to function"
                checked={formData.requiresInternetConnection}
                onChange={(checked) => updateField('requiresInternetConnection', checked)}
              />
              <CheckboxField
                id="hasAutoUpdates"
                label="Automatic updates"
                description="Software can auto-update itself"
                checked={formData.hasAutoUpdates}
                onChange={(checked) => updateField('hasAutoUpdates', checked)}
              />
              <CheckboxField
                id="collectsUsageData"
                label="Collects usage data"
                description="Analytics, crash reports, feature usage"
                checked={formData.collectsUsageData}
                onChange={(checked) => updateField('collectsUsageData', checked)}
              />
            </div>

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm">Open Source Components</h4>
              <CheckboxField
                id="includesOpenSource"
                label="Includes open source software"
                description="Software uses third-party open source libraries"
                checked={formData.includesOpenSource}
                onChange={(checked) => updateField('includesOpenSource', checked)}
              />
              {formData.includesOpenSource && (
                <div className="space-y-2">
                  <Label htmlFor="openSourceLicenses">Open Source Licenses Used</Label>
                  <Textarea
                    id="openSourceLicenses"
                    placeholder="List the open source licenses (e.g., MIT, Apache 2.0, GPL)..."
                    value={formData.openSourceLicenses}
                    onChange={(e) => updateField('openSourceLicenses', e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(5)}>
                Next: Payment & Support
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Payment & Support */}
      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment & Support</CardTitle>
            <CardDescription>Configure pricing, refunds, and support options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CheckboxField
              id="hasPaidVersion"
              label="Has paid version"
              description="Software requires payment (not completely free)"
              checked={formData.hasPaidVersion}
              onChange={(checked) => updateField('hasPaidVersion', checked)}
            />

            {formData.hasPaidVersion && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="subscriptionPrice">Price (Optional)</Label>
                  <Input
                    id="subscriptionPrice"
                    placeholder="$49.99/year or $9.99/month"
                    value={formData.subscriptionPrice}
                    onChange={(e) => updateField('subscriptionPrice', e.target.value)}
                  />
                </div>

                <CheckboxField
                  id="hasFreeTrial"
                  label="Offer free trial"
                  description="Users can try before buying"
                  checked={formData.hasFreeTrial}
                  onChange={(checked) => updateField('hasFreeTrial', checked)}
                />

                {formData.hasFreeTrial && (
                  <div className="space-y-2">
                    <Label>Trial Period</Label>
                    <Select
                      value={formData.trialDays.toString()}
                      onValueChange={(value) => updateField('trialDays', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select trial length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <CheckboxField
                  id="allowsRefunds"
                  label="Offer refunds"
                  description="Money-back guarantee period"
                  checked={formData.allowsRefunds}
                  onChange={(checked) => updateField('allowsRefunds', checked)}
                />

                {formData.allowsRefunds && (
                  <div className="space-y-2">
                    <Label>Refund Period</Label>
                    <Select
                      value={formData.refundDays.toString()}
                      onValueChange={(value) => updateField('refundDays', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select refund period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm">Support & Warranty</h4>
              <CheckboxField
                id="providesSupport"
                label="Provide technical support"
                description="Offer customer support for the software"
                checked={formData.providesSupport}
                onChange={(checked) => updateField('providesSupport', checked)}
              />

              {formData.providesSupport && (
                <div className="space-y-2">
                  <Label htmlFor="supportDuration">Support Duration</Label>
                  <Select
                    value={formData.supportDuration}
                    onValueChange={(value) => updateField('supportDuration', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90 days">90 days</SelectItem>
                      <SelectItem value="6 months">6 months</SelectItem>
                      <SelectItem value="1 year">1 year</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Warranty Period</Label>
                <Select
                  value={formData.warrantyPeriodDays.toString()}
                  onValueChange={(value) => updateField('warrantyPeriodDays', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select warranty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No warranty (AS IS)</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(4)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(6)}>
                Next: Legal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 6: Legal */}
      {step === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>Legal Provisions</CardTitle>
            <CardDescription>Jurisdiction, disputes, and liability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="United States"
                  value={formData.country}
                  onChange={(e) => updateField('country', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State (Governing Law)</Label>
                <Input
                  id="governingLaw"
                  placeholder="Delaware"
                  value={formData.governingLaw}
                  onChange={(e) => updateField('governingLaw', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Dispute Resolution</Label>
              <Select
                value={formData.disputeResolution}
                onValueChange={(value) => updateField('disputeResolution', value as EulaData['disputeResolution'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arbitration">Binding Arbitration</SelectItem>
                  <SelectItem value="litigation">Court Litigation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CheckboxField
              id="limitLiability"
              label="Limit liability"
              description="Cap company's liability for damages (recommended)"
              checked={formData.limitLiability}
              onChange={(checked) => updateField('limitLiability', checked)}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">Automatically Included</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>- Comprehensive intellectual property protection</li>
                <li>- Warranty disclaimer ("AS IS" provisions)</li>
                <li>- Termination clauses</li>
                <li>- Export compliance requirements</li>
                <li>- U.S. Government rights clause</li>
                <li>- Severability and entire agreement</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(5)}>
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Generate EULA
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
