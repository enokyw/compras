import { IsString, Matches } from "class-validator";

export class PurchaseRequestsDto {
    @IsString()
    DocStatus: string;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in the format YYYY-MM-DD' })
    DocDateStart: string;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in the format YYYY-MM-DD' })
    DocDateEnd: string;

    @IsString()
    CardCode: string;
}