export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface Lead {
  id: string;
  customerId: string;
  status: LeadStatus;
  value: number;
  lastInteraction: string;
  assignedTo: string;
}

export interface Interaction {
  id: string;
  customerId: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Note';
  content: string;
  date: string;
}

export interface Task {
  id: string;
  customerId: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface Order {
  id: string;
  customerId: string;
  orderDate: string;
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid' | 'Refunded';
}

export interface Deal {
  id: string;
  name: string;
  customerId: string;
  amount: number;
  stage: 'Pitch' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  probability: number; // 0-100
  expectedCloseDate: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  type: 'Meeting' | 'Call' | 'Deadline' | 'Event';
  customerId?: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalLeads: number;
  conversionRate: number;
  revenue: number;
}
