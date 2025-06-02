import React from 'react';
import { Offer } from '../types';
import OfferCard from './OfferCard';

interface OfferListProps {
  title: string;
  offers: Offer[];
  onRollout?: (offerId: string) => void;
  onToggleActive?: (offerId: string) => void;
  onDelete?: (offerId: string) => void;
  emptyStateMessage?: string;
  iconClassName?: string;
}

const OfferList: React.FC<OfferListProps> = ({
  title,
  offers,
  onRollout,
  onToggleActive,
  onDelete,
  emptyStateMessage = "No offers to display in this section yet.",
  iconClassName = "fas fa-folder-open"
}) => {
  return (
    <div className="p-6 bg-white shadow-xl rounded-lg h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-slate-700 border-b pb-3 mb-4 flex items-center">
        <i className={`${iconClassName} mr-3 text-indigo-500`} aria-hidden="true"></i>
        {title}
      </h2>
      {offers.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-slate-500 text-center p-4">
          <i className={`fas fa-inbox text-4xl mb-3`} aria-hidden="true"></i>
          <p>{emptyStateMessage}</p>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto flex-grow pr-2" role="list">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onRollout={onRollout}
              onToggleActive={onToggleActive}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferList;