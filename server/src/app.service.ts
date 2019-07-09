import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get(): string {
    return `
      <div><a href="e-shop">E-Shop</a></div>
      <div><a href="admin">Admin</a></div>
    `;
  }
}
