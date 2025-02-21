import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthResponseDto, AuthDto } from '../../domain/auth.dto';


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

  async getPurchases(sessionId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/PurchaseOrders`, {
          headers: { Cookie: `B1SESSION=${sessionId}` },
        }),
      );

      return response.data;
    } catch (error) {
      throw new Error('Error al obtener compras de SAP');
    }
  }
}

