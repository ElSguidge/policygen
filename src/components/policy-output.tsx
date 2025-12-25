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
  const [format, setFormat] = useState<'markdown' | 'text' | 'html'>('markdown');

  const getFormattedPolicy = () => {
    switch (format) {
      case 'text':
        return generatePlainText(policy);
      case 'html':
        return generateHTML(policy);
      default:
        return policy;
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(getFormattedPolicy());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const content = getFormattedPolicy();
    const extensions = { markdown: 'md', text: 'txt', html: 'html' };
    const mimeTypes = { markdown: 'text/markdown', text: 'text/plain', html: 'text/html' };

    const blob = new Blob([content], { type: mimeTypes[format] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `privacy-policy.${extensions[format]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simple markdown to HTML for preview
  const renderPreview = () => {
    const html = policy
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-gray-800">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-3">')
      .replace(/\n/g, '<br>');

    return <div dangerouslySetInnerHTML={{ __html: `<p class="mb-3">${html}</p>` }} />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Your Privacy Policy</CardTitle>
          <Button variant="outline" size="sm" onClick={onReset}>
            Start Over
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Format selector */}
          <div className="flex gap-2">
            <Button
              variant={format === 'markdown' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFormat('markdown')}
            >
              Markdown
            </Button>
            <Button
              variant={format === 'text' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFormat('text')}
            >
              Plain Text
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
          <div className="flex gap-3">
            <Button onClick={copyToClipboard} className="flex-1">
              {copied ? (
                <>
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </>
              )}
            </Button>
            <Button onClick={downloadFile} variant="outline" className="flex-1">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>

          {/* Preview */}
          <div className="mt-6 rounded-lg border bg-white p-6 max-h-[500px] overflow-y-auto text-sm">
            {format === 'markdown' || format === 'text' ? (
              renderPreview()
            ) : (
              <pre className="whitespace-pre-wrap text-xs font-mono">
                {getFormattedPolicy()}
              </pre>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-900 mb-2">Next Steps</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>1. Review the generated policy and customize as needed</li>
            <li>2. Have a lawyer review before publishing (recommended)</li>
            <li>3. Add the policy to your website&apos;s footer</li>
            <li>4. Link to it in your signup/checkout flows</li>
            <li>5. Update it whenever your data practices change</li>
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
