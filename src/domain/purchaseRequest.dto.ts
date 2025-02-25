import { IsString, Matches } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseRequestsDto {
    @IsString()
    @ApiProperty({ example: 'C' })
    DocStatus: string;

    /* @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in the format YYYY-MM-DD' })
    @ApiProperty({ example: '2021-01-01' })
    DocDateStart: string;

    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in the format YYYY-MM-DD' })
    @ApiProperty({ example: '2024-01-01' })
    DocDateEnd: string;

    @IsString()
    CardCode: string; */
}