import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/modules/auth.module';
import { PurchasesModule } from './infrastructure/modules/purchases.module';
import { SalesModule } from './infrastructure/modules/sales.module';
import { ItemsModule } from './infrastructure/modules/items.module';

@Module({
  imports: [AuthModule, PurchasesModule, SalesModule, ItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}