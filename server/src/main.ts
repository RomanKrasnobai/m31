import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { Express } from 'express';
import { json } from 'body-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import * as functions from 'firebase-functions';

const SERVER_PORT = process.env.PORT || 5000;

const server: Express = express();

async function bootstrap() {
  const adapter = new ExpressAdapter(server);
  const app = await NestFactory.create(AppModule, adapter);

  const eShopFiles = join(__dirname, '..', 'client', 'internet-shop');
  app.use(express.static(eShopFiles));
  app.use(json({limit: '50mb'}));

  const options = new DocumentBuilder()
    .setTitle('M31 Studio')
    .setDescription('M31 Studio API')
    .setVersion('1.0')
    .addTag('M31')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // await app.listen(SERVER_PORT);
  app.init();
}
bootstrap();
exports.app = functions.https.onRequest(server);
