import { useState, useEffect } from 'react';
import { getAuthRequest } from '../hook/Request.tsx';
import { Item } from 'backend/dist/model/item.entity';

export default function ItemComponent(props: {isLoggedIn: boolean}) {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
      getAuthRequest('/api/item').then(value => value.data)
        .then((remoteItems: Item[]) => {
        setItems(remoteItems);
      }).catch(reason => {
        console.log(reason);
        setItems([]);
      });
  }, [props.isLoggedIn]);

  return (
    <>
      <table className="table table-hover">
        <thead>
        <tr>
          <td>Name</td>
          <td>Description</td>
        </tr>
        </thead>
        <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.description}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );


}