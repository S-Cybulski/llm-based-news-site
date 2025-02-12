import { Container, Flex, Text, HStack, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoRefreshCircleOutline, IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";


const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const refresh = async () => { 
        const category = window.location.pathname;
        await fetch(`http://localhost:5000/api/articles${category}`, { 
            method: "POST"
        });
        window.location.reload();
        console.log(`http://localhost:5000/api/articles${category}`);
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

                <Text>
                    <Link to={"/business"}>Business</Link>
                </Text>
                <Text>
                    <Link to={"/entertainment"}>Entertainment</Link>
                </Text>
                <Text>
                    <Link to={"/general"}>General</Link>
                </Text>
                <Text>
                    <Link to={"/health"}>Health</Link>
                </Text>
                <Text>
                    <Link to={"/science"}>Science</Link>
                </Text>
                <Text>
                    <Link to={"/sports"}>Sports</Link>
                </Text>
                <Text>
                    <Link to={"/technology"}>Technology</Link>
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