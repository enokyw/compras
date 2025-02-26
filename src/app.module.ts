import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/modules/auth.module';
import { ComprasModule } from './infrastructure/modules/compras.module';
import { SalesModule } from './infrastructure/modules/sales.module';

@Module({
  imports: [AuthModule, ComprasModule, SalesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}