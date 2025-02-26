import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ComprasController } from '../controllers/compras.controller';
import { ComprasService } from '../../application/services/compras.service';
import { SAPAdapter } from '../adapters/sap.adapter';
import { HanaModule } from './hana.module';
//import { RabbitMQAdapter } from '../adapters/rabbitmq.adapter';

@Module({
  imports: [HttpModule, HanaModule],
  controllers: [ComprasController],
  providers: [ComprasService, SAPAdapter, /* RabbitMQAdapter */],
})
export class ComprasModule {}