import React, { useState } from 'react';
import { cn } from '../../utils';
import Button from '../../components/Button';

const StepThreeDynamic = ({ formData, setFormData, errors, setErrors }) => {

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const [docInput, setDocInput] = useState('');

  const addDoc = () => {
    if (docInput.trim()) {
      setFormData(prev => ({ ...prev, requiredDocuments: [...prev.requiredDocuments, docInput.trim()] }));
      setDocInput('');
    }
  };

  const removeDoc = (index) => {
    setFormData(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.filter((_, i) => i !== index)
    }));
  };

  const renderDigitalAssets = () => (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(48,51,49,0.02)] border border-surface-container p-6 md:p-8">
      <h3 className="font-serif text-2xl text-on-surface mb-6 border-b border-surface-container pb-4">Asset Credentials</h3>
      
      <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
        <span className="material-symbols-outlined text-amber-600 mt-0.5">warning</span>
        <div>
          <h4 className="font-bold text-amber-900 text-sm">Prerequisite Warning</h4>
          <p className="text-sm text-amber-800">Minimum value for digital assets must be Rs. 150. These credentials will be securely locked and only revealed to the buyer upon successful escrow.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-on-surface mb-2">Secure Credentials / Access Codes <span className="text-red-500">*</span></label>
        <textarea 
          name="assetCredentials"
          value={formData.assetCredentials} 
          onChange={handleInputChange} 
          placeholder="Enter license keys, download links, or access accounts here. Do not share public links."
          rows={5}
          className={cn(
            "w-full rounded-xl border py-3 px-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm bg-surface-container-lowest",
            errors.assetCredentials ? "border-red-500 bg-red-50" : "border-outline-variant"
          )}
        />
        {errors.assetCredentials && <p className="text-red-500 text-xs mt-1.5">{errors.assetCredentials}</p>}
      </div>
    </div>
  );

  const renderPhysicalGoods = () => (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(48,51,49,0.02)] border border-surface-container p-6 md:p-8">
      <h3 className="font-serif text-2xl text-on-surface mb-6 border-b border-surface-container pb-4">Item Specifications</h3>
      
      <div className="flex flex-col gap-6 max-w-lg">
         <div>
           <label className="block text-sm font-bold text-on-surface mb-2">Item Condition</label>
           <select 
             name="condition"
             value={formData.condition} 
             onChange={handleInputChange} 
             className="w-full rounded-xl border border-outline-variant py-3 px-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary bg-surface text-on-surface appearance-none"
             style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em" }}
           >
             <option value="New">Brand New</option>
             <option value="Like New">Like New</option>
             <option value="Good">Used - Good</option>
             <option value="Fair">Used - Fair</option>
           </select>
         </div>

         <label className="flex items-center justify-between p-4 rounded-xl border border-surface-container bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors group">
            <div>
              <p className="font-bold text-on-surface text-sm">Allow Price Negotiation</p>
              <p className="text-xs text-on-surface-variant font-medium">Let buyers make offers below your asking price.</p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  name="allowNegotiation" 
                  checked={formData.allowNegotiation} 
                  onChange={handleInputChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-surface-container appearance-none cursor-pointer transition-transform duration-200 ease-in-out peer checked:bg-primary checked:border-primary checked:translate-x-full" 
                />
                <div className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container peer-checked:bg-primary/30 transition-colors duration-200"></div>
            </div>
         </label>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(48,51,49,0.02)] border border-surface-container p-6 md:p-8">
      <h3 className="font-serif text-2xl text-on-surface mb-6 border-b border-surface-container pb-4">Service Configuration</h3>
      
      <div className="flex flex-col gap-8 max-w-2xl">
         <div>
           <label className="block text-sm font-bold text-on-surface mb-2">Required Documents from Buyer</label>
           <p className="text-xs text-on-surface-variant mb-4 font-medium">Build a checklist of files the buyer must provide before you start working.</p>
           
           <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                value={docInput} 
                onChange={(e) => setDocInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDoc())}
                placeholder="e.g. Existing Brand Logo (PNG/SVG)"
                className="flex-1 rounded-xl border border-outline-variant py-2.5 px-4 outline-none transition-colors focus:border-primary text-sm bg-surface"
              />
              <Button onClick={addDoc} variant="outline" className="border-outline-variant">Add</Button>
           </div>

           {formData.requiredDocuments.length > 0 && (
             <ul className="flex flex-col gap-2">
                {formData.requiredDocuments.map((doc, idx) => (
                   <li key={idx} className="flex justify-between items-center bg-surface-container-lowest px-4 py-3 rounded-lg border border-surface-container">
                      <span className="text-sm font-medium text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-outline">description</span> {doc}</span>
                      <button onClick={() => removeDoc(idx)} className="text-outline-variant hover:text-red-500 transition-colors p-1"><span className="material-symbols-outlined text-[18px]">close</span></button>
                   </li>
                ))}
             </ul>
           )}
         </div>

         <div className="h-px bg-surface-container w-full" />

         <label className="flex items-center justify-between p-4 rounded-xl border border-surface-container bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors group">
            <div>
              <p className="font-bold text-on-surface text-sm">Require Calendar Booking</p>
              <p className="text-xs text-on-surface-variant font-medium">Buyers must select a free slot from your connected calendar to purchase.</p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  name="requireBooking" 
                  checked={formData.requireBooking} 
                  onChange={handleInputChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-surface-container appearance-none cursor-pointer transition-transform duration-200 ease-in-out peer checked:bg-primary checked:border-primary checked:translate-x-full" 
                />
                <div className="toggle-label block overflow-hidden h-6 rounded-full bg-surface-container peer-checked:bg-primary/30 transition-colors duration-200"></div>
            </div>
         </label>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(48,51,49,0.02)] border border-surface-container p-6 md:p-8">
      <h3 className="font-serif text-2xl text-on-surface mb-6 border-b border-surface-container pb-4">Event Logistics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
           <label className="block text-sm font-bold text-on-surface mb-2">Event Date <span className="text-red-500">*</span></label>
           <input 
             type="date" 
             name="eventDate"
             value={formData.eventDate} 
             onChange={handleInputChange} 
             className={cn(
               "w-full rounded-xl border py-3 px-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface bg-surface",
               errors.eventDate ? "border-red-500 bg-red-50" : "border-outline-variant"
             )}
           />
           {errors.eventDate && <p className="text-red-500 text-xs mt-1.5">{errors.eventDate}</p>}
         </div>

         <div>
           <label className="block text-sm font-bold text-on-surface mb-2">Event Time <span className="text-red-500">*</span></label>
           <input 
             type="time" 
             name="eventTime"
             value={formData.eventTime} 
             onChange={handleInputChange} 
             className={cn(
               "w-full rounded-xl border py-3 px-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface bg-surface",
               errors.eventTime ? "border-red-500 bg-red-50" : "border-outline-variant"
             )}
           />
           {errors.eventTime && <p className="text-red-500 text-xs mt-1.5">{errors.eventTime}</p>}
         </div>

         <div className="md:col-span-2">
           <label className="block text-sm font-bold text-on-surface mb-2">Venue / Location <span className="text-red-500">*</span></label>
           <div className="relative">
             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">location_on</span>
             <input 
               type="text" 
               name="venue"
               value={formData.venue} 
               onChange={handleInputChange} 
               placeholder="Full address or online link"
               className={cn(
                 "w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface",
                 errors.venue ? "border-red-500 bg-red-50" : "border-outline-variant bg-surface"
               )}
             />
           </div>
           {errors.venue && <p className="text-red-500 text-xs mt-1.5">{errors.venue}</p>}
         </div>

         <div>
           <label className="block text-sm font-bold text-on-surface mb-2">Total Passes/Inventory <span className="text-red-500">*</span></label>
           <input 
             type="number" 
             name="totalPasses"
             value={formData.totalPasses} 
             onChange={handleInputChange} 
             placeholder="Limit"
             className={cn(
               "w-full rounded-xl border py-3 px-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface bg-surface",
               errors.totalPasses ? "border-red-500 bg-red-50" : "border-outline-variant"
             )}
           />
           {errors.totalPasses && <p className="text-red-500 text-xs mt-1.5">{errors.totalPasses}</p>}
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up mt-8">
      <div className="text-center mb-4">
         <h2 className="font-serif text-4xl text-on-surface mb-3">Domain Configuration</h2>
         <p className="text-on-surface-variant font-body text-lg">Set up specific parameters for your {formData.category.replace('-', ' ')} listing.</p>
      </div>

      {formData.category === 'digital-assets' && renderDigitalAssets()}
      {formData.category === 'physical-goods' && renderPhysicalGoods()}
      {formData.category === 'services' && renderServices()}
      {formData.category === 'events' && renderEvents()}
      {formData.category === 'art-craft' && renderPhysicalGoods() /* Fallback similar to physical for now */}
    </div>
  );
};

export default StepThreeDynamic;
