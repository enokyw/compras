import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthResponseDto, AuthDto } from '../../domain/auth.dto';
import { PurchaseRequestsDto } from 'src/domain/purchaseRequest.dto';
import { PaginationDto } from 'src/domain/pagination.dto';


@Injectable()
export class SAPAdapter {
  private readonly baseUrl = process.env.SAP_BASE_URL;

  constructor(private readonly httpService: HttpService) { }

  async authenticate(authData: AuthDto): Promise<AuthResponseDto | undefined> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/Login`, authData),
      );

      if (response.status !== 200) {
        return undefined;
      }

      const { SessionId, SessionTimeout } = response.data as AuthResponseDto;

      return {
        SessionId,
        SessionTimeout
      };
    } catch (error) {
      throw new Error('Error de autenticación en SAP');
    }
  }

  async getPurchaseRequests(sessionId: string, purchaseRequestDto:PurchaseRequestsDto, paginationDto: PaginationDto ): Promise<any> {
    const queryString = 'PurchaseRequests(102699)';

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/${queryString}`, {
          headers: { B1SESSION: sessionId },
        }),
      );
      if (response.status !== 200) {
        return undefined;
      }

      return response.data;
    } catch (error) {
      throw new Error('Error al obtener solicitudes de compra');
    }
  }
}
