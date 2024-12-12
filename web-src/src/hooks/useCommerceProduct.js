import {useEffect, useState} from 'react'
import {callAction} from "../utils";

export const useCommerceProduct = (props, sku) => {
    const [product, setProduct] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const result = await callAction(props, 'sales-insigts-dash/commerce', {sku: sku})
            setProduct(result.error ? "" : result);
        };

        if (sku) {
            fetchData()
        }
    }, [sku]);
    return {product}
}
