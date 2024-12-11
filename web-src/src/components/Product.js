import React, { useState } from "react";
import {
    Button,
    Content,
    Flex,
    TextField,
    View,
    ProgressCircle,
} from "@adobe/react-spectrum";
import { useCommerceProduct } from "../hooks/useCommerceProduct";
import { useCommerceOrders } from "../hooks/useCommerceOrders";

export const Product = (props) => {
    const [sku, setSku] = useState("10000037");
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
        setTimeout(function(){setIsLoadingProduct(false)},1500);
    };

    // Handle order fetch
    const handleSubmitOrder = () => {
        setIsLoadingOrders(true); // Start loading for orders
        setOrderFilter("some_order_filter"); // Trigger order fetch
        setTimeout(function(){setIsLoadingOrders(false)},1500);
    };

    return (
        <View>
            <TextField
                label="Product SKU"
                value={sku}
                onChange={setSku}
                marginBottom={10}
            />
            <Flex>
                <Button variant="cta" onPress={handleSubmit} isDisabled={isLoadingProduct}>
                    {isLoadingProduct ? "Loading Product..." : "Fetch Product"}
                </Button>
                <Button variant="cta" onPress={handleSubmitOrder} isDisabled={isLoadingOrders}>
                    {isLoadingOrders ? "Loading Orders..." : "Fetch Orders Data"}
                </Button>
            </Flex>
            <Content marginTop={10}>
                <h3>Product Name:</h3>
                {isLoadingProduct ? (
                    <ProgressCircle size="S" isIndeterminate />
                ) : product ? (
                    <pre>{JSON.stringify(product.name, null)}</pre>
                ) : (
                    "No products fetched."
                    )}
            </Content>
            <Flex direction="column" marginTop={20}>
                <React.Fragment>
                    <h3>Recent Orders:</h3>
                    <Content marginTop={10}>
                        {isLoadingOrders ? (
                            <ProgressCircle size="S" isIndeterminate />
                        ) : orders ? (
                            <pre>{JSON.stringify(orders, null, 2)}</pre>
                        ) : (
                            "No orders fetched."
                        )}
                    </Content>
                </React.Fragment>
            </Flex>
        </View>
    );
};
