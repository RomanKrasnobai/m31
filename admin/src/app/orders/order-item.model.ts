import { MultiLangText } from '../core/models/multi-lang-text.model';

export class ItemCategory extends MultiLangText {
  id: string;
}


export class OrderItem {
  id: string;
  name: string | { ua: string, en: string };
  categoryCode: string;
  category: ItemCategory;
  price: number;
  qty: number;
  discount?: number;
  discountType?: 'P' | 'A';
}
