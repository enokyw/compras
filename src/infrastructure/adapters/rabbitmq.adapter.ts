/* import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQAdapter {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL!],
        queue: 'compras_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async enviarMensaje(patron: string, data: any) {
    return this.client.send(patron, data).toPromise();
  }
} */
