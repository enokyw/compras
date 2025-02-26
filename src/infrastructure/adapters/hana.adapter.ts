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
            INNER JOIN OUBR T2 ON T0."Branch" = T2."Code"
            INNER JOIN OUSR T3 ON T0."Requester" = T3."USER_CODE"
            INNER JOIN OUDP T4 ON T3."Department" = T4."Code"
            ${DocStatus ? `WHERE T0."DocStatus" = '${DocStatus}'` : ''}
            ${Currency ? `AND T0."DocCur" = '${Currency}'` : ''}
            ${Branch ? `AND T2."Name" = '${Branch}'` : ''}
            ${search ? `AND (T0."DocNum" LIKE '%${search}%')` : ''
            }
        `)
        const totalRecords:number = countRecords?.[0]?.total??0
        if(totalRecords) {
            return {
                data: await this.hanaDb.query(`
                    SELECT
                        T0."DocNum",
                        TO_CHAR(T0."DocDate", 'DD-MM-YYYY') AS "DocDate",
                        TO_CHAR(T0."DocDueDate", 'DD-MM-YYYY') AS "DocDueDate",
                        T0."ReqName",
                        T0."DocCur",
                        T2."Name" AS "Branch",
                        T4."Name" AS "Department"
                    FROM OPRQ T0
                    INNER JOIN OUBR T2 ON T0."Branch" = T2."Code"
                    INNER JOIN OUSR T3 ON T0."Requester" = T3."USER_CODE"
                    INNER JOIN OUDP T4 ON T3."Department" = T4."Code"
                    ${DocStatus ? `WHERE T0."DocStatus" = '${DocStatus}'` : ''}
                    ${Currency ? `AND T0."DocCur" = '${Currency}'` : ''}
                    ${Branch ? `AND T2."Name" = '${Branch}'` : ''}
                    ${search ? `AND (T0."DocNum" LIKE '%${search}%')` : ''
                    }
                    ORDER BY T0."DocDate" DESC
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