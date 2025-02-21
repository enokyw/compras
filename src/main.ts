import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* const rabbitMqUrl = process.env.RABBITMQ_URL;
  if (!rabbitMqUrl) {
    throw new Error('RABBITMQ_URL environment variable is not defined');
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqUrl],
      queue: 'compras_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices(); */
  await app.listen(process.env.APP_PORT!);
}
bootstrap();