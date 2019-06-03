import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

const resolvePath = (file: string) => path.resolve(path.join(__dirname, '..', '..', 'e-shop', 'dist', 'internet-shop', file));

@Injectable()
export class EShopFrontendMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: Function) {
    const { url } = req;
    if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
      // it has a file extension --> resolve the file
      res.sendFile(resolvePath(url));
    } else {
      // in all other cases, redirect to the index.html!
      res.sendFile(resolvePath('index.html'));
    }
  }
}
