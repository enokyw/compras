import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ default: 1 })
    page?: number = 1;

    /* @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit?: number = 10; */
}