export class Warehouse {
  Ref: string;
  SiteKey: number;
  Description: string;
  DescriptionRu: string;
  TypeOfWarehouse: string;
  Number: number;
  CityRef: string;
  CityDescription: string;
  CityDescriptionRu: string;
  Longitude: number;
  Latitude: number;
  PostFinance: number;
  POSTerminal: number;
  InternationalShipping: number;
  TotalMaxWeightAllowed: number;
  PlaceMaxWeightAllowed: number;
  Reception: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  Delivery: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  Schedule: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };

  toString() {
    return `${this.Description}`.trim();
  }
}
