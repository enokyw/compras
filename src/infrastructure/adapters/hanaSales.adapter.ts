import { Injectable } from "@nestjs/common";
import { HanaService } from "src/application/services/hana.service";


@Injectable()
export class HanaSalesAdapter {
    constructor(private readonly hanaService: HanaService) { }

    async QuerySaleOrderByDocNum(DocNum: number) {
        const saleOrder = await this.hanaService.query(`
            SELECT 
                T0."DocNum",
                T0."CardCode",
                T0."CardName",
                T0."DocDate",
                T0."DocDueDate",
                T0."TaxDate",
                T0."DocStatus",
                T0."NumAtCard",
                T1."SeriesName" || '-' || T0."DocNum" AS "Serie",
                T2."LineNum",
                T2."ItemCode",
                T2."Dscription",
                T2."Quantity",
                T2."OpenQty",
                T2."DelivrdQty",
                T2."ShipDate"
            FROM ORDR T0
            INNER JOIN NNM1 T1 ON T0."Series" = T1."Series"
            LEFT JOIN RDR1 T2 ON T0."DocEntry" = T2."DocEntry"
            WHERE T0."DocNum" = ${DocNum}
            ORDER BY T0."DocNum" DESC
        `) as {[key:string]:any}[];
        
        if(Array.isArray(saleOrder) && saleOrder.length) {
            return {
                DocNum: saleOrder[0]?.DocNum,
                CardCode: saleOrder[0]?.CardCode,
                CardName: saleOrder[0]?.CardName,
                DocDate: saleOrder[0]?.DocDate,
                DocDueDate: saleOrder[0]?.DocDueDate,
                TaxDate: saleOrder[0]?.TaxDate,
                DocStatus: saleOrder[0]?.DocStatus,
                NumAtCard: saleOrder[0]?.NumAtCard,
                Serie: saleOrder[0]?.Serie,
                Lines: saleOrder.map(line => ({
                    LineNum: line?.LineNum,
                    ItemCode: line?.ItemCode,
                    Dscription: line?.Dscription,
                    Quantity: line?.Quantity,
                    OpenQty: line?.OpenQty,
                    DelivrdQty: line?.DelivrdQty,
                    ShipDate: line?.ShipDate
                }))
            }
        }

        return {}
    }
}