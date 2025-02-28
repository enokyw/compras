import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PurchasesController } from '../controllers/purchases.controller';
import { PurchasesService } from '../../application/services/purchases.service';
import { SAPAdapter } from '../adapters/sap.adapter';
import { HanaModule } from './hana.module';
//import { RabbitMQAdapter } from '../adapters/rabbitmq.adapter';

@Module({
  imports: [HttpModule, HanaModule],
  controllers: [PurchasesController],
  providers: [PurchasesService, SAPAdapter, /* RabbitMQAdapter */],
})
export class PurchasesModule {}