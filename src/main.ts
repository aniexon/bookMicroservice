import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { environmentVars } from './config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  // Creamos el servidor
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: environmentVars.HOST,
        port: environmentVars.PORT
      }
    }
  );

  // Habilita las validaciones
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  // Lanzamos el servidor
  await app.listen();

  console.log('Servidor ejecutandose en el puerto:' + environmentVars.PORT);
}
bootstrap();

