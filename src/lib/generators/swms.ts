export interface WorkStep {
  step: string;
  hazards: string[];
  initialRisk: 'low' | 'medium' | 'high' | 'extreme';
  controls: string[];
  residualRisk: 'low' | 'medium' | 'high' | 'extreme';
  responsibility: string;
}

export interface SwmsData {
  // Document Type
  documentType: 'swms' | 'jsa' | 'rams';

  // Company/PCBU Details
  companyName: string;
  abn: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;

  // Project/Site Details
  projectName: string;
  siteAddress: string;
  principalContractor: string;
  clientName: string;

  // Document Details
  swmsNumber: string;
  version: string;
  dateCreated: string;
  reviewDate: string;

  // Personnel
  preparedBy: string;
  preparedByPosition: string;
  approvedBy: string;
  approvedByPosition: string;
  supervisorName: string;
  supervisorPhone: string;

  // Work Description
  workActivity: string;
  workDescription: string;
  estimatedDuration: string;
  workLocation: string;

  // High Risk Work Categories (18 HRCW activities)
  hrcwActivities: string[];

  // Work Steps
  workSteps: WorkStep[];

  // PPE Requirements
  ppeHardHat: boolean;
  ppeSafetyGlasses: boolean;
  ppeHiVis: boolean;
  ppeSafetyBoots: boolean;
  ppeGloves: boolean;
  ppeHearingProtection: boolean;
  ppeRespirator: boolean;
  ppeFallProtection: boolean;
  ppeFaceShield: boolean;
  ppeOther: string;

  // Training & Competency
  requiredLicenses: string[];
  requiredTraining: string[];
  requiredInductions: string[];

  // Plant & Equipment
  plantEquipment: string[];

  // Emergency Procedures
  emergencyAssemblyPoint: string;
  nearestHospital: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  firstAidOfficer: string;
  firstAidLocation: string;
  fireExtinguisherLocation: string;

  // Environmental Controls
  environmentalControls: string[];

  // Communication
  communicationMethods: string[];
  toolboxTalkRequired: boolean;
}

export const highRiskWorkActivities = [
  { id: 'fall_2m', label: 'Work with risk of falling more than 2 metres', category: 'Falls' },
  { id: 'telecom_tower', label: 'Work on a telecommunication tower', category: 'Heights' },
  { id: 'demolition', label: 'Demolition of load-bearing structure', category: 'Demolition' },
  { id: 'asbestos', label: 'Work disturbing asbestos', category: 'Hazardous Materials' },
  { id: 'temp_support', label: 'Structural alterations requiring temporary support', category: 'Structural' },
  { id: 'confined_space', label: 'Work in or near a confined space', category: 'Confined Space' },
  { id: 'shaft_trench', label: 'Work in shaft, trench (>1.5m), or tunnel', category: 'Excavation' },
  { id: 'explosives', label: 'Work involving explosives', category: 'Explosives' },
  { id: 'pressurised_gas', label: 'Work on pressurised gas distribution mains', category: 'Utilities' },
  { id: 'chemical_lines', label: 'Work on chemical, fuel, or refrigerant lines', category: 'Hazardous Materials' },
  { id: 'electrical', label: 'Work on or near energised electrical installations', category: 'Electrical' },
  { id: 'contaminated_atmosphere', label: 'Work in contaminated or flammable atmosphere', category: 'Atmospheric' },
  { id: 'tilt_up', label: 'Tilt-up or precast concrete work', category: 'Concrete' },
  { id: 'traffic', label: 'Work on/near roads, railways, or traffic corridors', category: 'Traffic' },
  { id: 'mobile_plant', label: 'Work near powered mobile plant', category: 'Plant' },
  { id: 'temperature', label: 'Work in artificial temperature extremes', category: 'Environment' },
  { id: 'drowning', label: 'Work in/near water with drowning risk', category: 'Water' },
  { id: 'diving', label: 'Work involving diving', category: 'Diving' },
];

