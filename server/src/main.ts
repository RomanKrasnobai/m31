import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { json } from 'body-parser';
import { join } from 'path';
import { AppModule } from './app.module';

const SERVER_PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const eShopFiles = join(__dirname, '..', '..', 'e-shop', 'dist', 'internet-shop');
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

  await app.listen(SERVER_PORT);
}
bootstrap();
