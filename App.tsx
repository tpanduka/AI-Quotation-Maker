
import React from 'react';
import { QuotationForm } from './components/QuotationForm';
import { QuotationPreview } from './components/QuotationPreview';
import { useQuotation } from './hooks/useQuotation';

function App() {
  const quotationProps = useQuotation();

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow-md p-4 print:hidden">
        <h1 className="text-2xl font-bold text-gray-700 text-center">A4 Quotation Creator</h1>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="print:hidden">
            <QuotationForm {...quotationProps} />
          </div>
          <div className="flex justify-center items-start">
            <QuotationPreview {...quotationProps} />
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
