import React, { forwardRef } from 'react';
import type { UseQuotationReturn } from '../hooks/useQuotation';

export const QuotationPreview = forwardRef<HTMLDivElement, UseQuotationReturn>(({
  company,
  customer,
  items,
  quoteNumber,
  quoteDate,
  subtotal,
  taxRate,
  taxAmount,
  grandTotal,
  notes,
  currency,
  warranty,
}, ref) => {
  return (
    <div ref={ref} className="a4-page bg-white shadow-lg p-8 w-[210mm] min-h-[297mm] text-sm print:shadow-none print:p-12 print:w-full print:min-h-screen">
      <header className="flex justify-between items-start pb-8 border-b-2 border-gray-200">
        <div className="w-2/5">
          {company.logo && (
            <img src={company.logo} alt="Company Logo" className="max-w-full h-auto max-h-24 object-contain mb-4" />
          )}
        </div>
        <div className="w-3/5 text-right">
          <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
          <p className="whitespace-pre-line">{company.address}</p>
          <p>{company.phone}</p>
          <p>{company.email}</p>
        </div>
      </header>

      <section className="mt-8">
        <div className="flex justify-between">
          <div className="w-1/2">
            <h3 className="font-semibold text-gray-600">Bill To:</h3>
            <p className="font-bold">{customer.name || 'Customer Name'}</p>
            <p className="whitespace-pre-line">{customer.address || 'Customer Address'}</p>
            <p>{customer.contact || 'Customer Phone'}</p>
            <p>{customer.email || 'Customer Email'}</p>
          </div>
          <div className="w-1/2 text-right">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight mb-2">QUOTATION</h1>
            <p><span className="font-semibold">Quotation No:</span> {quoteNumber}</p>
            <p><span className="font-semibold">Date:</span> {quoteDate}</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
              <th className="p-2 w-7/12">Description</th>
              <th className="p-2 text-center w-1/12">Qty</th>
              <th className="p-2 text-right w-2/12">Unit Price</th>
              <th className="p-2 text-right w-2/12">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">No items added.</td>
              </tr>
            ) : (
              items.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className="border-b border-gray-200 font-semibold">
                    <td className="p-2">{item.description}</td>
                    <td className="p-2 text-center">{item.quantity}</td>
                    <td className="p-2 text-right">{currency}{item.unitPrice.toFixed(2)}</td>
                    <td className="p-2 text-right">{currency}{(item.quantity * item.unitPrice).toFixed(2)}</td>
                  </tr>
                  {item.subItems.map((subItem) => (
                    <tr key={subItem.id} className="border-b border-gray-100 text-gray-600">
                      <td className="p-2 pl-8">{subItem.description}</td>
                      <td className="p-2 text-center">{subItem.quantity}</td>
                      <td className="p-2 text-right">{currency}{subItem.unitPrice.toFixed(2)}</td>
                      <td className="p-2 text-right">{currency}{(subItem.quantity * subItem.unitPrice).toFixed(2)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="mt-8 flex justify-end">
        <div className="w-1/2 sm:w-2/5 space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Subtotal:</span>
            <span>{currency}{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Tax ({taxRate}%):</span>
            <span>{currency}{taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl border-t-2 border-gray-800 pt-2 mt-2">
            <span>Grand Total:</span>
            <span>{currency}{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        {warranty && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-600 mb-2">Warranty:</h4>
            <p className="text-gray-500 whitespace-pre-line text-xs">{warranty}</p>
          </div>
        )}
        <h4 className="font-semibold text-gray-600 mb-2">Notes:</h4>
        <p className="text-gray-500 whitespace-pre-line text-xs">{notes}</p>
      </footer>
    </div>
  );
});