export class ItemCategory {
  id: string;
  ua: string;
  en: string;
}


export class Item {
  id: string;
  name: string;
  categoryCode: string;
  category: ItemCategory;
  price: number;
  description?: string;
  image?: string;
}
