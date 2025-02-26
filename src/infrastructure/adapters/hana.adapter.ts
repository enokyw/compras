import { Injectable } from "@nestjs/common";
import { HanaService } from "src/application/services/hana.service";
import { PurchaseRequestsDto } from "src/domain/purchaseRequest.dto";

@Injectable()
export class HanaAdapter {
    constructor(private readonly hanaDb: HanaService) {}

    async queryPurchaseRequests(prDto: PurchaseRequestsDto) {
        const { page=1, limit=10, DocStatus, Currency, Branch, search } = prDto

        const countRecords = await this.hanaDb.query(`
            SELECT
                COUNT(*) AS "total"
            FROM OPRQ T0
            INNER JOIN PRQ1 T1 ON T0."DocEntry" = T1."DocEntry"
            ${DocStatus ? `WHERE T0."DocStatus" = '${DocStatus}'` : ''}
        `)
        const totalRecords:number = countRecords?.[0]?.total??0
        if(totalRecords) {
            return {
                data: await this.hanaDb.query(`
                    SELECT 
                        T0."DocNum", 
                        T0."DocDate", 
                        T0."DocDueDate",
                        T0."ReqName",
                        T0."DocCur",
                        T1."Quantity",
                        T2."Name" AS "Sucursal",
                        T4."Name" AS "Departamento"
                    FROM PRQ1 T1  
                    INNER JOIN OPRQ T0 ON T0."DocEntry" = T1."DocEntry"
                    INNER JOIN OUBR T2 ON T0."Branch" = T2."Code"
                    INNER JOIN OUSR T3 ON T0."Requester" = T3."USER_CODE"
                    INNER JOIN OUDP T4 ON T3."Department" = T4."Code"
                    ${DocStatus ? `WHERE T0."DocStatus" = '${DocStatus}'` : ''}
                    ${Currency ? `AND T0."DocCur" = '${Currency}'` : ''}
                    ${Branch ? `AND T2."Name" = '${Branch}'` : ''}
                    ${search ? `AND (T0."DocNum" LIKE '%${search}%' 
                        OR T0."ReqName" LIKE '%${search}%'
                        OR T4."Name" LIKE '%${search}%')` : ''
                    }
                    ORDER BY T0."DocNum"
                    LIMIT ${limit} OFFSET ${(page - 1) * limit}
                `),
                meta: {
                    page,
                    totalPages: Math.ceil(totalRecords / limit),
                    totalRecords
                }
            }
        }
    }
    
}