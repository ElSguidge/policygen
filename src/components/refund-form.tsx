'use client';

import { useState } from 'react';
import { RefundPolicyData, defaultRefundData } from '@/lib/generators/refund-policy';
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

interface RefundFormProps {
  onGenerate: (data: RefundPolicyData) => void;
}

export function RefundForm({ onGenerate }: RefundFormProps) {
  const [formData, setFormData] = useState<RefundPolicyData>(defaultRefundData);
  const [step, setStep] = useState(1);

  const updateField = <K extends keyof RefundPolicyData>(
    field: K,
    value: RefundPolicyData[K]
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
            <CardDescription>Basic details about your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Acme Store"
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
                placeholder="support@example.com"
                value={formData.contactEmail}
                onChange={(e) => updateField('contactEmail', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone (Optional)</Label>
              <Input
                id="contactPhone"
                placeholder="+1 (555) 123-4567"
                value={formData.contactPhone}
                onChange={(e) => updateField('contactPhone', e.target.value)}
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
              <Label>Business Type</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) => updateField('businessType', value as RefundPolicyData['businessType'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce">E-commerce (Physical + Digital)</SelectItem>
                  <SelectItem value="physical_products">Physical Products Only</SelectItem>
                  <SelectItem value="digital_products">Digital Products Only</SelectItem>
                  <SelectItem value="saas">SaaS / Software</SelectItem>
                  <SelectItem value="subscriptions">Subscription Service</SelectItem>
                  <SelectItem value="services">Professional Services</SelectItem>
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
              Next: Refund Terms
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Refund Terms */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>General Refund Terms</CardTitle>
            <CardDescription>Define your overall refund policy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CheckboxField
              id="offersRefunds"
              label="Offer refunds"
              description="Allow customers to request refunds"
              checked={formData.offersRefunds}
              onChange={(checked) => updateField('offersRefunds', checked)}
            />

            {formData.offersRefunds && (
              <>
                <div className="space-y-2">
                  <Label>Refund Period</Label>
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

                <div className="space-y-2">
                  <Label>Refund Conditions</Label>
                  <Select
                    value={formData.refundConditions}
                    onValueChange={(value) => updateField('refundConditions', value as RefundPolicyData['refundConditions'])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select conditions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unconditional">Unconditional (No questions asked)</SelectItem>
                      <SelectItem value="conditional">Conditional (Must meet criteria)</SelectItem>
                      <SelectItem value="case_by_case">Case-by-case (Individual review)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm">Refund Processing</h4>

              <div className="space-y-2">
                <Label>Refund Method</Label>
                <Select
                  value={formData.refundMethod}
                  onValueChange={(value) => updateField('refundMethod', value as RefundPolicyData['refundMethod'])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original_payment">Original Payment Method</SelectItem>
                    <SelectItem value="store_credit">Store Credit Only</SelectItem>
                    <SelectItem value="choice">Customer Choice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Processing Time (Business Days)</Label>
                <Select
                  value={formData.processingTimeDays.toString()}
                  onValueChange={(value) => updateField('processingTimeDays', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select processing time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="10">10 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <CheckboxField
                id="requiresProofOfPurchase"
                label="Require proof of purchase"
                description="Customer must provide order number or receipt"
                checked={formData.requiresProofOfPurchase}
                onChange={(checked) => updateField('requiresProofOfPurchase', checked)}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(3)}>
                Next: Product Types
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Product-Specific Terms */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Product-Specific Terms</CardTitle>
            <CardDescription>Configure returns for different product types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Physical Products */}
            <div className="space-y-4">
              <CheckboxField
                id="shipsPhysicalProducts"
                label="Sell physical products"
                description="Tangible goods that are shipped"
                checked={formData.shipsPhysicalProducts}
                onChange={(checked) => updateField('shipsPhysicalProducts', checked)}
              />

              {formData.shipsPhysicalProducts && (
                <div className="ml-6 space-y-4 border-l-2 pl-4">
                  <CheckboxField
                    id="acceptsReturns"
                    label="Accept returns"
                    checked={formData.acceptsReturns}
                    onChange={(checked) => updateField('acceptsReturns', checked)}
                  />

                  {formData.acceptsReturns && (
                    <>
                      <div className="space-y-2">
                        <Label>Return Period</Label>
                        <Select
                          value={formData.returnPeriodDays.toString()}
                          onValueChange={(value) => updateField('returnPeriodDays', parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select return period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <CheckboxField
                        id="customerPaysReturnShipping"
                        label="Customer pays return shipping"
                        checked={formData.customerPaysReturnShipping}
                        onChange={(checked) => updateField('customerPaysReturnShipping', checked)}
                      />

                      <CheckboxField
                        id="requiresOriginalPackaging"
                        label="Require original packaging"
                        checked={formData.requiresOriginalPackaging}
                        onChange={(checked) => updateField('requiresOriginalPackaging', checked)}
                      />

                      <CheckboxField
                        id="acceptsOpenedProducts"
                        label="Accept opened products"
                        description="Accept returns even if packaging is opened"
                        checked={formData.acceptsOpenedProducts}
                        onChange={(checked) => updateField('acceptsOpenedProducts', checked)}
                      />

                      <div className="space-y-2">
                        <Label>Restocking Fee (%)</Label>
                        <Select
                          value={formData.restockingFeePercent.toString()}
                          onValueChange={(value) => updateField('restockingFeePercent', parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select restocking fee" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No fee (0%)</SelectItem>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="15">15%</SelectItem>
                            <SelectItem value="20">20%</SelectItem>
                            <SelectItem value="25">25%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Digital Products */}
            <div className="pt-4 border-t space-y-4">
              <CheckboxField
                id="sellsDigitalProducts"
                label="Sell digital products"
                description="Downloads, software, courses, etc."
                checked={formData.sellsDigitalProducts}
                onChange={(checked) => updateField('sellsDigitalProducts', checked)}
              />

              {formData.sellsDigitalProducts && (
                <div className="ml-6 space-y-4 border-l-2 pl-4">
                  <CheckboxField
                    id="refundsDigitalProducts"
                    label="Offer refunds for digital products"
                    checked={formData.refundsDigitalProducts}
                    onChange={(checked) => updateField('refundsDigitalProducts', checked)}
                  />

                  {formData.refundsDigitalProducts && (
                    <div className="space-y-2">
                      <Label htmlFor="digitalRefundConditions">Refund Conditions</Label>
                      <Textarea
                        id="digitalRefundConditions"
                        placeholder="e.g., Product doesn't work as described, Technical issues, Within 14 days..."
                        value={formData.digitalRefundConditions}
                        onChange={(e) => updateField('digitalRefundConditions', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Subscriptions */}
            <div className="pt-4 border-t space-y-4">
              <CheckboxField
                id="hasSubscriptions"
                label="Offer subscriptions"
                description="Recurring payment products or services"
                checked={formData.hasSubscriptions}
                onChange={(checked) => updateField('hasSubscriptions', checked)}
              />

              {formData.hasSubscriptions && (
                <div className="ml-6 space-y-4 border-l-2 pl-4">
                  <CheckboxField
                    id="allowsCancellationAnytime"
                    label="Cancel anytime"
                    description="No notice period required"
                    checked={formData.allowsCancellationAnytime}
                    onChange={(checked) => updateField('allowsCancellationAnytime', checked)}
                  />

                  {!formData.allowsCancellationAnytime && (
                    <div className="space-y-2">
                      <Label>Cancellation Notice (Days)</Label>
                      <Select
                        value={formData.cancellationNoticeDays.toString()}
                        onValueChange={(value) => updateField('cancellationNoticeDays', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select notice period" />
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
                    id="proratesRefunds"
                    label="Prorate refunds"
                    description="Refund unused portion of subscription"
                    checked={formData.proratesRefunds}
                    onChange={(checked) => updateField('proratesRefunds', checked)}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(4)}>
                Next: Exceptions & Exchanges
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Exceptions & Exchanges */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Exceptions & Exchanges</CardTitle>
            <CardDescription>Non-refundable items and exchange policy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CheckboxField
              id="hasNonRefundableItems"
              label="Has non-refundable items"
              description="Some items cannot be returned or refunded"
              checked={formData.hasNonRefundableItems}
              onChange={(checked) => updateField('hasNonRefundableItems', checked)}
            />

            {formData.hasNonRefundableItems && (
              <div className="space-y-2">
                <Label>Non-Refundable Items</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Select common non-refundable items or add your own
                </p>
                <div className="space-y-2">
                  {['Gift cards', 'Downloadable software products', 'Personalized or custom items', 'Perishable goods', 'Health and personal care items', 'Intimate or sanitary goods', 'Hazardous materials'].map((item) => (
                    <CheckboxField
                      key={item}
                      id={`nonrefundable-${item}`}
                      label={item}
                      checked={formData.nonRefundableItems.includes(item)}
                      onChange={(checked) => {
                        if (checked) {
                          updateField('nonRefundableItems', [...formData.nonRefundableItems, item]);
                        } else {
                          updateField('nonRefundableItems', formData.nonRefundableItems.filter(i => i !== item));
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm">Exchanges</h4>
              <CheckboxField
                id="offersExchanges"
                label="Offer exchanges"
                description="Allow customers to exchange items"
                checked={formData.offersExchanges}
                onChange={(checked) => updateField('offersExchanges', checked)}
              />

              {formData.offersExchanges && (
                <div className="space-y-2">
                  <Label>Exchange Period</Label>
                  <Select
                    value={formData.exchangePeriodDays.toString()}
                    onValueChange={(value) => updateField('exchangePeriodDays', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select exchange period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(5)}>
                Next: Final Options
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Final Options */}
      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Final Options</CardTitle>
            <CardDescription>Additional policy options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CheckboxField
              id="addressesChargebacks"
              label="Include chargeback policy"
              description="Address credit card disputes and chargebacks"
              checked={formData.addressesChargebacks}
              onChange={(checked) => updateField('addressesChargebacks', checked)}
            />

            <div className="space-y-2">
              <Label htmlFor="governingLaw">Governing Law (State)</Label>
              <Input
                id="governingLaw"
                placeholder="Delaware"
                value={formData.governingLaw}
                onChange={(e) => updateField('governingLaw', e.target.value)}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">Automatically Included</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>- Damaged/defective item handling</li>
                <li>- Clear refund process instructions</li>
                <li>- Processing time expectations</li>
                <li>- Contact information section</li>
                <li>- Policy update notice</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(4)}>
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Generate Refund Policy
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