export const commonHazards = [
  'Falls from height',
  'Falling objects',
  'Manual handling injuries',
  'Struck by moving plant/equipment',
  'Electrical shock/electrocution',
  'Crush injuries',
  'Cuts and lacerations',
  'Burns (thermal/chemical)',
  'Noise exposure',
  'Dust/fume inhalation',
  'Hazardous substance exposure',
  'Confined space hazards',
  'UV radiation exposure',
  'Heat stress',
  'Cold stress',
  'Slips, trips and falls',
  'Vehicle/pedestrian interaction',
  'Excavation collapse',
  'Structural collapse',
  'Fire/explosion',
  'Asbestos exposure',
  'Silica dust exposure',
  'Drowning',
  'Snake/spider bites',
  'Biological hazards',
];

export const commonControls = [
  // Elimination
  'Eliminate the hazard where possible',
  'Prefabricate off-site',
  'Use alternative methods',

  // Substitution
  'Substitute with less hazardous materials',
  'Use mechanical lifting instead of manual',
  'Use water-based products instead of solvent-based',

  // Isolation
  'Barricade the work area',
  'Install safety barriers/fencing',
  'Implement exclusion zones',
  'Lock out/tag out procedures',

  // Engineering Controls
  'Install guardrails/edge protection',
  'Use scaffolding with full planking',
  'Install ventilation/extraction systems',
  'Use mobile elevated work platforms (MEWP)',
  'Install temporary shoring',
  'Use noise barriers/enclosures',

  // Administrative Controls
  'Implement permit to work system',
  'Conduct toolbox talks',
  'Rotate workers to limit exposure',
  'Establish safe work procedures',
  'Display warning signage',
  'Implement traffic management plan',
  'Conduct regular inspections',
  'Provide supervision',
  'Limit work duration',

  // PPE
  'Hard hat',
  'Safety glasses/goggles',
  'High visibility clothing',
  'Safety boots',
  'Gloves',
  'Hearing protection',
  'Respiratory protection',
  'Fall arrest harness',
  'Face shield',
  'Sun protection',
];

export const defaultSwmsData: SwmsData = {
  documentType: 'swms',

  companyName: '',
  abn: '',
  companyAddress: '',
  companyPhone: '',
  companyEmail: '',

  projectName: '',
  siteAddress: '',
  principalContractor: '',
  clientName: '',

  swmsNumber: '',
  version: '1.0',
  dateCreated: new Date().toISOString().split('T')[0],
  reviewDate: '',

  preparedBy: '',
  preparedByPosition: '',
  approvedBy: '',
  approvedByPosition: '',
  supervisorName: '',
  supervisorPhone: '',

  workActivity: '',
  workDescription: '',
  estimatedDuration: '',
  workLocation: '',

  hrcwActivities: [],

  workSteps: [],

  ppeHardHat: true,
  ppeSafetyGlasses: true,
  ppeHiVis: true,
  ppeSafetyBoots: true,
  ppeGloves: false,
  ppeHearingProtection: false,
  ppeRespirator: false,
  ppeFallProtection: false,
  ppeFaceShield: false,
  ppeOther: '',

  requiredLicenses: [],
  requiredTraining: [],
  requiredInductions: ['Site-specific induction'],

  plantEquipment: [],

  emergencyAssemblyPoint: '',
  nearestHospital: '',
  emergencyContactName: '',
  emergencyContactPhone: '000',
  firstAidOfficer: '',
  firstAidLocation: '',
  fireExtinguisherLocation: '',

  environmentalControls: [],

  communicationMethods: ['Verbal communication', 'Mobile phone'],
  toolboxTalkRequired: true,
};

function getRiskBadge(level: string): string {
  switch (level) {
    case 'low': return 'LOW';
    case 'medium': return 'MEDIUM';
    case 'high': return 'HIGH';
    case 'extreme': return 'EXTREME';
    default: return 'MEDIUM';
  }
}

function getDocumentTitle(type: string): string {
  switch (type) {
    case 'swms': return 'SAFE WORK METHOD STATEMENT';
    case 'jsa': return 'JOB SAFETY ANALYSIS';
    case 'rams': return 'RISK ASSESSMENT & METHOD STATEMENT';
    default: return 'SAFE WORK METHOD STATEMENT';
  }
}

