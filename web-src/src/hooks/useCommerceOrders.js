import { useEffect, useState } from 'react';
import { callActionOrders } from '../utils';

export const useCommerceOrders = (props, filter) => {
  const [orders, setOrders] = useState('');

  useEffect(() => {
    if (filter) {
      const fetchData = async () => {
        const result = await callActionOrders(
          props,
          'sales-insigts-dash/commerce-orders',
          {}
        );
        setOrders(result.error ? '' : result);
      };

      fetchData();
    }
  }, [filter]);

  return { orders: orders || '' };
};
