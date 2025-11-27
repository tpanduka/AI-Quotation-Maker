export interface CompanyDetails {
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
}

export interface CustomerDetails {
  name: string;
  address: string;
  contact: string; // Will represent phone number
  email: string;
}

export interface SubItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface QuotationItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  subItems: SubItem[];
}