import React from 'react';

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

const Listing: React.FC<{ items: ListingTask[] }> = ({ items }) => {

  // обрезаемtitle после 50 символов, потом "..."
  const titleRename = (title: string) => {
    if (title.length > 5) {
      return title.slice(0, 50) + "...";
    }

    return title;
  };

  // преобразовать валюту:
  // в долларах США, код USD, то цену вывести в формате $50.00;
  // в евро, код EUR, то цену вывести в формате €50.00;
  // в остальных случаях цену вывести в формате 50.00 GBP, где GBP — код валюты.
  const codeRename = (code: string, price: string) => {
    if (code === "USD") { return "$" + price }
    if (code === "EUR") { return "€" + price }

    return price + " " + code;
  };

  // контроль level:  
  // level-low — если остаток меньше 10 включительно;
  // level-medium — если остаток меньше 20 включительно;
  // level-high —  если остаток больше 20.
  const levelQuantity = (quantity: number) => {
    if (quantity < 11) { return "level-low" }
    if (quantity > 10 && quantity < 21) { return "level-medium" }

    return "level-high";
  };

  // подготавливаем код
  const itemHTML: React.ReactElement[] = items.map(item => (
    <div className="item" key={item.listing_id}>
      <div className="item-image">
        <a href={item.url}>
          <img src={item.MainImage.url_570xN} alt={item.title} />
        </a>
      </div>
      <div className="item-details">
        <p className="item-title">{titleRename(item.title)}</p>
        <p className="item-price">{codeRename(item.currency_code, item.price)}</p>
        <p className={`item-quantity ${levelQuantity(item.quantity)}`}>{item.quantity} left</p>
      </div>
    </div>
  ));

  return (
    <>
      <div className="item-list" >
        {itemHTML}
      </div>
    </>
  );
}

export default Listing;