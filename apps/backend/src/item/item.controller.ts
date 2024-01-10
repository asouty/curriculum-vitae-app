// item.controller.ts

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from '../model/item.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('item')
export class ItemController {
  constructor(private service: ItemService) {}

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
