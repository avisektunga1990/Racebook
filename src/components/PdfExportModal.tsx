import React, { useState } from 'react';
import { 
  X, Download, Printer, CheckCircle, FileText, 
  Sparkles, Loader2, BookOpen, Layers, ShieldCheck, AlertCircle 
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentRefId: string;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  documentRefId,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const handlePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    setErrorMessage('');
    setProgressStatus('Initializing high-resolution handbook snapshot...');

    try {
      const element = document.getElementById(documentRefId);
      if (!element) {
        throw new Error('Document container not found');
      }

      setProgressStatus('Capturing high-resolution document pages (Scale 1.5x)...');

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#f8fafc', // Matches theme
        windowWidth: 1200,
        ignoreElements: (el) => {
          return el.classList?.contains('no-print');
        },
      });

      setProgressStatus('Compiling PDF booklet pages...');

      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      // Additional pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      setProgressStatus('Finalizing participant download...');
      pdf.save('Tamralipta_Ultra_2026_Racers_Handbook.pdf');
      
      setTimeout(() => {
        setIsGenerating(false);
        setProgressStatus('');
        onClose();
      }, 500);

    } catch (err: any) {
      console.warn('PDF snapshot fallback to browser print engine:', err);
      setIsGenerating(false);
      setProgressStatus('');
      setErrorMessage('Direct canvas rasterization encountered an issue. Launching high-resolution vector print engine (Select "Save as PDF")...');
      setTimeout(() => {
        handlePrint();
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print">
      <div className="relative w-full max-w-lg bg-white border border-[#e2e8f0] rounded-xl shadow-2xl p-6 sm:p-8 text-[#0f172a]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-[#0f172a] rounded hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5]">
            <Download className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0f172a] uppercase">
              Export Official Racer&apos;s Handbook
            </h3>
            <p className="text-xs text-slate-500">
              TAMRALIPTA ULTRA 2026 • 50K • 75K • 100K
            </p>
          </div>
        </div>

        {/* Document Specifications */}
        <div className="p-4 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] text-xs space-y-2 mb-6">
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-500">Document Edition:</span>
            <span className="font-bold text-[#ea580c]">September 2026 Official Handbook</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-500">Included Content:</span>
            <span className="font-semibold text-[#0f172a]">All Official Sections, Menus &amp; Checklists</span>
          </div>
          <div className="flex justify-between text-slate-700">
            <span className="text-slate-500">Recommended Format:</span>
            <span className="font-semibold text-[#0f172a]">A4 High-Resolution Vector Print</span>
          </div>
        </div>

        {/* Error or Fallback Status Banner */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Options */}
        <div className="space-y-3">
          
          {/* Native Print / Save as PDF (Highest Quality Vector PDF) */}
          <button
            id="pdf-native-print-btn"
            onClick={handlePrint}
            disabled={isGenerating}
            className="w-full p-4 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white font-black text-sm flex items-center justify-between shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 text-left">
              <Printer className="w-5 h-5 text-white shrink-0" />
              <div>
                <div className="font-extrabold text-sm">Native High-Res Vector PDF / Print</div>
                <div className="text-[11px] font-normal text-orange-100">
                  Crisp vector text & graphics via browser &ldquo;Save as PDF&rdquo;
                </div>
              </div>
            </div>
            <span className="text-[11px] font-bold uppercase bg-white/20 text-white px-2 py-0.5 rounded">
              Recommended
            </span>
          </button>

          {/* Instant PDF File Download */}
          <button
            id="pdf-direct-download-btn"
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="w-full p-4 rounded-lg bg-[#f8fafc] hover:bg-slate-100 border border-[#e2e8f0] text-[#0f172a] font-bold text-sm flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 text-left">
              {isGenerating ? (
                <Loader2 className="w-5 h-5 text-[#ea580c] animate-spin shrink-0" />
              ) : (
                <Download className="w-5 h-5 text-[#ea580c] shrink-0" />
              )}
              <div>
                <div className="font-bold text-[#0f172a]">Direct .PDF File Download</div>
                <div className="text-[11px] text-slate-500">
                  {isGenerating ? progressStatus : 'Instant offline file for phones & tablets'}
                </div>
              </div>
            </div>
            <FileText className="w-4 h-4 text-slate-400" />
          </button>

        </div>

        {/* Footnote */}
        <p className="mt-5 text-[11px] text-center text-slate-500">
          Tip: You can also press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono">Ctrl+P</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono">Cmd+P</kbd> at any time to export or print this handbook.
        </p>

      </div>
    </div>
  );
};
