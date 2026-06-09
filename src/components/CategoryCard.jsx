import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={category.route || '/'} className={`flex-none w-[calc(25%-1.5rem)] min-w-[280px] ${category.customClass} ${category.bgClass || category.bgColor} rounded-xl p-8 h-[450px] flex flex-col justify-between relative overflow-hidden group transition-colors duration-500 block`}>
      <h3 className={`font-serif text-fluid-h2 ${category.titleColor || (category.textDim ? 'text-secondary-fixed-dim brightness-50' : 'text-on-surface')}`}>{category.title}</h3>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-surface-container-lowest cutout-radius flex items-end justify-end overflow-hidden shadow-[-20px_-20px_40px_rgba(48,51,49,0.04)]">
        <img alt={category.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={category.image}/>
      </div>
    </Link>
  );
};

export default CategoryCard;
