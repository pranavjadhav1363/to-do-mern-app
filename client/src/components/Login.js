import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import { IconButton } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,

    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react';

export const Login = () => {
    let navigate = useNavigate();
    const toast = useToast()
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [passwordtype, setpasswordtype] = useState('password');
    const [loading, setloading] = useState(false);
    const handlepassworddown = (e) => {
        setpasswordtype('text')
    }
    const handlepasswordup = (e) => {
        setpasswordtype('password')
    }

    const handlechangepassword = (e) => {
        setpassword(e.target.value)
    }
    const handlechangeemail = (e) => {
        setemail(e.target.value)
    }

    const HandleSubmit = async () => {
        setloading(true)
        const response = await fetch(`/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });
        const json = await response.json()
        if (!json.success) {
            setloading(false)
            return toast({
                title: json.err,
                // description: "We've created your account for you.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        }
        if (json.success) {
            setloading(false)
            toast({
                title: "Login Successfull",
                // description: "We've created your account for you.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
            const data = localStorage.setItem("token", json.token)
            console.log(data)
            navigate("/tasks");
        }

    }
    return (
        <div> <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} letterSpacing={'wide'} color={'rgb(255 255 255)'} fontWeight='300' fontFamily={"Smooch"} textAlign={'center'}>
                        TO DONE
                    </Heading>
                    <Heading fontSize={'4xl'} color={'rgb(255 255 255)'} textAlign={'center'}>Login to your account</Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input onChange={handlechangeemail} value={email} type="email" placeholder='Enter Your Email' />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input onChange={handlechangepassword} value={password} type={passwordtype} placeholder='Password' />
                                <InputRightElement h={'full'}>
                                    <IconButton onMouseDown={handlepassworddown} onMouseUp={handlepasswordup} icon={<ViewIcon />} />


                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={5}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justifyContent='end'>

                                {/* <Link color={'blue.400'} justifyContent='end'>Forgot password?</Link> */}
                            </Stack>
                            <Button
                                onClick={HandleSubmit}
                                loadingText='getting ready'
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                isLoading={loading}>
                                Sign in
                            </Button>
                            <Stack pt={1}>
                                <Text align={'center'}>
                                    Don't have an account? <Link as={RouterLink} to='/signup' color={'blue.400'}>Signup</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex ></div >
    )
}
