// item.controller.ts

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Item } from '../../model/item.entity';

@Controller('item')
export class ItemController {
  constructor(private readonly service: ItemService) {}

  @Get()
  @ApiCreatedResponse({ type: Item, isArray: true })
  public getAll() {
    return this.service.getAll();
  }

  @Post()
  @ApiCreatedResponse({ type: Item })
  public async add(@Body() item: Item) {
    return this.service.add(item);
  }
}
