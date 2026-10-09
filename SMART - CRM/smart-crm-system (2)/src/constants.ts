import { Customer, Lead, Interaction, Task, Product, Order, Deal, CalendarEvent } from './types';

export const DUMMY_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@techflow.com',
    phone: '+1 (555) 123-4567',
    company: 'TechFlow Inc.',
    industry: 'Software',
    createdAt: '2023-10-15T10:00:00Z',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@greenenergy.io',
    phone: '+1 (555) 987-6543',
    company: 'Green Energy Co.',
    industry: 'Renewables',
    createdAt: '2023-11-02T14:30:00Z',
    avatarUrl: 'https://i.pravatar.cc/150?u=michael',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena@creative-studio.net',
    phone: '+1 (555) 456-7890',
    company: 'Creative Studio',
    industry: 'Design',
    createdAt: '2023-11-20T09:15:00Z',
    avatarUrl: 'https://i.pravatar.cc/150?u=elena',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.w@logistics-plus.com',
    phone: '+1 (555) 222-3333',
    company: 'Logistics Plus',
    industry: 'Transportation',
    createdAt: '2023-12-05T16:45:00Z',
    avatarUrl: 'https://i.pravatar.cc/150?u=david',
  },
];

export const DUMMY_LEADS: Lead[] = [
  {
    id: 'l1',
    customerId: '1',
    status: 'Qualified',
    value: 12500,
    lastInteraction: '2024-03-20T10:00:00Z',
    assignedTo: 'John Doe',
  },
  {
    id: 'l2',
    customerId: '2',
    status: 'Contacted',
    value: 8000,
    lastInteraction: '2024-03-18T15:30:00Z',
    assignedTo: 'Jane Smith',
  },
  {
    id: 'l3',
    customerId: '3',
    status: 'New',
    value: 4500,
    lastInteraction: '2024-03-22T09:00:00Z',
    assignedTo: 'John Doe',
  },
  {
    id: 'l4',
    customerId: '4',
    status: 'Converted',
    value: 25000,
    lastInteraction: '2024-03-15T11:20:00Z',
    assignedTo: 'Jane Smith',
  },
];

export const DUMMY_INTERACTIONS: Interaction[] = [
  {
    id: 'i1',
    customerId: '1',
    type: 'Call',
    content: 'Discussed Q3 budget project for TechFlow.',
    date: '2024-03-20T10:00:00Z',
  },
  {
    id: 'i2',
    customerId: '2',
    type: 'Email',
    content: 'Sent proposal for solar panel installation.',
    date: '2024-03-18T15:30:00Z',
  },
  {
    id: 'i3',
    customerId: '1',
    type: 'Note',
    content: 'Client prefers morning meetings.',
    date: '2024-03-19T08:00:00Z',
  },
];

export const DUMMY_TASKS: Task[] = [
  {
    id: 't1',
    customerId: '1',
    title: 'Follow up on contract signature',
    dueDate: '2024-04-25T17:00:00Z',
    status: 'Pending',
    priority: 'High',
  },
  {
    id: 't2',
    customerId: '3',
    title: 'Schedule initial consultation',
    dueDate: '2024-04-22T10:00:00Z',
    status: 'Completed',
    priority: 'Medium',
  },
  {
    id: 't3',
    customerId: '2',
    title: 'Send updated pricing sheet',
    dueDate: '2024-04-20T14:00:00Z',
    status: 'Pending',
    priority: 'Low',
  },
];

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Enterprise Cloud License',
    sku: 'ECL-001',
    category: 'Software',
    price: 2499,
    stock: 500,
    status: 'In Stock',
  },
  {
    id: 'p2',
    name: 'Smart Server Node v4',
    sku: 'SSN-V4',
    category: 'Hardware',
    price: 1250,
    stock: 12,
    status: 'Low Stock',
  },
  {
    id: 'p3',
    name: 'Consultation Pack (10h)',
    sku: 'CON-10H',
    category: 'Services',
    price: 1500,
    stock: 100,
    status: 'In Stock',
  },
];

export const DUMMY_ORDERS: Order[] = [
  {
    id: 'ORD-7721',
    customerId: '1',
    orderDate: '2024-03-24T14:20:00Z',
    totalAmount: 4998,
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD-7722',
    customerId: '2',
    orderDate: '2024-03-25T09:15:00Z',
    totalAmount: 1250,
    status: 'Processing',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD-7723',
    customerId: '4',
    orderDate: '2024-03-26T11:40:00Z',
    totalAmount: 3750,
    status: 'Pending',
    paymentStatus: 'Unpaid',
  },
];

export const DUMMY_DEALS: Deal[] = [
  {
    id: 'd1',
    name: 'Cloud Migration Project',
    customerId: '1',
    amount: 45000,
    stage: 'Negotiation',
    probability: 75,
    expectedCloseDate: '2024-06-15T10:00:00Z',
  },
  {
    id: 'd2',
    name: 'Hardware Refresh',
    customerId: '2',
    amount: 15000,
    stage: 'Proposal',
    probability: 50,
    expectedCloseDate: '2024-05-20T10:00:00Z',
  },
  {
    id: 'd3',
    name: 'Annual Support Plan',
    customerId: '4',
    amount: 12000,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2024-03-01T10:00:00Z',
  },
];

export const DUMMY_EVENTS: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Strategy Session - TechFlow',
    description: 'Deep dive into cloud migration timelines.',
    start: '2024-05-06T10:00:00Z',
    end: '2024-05-06T11:30:00Z',
    type: 'Meeting',
    customerId: '1',
  },
  {
    id: 'e2',
    title: 'Follow-up Call - Green Energy',
    description: 'Review hardware proposal feedback.',
    start: '2024-05-07T14:00:00Z',
    end: '2024-05-07T14:30:00Z',
    type: 'Call',
    customerId: '2',
  },
  {
    id: 'e3',
    title: 'Project Deadline',
    description: 'Final submission for Support Plan documentation.',
    start: '2024-05-10T17:00:00Z',
    end: '2024-05-10T17:00:00Z',
    type: 'Deadline',
  },
];
