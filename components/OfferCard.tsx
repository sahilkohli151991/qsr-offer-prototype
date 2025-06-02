import React from 'react';
import { Offer } from '../types';

interface OfferCardProps {
  offer: Offer;
  onRollout?: (offerId: string) => void;
  onToggleActive?: (offerId: string) => void;
  onDelete?: (offerId: string) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onRollout,
  onToggleActive,
  onDelete,
}) => {
  const cardBg = offer.isActive ? 'bg-green-50' : 'bg-white';
  const borderColor = offer.isActive ? 'border-green-500' : 'border-slate-300';

  return (
    <div className={`p-4 rounded-lg shadow-lg border ${cardBg} ${borderColor} space-y-3 flex flex-col justify-between`}>
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-slate-800">{offer.name}</h3>
          {offer.isActive && (
            <span className="px-2 py-0.5 text-xs font-medium text-green-800 bg-green-200 rounded-full">Active</span>
          )}
        </div>
        <p className="text-sm text-slate-600 mt-1">{offer.description}</p>

        <div className="mt-3 space-y-2 text-xs text-slate-500">
          <p><i className="fas fa-tag mr-2 text-indigo-500" aria-hidden="true"></i><strong>Type:</strong> {offer.type}</p>
          <p><i className="fas fa-calendar-alt mr-2 text-indigo-500" aria-hidden="true"></i><strong>Duration:</strong> {offer.duration.fromDate} to {offer.duration.toDate}</p>
          {offer.cycles && <p><i className="fas fa-redo mr-2 text-indigo-500" aria-hidden="true"></i><strong>Cycles:</strong> {offer.cycles}</p>}
          <p><i className="fas fa-cogs mr-2 text-indigo-500" aria-hidden="true"></i><strong>Template:</strong> {offer.template}</p>
          <p><i className="fas fa-percent mr-2 text-indigo-500" aria-hidden="true"></i><strong>Discount:</strong> {offer.discountDepth}</p>
          <p><i className="fas fa-box-open mr-2 text-indigo-500" aria-hidden="true"></i><strong>Products:</strong> {offer.products.join(', ') || 'Any'}</p>
          <p><i className="fas fa-clock mr-2 text-indigo-500" aria-hidden="true"></i><strong>Timing:</strong> {offer.timing.join(', ')}</p>
          {offer.type === 'Personalized' && offer.segments && offer.segments.length > 0 && (
            <p><i className="fas fa-users mr-2 text-indigo-500" aria-hidden="true"></i><strong>Segments:</strong> {offer.segments.join(', ')}</p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap gap-2 justify-end items-center">
        {!offer.isActive && onRollout && (
          <button
            onClick={() => onRollout(offer.id)}
            className="px-3 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md shadow-sm"
            aria-label={`Rollout offer ${offer.name}`}
          >
            <i className="fas fa-rocket mr-1" aria-hidden="true"></i> Rollout Offer
          </button>
        )}
        {onToggleActive && ( // This button can be used to deactivate active offers
          <button
            onClick={() => onToggleActive(offer.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md shadow-sm ${
              offer.isActive 
                ? 'text-white bg-amber-600 hover:bg-amber-700' 
                : 'text-slate-700 bg-slate-200 hover:bg-slate-300'
            }`}
             aria-label={offer.isActive ? `Deactivate offer ${offer.name}` : `Activate offer ${offer.name}`}
          >
            {offer.isActive ? <><i className="fas fa-power-off mr-1" aria-hidden="true"></i> Deactivate</> : <><i className="fas fa-check-circle mr-1" aria-hidden="true"></i> Activate</> }
          </button>
        )}
         {onDelete && (
           <button
            onClick={() => onDelete(offer.id)}
            className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm"
            aria-label={`Delete offer ${offer.name}`}
          >
            <i className="fas fa-trash-alt mr-1" aria-hidden="true"></i> Delete
          </button>
         )}
      </div>
    </div>
  );
};

export default OfferCard;