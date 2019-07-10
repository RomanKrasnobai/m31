export enum DeliveryMethod {
  NovaPoshta = 'NOVA_POSHTA',
  Pickup = 'PICK_UP',
}

export class DeliveryInfo {
  method: DeliveryMethod;
  info: any;
  date: Date;
}
