export enum ItemCategory {
  All
}

export class Item {
  name: string;
  category: ItemCategory;
  price: number;
  description?: string;
  image?: string;
}
