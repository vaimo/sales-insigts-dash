/*
* <license header>
*/

import React, { useEffect, useState } from "react";
import { Heading, View, Content, Link, Flex, Text } from "@adobe/react-spectrum";

const fetchContentfulEntries = async () => {
    const spaceId = "ud20h5tscuj7"; // Replace with your Contentful Space ID
    const accessToken = "Wyp-F5Dm6Ba2lr26nAE1oua_lRT-HS4NRM-ZIM0kRMQ"; // Replace with your Content Delivery API token
    const contentType = "banner"; // Replace with your desired content type

    const url = `https://cdn.eu.contentful.com/spaces/${spaceId}/entries?content_type=${contentType}&limit=10`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Failed to fetch entries:", error);
        return [];
    }
};

export const About = () => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        const loadContentfulEntries = async () => {
            const entries = await fetchContentfulEntries();
            setContent(entries || []);
        };

        loadContentfulEntries();
    }, []); // Empty dependency array ensures it runs once when the component mounts.

    return (
        <View width="size-6000">
            <Heading level={1}>Recent Entries From Contentful</Heading>
            <Content>
                <React.Fragment>
                    <h3>Recent Banners:</h3>
                </React.Fragment>
                <Flex direction="column" gap="size-200">
                    {content.map((item) => (
                        <Text key={item.sys.id}>{item.fields.internalTitle}</Text>
                    ))}
                </Flex>
            </Content>
        </View>
    );
};
