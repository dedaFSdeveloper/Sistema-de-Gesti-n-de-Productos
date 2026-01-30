import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BulkCreateProductDto } from './dto/bulk-create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post('bulk')
  createBulk(@Body() bulkCreateProductDto: BulkCreateProductDto) {
    return this.productsService.createBulk(bulkCreateProductDto.products);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('active')
  findActive() {
    return this.productsService.findActive();
  }

  @Get('statistics')
  getStatistics() {
    return this.productsService.getStatistics();
  }

  @Get('search')
  search(@Query('term') term: string) {
    return this.productsService.searchByName(term);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Put('bulk')
  updateBulk(@Body() updates: { id: string; data: UpdateProductDto }[]) {
    return this.productsService.updateBulk(updates);
  }

  @Patch(':id/stock')
  updateStock(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.productsService.updateStock(id, quantity);
  }

  @Patch(':id/discount')
  applyDiscount(@Param('id') id: string, @Body('discount') discount: number) {
    return this.productsService.applyDiscount(id, discount);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Delete()
  removeBulk(@Body('ids') ids: string[]) {
    return this.productsService.removeBulk(ids);
  }
}