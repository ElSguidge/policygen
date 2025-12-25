'use client';

import { useState } from 'react';
import { TermsOfServiceData, defaultTermsData } from '@/lib/generators/terms-of-service';
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

interface TermsFormProps {
  onGenerate: (data: TermsOfServiceData) => void;
}

export function TermsForm({ onGenerate }: TermsFormProps) {
  const [formData, setFormData] = useState<TermsOfServiceData>(defaultTermsData);
  const [step, setStep] = useState(1);

  const updateField = <K extends keyof TermsOfServiceData>(
    field: K,
    value: TermsOfServiceData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const isStep1Valid = formData.companyName && formData.websiteUrl && formData.contactEmail;

  const totalSteps = 5;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: Company Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic details about your company or service</CardDescription>
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
              <Label htmlFor="serviceName">Service / Product Name</Label>
              <Input
                id="serviceName"
                placeholder="Acme App (leave blank to use company name)"
                value={formData.serviceName}
                onChange={(e) => updateField('serviceName', e.target.value)}
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
                placeholder="legal@example.com"
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
                <Label htmlFor="state">State / Province</Label>
                <Input
                  id="state"
                  placeholder="Delaware"
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                />
              </div>
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
              Next: Service Type
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Service Type & Requirements */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Service Type & Requirements</CardTitle>
            <CardDescription>Tell us about your service and user requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) =>
                  updateField('serviceType', value as TermsOfServiceData['serviceType'])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="saas">SaaS (Software as a Service)</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="marketplace">Marketplace</SelectItem>
                  <SelectItem value="mobile_app">Mobile Application</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceDescription">Service Description (Optional)</Label>
              <Textarea
                id="serviceDescription"
                placeholder="Brief description of what your service does..."
                value={formData.serviceDescription}
                onChange={(e) => updateField('serviceDescription', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimumAge">Minimum Age Requirement</Label>
              <Select
                value={formData.minimumAge.toString()}
                onValueChange={(value) => updateField('minimumAge', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select minimum age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="13">13 years (COPPA-compliant with parental consent)</SelectItem>
                  <SelectItem value="16">16 years (GDPR age in some EU countries)</SelectItem>
                  <SelectItem value="18">18 years (Adult only)</SelectItem>
                  <SelectItem value="21">21 years (Alcohol/gambling related)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm">User Requirements</h4>
              <CheckboxField
                id="requiresAccount"
                label="Requires user account"
                description="Users must create an account to use the service"
                checked={formData.requiresAccount}
                onChange={(checked) => updateField('requiresAccount', checked)}
              />
              <CheckboxField
                id="allowsUserContent"
                label="Users can post content"
                description="Allows user-generated content (comments, uploads, etc.)"
                checked={formData.allowsUserContent}
                onChange={(checked) => updateField('allowsUserContent', checked)}
              />
              <CheckboxField
                id="allowsApiAccess"
                label="Provides API access"
                description="Users can access your service via API"
                checked={formData.allowsApiAccess}
                onChange={(checked) => updateField('allowsApiAccess', checked)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(3)}>
                Next: Business Model
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Business Model & Payments */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Business Model & Payments</CardTitle>
            <CardDescription>Configure payment and subscription options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <CheckboxField
                id="hasFreeTier"
                label="Free tier available"
                description="Service has a free option"
                checked={formData.hasFreeTier}
                onChange={(checked) => updateField('hasFreeTier', checked)}
              />
              <CheckboxField
                id="hasPaidServices"
                label="Paid services available"
                description="Users can pay for features or products"
                checked={formData.hasPaidServices}
                onChange={(checked) => updateField('hasPaidServices', checked)}
              />
              <CheckboxField
                id="hasSubscriptions"
                label="Subscription-based billing"
                description="Recurring payment model"
                checked={formData.hasSubscriptions}
                onChange={(checked) => updateField('hasSubscriptions', checked)}
              />
              <CheckboxField
                id="acceptsPayments"
                label="Accepts payments"
                description="Process payments directly"
                checked={formData.acceptsPayments}
                onChange={(checked) => updateField('acceptsPayments', checked)}
              />
            </div>

            {(formData.hasPaidServices || formData.hasSubscriptions || formData.acceptsPayments) && (
              <div className="pt-4 border-t space-y-4">
                <h4 className="font-medium text-sm">Payment Details</h4>

                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => updateField('currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="AUD">AUD ($)</SelectItem>
                      <SelectItem value="CAD">CAD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.hasSubscriptions && (
                  <>
                    <CheckboxField
                      id="autoRenewal"
                      label="Auto-renewal enabled"
                      description="Subscriptions automatically renew"
                      checked={formData.autoRenewal}
                      onChange={(checked) => updateField('autoRenewal', checked)}
                    />
                    <div className="space-y-2">
                      <Label htmlFor="freeTrialDays">Free Trial Period (days)</Label>
                      <Input
                        id="freeTrialDays"
                        type="number"
                        min="0"
                        max="90"
                        placeholder="0"
                        value={formData.freeTrialDays}
                        onChange={(e) => updateField('freeTrialDays', parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </>
                )}

                <div className="pt-4 border-t space-y-4">
                  <h4 className="font-medium text-sm">Refund Policy</h4>
                  <CheckboxField
                    id="allowsRefunds"
                    label="Offer refunds"
                    description="Allow customers to request refunds"
                    checked={formData.allowsRefunds}
                    onChange={(checked) => updateField('allowsRefunds', checked)}
                  />
                  {formData.allowsRefunds && (
                    <div className="space-y-2">
                      <Label htmlFor="refundPeriodDays">Refund Period (days)</Label>
                      <Select
                        value={formData.refundPeriodDays.toString()}
                        onValueChange={(value) => updateField('refundPeriodDays', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select refund period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days (EU minimum)</SelectItem>
                          <SelectItem value="30">30 days (recommended)</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            )}

            <CheckboxField
              id="hasAffiliate"
              label="Has affiliate program"
              description="Include affiliate disclosure section"
              checked={formData.hasAffiliate}
              onChange={(checked) => updateField('hasAffiliate', checked)}
            />

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(4)}>
                Next: Intellectual Property
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Intellectual Property & Content */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property & Content</CardTitle>
            <CardDescription>Configure IP and user content rights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.allowsUserContent && (
              <div className="space-y-4 pb-4 border-b">
                <h4 className="font-medium text-sm">User Content Rights</h4>
                <CheckboxField
                  id="ownsUserContent"
                  label="Company owns user content"
                  description="Full assignment of user content to company (rare, use with caution)"
                  checked={formData.ownsUserContent}
                  onChange={(checked) => updateField('ownsUserContent', checked)}
                />
                {!formData.ownsUserContent && (
                  <CheckboxField
                    id="grantsLicense"
                    label="Users grant broad license"
                    description="Worldwide, royalty-free license to use user content"
                    checked={formData.grantsLicense}
                    onChange={(checked) => updateField('grantsLicense', checked)}
                  />
                )}
              </div>
            )}

            <div className="space-y-4">
              <h4 className="font-medium text-sm">Copyright Protection</h4>
              <CheckboxField
                id="dmcaCompliant"
                label="DMCA compliant"
                description="Include DMCA takedown notice procedure"
                checked={formData.dmcaCompliant}
                onChange={(checked) => updateField('dmcaCompliant', checked)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(5)}>
                Next: Legal & Disputes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Legal & Disputes */}
      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Legal & Dispute Resolution</CardTitle>
            <CardDescription>Configure legal jurisdiction and liability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="governingLaw">Governing Law (State/Region)</Label>
              <Input
                id="governingLaw"
                placeholder="Delaware"
                value={formData.governingLaw}
                onChange={(e) => updateField('governingLaw', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                The state/jurisdiction whose laws govern these terms
              </p>
            </div>

            <div className="space-y-2">
              <Label>Dispute Resolution Method</Label>
              <Select
                value={formData.disputeResolution}
                onValueChange={(value) =>
                  updateField('disputeResolution', value as TermsOfServiceData['disputeResolution'])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dispute resolution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arbitration">Binding Arbitration (common for SaaS)</SelectItem>
                  <SelectItem value="mediation_first">Mediation First, then Arbitration</SelectItem>
                  <SelectItem value="litigation">Court Litigation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.disputeResolution === 'arbitration' || formData.disputeResolution === 'mediation_first' ? (
              <div className="space-y-2">
                <Label htmlFor="arbitrationProvider">Arbitration Provider</Label>
                <Select
                  value={formData.arbitrationProvider}
                  onValueChange={(value) => updateField('arbitrationProvider', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="American Arbitration Association">American Arbitration Association (AAA)</SelectItem>
                    <SelectItem value="JAMS">JAMS</SelectItem>
                    <SelectItem value="International Chamber of Commerce">International Chamber of Commerce (ICC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : null}

            <CheckboxField
              id="classActionWaiver"
              label="Class action waiver"
              description="Users waive right to participate in class actions"
              checked={formData.classActionWaiver}
              onChange={(checked) => updateField('classActionWaiver', checked)}
            />

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm">Liability Limitation</h4>
              <CheckboxField
                id="limitLiability"
                label="Limit liability"
                description="Cap company's liability for damages"
                checked={formData.limitLiability}
                onChange={(checked) => updateField('limitLiability', checked)}
              />
              {formData.limitLiability && (
                <div className="space-y-2">
                  <Label>Liability Cap Type</Label>
                  <Select
                    value={formData.liabilityCapType}
                    onValueChange={(value) =>
                      updateField('liabilityCapType', value as TermsOfServiceData['liabilityCapType'])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select liability cap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fees_paid">Fees Paid (last 12 months or $100)</SelectItem>
                      <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                      <SelectItem value="none">No Cap (maximum protection removed)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {formData.limitLiability && formData.liabilityCapType === 'fixed_amount' && (
                <div className="space-y-2">
                  <Label htmlFor="liabilityCapAmount">Liability Cap Amount ({formData.currency})</Label>
                  <Input
                    id="liabilityCapAmount"
                    type="number"
                    min="0"
                    placeholder="1000"
                    value={formData.liabilityCapAmount}
                    onChange={(e) => updateField('liabilityCapAmount', parseInt(e.target.value) || 0)}
                  />
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">Automatically Included</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>- Acceptable use policy with prohibited activities</li>
                <li>- Intellectual property rights protection</li>
                <li>- Warranty disclaimers ("AS IS" and "AS AVAILABLE")</li>
                <li>- Indemnification clause</li>
                <li>- Termination provisions</li>
                <li>- Severability and entire agreement clauses</li>
                <li>- Force majeure provisions</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(4)}>
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Generate Terms of Service
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
