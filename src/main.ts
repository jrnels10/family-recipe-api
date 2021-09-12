import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import { urlencoded, json } from 'express';
async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  logger.log(`Accepting request from origin "${serverConfig.origin}"`);
  app.use(json({limit: '50mb'}));
  app.use(urlencoded({limit: '50mb', extended: true}));
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
