import { NestMiddleware, Injectable, Logger } from '@nestjs/common';
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

const resolvePath = (file: string) => path.resolve(path.join(__dirname, 'public', 'e-shop', file));

@Injectable()
export class EShopFrontendMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: () => void) {
    const { url } = req;
    if (/\/api/.test(url)) {
      Logger.log('API on ', req.host + req.url);
      next();
    } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
      // it has a file extension --> resolve the file
      res.sendFile(resolvePath(url), e => res.send(e));
    } else {
      // in all other cases, redirect to the index.html!
      res.sendFile(resolvePath('index.html'));
    }
  }
}
