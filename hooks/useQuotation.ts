import { useState, useMemo, useCallback, ChangeEvent } from 'react';
import type { CompanyDetails, CustomerDetails, QuotationItem, SubItem } from '../types';

const getInitialDate = () => new Date().toISOString().split('T')[0];
const getInitialQuoteNumber = () => `Q-${new Date().getFullYear()}-001`;

const initialCompanyDetails: CompanyDetails = {
  name: 'E-TECH SOLUTIONS',
  logo: '',
  address: '123 Tech Street, Silicon Valley, CA 94000',
  phone: '+1 (555) 123-4567',
  email: 'contact@etechsolutions.com',
};

const initialCustomerDetails: CustomerDetails = {
  name: '',
  address: '',
  contact: '',
  email: '',
};

const initialItems: QuotationItem[] = [
  { id: Date.now(), description: 'Example Item', quantity: 1, unitPrice: 100, subItems: [] },
];

export const useQuotation = () => {
  const [company, setCompany] = useState<CompanyDetails>(initialCompanyDetails);
  const [customer, setCustomer] = useState<CustomerDetails>(initialCustomerDetails);
  const [items, setItems] = useState<QuotationItem[]>(initialItems);
  const [quoteNumber, setQuoteNumber] = useState<string>(getInitialQuoteNumber());
  const [quoteDate, setQuoteDate] = useState<string>(getInitialDate());
  const [taxRate, setTaxRate] = useState<number>(10);
  const [notes, setNotes] = useState<string>('Payment Terms: 30 days net. Quotation valid for 15 days.');
  const [currency, setCurrency] = useState<string>('$');
  const [warranty, setWarranty] = useState<string>('1 Year Standard Warranty');

  const handleCompanyChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompany(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleLogoChange = useCallback((file: File | null, url: string) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompany(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
       setCompany(prev => ({ ...prev, logo: url }));
    }
  }, []);

  const handleCustomerChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleItemChange = useCallback((itemIndex: number, field: string, value: string | number, subItemIndex?: number) => {
    setItems(prevItems => {
      const newItems = JSON.parse(JSON.stringify(prevItems));
      let target: QuotationItem | SubItem;

      if (subItemIndex !== undefined) {
        target = newItems[itemIndex].subItems[subItemIndex];
      } else {
        target = newItems[itemIndex];
      }
      
      if (field === 'description') {
        target.description = value as string;
      } else if (field === 'quantity' || field === 'unitPrice') {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
            target[field as 'quantity' | 'unitPrice'] = numValue;
        }
      }
      return newItems;
    });
  }, []);

  const addItem = useCallback(() => {
    setItems(prev => [...prev, { id: Date.now(), description: '', quantity: 1, unitPrice: 0, subItems: [] }]);
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const addSubItem = useCallback((itemIndex: number) => {
    setItems(prevItems => {
        const newItems = JSON.parse(JSON.stringify(prevItems));
        newItems[itemIndex].subItems.push({ id: Date.now(), description: '', quantity: 1, unitPrice: 0 });
        return newItems;
    });
  }, []);

  const removeSubItem = useCallback((itemIndex: number, subItemIndex: number) => {
    setItems(prevItems => {
        const newItems = JSON.parse(JSON.stringify(prevItems));
        newItems[itemIndex].subItems.splice(subItemIndex, 1);
        return newItems;
    });
  }, []);
  
  const resetForm = useCallback(() => {
    setCompany(initialCompanyDetails);
    setCustomer(initialCustomerDetails);
    setItems([ { id: Date.now(), description: 'Example Item', quantity: 1, unitPrice: 100, subItems: [] } ]);
    setQuoteNumber(getInitialQuoteNumber());
    setQuoteDate(getInitialDate());
    setTaxRate(10);
    setNotes('Payment Terms: 30 days net. Quotation valid for 15 days.');
    setCurrency('$');
    setWarranty('1 Year Standard Warranty');
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
        const mainItemTotal = item.quantity * item.unitPrice;
        const subItemsTotal = item.subItems.reduce((subAcc, subItem) => subAcc + subItem.quantity * subItem.unitPrice, 0);
        return acc + mainItemTotal + subItemsTotal;
    }, 0);
  }, [items]);

  const taxAmount = useMemo(() => {
    return subtotal * (taxRate / 100);
  }, [subtotal, taxRate]);

  const grandTotal = useMemo(() => {
    return subtotal + taxAmount;
  }, [subtotal, taxAmount]);

  return {
    company,
    customer,
    items,
    quoteNumber,
    quoteDate,
    taxRate,
    notes,
    currency,
    warranty,
    subtotal,
    taxAmount,
    grandTotal,
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
  };
};

export type UseQuotationReturn = ReturnType<typeof useQuotation>;