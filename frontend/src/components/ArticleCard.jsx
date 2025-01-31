import { Box, Heading, Image, Text } from "@chakra-ui/react"

const ArticleCard = ( {article} ) => {
    return (
        <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{transform: "translateY(-5px)", shadow: "x1"}}
        >
            <Image src={article.urlToImage} alt={article.title} h={48} w={'full'} objectFit={'cover'} />
            <Box p={4}>
            <Heading as='h3' size='md' mb={2}>
                {article.title};
            </Heading>
            <Text fontSize='x1' mb={4}>
                {article.description}
            </Text>
            </Box>
        </Box>
    )
}

export default ArticleCard