import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './item.service';
import { Item } from '../../model/item.entity';
import { TypeOrmSQLITETestingModule } from '../../../test/TypeORMSQLITETestingModule';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let controller: ItemController;
function addItem(name: string, description: string) {
  let item = new Item();
  item.name = name;
  item.description = description;
  return controller.add(item);
}

describe('ItemController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmSQLITETestingModule(), TypeOrmModule.forFeature([Item])],
      providers: [ItemService],
      controllers: [ItemController],
    }).compile();
    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should add item', async () => {
    let savedItem = await addItem('name', 'description');
    expect(savedItem.id).toBeDefined();
    expect(savedItem.createDateTime).toBeDefined();
    expect(savedItem.createDateTime).toEqual(savedItem.lastChangedDateTime);
    expect(savedItem.name).toEqual('name');
    expect(savedItem.description).toEqual('description');
  });
  it('should list items', async () => {
    let currentItem: Item;
    for (let i = 0; i < 10; i++) {
      currentItem = await addItem('name' + i, 'description' + i);
    }
    // update an existing item with 1 second late to get a different updated_at date
    await sleep(1000);
    currentItem.description = 'updated_description9';
    await controller.add(currentItem);

    let items = await controller.getAll();
    expect(items.length).toEqual(10);

    let updatedItem = items.find((value) => value.name == 'name9');
    expect(updatedItem.id).toBeDefined();
    expect(updatedItem.createDateTime).toBeDefined();
    expect(
      updatedItem.createDateTime < updatedItem.lastChangedDateTime,
    ).toEqual(true);
    expect(updatedItem.name).toEqual('name9');
    expect(updatedItem.description).toEqual('updated_description9');
  });
});
