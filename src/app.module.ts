import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/modules/auth.module';
import { ComprasModule } from './infrastructure/modules/compras.module';

@Module({
  imports: [AuthModule, ComprasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}