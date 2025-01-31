import { Container, Flex, Text, Link, HStack, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoRefreshCircleOutline, IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";


const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const refresh = async () => {
        await fetch("http://localhost:5000/api/articles", { 
            method: "POST"
        });
        window.location.reload();
    }
    return <Container maxW={"100vw"} px={4} bg={useColorModeValue("gray.100", "gray.900")}>
        <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base:"column",
                sm:"row"
            }}
            >
                <Text
                    fontSize={{base: "22", sm: "28"}}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                >
                    <Link to={"/"}>Home Feed</Link>
                </Text>

                <HStack spacing={2} alignItems={"center"}>
                    <Button onClick={refresh}>
                        <IoRefreshCircleOutline fontSize={30}/>
                    </Button>

                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon fontSize={25}/> : <LuSun fontSize={25}/>}
                    </Button>

                </HStack>
            </Flex>
    </Container>;
}

export default Navbar;