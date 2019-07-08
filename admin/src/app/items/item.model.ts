import { MultiLangText } from '../core/models/multi-lang-text.model';

export class ItemCategory extends MultiLangText {
  id: string;
}


export class Item {
  id: string;
  name: string | { ua: string, en: string };
  categoryCode: string;
  category: ItemCategory;
  price: number;
  description?: string | { ua: string, en: string };
  image?: string | Array<string>;
}
