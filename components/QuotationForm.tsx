import React from 'react';
import type { UseQuotationReturn } from '../hooks/useQuotation';
import { PlusIcon, TrashIcon, RefreshIcon, DownloadIcon } from './Icons';

interface QuotationFormProps extends UseQuotationReturn {
  handleDownloadPdf: () => void;
}

export const QuotationForm: React.FC<QuotationFormProps> = ({
  company,
  customer,
  items,
  quoteNumber,
  quoteDate,
  taxRate,
  notes,
  currency,
  warranty,
  handleCompanyChange,
  handleLogoChange,
  handleCustomerChange,
  handleItemChange,
  addItem,
  removeItem,
  addSubItem,
  removeSubItem,
  setQuoteNumber,
  setQuoteDate,
  setTaxRate,
  setNotes,
  setCurrency,
  setWarranty,
  resetForm,
  handleDownloadPdf,
}) => {
  const currencies = [
    { symbol: '$', name: 'USD' },
    { symbol: '€', name: 'EUR' },
    { symbol: '£', name: 'GBP' },
    { symbol: '¥', name: 'JPY' },
    { symbol: '₹', name: 'INR' },
    { symbol: 'A$', name: 'AUD' },
    { symbol: 'C$', name: 'CAD' },
    { symbol: 'LKR', name: 'LKR' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-8">
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleDownloadPdf}
          className="w-full sm:w-auto flex-grow bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <DownloadIcon />
          Download PDF
        </button>
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Print
        </button>
        <button
          onClick={resetForm}
          className="w-full sm:w-auto bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshIcon />
          Reset
        </button>
      </div>
      
      {/* Company Details Section */}
      <div className="border border-gray-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Your Company Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Company Name" name="name" value={company.name} onChange={handleCompanyChange} />
          <InputField label="Phone" name="phone" value={company.phone} onChange={handleCompanyChange} />
          <InputField label="Email" name="email" value={company.email} onChange={handleCompanyChange} />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Logo</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleLogoChange(e.target.files ? e.target.files[0] : null, '')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <InputField 
              placeholder="Or enter image URL" 
              className="mt-2"
              value={company.logo.startsWith('data:') ? '' : company.logo}
              onChange={(e) => handleLogoChange(null, e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
             <label htmlFor="company-address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
                id="company-address"
                name="address"
                value={company.address}
                onChange={handleCompanyChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Customer Details Section */}
      <div className="border border-gray-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Customer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Customer Name" name="name" value={customer.name} onChange={handleCustomerChange} />
          <InputField label="Phone" name="contact" value={customer.contact} onChange={handleCustomerChange} />
          <div className="md:col-span-2">
            <InputField label="Email" name="email" value={customer.email} onChange={handleCustomerChange} />
          </div>
          <div className="md:col-span-2">
             <label htmlFor="customer-address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
                id="customer-address"
                name="address"
                value={customer.address}
                onChange={handleCustomerChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Quotation Info Section */}
       <div className="border border-gray-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Quotation Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField label="Quotation No." value={quoteNumber} onChange={(e) => setQuoteNumber(e.target.value)} />
          <InputField label="Date" type="date" value={quoteDate} onChange={(e) => setQuoteDate(e.target.value)} />
           <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {currencies.map(c => <option key={c.name} value={c.symbol}>{c.symbol} - {c.name}</option>)}
            </select>
          </div>
           <div className="md:col-span-3">
            <InputField label="Warranty" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Items Table Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Items</h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="bg-gray-50 p-3 rounded-lg border">
              {/* Main Item Row */}
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 sm:col-span-6">
                  <label className="text-xs text-gray-500">Description</label>
                  <input
                    type="text"
                    placeholder="Item Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <label className="text-xs text-gray-500">Qty</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <label className="text-xs text-gray-500">Unit Price</label>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  />
                </div>
                <div className="col-span-4 sm:col-span-1 flex items-end">
                  <p className="w-full text-center text-gray-700 sm:text-sm">{(item.quantity * item.unitPrice).toFixed(2)}</p>
                </div>
                <div className="col-span-12 sm:col-span-1 flex items-end justify-end">
                  <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                    <TrashIcon />
                  </button>
                </div>
              </div>

              {/* Sub Items Section */}
              <div className="pl-6 mt-2 space-y-2 border-l-2 border-gray-200">
                {item.subItems.map((subItem, subIndex) => (
                  <div key={subItem.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-12 sm:col-span-6 flex items-center">
                        <span className="text-gray-400 mr-2">↳</span>
                        <input
                          type="text"
                          placeholder="Sub-item Description"
                          value={subItem.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value, subIndex)}
                          className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <input
                        type="number"
                        value={subItem.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value, subIndex)}
                        className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <input
                        type="number"
                        value={subItem.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value, subIndex)}
                        className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-1 flex items-center justify-center">
                      <p className="w-full text-center text-gray-600 sm:text-sm">{(subItem.quantity * subItem.unitPrice).toFixed(2)}</p>
                    </div>
                    <div className="col-span-12 sm:col-span-1 flex items-center justify-end">
                      <button onClick={() => removeSubItem(index, subIndex)} className="text-red-500 hover:text-red-700">
                         <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addSubItem(index)}
                  className="mt-2 flex items-center gap-1 text-xs text-green-600 font-semibold py-1 px-2 rounded-md border border-green-200 hover:bg-green-50"
                >
                  <PlusIcon /> Add Sub-item
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="mt-4 flex items-center gap-2 text-blue-600 font-semibold py-2 px-4 rounded-md border-2 border-blue-200 hover:bg-blue-50 transition-colors"
        >
          <PlusIcon /> Add Item
        </button>
      </div>

      {/* Tax & Notes Section */}
      <div className="border border-gray-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Tax & Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
                <input
                    id="taxRate"
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
             <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Custom Note</label>
                <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const InputField: React.FC<InputFieldProps> = ({ label, id, ...props }) => {
  const inputId = id || props.name;
  return (
    <div>
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        id={inputId}
        {...props}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${props.className || ''}`}
      />
    </div>
  );
};