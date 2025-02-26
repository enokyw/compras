import { Injectable } from '@nestjs/common';
import { PurchaseRequestsDto } from 'src/domain/purchaseRequest.dto';
import { HanaAdapter } from 'src/infrastructure/adapters/hana.adapter';
//import { RabbitMQAdapter } from 'src/infrastructure/adapters/rabbitmq.adapter';

@Injectable()
export class ComprasService {
  constructor(
    private readonly hanaAdapter: HanaAdapter,
    //private readonly rabbitMQAdapter: RabbitMQAdapter
  ) { }

  async findPurchaseRequests(prDto: PurchaseRequestsDto) {
    try {
      return await this.hanaAdapter.queryPurchaseRequests(prDto);
    } catch (error) {
      throw new Error('Error al obtener compras');
    }
  }

  /* async publicarCompras(sessionId: string) {
    const compras = await this.obtenerCompras(sessionId);
    await this.rabbitMQAdapter.enviarMensaje('compras.obtener', compras);
  } */

}
