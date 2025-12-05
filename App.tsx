import React, { useRef } from 'react';
import { QuotationForm } from './components/QuotationForm';
import { QuotationPreview } from './components/QuotationPreview';
import { useQuotation } from './hooks/useQuotation';

declare const jspdf: any;
declare const html2canvas: any;

function App() {
  const quotationProps = useQuotation();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    const input = previewRef.current;
    if (input) {
      // Temporarily remove shadow for a cleaner capture
      const originalShadow = input.style.boxShadow;
      input.style.boxShadow = 'none';

      html2canvas(input, { 
          scale: 3, // Higher scale for better quality PDF
          useCORS: true 
      }).then((canvas) => {
        input.style.boxShadow = originalShadow; // Restore shadow
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`quotation-${quotationProps.quoteNumber}.pdf`);
      });
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow-md p-4 print:hidden">
        <h1 className="text-2xl font-bold text-gray-700 text-center">A4 Quotation Creator</h1>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 print:p-0 print:m-0 print:max-w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 print:block">
          <div className="print:hidden">
            <QuotationForm {...quotationProps} handleDownloadPdf={handleDownloadPdf} />
          </div>
          <div className="flex justify-center items-start print:block">
            <QuotationPreview {...quotationProps} ref={previewRef} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm print:hidden">
        <p>Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;