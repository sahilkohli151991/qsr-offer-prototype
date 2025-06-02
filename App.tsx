import React, { useState, useEffect, useCallback } from 'react';
import OfferForm from './components/OfferForm';
import OfferList from './components/OfferList';
import Modal from './components/Modal';
import { Offer, OfferConfig, OfferType, OfferTemplate, OfferTimingKey } from './types';

const App: React.FC = () => {
  const initialOfferConfig: OfferConfig = {
    type: OfferType.MASS,
    duration: { fromDate: '', toDate: '' },
    cycles: '',
    segments: [],
    products: [],
    template: OfferTemplate.SINGLE_ITEM_DISCOUNT,
    discountDepth: '',
    timing: [OfferTimingKey.ANYTIME],
  };

  const [offerConfig, setOfferConfig] = useState<OfferConfig>(initialOfferConfig);
  const [offerBank, setOfferBank] = useState<Offer[]>(() => {
    const savedOffers = localStorage.getItem('offerBank');
    return savedOffers ? JSON.parse(savedOffers) : [];
  });
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bank' | 'active'>('bank'); // Default to 'bank'

  useEffect(() => {
    localStorage.setItem('offerBank', JSON.stringify(offerBank));
  }, [offerBank]);

  const handleAddToBankManually = () => {
    if (!offerConfig.duration.fromDate || !offerConfig.duration.toDate) {
        setError("Please set both 'From Date' and 'To Date' for the offer.");
        return;
    }
    if (new Date(offerConfig.duration.toDate) < new Date(offerConfig.duration.fromDate)) {
        setError("'To Date' cannot be earlier than 'From Date'.");
        return;
    }
     if (offerConfig.products.length === 0) {
        setError("Please select at least one product for the offer.");
        return;
    }
    if (!offerConfig.discountDepth.trim()) {
        setError("Please specify the discount depth or offer details.");
        return;
    }

    setError(null);
    const newOfferName = `${offerConfig.template} for ${offerConfig.products.length > 0 ? offerConfig.products[0] : 'selected items'}${offerConfig.products.length > 1 ? ' & more' : ''}`;
    const newOfferDescription = `Manually configured ${offerConfig.template} for ${offerConfig.products.join(', ')}. Valid from ${offerConfig.duration.fromDate} to ${offerConfig.duration.toDate}.`;

    const newOffer: Offer = {
      id: `manual-${Date.now().toString()}-${Math.random().toString(36).substring(2, 7)}`,
      name: newOfferName,
      description: newOfferDescription,
      type: offerConfig.type,
      duration: offerConfig.duration,
      cycles: offerConfig.cycles,
      segments: offerConfig.segments,
      products: offerConfig.products,
      template: offerConfig.template,
      discountDepth: offerConfig.discountDepth,
      timing: offerConfig.timing,
      isActive: false,
    };
    setOfferBank(prev => [newOffer, ...prev]);
    setOfferConfig(initialOfferConfig); // Reset form
    setActiveTab('bank');
  };

  const handleRolloutOffer = (offerId: string) => {
    setOfferBank(prev => prev.map(o => o.id === offerId ? { ...o, isActive: true } : o));
    setActiveTab('active');
  };

  const handleToggleActive = (offerId: string) => {
    setOfferBank(prev => prev.map(o => {
      if (o.id === offerId) {
        const newActiveState = !o.isActive;
        if (!newActiveState) { // If deactivating, ensure it goes to the correct tab
            setTimeout(() => setActiveTab('bank'), 0); 
        } else { // If activating
            setTimeout(() => setActiveTab('active'), 0);
        }
        return { ...o, isActive: newActiveState };
      }
      return o;
    }));
  };

  const handleDeleteOffer = (offerId: string) => {
    setOfferBank(prev => prev.filter(o => o.id !== offerId));
  };

  const filteredOffers = {
    bank: offerBank.filter(o => !o.isActive),
    active: offerBank.filter(o => o.isActive),
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="bg-indigo-700 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center flex items-center justify-center">
          <i className="fas fa-tags mr-3" aria-hidden="true"></i>QSR Digital Offer Configurator
        </h1>
      </header>

      {error && (
        <Modal isOpen={!!error} onClose={() => setError(null)} title="Input Error" size="sm">
          <div className="p-1">
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => setError(null)} 
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full"
            >
              OK
            </button>
          </div>
        </Modal>
      )}
      
      <main className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-screen-2xl mx-auto">
        <div className="lg:col-span-1">
          <OfferForm
            config={offerConfig}
            setConfig={setOfferConfig}
            onAddToBankManually={handleAddToBankManually}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex border-b">
              <TabButton title="Offer Bank" icon="fa-landmark" isActive={activeTab === 'bank'} onClick={() => setActiveTab('bank')} count={filteredOffers.bank.length} />
              <TabButton title="Active Offers" icon="fa-rocket" isActive={activeTab === 'active'} onClick={() => setActiveTab('active')} count={filteredOffers.active.length} />
            </div>
          </div>
          
          {activeTab === 'bank' && (
            <OfferList
              title="Offer Bank (Pending Rollout)"
              iconClassName="fas fa-archive"
              offers={filteredOffers.bank}
              onRollout={handleRolloutOffer}
              onDelete={handleDeleteOffer}
              onToggleActive={handleToggleActive} // Allows activating from bank if desired, or deactivating if mistakenly there
              emptyStateMessage="Your offer bank is empty. Configure and add new offers."
            />
          )}
          {activeTab === 'active' && (
            <OfferList
              title="Active Offers (Live)"
              iconClassName="fas fa-broadcast-tower"
              offers={filteredOffers.active}
              onToggleActive={handleToggleActive}
              onDelete={handleDeleteOffer}
              emptyStateMessage="No offers are currently active. Rollout offers from the bank."
            />
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-slate-600 mt-8 border-t border-slate-300">
        © {new Date().getFullYear()} QSR Offer Configurator.
      </footer>
    </div>
  );
};

interface TabButtonProps {
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
  count: number;
}

const TabButton: React.FC<TabButtonProps> = ({ title, icon, isActive, onClick, count }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-3 px-2 text-sm md:text-base font-medium text-center border-b-2 focus:outline-none
      ${isActive 
        ? 'border-indigo-500 text-indigo-600' 
        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
      }`}
    aria-pressed={isActive}
  >
    <i className={`fas ${icon} mr-1 md:mr-2`} aria-hidden="true"></i> 
    {title}
    {count > 0 && <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>{count}</span>}
  </button>
);

export default App;