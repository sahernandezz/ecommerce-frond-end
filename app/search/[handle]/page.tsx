'use client'

import {use, useEffect, useState} from "react";
import {getAllProductsActive, getAllProductsActiveByCategoryId} from "@/lib/graphql/query";
import {Product} from "@/lib/types";
import {Card} from "@/components/card";

export default function SearchByPage ({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = use(params);

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            try {
                const itemsData = await getAllProductsActiveByCategoryId(handle);
                if (itemsData) {
                    setItems(itemsData);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        getItems();
    }, [handle]);

    return (
        <>
            {
                items.map((item: Product) => <Card key={item.id} product={item}/>)
            }
        </>
    );

}