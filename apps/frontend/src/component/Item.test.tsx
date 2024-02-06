/**
 * @jest-environment jsdom
 */
import axios from 'axios';
import { Item } from 'backend/dist/model/item.entity';
import ItemComponent from './Item.tsx';
import { render, screen } from '@testing-library/react';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);


test('renders the item component', async () => {
  let item = new Item();
  item.name = 'MyItem';
  item.id = 'MyItemId';
  mockedAxios.get.mockResolvedValue({data : Array(item)});
  render(<ItemComponent isLoggedIn={true} />);
  await screen.findAllByText('MyItem');
  expect(mockedAxios.get).toHaveBeenCalledWith("/api/item", { headers: {'Authorization' : `Bearer null`}});
});