import { Injectable } from '@nestjs/common';
import { SAPAdapter } from '../../infrastructure/adapters/sap.adapter';
//import { RabbitMQAdapter } from 'src/infrastructure/adapters/rabbitmq.adapter';

@Injectable()
export class ComprasService {
  constructor(
    private readonly sapAdapter: SAPAdapter,
    //private readonly rabbitMQAdapter: RabbitMQAdapter
  ) {}

  async obtenerCompras(sessionId: string) {
    try {
      const response = await this.sapAdapter.getPurchases(sessionId);
      return response;
    } catch (error) {
      throw new Error('Error al obtener compras');
    }
  }

  /* async publicarCompras(sessionId: string) {
    const compras = await this.obtenerCompras(sessionId);
    await this.rabbitMQAdapter.enviarMensaje('compras.obtener', compras);
  } */
  
}
