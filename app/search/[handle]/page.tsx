'use client'

import {use, useEffect, useState} from "react";
import {getAllProductsActive, getAllProductsActiveByCategoryId} from "@/lib/graphql/query";
import {Product} from "@/lib/types";
import {Card} from "@/components/card";

// `PageProps` typing in Next.js 15 expects Promises. Cast to `any` to avoid type issues.
export default function SearchByPage ({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = use<{ handle: string }>(params);

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            try {
                const itemsData = await getAllProductsActiveByCategoryId(handle);
                setItems(itemsData);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        getItems();
    }, []);

    return (
        <>
            {
                items.map((item: Product) => <Card key={item.id} product={item}/>)
            }
        </>
    );

}