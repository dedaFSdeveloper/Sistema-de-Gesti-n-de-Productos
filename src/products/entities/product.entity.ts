import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ length: 100, nullable: true })
  category: string;

  @Column({ length: 50, nullable: true })
  sku: string;

  @Column({ default: true })
  isActive: boolean;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  discount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}