import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'item' })
export class Item extends BaseEntity {
  @ApiProperty()
  @Column({ nullable: true })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;
}
