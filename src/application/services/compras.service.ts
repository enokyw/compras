import { Injectable } from '@nestjs/common';
import { SAPAdapter } from '../../infrastructure/adapters/sap.adapter';
import { PurchaseRequestsDto } from 'src/domain/purchaseRequest.dto';
import { PaginationDto } from 'src/domain/pagination.dto';
//import { RabbitMQAdapter } from 'src/infrastructure/adapters/rabbitmq.adapter';

@Injectable()
export class ComprasService {
  constructor(
    private readonly sapAdapter: SAPAdapter,
    //private readonly rabbitMQAdapter: RabbitMQAdapter
  ) {}

  async findPurchaseRequests(sessionId: string, purchaseRequestsDto: PurchaseRequestsDto, paginationDto: PaginationDto) {
    try {
       const response = await this.sapAdapter.getPurchaseRequests(sessionId, purchaseRequestsDto, paginationDto);
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
