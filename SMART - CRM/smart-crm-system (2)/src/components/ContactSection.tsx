import { useState } from 'react';
import { Search, Plus, Filter, Mail, Phone, MapPin, MoreVertical, Star, MessageSquare } from 'lucide-react';
import { DUMMY_CUSTOMERS } from '../constants';
import { cn } from '../lib/utils';

export default function ContactSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingContact, setIsAddingContact] = useState(false);

  const filteredContacts = DUMMY_CUSTOMERS.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-serif">Contacts</h2>
          <p className="text-sm text-gray-500">Manage your business network and key decision makers.</p>
        </div>
        <button 
          onClick={() => setIsAddingContact(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          New Contact
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-1" />
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{filteredContacts.length} Contacts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:border-blue-100 transition-all group ring-1 ring-black/5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="relative">
                  {contact.avatarUrl ? (
                    <img 
                      src={contact.avatarUrl} 
                      alt={contact.name} 
                      className="w-14 h-14 rounded-2xl object-cover ring-4 ring-gray-50 shadow-sm group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 font-bold text-xl ring-4 ring-gray-50 shadow-sm">
                      {contact.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 text-gray-400 hover:text-amber-500 transition-colors">
                    <Star className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{contact.name}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{contact.company}</p>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>+1 (555) 000-0000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{contact.industry}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50 flex gap-2">
                <button className="flex-1 py-2 bg-gray-50 hover:bg-blue-50 text-gray-900 hover:text-blue-600 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 border border-transparent hover:border-blue-100">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Email
                </button>
                <button className="flex-1 py-2 bg-gray-900 text-white font-bold text-xs rounded-xl hover:bg-blue-600 transition-all border border-transparent active:scale-95 shadow-lg shadow-gray-200">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple "Coming Soon" Alert for buttons */}
      {isAddingContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Create New Contact</h3>
            <p className="text-sm text-gray-500 text-center mb-8">This feature is part of our upcoming Pro update. Stay tuned!</p>
            <button 
              onClick={() => setIsAddingContact(false)}
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-2xl hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-gray-200"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
