// item.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../model/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly repository: Repository<Item>,
  ) {}

  public async getAll() {
    return await this.repository.find();
  }

  public async add(item: Item) {
    return await this.repository.save(this.repository.create(item));
  }
}
