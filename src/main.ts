import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  });*/
  const config = new DocumentBuilder()
    .setTitle(process.env.TITLE || 'Service API')
    .setDescription(process.env.DESCRIPTION || 'Service API Documentation')
    .setVersion(process.env.VERSION || '1.0')
    .build();
  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document());
  //await app.startAllMicroservices();
  await app.listen(process.env.APP_PORT!);
}
bootstrap();