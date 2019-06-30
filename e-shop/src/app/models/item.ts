export enum ItemCategory {
  All
}

export class Item {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  description?: string;
  image?: string;
}
