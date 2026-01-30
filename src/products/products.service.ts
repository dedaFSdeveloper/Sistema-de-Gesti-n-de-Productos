import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async createBulk(products: CreateProductDto[]): Promise<Product[]> {
    const productEntities = this.productsRepository.create(products);
    return await this.productsRepository.save(productEntities);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async findByCategory(category: string): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { category },
      order: { createdAt: 'DESC' }
    });
  }

  async findActive(): Promise<Product[]> {
    return await this.productsRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' }
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async updateBulk(updates: { id: string; data: UpdateProductDto }[]): Promise<Product[]> {
    const ids = updates.map(u => u.id);
    const products = await this.productsRepository.find({
      where: { id: In(ids) }
    });

     if (products.length !== updates.length) {
      throw new BadRequestException('Algunos IDs no existen');
    }

    const updatedProducts = products.map(product => {
      const update = updates.find(u => u.id === product.id);
      if (update) {
        Object.assign(product, update.data);
      }
      return product;
    });

    return await this.productsRepository.save(updatedProducts);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }

  async removeBulk(ids: string[]): Promise<void> {
    const products = await this.productsRepository.find({
      where: { id: In(ids) }
    });

    if (products.length !== ids.length) {
      throw new BadRequestException('Algunos IDs no existen');
    }

    await this.productsRepository.remove(products);
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    product.stock += quantity;
    
    if (product.stock < 0) {
      throw new BadRequestException('Stock no puede ser negativo');
    }
    
    return await this.productsRepository.save(product);
  }

  async searchByName(searchTerm: string): Promise<Product[]> {
    return await this.productsRepository
      .createQueryBuilder('product')
      .where('LOWER(product.name) LIKE LOWER(:searchTerm)', {
        searchTerm: `%${searchTerm}%`
      })
      .orderBy('product.createdAt', 'DESC')
      .getMany();
  }

  async applyDiscount(id: string, discount: number): Promise<Product> {
    const product = await this.findOne(id);
    product.discount = discount;
    return await this.productsRepository.save(product);
  }

  async getStatistics() {
    const totalProducts = await this.productsRepository.count();
    const activeProducts = await this.productsRepository.count({ where: { isActive: true } });
    const totalValue = await this.productsRepository
      .createQueryBuilder('product')
      .select('SUM(product.price * product.stock)', 'total')
      .getRawOne();

    return {
      totalProducts,
      activeProducts,
      inactiveProducts: totalProducts - activeProducts,
      totalInventoryValue: parseFloat(totalValue.total) || 0
    };
  }
}