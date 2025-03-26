import './App.css'
import React from 'react';  
import Listing from './components/Listing'
import itemsJSON from './components/data/etsy.json'

interface MainImage {
  url_570xN: string;
}

interface ListingTask {
  listing_id: number;
  url: string;
  MainImage: MainImage;
  title: string;
  currency_code: string;
  price: string;
  quantity: number;
}

// Функция для фильтрации и выбора нужных свойств  
const filterListings = (listings: ListingTask[]) => {
  return listings.map(({ listing_id, url, MainImage, title, currency_code, price, quantity }) => ({  
    listing_id,  
    url,
    MainImage,
    title,  
    currency_code,  
    price,  
    quantity  
  })); 
};

const App: React.FC = () => { 
  // Используем приведение типов  
  const listings: ListingTask[] = itemsJSON as ListingTask[]; 

  // Используем функцию для создания нового массива  
  const filteredListings = listings.length > 0 ? filterListings(listings) : [];  

  return (
    <>
      <Listing items={filteredListings} />
    </>
  );
};

export default App;
