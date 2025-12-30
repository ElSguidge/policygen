'use client';

import { useState } from 'react';
import {
  SwmsData,
  defaultSwmsData,
  highRiskWorkActivities,
  commonHazards,
  commonControls,
  WorkStep,
} from '@/lib/generators/swms';
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

interface SwmsFormProps {
  onGenerate: (data: SwmsData) => void;
}

export function SwmsForm({ onGenerate }: SwmsFormProps) {
  const [formData, setFormData] = useState<SwmsData>(defaultSwmsData);
  const [step, setStep] = useState(1);
  const [currentWorkStep, setCurrentWorkStep] = useState<WorkStep>({
    step: '',
    hazards: [],
    initialRisk: 'high',
    controls: [],
    residualRisk: 'low',
    responsibility: '',
  });

  const updateField = <K extends keyof SwmsData>(
    field: K,
    value: SwmsData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addWorkStep = () => {
    if (currentWorkStep.step && currentWorkStep.hazards.length > 0 && currentWorkStep.controls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        workSteps: [...prev.workSteps, currentWorkStep],
      }));
      setCurrentWorkStep({
        step: '',
        hazards: [],
        initialRisk: 'high',
        controls: [],
        residualRisk: 'low',
        responsibility: '',
      });
    }
  };

  const removeWorkStep = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      workSteps: prev.workSteps.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const isStep1Valid = formData.companyName && formData.companyAddress && formData.companyPhone;
  const isStep2Valid = formData.projectName && formData.siteAddress && formData.workActivity;

  const totalSteps = 7;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: Company Details */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Company/PCBU Details</CardTitle>
            <CardDescription>Details of the Person Conducting a Business or Undertaking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select
                value={formData.documentType}
                onValueChange={(value) => updateField('documentType', value as SwmsData['documentType'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="swms">SWMS - Safe Work Method Statement (Australia)</SelectItem>
                  <SelectItem value="jsa">JSA - Job Safety Analysis (USA)</SelectItem>
                  <SelectItem value="rams">RAMS - Risk Assessment & Method Statement (UK)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company/Business Name *</Label>
              <Input
                id="companyName"
                placeholder="ABC Construction Pty Ltd"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="abn">ABN (Australia) / Company Number</Label>
              <Input
                id="abn"
                placeholder="12 345 678 901"
                value={formData.abn}
                onChange={(e) => updateField('abn', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Business Address *</Label>
              <Input
                id="companyAddress"
                placeholder="123 Construction St, Sydney NSW 2000"
                value={formData.companyAddress}
                onChange={(e) => updateField('companyAddress', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Phone *</Label>
                <Input
                  id="companyPhone"
                  placeholder="02 1234 5678"
                  value={formData.companyPhone}
                  onChange={(e) => updateField('companyPhone', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  placeholder="safety@company.com.au"
                  value={formData.companyEmail}
                  onChange={(e) => updateField('companyEmail', e.target.value)}
                />
              </div>
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
            >
              Next: Project Details
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Project & Work Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Project & Work Details</CardTitle>
            <CardDescription>Information about the project and work activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                placeholder="New Office Building - Stage 2"
                value={formData.projectName}
                onChange={(e) => updateField('projectName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteAddress">Site Address *</Label>
              <Input
                id="siteAddress"
                placeholder="456 Building Ave, Melbourne VIC 3000"
                value={formData.siteAddress}
                onChange={(e) => updateField('siteAddress', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="principalContractor">Principal Contractor</Label>
                <Input
                  id="principalContractor"
                  placeholder="Main Builder Pty Ltd"
                  value={formData.principalContractor}
                  onChange={(e) => updateField('principalContractor', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  placeholder="Client Company"
                  value={formData.clientName}
                  onChange={(e) => updateField('clientName', e.target.value)}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="workActivity">Work Activity Title *</Label>
                <Input
                  id="workActivity"
                  placeholder="Scaffold Erection and Dismantling"
                  value={formData.workActivity}
                  onChange={(e) => updateField('workActivity', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workDescription">Work Description</Label>
              <Textarea
                id="workDescription"
                placeholder="Detailed description of the work to be performed..."
                value={formData.workDescription}
                onChange={(e) => updateField('workDescription', e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workLocation">Specific Work Location</Label>
                <Input
                  id="workLocation"
                  placeholder="Level 3, North Wing"
                  value={formData.workLocation}
                  onChange={(e) => updateField('workLocation', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                <Input
                  id="estimatedDuration"
                  placeholder="3 days"
                  value={formData.estimatedDuration}
                  onChange={(e) => updateField('estimatedDuration', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="swmsNumber">Document Number</Label>
                <Input
                  id="swmsNumber"
                  placeholder="SWMS-001"
                  value={formData.swmsNumber}
                  onChange={(e) => updateField('swmsNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateCreated">Date Created</Label>
                <Input
                  id="dateCreated"
                  type="date"
                  value={formData.dateCreated}
                  onChange={(e) => updateField('dateCreated', e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(3)} disabled={!isStep2Valid}>
                Next: Personnel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Personnel */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Personnel</CardTitle>
            <CardDescription>People responsible for this SWMS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preparedBy">Prepared By</Label>
                <Input
                  id="preparedBy"
                  placeholder="John Smith"
                  value={formData.preparedBy}
                  onChange={(e) => updateField('preparedBy', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preparedByPosition">Position</Label>
                <Input
                  id="preparedByPosition"
                  placeholder="Safety Officer"
                  value={formData.preparedByPosition}
                  onChange={(e) => updateField('preparedByPosition', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="approvedBy">Approved By</Label>
                <Input
                  id="approvedBy"
                  placeholder="Jane Doe"
                  value={formData.approvedBy}
                  onChange={(e) => updateField('approvedBy', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="approvedByPosition">Position</Label>
                <Input
                  id="approvedByPosition"
                  placeholder="Site Manager"
                  value={formData.approvedByPosition}
                  onChange={(e) => updateField('approvedByPosition', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supervisorName">Site Supervisor</Label>
                <Input
                  id="supervisorName"
                  placeholder="Bob Wilson"
                  value={formData.supervisorName}
                  onChange={(e) => updateField('supervisorName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supervisorPhone">Supervisor Phone</Label>
                <Input
                  id="supervisorPhone"
                  placeholder="0412 345 678"
                  value={formData.supervisorPhone}
                  onChange={(e) => updateField('supervisorPhone', e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(4)}>
                Next: High Risk Activities
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: High Risk Work Activities */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>High Risk Construction Work Activities</CardTitle>
            <CardDescription>Select all HRCW activities that apply to this work (Australian WHS Regulations)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {highRiskWorkActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={activity.id}
                    checked={formData.hrcwActivities.includes(activity.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateField('hrcwActivities', [...formData.hrcwActivities, activity.id]);
                      } else {
                        updateField('hrcwActivities', formData.hrcwActivities.filter(a => a !== activity.id));
                      }
                    }}
                  />
                  <div>
                    <Label htmlFor={activity.id} className="cursor-pointer font-medium">
                      {activity.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">{activity.category}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(5)}>
                Next: PPE & Training
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: PPE & Training */}
      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>PPE & Training Requirements</CardTitle>
            <CardDescription>Personal protective equipment and competency requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 mb-4">
              <h4 className="font-medium text-sm">Required PPE</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <CheckboxField
                id="ppeHardHat"
                label="Hard Hat"
                checked={formData.ppeHardHat}
                onChange={(checked) => updateField('ppeHardHat', checked)}
              />
              <CheckboxField
                id="ppeSafetyGlasses"
                label="Safety Glasses"
                checked={formData.ppeSafetyGlasses}
                onChange={(checked) => updateField('ppeSafetyGlasses', checked)}
              />
              <CheckboxField
                id="ppeHiVis"
                label="High Visibility Clothing"
                checked={formData.ppeHiVis}
                onChange={(checked) => updateField('ppeHiVis', checked)}
              />
              <CheckboxField
                id="ppeSafetyBoots"
                label="Safety Boots"
                checked={formData.ppeSafetyBoots}
                onChange={(checked) => updateField('ppeSafetyBoots', checked)}
              />
              <CheckboxField
                id="ppeGloves"
                label="Safety Gloves"
                checked={formData.ppeGloves}
                onChange={(checked) => updateField('ppeGloves', checked)}
              />
              <CheckboxField
                id="ppeHearingProtection"
                label="Hearing Protection"
                checked={formData.ppeHearingProtection}
                onChange={(checked) => updateField('ppeHearingProtection', checked)}
              />
              <CheckboxField
                id="ppeRespirator"
                label="Respiratory Protection"
                checked={formData.ppeRespirator}
                onChange={(checked) => updateField('ppeRespirator', checked)}
              />
              <CheckboxField
                id="ppeFallProtection"
                label="Fall Protection/Harness"
                checked={formData.ppeFallProtection}
                onChange={(checked) => updateField('ppeFallProtection', checked)}
              />
              <CheckboxField
                id="ppeFaceShield"
                label="Face Shield"
                checked={formData.ppeFaceShield}
                onChange={(checked) => updateField('ppeFaceShield', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ppeOther">Other PPE</Label>
              <Input
                id="ppeOther"
                placeholder="e.g., Chemical suit, welding helmet"
                value={formData.ppeOther}
                onChange={(e) => updateField('ppeOther', e.target.value)}
              />
            </div>

            <div className="pt-4 border-t space-y-4">
              <h4 className="font-medium text-sm">Licences & Training</h4>
              <div className="space-y-2">
                <Label>Required Licences</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['White Card (General Construction Induction)', 'Scaffolding Licence', 'Rigging Licence', 'Forklift Licence', 'EWP Licence', 'Crane Licence', 'Dogging Licence', 'Working at Heights'].map((licence) => (
                    <CheckboxField
                      key={licence}
                      id={`licence-${licence}`}
                      label={licence}
                      checked={formData.requiredLicenses.includes(licence)}
                      onChange={(checked) => {
                        if (checked) {
                          updateField('requiredLicenses', [...formData.requiredLicenses, licence]);
                        } else {
                          updateField('requiredLicenses', formData.requiredLicenses.filter(l => l !== licence));
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(4)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(6)}>
                Next: Work Steps
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 6: Work Steps */}
      {step === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>Work Steps, Hazards & Controls</CardTitle>
            <CardDescription>Define each step of work with associated hazards and control measures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing Work Steps */}
            {formData.workSteps.length > 0 && (
              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-sm">Added Steps ({formData.workSteps.length})</h4>
                {formData.workSteps.map((ws, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Step {index + 1}: {ws.step}</p>
                        <p className="text-sm text-muted-foreground">Initial Risk: {ws.initialRisk.toUpperCase()} → Residual: {ws.residualRisk.toUpperCase()} | Hazards: {ws.hazards.length} | Controls: {ws.controls.length}</p>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={() => removeWorkStep(index)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Work Step */}
            <div className="p-4 border-2 border-dashed rounded-lg space-y-4">
              <h4 className="font-medium">Add Work Step</h4>

              <div className="space-y-2">
                <Label htmlFor="stepDescription">Step Description</Label>
                <Input
                  id="stepDescription"
                  placeholder="e.g., Set up exclusion zone around work area"
                  value={currentWorkStep.step}
                  onChange={(e) => setCurrentWorkStep({ ...currentWorkStep, step: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Hazards (select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded p-2">
                  {commonHazards.map((hazard) => (
                    <CheckboxField
                      key={hazard}
                      id={`hazard-${hazard}`}
                      label={hazard}
                      checked={currentWorkStep.hazards.includes(hazard)}
                      onChange={(checked) => {
                        if (checked) {
                          setCurrentWorkStep({ ...currentWorkStep, hazards: [...currentWorkStep.hazards, hazard] });
                        } else {
                          setCurrentWorkStep({ ...currentWorkStep, hazards: currentWorkStep.hazards.filter(h => h !== hazard) });
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Initial Risk (Before Controls)</Label>
                  <Select
                    value={currentWorkStep.initialRisk}
                    onValueChange={(value) => setCurrentWorkStep({ ...currentWorkStep, initialRisk: value as WorkStep['initialRisk'] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select initial risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Green)</SelectItem>
                      <SelectItem value="medium">Medium (Yellow)</SelectItem>
                      <SelectItem value="high">High (Orange)</SelectItem>
                      <SelectItem value="extreme">Extreme (Red)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Residual Risk (After Controls)</Label>
                  <Select
                    value={currentWorkStep.residualRisk}
                    onValueChange={(value) => setCurrentWorkStep({ ...currentWorkStep, residualRisk: value as WorkStep['residualRisk'] })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select residual risk" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Green)</SelectItem>
                      <SelectItem value="medium">Medium (Yellow)</SelectItem>
                      <SelectItem value="high">High (Orange)</SelectItem>
                      <SelectItem value="extreme">Extreme (Red)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Control Measures (select all that apply)</Label>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border rounded p-2">
                  {commonControls.map((control) => (
                    <CheckboxField
                      key={control}
                      id={`control-${control}`}
                      label={control}
                      checked={currentWorkStep.controls.includes(control)}
                      onChange={(checked) => {
                        if (checked) {
                          setCurrentWorkStep({ ...currentWorkStep, controls: [...currentWorkStep.controls, control] });
                        } else {
                          setCurrentWorkStep({ ...currentWorkStep, controls: currentWorkStep.controls.filter(c => c !== control) });
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibility">Responsible Person</Label>
                <Input
                  id="responsibility"
                  placeholder="e.g., Site Supervisor"
                  value={currentWorkStep.responsibility}
                  onChange={(e) => setCurrentWorkStep({ ...currentWorkStep, responsibility: e.target.value })}
                />
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={addWorkStep}
                disabled={!currentWorkStep.step || currentWorkStep.hazards.length === 0 || currentWorkStep.controls.length === 0}
                className="w-full"
              >
                Add This Step
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(5)}>
                Back
              </Button>
              <Button type="button" className="flex-1" onClick={() => setStep(7)}>
                Next: Emergency
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 7: Emergency & Final */}
      {step === 7 && (
        <Card>
          <CardHeader>
            <CardTitle>Emergency Procedures</CardTitle>
            <CardDescription>Emergency contacts and procedures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  placeholder="Site Manager"
                  value={formData.emergencyContactName}
                  onChange={(e) => updateField('emergencyContactName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  placeholder="0412 345 678"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => updateField('emergencyContactPhone', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyAssemblyPoint">Emergency Assembly Point</Label>
              <Input
                id="emergencyAssemblyPoint"
                placeholder="Front car park, near main entrance"
                value={formData.emergencyAssemblyPoint}
                onChange={(e) => updateField('emergencyAssemblyPoint', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nearestHospital">Nearest Hospital</Label>
              <Input
                id="nearestHospital"
                placeholder="Royal Melbourne Hospital - 10 min drive"
                value={formData.nearestHospital}
                onChange={(e) => updateField('nearestHospital', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstAidOfficer">First Aid Officer</Label>
                <Input
                  id="firstAidOfficer"
                  placeholder="Mary Johnson"
                  value={formData.firstAidOfficer}
                  onChange={(e) => updateField('firstAidOfficer', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstAidLocation">First Aid Kit Location</Label>
                <Input
                  id="firstAidLocation"
                  placeholder="Site office"
                  value={formData.firstAidLocation}
                  onChange={(e) => updateField('firstAidLocation', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fireExtinguisherLocation">Fire Extinguisher Location</Label>
              <Input
                id="fireExtinguisherLocation"
                placeholder="Site office entrance, each floor landing"
                value={formData.fireExtinguisherLocation}
                onChange={(e) => updateField('fireExtinguisherLocation', e.target.value)}
              />
            </div>

            <div className="pt-4 border-t">
              <CheckboxField
                id="toolboxTalkRequired"
                label="Toolbox talk required before work commences"
                checked={formData.toolboxTalkRequired}
                onChange={(checked) => updateField('toolboxTalkRequired', checked)}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <h4 className="font-medium text-blue-900 mb-2">Document Summary</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>Work Activity: {formData.workActivity || 'Not specified'}</li>
                <li>High Risk Activities: {formData.hrcwActivities.length} selected</li>
                <li>Work Steps: {formData.workSteps.length} defined</li>
                <li>PPE Items: {[formData.ppeHardHat, formData.ppeSafetyGlasses, formData.ppeHiVis, formData.ppeSafetyBoots, formData.ppeGloves, formData.ppeHearingProtection, formData.ppeRespirator, formData.ppeFallProtection, formData.ppeFaceShield].filter(Boolean).length} required</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(6)}>
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Generate {formData.documentType.toUpperCase()}
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
        <Label htmlFor={id} className="cursor-pointer font-medium text-sm">
          {label}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