export function generateSwms(data: SwmsData): string {
  const {
    documentType,
    companyName,
    abn,
    companyAddress,
    companyPhone,
    companyEmail,
    projectName,
    siteAddress,
    principalContractor,
    clientName,
    swmsNumber,
    version,
    dateCreated,
    reviewDate,
    preparedBy,
    preparedByPosition,
    approvedBy,
    approvedByPosition,
    supervisorName,
    supervisorPhone,
    workActivity,
    workDescription,
    estimatedDuration,
    workLocation,
    hrcwActivities,
    workSteps,
    ppeHardHat,
    ppeSafetyGlasses,
    ppeHiVis,
    ppeSafetyBoots,
    ppeGloves,
    ppeHearingProtection,
    ppeRespirator,
    ppeFallProtection,
    ppeFaceShield,
    ppeOther,
    requiredLicenses,
    requiredTraining,
    requiredInductions,
    plantEquipment,
    emergencyAssemblyPoint,
    nearestHospital,
    emergencyContactName,
    emergencyContactPhone,
    firstAidOfficer,
    firstAidLocation,
    fireExtinguisherLocation,
    environmentalControls,
    communicationMethods,
    toolboxTalkRequired,
  } = data;

  const formattedDate = new Date(dateCreated).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedReviewDate = reviewDate ? new Date(reviewDate).toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }) : '';

  const docTitle = getDocumentTitle(documentType);

  // Build PPE list
  const ppeList: string[] = [];
  if (ppeHardHat) ppeList.push('Hard Hat');
  if (ppeSafetyGlasses) ppeList.push('Safety Glasses');
  if (ppeHiVis) ppeList.push('Hi-Vis Clothing');
  if (ppeSafetyBoots) ppeList.push('Safety Boots');
  if (ppeGloves) ppeList.push('Gloves');
  if (ppeHearingProtection) ppeList.push('Hearing Protection');
  if (ppeRespirator) ppeList.push('Respirator');
  if (ppeFallProtection) ppeList.push('Fall Protection');
  if (ppeFaceShield) ppeList.push('Face Shield');
  if (ppeOther) ppeList.push(ppeOther);

  // Build HRCW list
  const hrcwList = hrcwActivities.map(id => {
    const activity = highRiskWorkActivities.find(a => a.id === id);
    return activity ? activity.label : '';
  }).filter(Boolean);

  let swms = `# ${docTitle}

| | |
|---|---|
| **Document No:** | ${swmsNumber || '_______________'} |
| **Version:** | ${version} |
| **Date:** | ${formattedDate} |
| **Review Date:** | ${formattedReviewDate || '_______________'} |

---

## SECTION 1: BUSINESS & PROJECT DETAILS

| PCBU / CONTRACTOR DETAILS | |
|---|---|
| **Business Name:** | ${companyName} |
| **ABN:** | ${abn || '_______________'} |
| **Address:** | ${companyAddress} |
| **Phone:** | ${companyPhone} |
| **Email:** | ${companyEmail} |

| PROJECT / SITE DETAILS | |
|---|---|
| **Project Name:** | ${projectName} |
| **Site Address:** | ${siteAddress} |
| **Principal Contractor:** | ${principalContractor || 'N/A'} |
| **Client:** | ${clientName || 'N/A'} |
| **Work Location:** | ${workLocation} |

---

## SECTION 2: WORK ACTIVITY

| | |
|---|---|
| **Activity Title:** | ${workActivity} |
| **Description:** | ${workDescription} |
| **Duration:** | ${estimatedDuration} |

---

## SECTION 3: PERSONNEL

| ROLE | NAME | POSITION / CONTACT |
|---|---|---|
| Prepared By | ${preparedBy} | ${preparedByPosition} |
| Approved By | ${approvedBy} | ${approvedByPosition} |
| Site Supervisor | ${supervisorName} | ${supervisorPhone} |

---

`;

  if (documentType === 'swms' && hrcwList.length > 0) {
    swms += `## SECTION 4: HIGH RISK CONSTRUCTION WORK (HRCW)

This SWMS is required under WHS Regulations for the following HRCW activities:

| # | HIGH RISK ACTIVITY | APPLICABLE |
|---|---|---|
`;
    hrcwList.forEach((activity, i) => {
      swms += `| ${i + 1} | ${activity} | YES |
`;
    });

    swms += `
---

`;
  }

  swms += `## SECTION ${documentType === 'swms' && hrcwList.length > 0 ? '5' : '4'}: PERSONAL PROTECTIVE EQUIPMENT (PPE)

| PPE ITEM | STATUS | STANDARD |
|---|---|---|
`;

  // Clean professional PPE table without icons
  const ppeDetails: Record<string, string> = {
    'Hard Hat': 'AS/NZS 1801 compliant',
    'Safety Glasses': 'AS/NZS 1337 compliant',
    'Hi-Vis Clothing': 'AS/NZS 4602 Class D or better',
    'Safety Boots': 'AS/NZS 2210 Steel toe cap',
    'Gloves': 'Task-appropriate, fit for purpose',
    'Hearing Protection': 'AS/NZS 1270 compliant',
    'Respirator': 'AS/NZS 1716 Fit tested',
    'Fall Protection Harness': 'AS/NZS 1891 Inspected before use',
    'Face Shield': 'AS/NZS 1337 compliant'
  };

  ppeList.forEach(ppe => {
    const standard = ppeDetails[ppe] || 'As required';
    swms += `| **${ppe}** | MANDATORY | ${standard} |
`;
  });

  if (ppeOther) {
    swms += `| **${ppeOther}** | MANDATORY | As specified |
`;
  }

  swms += `
---

## SECTION ${documentType === 'swms' && hrcwList.length > 0 ? '6' : '5'}: LICENCES, TRAINING & INDUCTIONS

| TYPE | REQUIREMENTS |
|---|---|
| **Licences Required** | ${requiredLicenses.length > 0 ? requiredLicenses.join(', ') : 'N/A'} |
| **Training Required** | ${requiredTraining.length > 0 ? requiredTraining.join(', ') : 'N/A'} |
| **Inductions Required** | ${requiredInductions.length > 0 ? requiredInductions.join(', ') : 'Site Induction'} |

`;

  if (plantEquipment.length > 0) {
    swms += `---

## SECTION ${documentType === 'swms' && hrcwList.length > 0 ? '7' : '6'}: PLANT & EQUIPMENT

| PLANT / EQUIPMENT | PRE-START CHECK |
|---|---|
`;
    plantEquipment.forEach(item => {
      swms += `| ${item} | [ ] Completed |
`;
    });
    swms += `
`;
  }

  // Main hazard/control table - THE CRITICAL PART
  const hazardSection = plantEquipment.length > 0
    ? (documentType === 'swms' && hrcwList.length > 0 ? '8' : '7')
    : (documentType === 'swms' && hrcwList.length > 0 ? '7' : '6');

  swms += `---

## SECTION ${hazardSection}: RISK ASSESSMENT & CONTROL MEASURES

| STEP | WORK ACTIVITY | HAZARDS | INITIAL RISK | CONTROL MEASURES | RESIDUAL RISK | RESPONSIBLE |
|---|---|---|---|---|---|---|
`;

  if (workSteps.length > 0) {
    workSteps.forEach((step, index) => {
      const hazardsList = step.hazards.join('; ');
      const controlsList = step.controls.join('; ');
      swms += `| ${index + 1} | ${step.step} | ${hazardsList} | ${getRiskBadge(step.initialRisk)} | ${controlsList} | ${getRiskBadge(step.residualRisk)} | ${step.responsibility} |
`;
    });
  } else {
    swms += `| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
`;
  }

  const emergencySection = parseInt(hazardSection) + 1;

  swms += `
---

## SECTION ${emergencySection}: EMERGENCY INFORMATION

| EMERGENCY CONTACTS | |
|---|---|
| **Emergency Services:** | 000 |
| **Site Emergency Contact:** | ${emergencyContactName} - ${emergencyContactPhone} |
| **First Aid Officer:** | ${firstAidOfficer || '_______________'} |

| EMERGENCY LOCATIONS | |
|---|---|
| **Assembly Point:** | ${emergencyAssemblyPoint || '_______________'} |
| **Nearest Hospital:** | ${nearestHospital || '_______________'} |
| **First Aid Kit:** | ${firstAidLocation || '_______________'} |
| **Fire Extinguisher:** | ${fireExtinguisherLocation || '_______________'} |

### EMERGENCY PROCEDURE

1. STOP work immediately and make area safe
2. ALERT others and call 000 if required
3. ADMINISTER first aid if trained and safe to do so
4. EVACUATE to assembly point if required
5. REPORT to Site Supervisor immediately

`;

  if (environmentalControls.length > 0) {
    swms += `---

## SECTION ${emergencySection + 1}: ENVIRONMENTAL CONTROLS

| CONTROL MEASURE | IMPLEMENTED |
|---|---|
`;
    environmentalControls.forEach(control => {
      swms += `| ${control} | [ ] |
`;
    });
    swms += `
`;
  }

  const commSection = environmentalControls.length > 0 ? emergencySection + 2 : emergencySection + 1;

  swms += `---

## SECTION ${commSection}: COMMUNICATION

| METHOD | DETAILS |
|---|---|
`;
  communicationMethods.forEach(method => {
    swms += `| ${method} | [ ] Available |
`;
  });

  if (toolboxTalkRequired) {
    swms += `
**PRE-START / TOOLBOX TALK REQUIRED:** YES - Must be conducted before work commences daily.

`;
  }

  swms += `---

## SECTION ${commSection + 1}: RISK MATRIX

|  | CONSEQUENCE → |||||
|---|---|---|---|---|---|
| **LIKELIHOOD ↓** | **1 - Insignificant** | **2 - Minor** | **3 - Moderate** | **4 - Major** | **5 - Catastrophic** |
| **A - Almost Certain** | MEDIUM | HIGH | HIGH | EXTREME | EXTREME |
| **B - Likely** | MEDIUM | MEDIUM | HIGH | HIGH | EXTREME |
| **C - Possible** | LOW | MEDIUM | MEDIUM | HIGH | EXTREME |
| **D - Unlikely** | LOW | LOW | MEDIUM | MEDIUM | HIGH |
| **E - Rare** | LOW | LOW | LOW | MEDIUM | HIGH |

| RISK LEVEL | ACTION REQUIRED |
|---|---|
| **EXTREME** | Work must NOT proceed. Senior management approval required. |
| **HIGH** | Significant controls required. Supervisor approval needed before proceeding. |
| **MEDIUM** | Standard controls required. Monitor and review regularly. |
| **LOW** | Routine procedures. Manage by standard operating procedures. |

---

## SECTION ${commSection + 2}: HIERARCHY OF CONTROLS

| LEVEL | CONTROL TYPE | EFFECTIVENESS |
|---|---|---|
| 1 | **ELIMINATION** - Remove the hazard completely | MOST EFFECTIVE |
| 2 | **SUBSTITUTION** - Replace with something less hazardous | ↑ |
| 3 | **ISOLATION** - Separate people from the hazard | ↑ |
| 4 | **ENGINEERING** - Physical changes to workplace | ↑ |
| 5 | **ADMINISTRATIVE** - Procedures, training, signage | ↓ |
| 6 | **PPE** - Personal protective equipment | LEAST EFFECTIVE |

---

## SECTION ${commSection + 3}: WORKER SIGN-ON

By signing below, I confirm that:
- I have read and understand this ${documentType.toUpperCase()}
- I have been consulted in its development
- I agree to follow the control measures
- I will report hazards, incidents, and near misses
- I have the required licences and training
- I will wear required PPE at all times

| # | NAME (Print) | COMPANY | SIGNATURE | DATE |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |

---

## SECTION ${commSection + 4}: DOCUMENT REVIEW

| REVIEW DATE | REVIEWED BY | CHANGES MADE | APPROVED BY |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

---

**APPROVAL**

| | NAME | SIGNATURE | DATE |
|---|---|---|---|
| **Prepared By:** | ${preparedBy} | _______________ | _______________ |
| **Approved By:** | ${approvedBy} | _______________ | _______________ |

---

*This ${docTitle} was generated using SafeDocGen. Review and customise for your specific workplace and activities. Consult a WHS professional for complex or high-risk work.*
`;

  return swms;
}

