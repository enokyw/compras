import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from "./pagination.dto";

export class PurchaseRequestsDto extends PaginationDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 'C' })
    DocStatus?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: "SOL" })
    Currency?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: "Sucursal"})
    Branch?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: "Search by department or requester or branch"})
    search?: string;
}