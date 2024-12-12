import React, { useState } from 'react';
import {
  Button,
  Content,
  Flex,
  TextField,
  View,
  ProgressCircle,
} from '@adobe/react-spectrum';
import { useCommerceProduct } from '../hooks/useCommerceProduct';
import { useCommerceOrders } from '../hooks/useCommerceOrders';

export const Product = (props) => {
  const [sku, setSku] = useState('107809-02');
  const [submittedSku, setSubmittedSku] = useState(null);
  const [orderFilter, setOrderFilter] = useState(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false); // Loading state for product
  const [isLoadingOrders, setIsLoadingOrders] = useState(false); // Loading state for orders

  const { product } = useCommerceProduct({ ...props }, submittedSku);
  const { orders } = useCommerceOrders({ ...props }, orderFilter);

  // Handle product submission
  const handleSubmit = () => {
    setIsLoadingProduct(true); // Start loading for product
    setSubmittedSku(sku); // Trigger product fetch
    setTimeout(function () {
      setIsLoadingProduct(false);
    }, 1500);
  };

  // Handle order fetch
  const handleSubmitOrder = () => {
    setIsLoadingOrders(true); // Start loading for orders
    setOrderFilter('some_order_filter'); // Trigger order fetch
    setTimeout(function () {
      setIsLoadingOrders(false);
    }, 1500);
  };

  return (
    <View>
      <TextField
        label='Product SKU'
        value={sku}
        onChange={setSku}
        marginBottom={10}
      />
      <Flex>
        <Button
          variant='cta'
          onPress={handleSubmit}
          isDisabled={isLoadingProduct}
        >
          {isLoadingProduct ? 'Loading Product...' : 'Fetch Product'}
        </Button>
        <Button
          variant='cta'
          onPress={handleSubmitOrder}
          isDisabled={isLoadingOrders}
        >
          {isLoadingOrders ? 'Loading Orders...' : 'Fetch Orders Data'}
        </Button>
      </Flex>
      <Content marginTop={10}>
        <h3>Product Name:</h3>
        {isLoadingProduct ? (
          <ProgressCircle size='S' isIndeterminate />
        ) : product ? (
          <div style={{ marginLeft: 20 }}>{product.name}</div>
        ) : (
          'No products fetched.'
        )}
      </Content>
      <Flex direction='column' marginTop={20}>
        <React.Fragment>
          <h3>Recent Orders:</h3>
          <Content marginTop={10}>
            {isLoadingOrders ? (
              <ProgressCircle size='S' isIndeterminate />
            ) : orders ? (
              <div>
                <h4 style={{ marginTop: 0 }}>
                  Total orders:{' '}
                  <span style={{ fontWeight: 'normal' }}>
                    {orders.total_count}
                  </span>
                </h4>
                {orders.items.map((order) => (
                  <div key={order.id}>
                    <div>
                      <span style={{ fontWeight: 'bold' }}>Order:</span>{' '}
                      {order.increment_id}
                    </div>
                    <div style={{ marginLeft: 20 }}>
                      <span style={{ fontWeight: 'bold' }}>Order Total:</span>{' '}
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: order.order_currency_code,
                      }).format(order.subtotal_incl_tax)}
                    </div>
                    <div style={{ marginLeft: 20, marginBottom: 50 }}>
                      <span style={{ fontWeight: 'bold' }}>
                        Order Items Skus:
                      </span>{' '}
                      <ul style={{ marginTop: 0 }}>
                        {order.items.map((item, index) => (
                          <li key={item.sku + index}>{item.sku}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              'No orders fetched.'
            )}
          </Content>
        </React.Fragment>
      </Flex>
    </View>
  );
};