export function generateSwmsPlainText(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gm, '\n$1\n')
    .replace(/^## (.*$)/gm, '\n\n$1\n' + '='.repeat(60))
    .replace(/^# (.*$)/gm, '\n' + '='.repeat(60) + '\n$1\n' + '='.repeat(60))
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^- /gm, '• ')
    .replace(/\[X\]/g, '[✓]')
    .replace(/\[ \]/g, '[ ]')
    .replace(/---/g, '\n' + '-'.repeat(60) + '\n');
}

export function generateSwmsHTML(markdown: string): string {
  // Convert tables properly
  const lines = markdown.split('\n');
  let html = '';
  let inTable = false;
  let isHeaderRow = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if it's a table row
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      // Check if it's a separator row
      if (line.includes('---|')) {
        continue; // Skip separator rows
      }

      if (!inTable) {
        html += '<table>\n';
        inTable = true;
        isHeaderRow = true;
      }

      const cells = line.split('|').slice(1, -1); // Remove empty first and last
      const cellTag = isHeaderRow ? 'th' : 'td';

      html += '<tr>';
      cells.forEach(cell => {
        let content = cell.trim()
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\[X\]/g, '✓')
          .replace(/\[ \]/g, '☐');

        // Add risk coloring
        if (content === 'EXTREME') content = '<span class="risk-extreme">EXTREME</span>';
        else if (content === 'HIGH') content = '<span class="risk-high">HIGH</span>';
        else if (content === 'MEDIUM') content = '<span class="risk-medium">MEDIUM</span>';
        else if (content === 'LOW') content = '<span class="risk-low">LOW</span>';

        html += `<${cellTag}>${content}</${cellTag}>`;
      });
      html += '</tr>\n';

      isHeaderRow = false;
    } else {
      if (inTable) {
        html += '</table>\n';
        inTable = false;
      }

      // Process non-table content
      let processedLine = line
        .replace(/^# (.*)$/g, '<h1>$1</h1>')
        .replace(/^## (.*)$/g, '<h2>$1</h2>')
        .replace(/^### (.*)$/g, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^(\d+)\. (.*)$/g, '<li>$2</li>')
        .replace(/^- (.*)$/g, '<li>$1</li>')
        .replace(/---/g, '<hr>')
        .replace(/\[X\]/g, '✓')
        .replace(/\[ \]/g, '☐');

      if (processedLine.trim()) {
        if (!processedLine.startsWith('<')) {
          processedLine = `<p>${processedLine}</p>`;
        }
        html += processedLine + '\n';
      }
    }
  }

  if (inTable) {
    html += '</table>\n';
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Safe Work Method Statement</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11pt;
      line-height: 1.4;
      max-width: 210mm;
      margin: 0 auto;
      padding: 15mm;
      color: #000;
      background: #fff;
    }
    h1 {
      font-size: 18pt;
      text-align: center;
      margin: 0 0 10px 0;
      padding: 10px;
      background: #1a1a1a;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    h2 {
      font-size: 12pt;
      margin: 20px 0 10px 0;
      padding: 8px 10px;
      background: #f0f0f0;
      border-left: 4px solid #1a1a1a;
      text-transform: uppercase;
    }
    h3 {
      font-size: 11pt;
      margin: 15px 0 8px 0;
      font-weight: bold;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 15px 0;
      font-size: 10pt;
    }
    th, td {
      border: 1px solid #333;
      padding: 6px 8px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: #e8e8e8;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 9pt;
    }
    tr:nth-child(even) { background: #fafafa; }
    hr {
      border: none;
      border-top: 2px solid #333;
      margin: 20px 0;
    }
    ul, ol {
      margin: 10px 0;
      padding-left: 25px;
    }
    li { margin-bottom: 4px; }
    p { margin: 8px 0; }
    .risk-extreme {
      background: #dc3545;
      color: #fff;
      padding: 2px 6px;
      font-weight: bold;
      font-size: 9pt;
    }
    .risk-high {
      background: #fd7e14;
      color: #fff;
      padding: 2px 6px;
      font-weight: bold;
      font-size: 9pt;
    }
    .risk-medium {
      background: #ffc107;
      color: #000;
      padding: 2px 6px;
      font-weight: bold;
      font-size: 9pt;
    }
    .risk-low {
      background: #28a745;
      color: #fff;
      padding: 2px 6px;
      font-weight: bold;
      font-size: 9pt;
    }
    @media print {
      body { padding: 10mm; }
      h1 { page-break-after: avoid; }
      h2 { page-break-after: avoid; }
      table { page-break-inside: avoid; }
      tr { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
${html}
</body>
</html>`;
}
