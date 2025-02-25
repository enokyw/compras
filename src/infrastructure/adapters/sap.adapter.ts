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

  async getPurchaseRequests(sessionId: string, purchaseRequestDto: PurchaseRequestsDto, paginationDto: PaginationDto): Promise<any> {
    const { page, DocStatus } = { ...paginationDto, ...purchaseRequestDto };
    
    const limit = 2;
    const queryString = `PurchaseRequests?${DocStatus ? `$filter=DocumentStatus eq ${DocStatus}&` : ''}$select=DocEntry,DocNum,DocDate,DocDueDate,DocumentLines&$inlinecount=allpages&$top=${limit}&$skip=${(page??2 - 1) * limit}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/${queryString}`, {
          headers: {
            "Content-Type": "application/json",
            Cookie: `B1SESSION=${sessionId}`,
            B1SESSION: sessionId
          },
        }),
      );

      if (response.status === 200) {
        const { data } = response;
        const newData = {
          pageCount: Math.ceil(data['@odata.count'] / limit),
          currentPage: page,
    
          value: data.value.flatMap((item) =>
            item.DocumentLines.map((line) => ({
              DocNum: item.DocNum,
              DocDate: item.DocDate,
              DocDueDate: item.DocDueDate,
              Dscription: line.ItemDescription,
              ItemCode: line.ItemCode,
              Quantity: line.Quantity,
              Price: line.Price,
              LineTotal: line.LineTotal,
              WhsCode: line.WarehouseCode
            }))
          )
        };
        return newData;
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
