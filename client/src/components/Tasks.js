import React, { useContext } from 'react'
import TaskItem from './TaskItem'
import { useState, useEffect } from 'react'
import { NavLink as RouterLink, useNavigate } from 'react-router-dom'
import { useToast } from "@chakra-ui/react";

import {
    Flex,
    Box,
    FormControl,
    Container,
    FormLabel,
    Input,
    VStack,

    Stack,
    Textarea,
    Button,
    Heading,

    useColorModeValue,

} from '@chakra-ui/react';
import TaskContext from '../context/TaskContext'
export const Tasks = () => {
    const toast = useToast()

    let navigate = useNavigate();

    const context = useContext(TaskContext);
    const { Tasks, setTasks, FetchTasks, addTasks } = context
    const [loading, setloading] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        } else {
            FetchTasks()
            console.log(Tasks)
        }
    }, []);
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const handledescchange = (e) => {
        setdescription(e.target.value)
    }
    const handletitlechange = (e) => {
        settitle(e.target.value)
    }
    const handleSubmit = () => {
        setloading(true)
        addTasks(title, description)
        settitle('')
        setdescription('')
        setloading(false)
    }
    const handlelogout = () => {
        localStorage.removeItem('token');
        let arr = [];
        setTasks(arr)
        navigate('/')
        return toast({
            title: "You have successfully logged out!",
            // description: "We've created your account for you.",
            status: 'info',
            duration: 5000,
            isClosable: true,
            position: 'top-left'
        })
    }
    let box;
    if (Tasks.length === 0) {
        box = <Box fontSize={'4xl'} align={'center'} color={'white'} pt={4}>NO TASK AVAILABLE</Box>
    } else {
        box = <Box fontSize={'4xl'} align={'center'} color={'white'} pt={4}>YOUR TASK</Box>

    }
    return (
        <div><Flex
            minH={'100vh'} >
            <Container justify={'center'}>
                <Stack align={'center'} pt={4}>
                    <Heading fontSize={'4xl'} letterSpacing={'wide'} color={'rgb(255 255 255)'} fontWeight='300' fontFamily={"Smooch"} textAlign={'center'}>
                        TO DONE
                    </Heading>


                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <VStack>
                        <FormControl id="email" isRequired>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justifyContent='end'>

                                <Button
                                    onClick={handlelogout}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }} justifyContent='end'>LOGOUT</Button>
                            </Stack>
                            <FormLabel>Title</FormLabel>
                            <Input onChange={(e) => { handletitlechange(e) }} value={title} type="text" placeholder='Enter Task title' />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Description</FormLabel>

                            <Textarea onChange={(e) => { handledescchange(e) }} value={description} placeholder='Enter The Task Description' resize={'none'} />

                        </FormControl>
                        {/* <FormControl id="password" isRequired>


                            <Checkbox>Is Very Much Important</Checkbox>

                        </FormControl> */}
                        <Button
                            isLoading={loading}
                            loadingText="Creating Task"
                            onClick={handleSubmit}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Create  task
                        </Button>
                    </VStack>
                </Box>
                {box}
                <VStack columns={1} spacing='40px' pt={5}>
                    {Tasks.map((task) => {
                        return <TaskItem task={task} />

                    })}

                </VStack>
            </Container>





        </Flex></div >
    )
}
