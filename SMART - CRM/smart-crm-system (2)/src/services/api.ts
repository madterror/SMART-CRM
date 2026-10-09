import { Customer, Lead, Deal, Order, Product, Interaction, Task } from '../types';
import { DUMMY_CUSTOMERS, DUMMY_LEADS, DUMMY_DEALS, DUMMY_ORDERS, DUMMY_PRODUCTS } from '../constants';

// Simulated delay for "real-world" feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ApiService = {
  // Customers
  async getCustomers(): Promise<Customer[]> {
    await delay(300);
    return DUMMY_CUSTOMERS;
  },

  async getCustomerById(id: string): Promise<Customer | undefined> {
    await delay(200);
    return DUMMY_CUSTOMERS.find(c => c.id === id);
  },

  // Leads
  async getLeads(): Promise<Lead[]> {
    await delay(400);
    return DUMMY_LEADS;
  },

  // Deals
  async getDeals(): Promise<Deal[]> {
    await delay(400);
    return DUMMY_DEALS;
  },

  // Products
  async getProducts(): Promise<Product[]> {
    await delay(300);
    return DUMMY_PRODUCTS;
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    await delay(300);
    return DUMMY_ORDERS;
  },

  // Dashboard Stats (Aggregated)
  async getDashboardStats() {
    await delay(500);
    return {
      revenue: revenueData,
      leadStages: leadData,
      industry: industryData,
      stats: [
        { label: 'Total Customers', value: DUMMY_CUSTOMERS.length.toString(), icon: 'Users', trend: '+12%', color: 'blue' },
        { label: 'Active Leads', value: DUMMY_LEADS.length.toString(), icon: 'Target', trend: '+5%', color: 'indigo' },
        { label: 'Pipeline Value', value: `$${DUMMY_DEALS.reduce((acc, deal) => acc + deal.amount, 0).toLocaleString()}`, icon: 'TrendingUp', trend: '+18%', color: 'emerald' },
        { label: 'Monthly Revenue', value: '$24,500', icon: 'DollarSign', trend: '+8%', color: 'amber' },
      ]
    };
  }
};

// Internal data duplicated for simulation
const leadData = [
  { stage: 'New', count: 12 },
  { stage: 'Contacted', count: 8 },
  { stage: 'Qualified', count: 5 },
  { stage: 'Negotiation', count: 3 },
  { stage: 'Closed', count: 2 },
];

const revenueData = [
  { month: 'Jan', revenue: 4500, forecast: 4200 },
  { month: 'Feb', revenue: 5200, forecast: 4800 },
  { month: 'Mar', revenue: 4800, forecast: 5100 },
  { month: 'Apr', revenue: 6100, forecast: 5800 },
  { month: 'May', revenue: 5900, forecast: 6200 },
  { month: 'Jun', revenue: 7200, forecast: 7000 },
];

const industryData = [
  { name: 'Tech', value: 45 },
  { name: 'Finance', value: 25 },
  { name: 'Healthcare', value: 20 },
  { name: 'Retail', value: 10 },
];
