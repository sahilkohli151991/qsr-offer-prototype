import React from 'react';
import { OfferConfig, OfferType, OfferTemplate, OfferTimingKey } from '../types';
import { AVAILABLE_SEGMENTS, AVAILABLE_TEMPLATES, AVAILABLE_TIMINGS, AVAILABLE_PRODUCTS } from '../constants';

interface OfferFormProps {
  config: OfferConfig;
  setConfig: (config: OfferConfig) => void;
  onAddToBankManually: () => void;
}

const OfferForm: React.FC<OfferFormProps> = ({
  config,
  setConfig,
  onAddToBankManually,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig({ ...config, duration: { ...config.duration, [name]: value } });
  };
  
  const handleMultiSelectChange = (field: keyof OfferConfig, value: string) => {
    const currentValues = (config[field] as string[] | undefined) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setConfig({ ...config, [field]: newValues });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg space-y-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-semibold text-slate-700 border-b pb-3">Configure Offer</h2>

      {/* Offer Type */}
      <div className="form-group">
        <label htmlFor="type" className="block text-sm font-medium text-slate-600 mb-1">Offer Type</label>
        <select
          id="type"
          name="type"
          value={config.type}
          onChange={handleInputChange}
          className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          aria-label="Offer Type"
        >
          {Object.values(OfferType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fromDate" className="block text-sm font-medium text-slate-600 mb-1">From Date</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={config.duration.fromDate}
            min={today}
            onChange={handleDateChange}
            className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Offer From Date"
          />
        </div>
        <div>
          <label htmlFor="toDate" className="block text-sm font-medium text-slate-600 mb-1">To Date</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={config.duration.toDate}
            min={config.duration.fromDate || today}
            onChange={handleDateChange}
            className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Offer To Date"
          />
        </div>
      </div>
      
      {/* Offer Cycles */}
      <div>
        <label htmlFor="cycles" className="block text-sm font-medium text-slate-600 mb-1">Offer Cycle Description (Optional)</label>
        <input
          type="text"
          id="cycles"
          name="cycles"
          value={config.cycles || ''}
          onChange={handleInputChange}
          placeholder="e.g., 'Daily', 'Every Mon & Wed'"
          className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          aria-label="Offer Cycle Description"
        />
      </div>

      {/* Segments (Conditional) */}
      {config.type === OfferType.PERSONALIZED && (
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Target Segments</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md" role="group" aria-label="Target Segments">
            {AVAILABLE_SEGMENTS.map((segment) => (
              <div key={segment} className="flex items-center">
                <input
                  id={`segment-${segment.replace(/\s+/g, '-')}`} // Ensure ID is valid
                  type="checkbox"
                  value={segment}
                  checked={config.segments.includes(segment)}
                  onChange={() => handleMultiSelectChange('segments', segment)}
                  className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  aria-labelledby={`segment-label-${segment.replace(/\s+/g, '-')}`}
                />
                <label id={`segment-label-${segment.replace(/\s+/g, '-')}`} htmlFor={`segment-${segment.replace(/\s+/g, '-')}`} className="ml-2 text-sm text-slate-700">{segment}</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">Target Products (select multiple)</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md" role="group" aria-label="Target Products">
          {AVAILABLE_PRODUCTS.map((product) => (
            <div key={product.id} className="flex items-center">
              <input
                id={`product-${product.id}`}
                type="checkbox"
                value={product.name}
                checked={config.products.includes(product.name)}
                onChange={() => handleMultiSelectChange('products', product.name)}
                className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                aria-labelledby={`product-label-${product.id}`}
              />
              <label id={`product-label-${product.id}`} htmlFor={`product-${product.id}`} className="ml-2 text-sm text-slate-700">{product.name}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Template */}
      <div>
        <label htmlFor="template" className="block text-sm font-medium text-slate-600 mb-1">Offer Template</label>
        <select
          id="template"
          name="template"
          value={config.template}
          onChange={handleInputChange}
          className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          aria-label="Offer Template"
        >
          {AVAILABLE_TEMPLATES.map((template) => (
            <option key={template} value={template}>{template}</option>
          ))}
        </select>
      </div>

      {/* Discount Depth */}
      <div>
        <label htmlFor="discountDepth" className="block text-sm font-medium text-slate-600 mb-1">Discount Depth / Offer Details</label>
        <input
          type="text"
          id="discountDepth"
          name="discountDepth"
          value={config.discountDepth}
          onChange={handleInputChange}
          placeholder="e.g., '50% off', '$5 off total'"
          className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          aria-label="Discount Depth or Offer Details"
        />
      </div>

      {/* Offer Timing */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">Offer Timing</label>
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 border rounded-md" role="group" aria-label="Offer Timing">
            {AVAILABLE_TIMINGS.map((timing) => (
              <div key={timing} className="flex items-center">
                <input
                  id={`timing-${timing.replace(/\s+/g, '-')}`} // Ensure ID is valid
                  type="checkbox"
                  value={timing}
                  checked={config.timing.includes(timing)}
                  onChange={() => handleMultiSelectChange('timing', timing)}
                  className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                   aria-labelledby={`timing-label-${timing.replace(/\s+/g, '-')}`}
                />
                <label id={`timing-label-${timing.replace(/\s+/g, '-')}`} htmlFor={`timing-${timing.replace(/\s+/g, '-')}`} className="ml-2 text-sm text-slate-700">{timing}</label>
              </div>
            ))}
          </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 space-y-3">
        <button
          onClick={onAddToBankManually}
          className="w-full flex justify-center items-center p-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to Offer Bank <i className="fas fa-save ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default OfferForm;