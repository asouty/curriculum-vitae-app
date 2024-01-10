import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty()
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createDateTime: Date;

  @ApiProperty()
  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  lastChangedDateTime: Date;

  @ApiProperty()
  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;
}
