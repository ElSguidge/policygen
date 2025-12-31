'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePlainText, generateHTML } from '@/lib/generate-policy';

interface PolicyOutputProps {
  policy: string;
  onReset: () => void;
}

export function PolicyOutput({ policy, onReset }: PolicyOutputProps) {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'preview' | 'markdown' | 'html'>('preview');

  // Detect document type early
  const isSwms = policy.includes('SAFE WORK METHOD STATEMENT') ||
                 policy.includes('JOB SAFETY ANALYSIS') ||
                 policy.includes('RISK ASSESSMENT & METHOD STATEMENT');

  const getFormattedPolicy = () => {
    switch (format) {
      case 'html':
        return generateHTML(policy);
      case 'markdown':
        return policy;
      default:
        return policy;
    }
  };

  const copyToClipboard = async () => {
    const content = format === 'html' ? generateHTML(policy) : policy;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const isHtml = format === 'html';
    const content = isHtml ? generateHTML(policy) : policy;
    const extension = isHtml ? 'html' : 'md';
    const mimeType = isHtml ? 'text/html' : 'text/markdown';

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  const downloadPdf = () => {
    // Open print-friendly version in new window - user can save as PDF
    const pdfContent = generatePdfHtml(policy);
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download PDF');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${isSwms ? 'SWMS Document' : 'Document'}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10pt;
            line-height: 1.35;
            color: #000;
            background: #fff;
            padding: 15px;
            max-width: 210mm;
            margin: 0 auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
            font-size: 9pt;
          }
          th, td {
            border: 1px solid #333;
            padding: 5px 6px;
            text-align: left;
            vertical-align: top;
          }
          th {
            background: #e0e0e0 !important;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 8pt;
          }
          h1 {
            background: #1a1a1a !important;
            color: #fff !important;
            padding: 10px 12px;
            font-size: 16pt;
            margin: 0 0 10px 0;
            text-align: center;
          }
          h2 {
            background: #f0f0f0 !important;
            border-left: 4px solid #333;
            padding: 6px 10px;
            font-size: 11pt;
            margin: 15px 0 8px 0;
          }
          h3 {
            font-size: 10pt;
            margin: 10px 0 5px 0;
            border-bottom: 1px solid #ccc;
            padding-bottom: 3px;
          }
          hr {
            border: none;
            border-top: 2px solid #333;
            margin: 15px 0;
          }
          .risk-extreme { background: #dc2626 !important; color: #fff !important; padding: 2px 8px; font-weight: bold; font-size: 8pt; display: inline-block; }
          .risk-high { background: #ea580c !important; color: #fff !important; padding: 2px 8px; font-weight: bold; font-size: 8pt; display: inline-block; }
          .risk-medium { background: #eab308 !important; color: #000 !important; padding: 2px 8px; font-weight: bold; font-size: 8pt; display: inline-block; }
          .risk-low { background: #16a34a !important; color: #fff !important; padding: 2px 8px; font-weight: bold; font-size: 8pt; display: inline-block; }
          @media print {
            body { padding: 0; }
            @page { margin: 12mm; size: A4; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          }
          table { page-break-inside: avoid; }
          tr { page-break-inside: avoid; }
          h1, h2, h3 { page-break-after: avoid; }
        </style>
      </head>
      <body>
        ${pdfContent}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 250);
          };
        <\/script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Generate clean HTML string for PDF (no Tailwind dependency)
  const generatePdfHtml = (markdown: string): string => {
    const lines = markdown.split('\n');
    let html = '';
    let inTable = false;
    let tableRows: string[][] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (line.includes('---|')) continue;

        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        tableRows.push(cells);
      } else {
        if (inTable && tableRows.length > 0) {
          html += renderPdfTable(tableRows);
          tableRows = [];
          inTable = false;
        }

        if (line.trim() === '---') {
          html += '<hr style="margin:20px 0;border:none;border-top:2px solid #333;" />';
        } else if (line.startsWith('# ')) {
          html += `<h1 style="font-size:20px;font-weight:bold;margin:20px 0 12px 0;padding:10px 14px;background:#1a1a1a;color:#fff;">${line.slice(2)}</h1>`;
        } else if (line.startsWith('## ')) {
          html += `<h2 style="font-size:14px;font-weight:bold;margin:18px 0 10px 0;padding:6px 10px;background:#eee;border-left:4px solid #333;">${line.slice(3)}</h2>`;
        } else if (line.startsWith('### ')) {
          html += `<h3 style="font-size:13px;font-weight:600;margin:14px 0 6px 0;">${line.slice(4)}</h3>`;
        } else if (line.startsWith('- ')) {
          html += `<div style="margin:3px 0 3px 20px;">• ${pdfInlineMarkdown(line.slice(2))}</div>`;
        } else if (line.match(/^\d+\. /)) {
          const match = line.match(/^(\d+)\. (.*)$/);
          if (match) {
            html += `<div style="margin:3px 0 3px 20px;"><strong>${match[1]}.</strong> ${pdfInlineMarkdown(match[2])}</div>`;
          }
        } else if (line.trim()) {
          html += `<p style="margin:6px 0;">${pdfInlineMarkdown(line)}</p>`;
        }
      }
    }

    if (inTable && tableRows.length > 0) {
      html += renderPdfTable(tableRows);
    }

    return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;color:#000;padding:10px;">${html}</div>`;
  };

  const renderPdfTable = (rows: string[][]): string => {
    if (rows.length === 0) return '';

    let t = '<table style="width:100%;border-collapse:collapse;margin:12px 0;font-size:11px;">';

    rows.forEach((row, rowIndex) => {
      const isHeader = rowIndex === 0;
      t += '<tr>';
      row.forEach(cell => {
        const tag = isHeader ? 'th' : 'td';
        const style = isHeader
          ? 'background:#ddd;font-weight:bold;text-align:left;padding:6px;border:1px solid #666;font-size:10px;text-transform:uppercase;'
          : 'padding:6px;border:1px solid #999;vertical-align:top;';

        let content = pdfInlineMarkdown(cell);

        if (cell === 'EXTREME') content = '<span class="risk-extreme">EXTREME</span>';
        else if (cell === 'HIGH') content = '<span class="risk-high">HIGH</span>';
        else if (cell === 'MEDIUM') content = '<span class="risk-medium">MEDIUM</span>';
        else if (cell === 'LOW') content = '<span class="risk-low">LOW</span>';

        content = content.replace(/\[X\]/g, '<span style="color:#16a34a;font-weight:bold;">✓</span>');
        content = content.replace(/\[ \]/g, '<span style="color:#888;">☐</span>');

        t += `<${tag} style="${style}">${content}</${tag}>`;
      });
      t += '</tr>';
    });

    t += '</table>';
    return t;
  };

  const pdfInlineMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[X\]/g, '<span style="color:#16a34a;font-weight:bold;">✓</span>')
      .replace(/\[ \]/g, '<span style="color:#888;">☐</span>');
  };

  // Convert markdown to proper HTML with table support
  const renderPreview = () => {
    const lines = policy.split('\n');
    let html = '';
    let inTable = false;
    let tableRows: string[][] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if it's a table row
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        // Skip separator rows
        if (line.includes('---|')) {
          continue;
        }

        if (!inTable) {
          inTable = true;
          tableRows = [];
        }

        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        tableRows.push(cells);
      } else {
        // End of table - render it
        if (inTable && tableRows.length > 0) {
          html += renderTable(tableRows);
          tableRows = [];
          inTable = false;
        }

        // Process non-table content with inline styles for PDF compatibility
        if (line.trim() === '---') {
          html += '<hr style="margin:24px 0;border:none;border-top:2px solid #ccc;" />';
        } else if (line.startsWith('# ')) {
          html += `<h1 style="font-size:22px;font-weight:bold;margin:24px 0 16px 0;padding:12px 16px;background:#1a1a1a;color:#fff;">${line.slice(2)}</h1>`;
        } else if (line.startsWith('## ')) {
          html += `<h2 style="font-size:16px;font-weight:bold;margin:24px 0 12px 0;padding:8px 12px;background:#f0f0f0;border-left:4px solid #1a1a1a;">${line.slice(3)}</h2>`;
        } else if (line.startsWith('### ')) {
          html += `<h3 style="font-size:14px;font-weight:600;margin:16px 0 8px 0;">${line.slice(4)}</h3>`;
        } else if (line.startsWith('- ')) {
          html += `<div style="display:flex;gap:8px;margin-left:16px;margin:4px 0 4px 16px;"><span>•</span><span>${processInlineMarkdown(line.slice(2))}</span></div>`;
        } else if (line.match(/^\d+\. /)) {
          const match = line.match(/^(\d+)\. (.*)$/);
          if (match) {
            html += `<div style="display:flex;gap:8px;margin-left:16px;margin:4px 0 4px 16px;"><span style="font-weight:500;">${match[1]}.</span><span>${processInlineMarkdown(match[2])}</span></div>`;
          }
        } else if (line.trim()) {
          html += `<p style="margin:8px 0;">${processInlineMarkdown(line)}</p>`;
        }
      }
    }

    // Handle table at end of document
    if (inTable && tableRows.length > 0) {
      html += renderTable(tableRows);
    }

    // Wrap in iframe-style isolation to prevent Tailwind CSS bleeding into PDF
    const wrappedHtml = `
      <div style="all:initial;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#000;background:#fff;">
        ${html}
      </div>
    `;

    return (
      <div
        dangerouslySetInnerHTML={{ __html: wrappedHtml }}
      />
    );
  };

  const renderTable = (rows: string[][]): string => {
    if (rows.length === 0) return '';

    let tableHtml = '<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">';

    rows.forEach((row, rowIndex) => {
      const isHeader = rowIndex === 0;
      tableHtml += '<tr>';
      row.forEach(cell => {
        const tag = isHeader ? 'th' : 'td';
        const headerStyle = isHeader
          ? 'background:#e5e5e5;font-weight:bold;text-align:left;padding:8px;border:1px solid #888;font-size:12px;text-transform:uppercase;'
          : 'padding:8px;border:1px solid #ccc;vertical-align:top;';

        let cellContent = processInlineMarkdown(cell);

        // Color code risk levels with inline styles for PDF compatibility
        if (cell === 'EXTREME') {
          cellContent = '<span style="display:inline-block;background:#dc2626;color:#fff;padding:2px 8px;font-size:11px;font-weight:bold;border-radius:4px;">EXTREME</span>';
        } else if (cell === 'HIGH') {
          cellContent = '<span style="display:inline-block;background:#ea580c;color:#fff;padding:2px 8px;font-size:11px;font-weight:bold;border-radius:4px;">HIGH</span>';
        } else if (cell === 'MEDIUM') {
          cellContent = '<span style="display:inline-block;background:#facc15;color:#000;padding:2px 8px;font-size:11px;font-weight:bold;border-radius:4px;">MEDIUM</span>';
        } else if (cell === 'LOW') {
          cellContent = '<span style="display:inline-block;background:#16a34a;color:#fff;padding:2px 8px;font-size:11px;font-weight:bold;border-radius:4px;">LOW</span>';
        }

        // Convert checkboxes
        cellContent = cellContent.replace(/\[X\]/g, '<span style="color:#16a34a;font-weight:bold;">✓</span>');
        cellContent = cellContent.replace(/\[ \]/g, '<span style="color:#999;">☐</span>');

        tableHtml += `<${tag} style="${headerStyle}">${cellContent}</${tag}>`;
      });
      tableHtml += '</tr>';
    });

    tableHtml += '</table>';
    return tableHtml;
  };

  const processInlineMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[X\]/g, '<span style="color:#16a34a;font-weight:bold;">✓</span>')
      .replace(/\[ \]/g, '<span style="color:#999;">☐</span>');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>{isSwms ? 'Your SWMS Document' : 'Your Document'}</CardTitle>
          <Button variant="outline" size="sm" onClick={onReset}>
            Start Over
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Format selector */}
          <div className="flex gap-2">
            <Button
              variant={format === 'preview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFormat('preview')}
            >
              Preview
            </Button>
            <Button
              variant={format === 'markdown' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFormat('markdown')}
            >
              Markdown
            </Button>
            <Button
              variant={format === 'html' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFormat('html')}
            >
              HTML
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button onClick={downloadPdf} variant="default" className="flex-1 min-w-[140px]">
              <PdfIcon className="mr-2 h-4 w-4" />
              Print / Save PDF
            </Button>
            <Button onClick={copyToClipboard} variant="outline" className="flex-1 min-w-[140px]">
              {copied ? (
                <>
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button onClick={downloadFile} variant="outline" className="flex-1 min-w-[140px]">
              <DownloadIcon className="mr-2 h-4 w-4" />
              {format === 'html' ? 'HTML' : 'Markdown'}
            </Button>
          </div>

          {/* Preview */}
          <div className="mt-6 rounded-lg border bg-white p-6 max-h-[600px] overflow-y-auto">
            {format === 'preview' ? (
              renderPreview()
            ) : (
              <pre className="whitespace-pre-wrap text-xs font-mono text-gray-700 overflow-x-auto">
                {getFormattedPolicy()}
              </pre>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            {isSwms ? 'SWMS Next Steps' : 'Next Steps'}
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            {isSwms ? (
              <>
                <li>1. Review and customize the SWMS for your specific work</li>
                <li>2. Have workers sign the acknowledgement section before work begins</li>
                <li>3. Conduct a toolbox talk to review hazards and controls</li>
                <li>4. Keep the SWMS on-site and accessible during work</li>
                <li>5. Review and update if work conditions change</li>
              </>
            ) : (
              <>
                <li>1. Review the generated policy and customize as needed</li>
                <li>2. Have a lawyer review before publishing (recommended)</li>
                <li>3. Add the policy to your website&apos;s footer</li>
                <li>4. Link to it in your signup/checkout flows</li>
                <li>5. Update it whenever your data practices change</li>
              </>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15h2v2H9zM13 15h2v2h-2z" />
    </svg>
  );
}


