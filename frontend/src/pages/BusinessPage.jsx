import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from 'react';
import { businessFeed } from "../../feed/Articles";
import ArticleCard from "../components/ArticleCard";

const BusinessPage = () => {
    const {fetchArticles, articles} = businessFeed();
    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);
    console.log("articles", articles);
    
    return (
    <Container maxW='container.xl' py={12}>
        <VStack spacing={8}>
        <Text 
            fontSize={"30"}
            fontWeight={"bold"}
            textAlign={"center"}
        >
            Business News!
        </Text>

        <SimpleGrid
            columns={{
                base: 1,
                md: 2,
                lg: 3
            }}
            spacing={10}
            w={"full"}

            >
            {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
            ))}

        </SimpleGrid>
        </VStack>
    </Container>)
};

export default BusinessPage;