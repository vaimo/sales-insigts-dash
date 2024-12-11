/*
* <license header>
*/

import React, {useEffect, useState} from 'react'
import {Button, Column, Content, Flex, Heading, Row, View} from '@adobe/react-spectrum'
import {useCommerceProduct} from "../hooks/useCommerceProduct";
import {useCommerceOrders} from "../hooks/useCommerceOrders";

export const Home = (props) => {
    const [sku, setSku] = useState('10000037');
    const [submittedSku, setSubmittedSku] = useState(sku);
    const [submittedOrders, setSubmittedOrders] = useState();
    const {product} = useCommerceProduct({...props}, submittedSku);
    const {orders} = useCommerceProduct({...props}, submittedOrders);

    const handleSubmit = () => {
        setSubmittedSku(sku);
    };

    const handleSubmitOrder = () => {
        setSubmittedOrders();
    };

    return (
        <View width='size-6000'>
            <Heading level={1}>Welcome to Sales And Insights Dashboard PoC!</Heading>
        </View>);
}
