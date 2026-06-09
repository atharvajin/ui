import React, { useRef } from 'react';
import { cn } from '../../utils';

const StepTwoCore = ({ formData, setFormData, errors, setErrors }) => {
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handlePackageChange = (index, field, value) => {
    const newPackages = [...formData.packages];
    newPackages[index][field] = value;
    setFormData(prev => ({ ...prev, packages: newPackages }));
    if (errors.packages) {
      setErrors(prev => ({ ...prev, packages: null }));
    }
  };

  // Simulated media upload using local object URLs
  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer ? e.dataTransfer.files : e.target.files);
    if (!files.length) return;
    
    // Create local object URLs for display
    const newImages = files.filter(f => f.type.startsWith('image/')).map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  };

  const removeImage = (index) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      // Adjust cover image index if needed
      let newCover = prev.coverImageIndex;
      if (newCover === index) newCover = 0;
      else if (newCover > index) newCover -= 1;
      return { ...prev, images: newImages, coverImageIndex: newCover };
    });
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up mt-8">
      <div className="text-center mb-4">
         <h2 className="font-serif text-4xl text-on-surface mb-3">Core Details</h2>
         <p className="text-on-surface-variant font-body text-lg">Provide the essential information for your listing.</p>
      </div>

      {/* Basic Info Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(48,51,49,0.02)] border border-surface-container p-6 md:p-8">
        <h3 className="font-serif text-2xl text-on-surface mb-6 border-b border-surface-container pb-4">Basic Information</h3>
        
        <div className="flex flex-col gap-5">
           <div>
             <label className="block text-sm font-bold text-on-surface mb-2">Listing Title <span className="text-red-500">*</span></label>
             <input 
               type="text" 
               name="title"
               value={formData.title} 
               onChange={handleInputChange} 
               placeholder="e.g. Professional UI/UX Design for Web Apps"
               className={cn(
                 "w-full rounded-xl border py-3 px-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface",
                 errors.title ? "border-red-500 bg-red-50" : "border-outline-variant bg-surface"
               )}
             />
             {errors.title && <p className="text-red-500 text-xs mt-1.5">{errors.title}</p>}
           </div>

           <div>
             <label className="block text-sm font-bold text-on-surface mb-2">Short Description <span className="text-red-500">*</span></label>
             <input 
               type="text" 
               name="shortDescription"
               value={formData.shortDescription} 
               onChange={handleInputChange} 
               placeholder="A brief summary of what you are offering (max 100 chars)"
               maxLength={100}
               className={cn(
                 "w-full rounded-xl border py-3 px-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface",
                 errors.shortDescription ? "border-red-500 bg-red-50" : "border-outline-variant bg-surface"
               )}
             />
             {errors.shortDescription && <p className="text-red-500 text-xs mt-1.5">{errors.shortDescription}</p>}
           </div>

           <div>
             <label className="block text-sm font-bold text-on-surface mb-2">Detailed Description <span className="text-red-500">*</span></label>
             <div className={cn(
                "rounded-xl border overflow-hidden transition-colors focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary",
                errors.detailedDescription ? "border-red-500 bg-red-50" : "border-outline-variant bg-surface"
             )}>
                <div className="bg-surface-container-low border-b border-outline-variant flex items-center px-2 py-1 gap-1">
                   <button className="p-1.5 hover:bg-surface-container rounded text-outline-variant hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                   <button className="p-1.5 hover:bg-surface-container rounded text-outline-variant hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
                   <div className="w-px h-4 bg-outline-variant mx-1"></div>
                   <button className="p-1.5 hover:bg-surface-container rounded text-outline-variant hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
                </div>
                <textarea 
                  name="detailedDescription"
                  value={formData.detailedDescription} 
                  onChange={handleInputChange} 
                  placeholder="Describe your offering in detail..."
                  rows={6}
                  className="w-full py-3 px-4 outline-none bg-transparent resize-y min-h-[120px] text-on-surface"
                />
             </div>
             {errors.detailedDescription && <p className="text-red-500 text-xs mt-1.5">{errors.detailedDescription}</p>}
           </div>
        </div>
      </div>

      {/* Media Upload Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(48,51,49,0.02)] border border-surface-container p-6 md:p-8">
        <div className="flex justify-between items-center mb-6 border-b border-surface-container pb-4">
           <h3 className="font-serif text-2xl text-on-surface">Media Gallery</h3>
           <span className="text-sm text-outline-variant">{formData.images.length} uploaded</span>
        </div>
        
        <div 
          className="border-2 border-dashed border-outline hover:border-primary bg-surface-container-low/50 hover:bg-primary/5 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
        >
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform text-primary">
              <span className="material-symbols-outlined text-3xl">cloud_upload</span>
           </div>
           <p className="font-bold text-on-surface mb-1">Click to upload or drag and drop</p>
           <p className="text-sm text-on-surface-variant">SVG, PNG, JPG or GIF (max. 800x400px)</p>
           <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             multiple 
             accept="image/*" 
             onChange={handleFileDrop} 
           />
        </div>

        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
             {formData.images.map((img, idx) => (
                <div key={idx} className={cn(
                  "relative aspect-square rounded-xl overflow-hidden border-2 transition-all group",
                  formData.coverImageIndex === idx ? "border-primary shadow-md" : "border-surface-container"
                )}>
                   <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, coverImageIndex: idx })); }}
                        className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform"
                        title="Set as Cover"
                      >
                         <span className={cn("material-symbols-outlined text-[18px]", formData.coverImageIndex === idx ? "font-variation-settings-fill-1" : "")} style={formData.coverImageIndex === idx ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                        className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
                        title="Remove"
                      >
                         <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                   </div>
                   {formData.coverImageIndex === idx && (
                      <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm">Cover</div>
                   )}
                </div>
             ))}
          </div>
        )}
      </div>

      {/* Dynamic Pricing Card */}
      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(48,51,49,0.02)] border border-surface-container p-6 md:p-8">
        <h3 className="font-serif text-2xl text-on-surface mb-6 border-b border-surface-container pb-4">Pricing</h3>
        
        {formData.category === 'services' ? (
           <div>
             <p className="text-on-surface-variant font-body mb-6">Define your tiered service packages to offer buyers more options.</p>
             {errors.packages && <p className="text-red-500 text-sm mb-4 font-bold bg-red-50 p-3 rounded-lg border border-red-200">{errors.packages}</p>}
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {formData.packages.map((pkg, idx) => (
                  <div key={idx} className="border border-surface-container rounded-xl overflow-hidden flex flex-col">
                     <div className="bg-surface-container-lowest p-4 border-b border-surface-container text-center">
                        <h4 className="font-serif text-lg font-bold text-on-surface">{pkg.tier}</h4>
                     </div>
                     <div className="p-5 flex flex-col gap-4 flex-1">
                        <div>
                          <label className="block text-xs font-bold text-outline-variant uppercase tracking-wider mb-1">Price (Rs.)</label>
                          <input 
                            type="number" 
                            className="w-full border-b-2 border-outline-variant py-2 outline-none focus:border-primary text-lg font-bold text-on-surface bg-transparent transition-colors"
                            placeholder="0"
                            value={pkg.price}
                            onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-outline-variant uppercase tracking-wider mb-1">Features (comma separated)</label>
                          <textarea 
                            className="w-full rounded-lg border border-outline-variant p-3 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm min-h-[100px] resize-y text-on-surface bg-surface"
                            placeholder="e.g. 1 Revision, Source File"
                            value={pkg.features}
                            onChange={(e) => handlePackageChange(idx, 'features', e.target.value)}
                          />
                        </div>
                     </div>
                  </div>
                ))}
             </div>
           </div>
        ) : (
           <div className="max-w-md">
             <div className="flex items-center bg-surface-container-low p-1 rounded-xl w-max mb-6">
                <button 
                  onClick={() => setFormData(prev => ({ ...prev, pricingType: 'fixed' }))}
                  className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", formData.pricingType === 'fixed' ? "bg-white shadow-sm text-on-surface" : "text-on-surface-variant hover:text-on-surface")}
                >
                  Fixed Price
                </button>
                <button 
                  onClick={() => setFormData(prev => ({ ...prev, pricingType: 'starting_at' }))}
                  className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", formData.pricingType === 'starting_at' ? "bg-white shadow-sm text-on-surface" : "text-on-surface-variant hover:text-on-surface")}
                >
                  Starting at
                </button>
             </div>

             <div>
               <label className="block text-sm font-bold text-on-surface mb-2">Price Amount (Rs.) <span className="text-red-500">*</span></label>
               <div className="relative">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">₹</span>
                 <input 
                   type="number" 
                   name="singlePrice"
                   value={formData.singlePrice} 
                   onChange={handleInputChange} 
                   placeholder="0.00"
                   className={cn(
                     "w-full rounded-xl border py-3 pl-10 pr-4 outline-none transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg font-bold text-on-surface",
                     errors.singlePrice ? "border-red-500 bg-red-50" : "border-outline-variant bg-surface"
                   )}
                 />
               </div>
               {errors.singlePrice && <p className="text-red-500 text-xs mt-1.5">{errors.singlePrice}</p>}
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default StepTwoCore;
