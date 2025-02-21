import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../../application/services/auth.service';
import { SAPAdapter } from '../adapters/sap.adapter';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, SAPAdapter],
})
export class AuthModule {}
