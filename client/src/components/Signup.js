import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { validate } from 'react-email-validator';
import "@fontsource/smooch";
import { NavLink as RouterLink } from 'react-router-dom'
import { IconButton } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
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
export const Signup = () => {
    let navigate = useNavigate();
    const toast = useToast()
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [passwordtype, setpasswordtype] = useState('password');
    const [cpasswordtype, setcpasswordtype] = useState('password');
    const [loading, setloading] = useState(false);



    const handlechangecpassword = (e) => {
        setcpassword(e.target.value)
    }
    const handlechangepassword = (e) => {
        setpassword(e.target.value)
    }
    const handlechangeemail = (e) => {
        setemail(e.target.value)
    }
    const handlechangename = (e) => {
        setname(e.target.value)
    }
    const handlecpassworddown = (e) => {
        setcpasswordtype('text')
    }
    const handlecpasswordup = (e) => {
        setcpasswordtype('password')
    }
    const handlepassworddown = (e) => {
        setpasswordtype('text')
    }
    const handlepasswordup = (e) => {
        setpasswordtype('password')
    }
    const HandleSubmit = async () => {
        setloading(true)
        if (name === '' || email === '' || password === '' || cpassword === '') {
            setloading(false)
            return toast({
                title: 'Please Fill all the Feilds',
                // description: "We've created your account for you.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        }
        if (name.length < 6) {
            setloading(false)
            return toast({
                title: 'Username must  contain atleast 6 Characters',
                // description: "We've created your account for you.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        }
        if (!validate(email)) {
            setloading(false)
            return toast({
                title: 'Enter a valid email',
                // description: "We've created your account for you.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        }
        if (password.length < 6) {
            setloading(false)
            return toast({
                title: 'password must contain atleast 6 Characters',
                // description: "We've created your account for you.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        }
        if (password !== cpassword) {
            setloading(false)
            console.log(`${process.env.REACT_APP_URL}/`)
            return toast({
                title: 'Passwords did not match',
                // description: "We've created your account for you.",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        }
        const response = await fetch(`/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password })
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
            toast({
                title: "Account Created Successfully Login Again",
                // description: "We've created your account for you.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
            localStorage.setItem("token", json.token)
            navigate("/");
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
                    <Heading fontSize={'4xl'} color={'rgb(255 255 255)'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'rgb(255 255 255)'}>
                        To Set Your First Goal Of The Day ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4} py={3} px={6}>

                        <Box>
                            <FormControl id="firstName" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input onChange={handlechangename} value={name} type="text" placeholder='Enter Your Name' />
                            </FormControl>
                        </Box>


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
                        <Box>
                            <FormControl id="lastName" isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input onChange={handlechangecpassword} value={cpassword} type={cpasswordtype} placeholder=' Confirm Your Password' />
                                    <InputRightElement h={'full'}>
                                        <IconButton onMouseDown={handlecpassworddown} onMouseUp={handlecpasswordup} icon={<ViewIcon />} />


                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </Box>
                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={HandleSubmit}
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                isLoading={loading}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link as={RouterLink} to='/' color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex ></div >
    )
}
