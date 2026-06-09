import React from 'react';

const DigitalAssetCard = ({ asset }) => {
  return (
    <div className="min-w-[400px] group">
      <div className="h-64 rounded-xl bg-[#edeeec] flex overflow-hidden">
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <h3 className="font-serif text-fluid-h3">{asset.title}</h3>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 font-body">Floor Price</p>
            <p className="font-serif italic text-fluid-body">{asset.floorPrice}</p>
          </div>
        </div>
        <div className="w-1/2">
          <img alt={asset.alt} className="w-full h-full object-cover" src={asset.image}/>
        </div>
      </div>
    </div>
  );
};

export default DigitalAssetCard;
