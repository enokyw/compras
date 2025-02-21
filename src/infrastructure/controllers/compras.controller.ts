import { Controller, Get, Headers } from '@nestjs/common';
import { ComprasService } from '../../application/services/compras.service';

@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Get()
  async obtenerCompras(@Headers('Authorization') sessionId: string) {
    return await this.comprasService.obtenerCompras(sessionId);
  }
}
