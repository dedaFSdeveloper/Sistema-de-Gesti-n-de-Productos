import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, Min, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @MaxLength(200)
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  category?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  sku?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  discount?: number;
}