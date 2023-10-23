import React from 'react';
import { Box, Heading, Text, Image, Center } from '@chakra-ui/react';

const UnderConstruction = () => {
    return (
        <Center h="100vh" w="100vw">
            <Box textAlign="center" p="10">
                <Image
                    boxSize="250px"
                    objectFit="cover"
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Ambox_warning_blue_construction.svg"
                    alt="Under construction"
                    m="auto"
                />
                <Heading mt="6" mb="2" fontSize="3xl">
                    Page Under Construction
                </Heading>
                <Text fontSize="xl">
                    We're working hard to get this page up and running. As features and workflow are in constant flux, this page keeps changing. Stay tuned!
                </Text>
            </Box>
        </Center>
    );
};

export default UnderConstruction;
