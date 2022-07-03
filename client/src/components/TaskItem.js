import React, { useContext, useState } from 'react'
import TaskContext from '../context/TaskContext';
import "@fontsource/alef";
import "@fontsource/dm-sans";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,

    useDisclosure,
    Box,
    FormControl,

    FormLabel,
    Input,

    Stack,
    Textarea,
    Button,
    Heading,
    Text,
    useColorModeValue,

} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";

const TaskItem = (props) => {
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const context = useContext(TaskContext);
    const { deleteTask, updatetask } = context
    let { task } = props
    const [etitle, setetitle] = useState(task.title);
    const [edescription, setedescription] = useState(task.description);
    const handlechnageetitle = (e) => {
        setetitle(e.target.value)
    }
    const handlechnageedesc = (e) => {
        setedescription(e.target.value)
    }
    const updatetaskandclose = async (id, title, desc) => {
        const workdone = await updatetask(id, title, desc);
        if (workdone) {

            onClose()
            return toast({
                title: "Task Updated Successfully",
                // description: "We've created your account for you.",
                status: 'info',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        }
    }
    return (
        <>
            <Box key={task._id} rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}
                w="100%">
                <Heading fontSize={'3xl'} fontFamily={"DM Sans"} letterSpacing={'wide'} color={'black'} fontWeight='300' textAlign={'center'}>
                    {task.title}
                </Heading>
                <Text fontFamily={"Alef"}>
                    {task.description}
                </Text>
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'} pt={3}>

                    <Button
                        onClick={onOpen}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Edit
                    </Button>
                    <Button
                        onClick={() => { deleteTask(task._id) }}
                        bg={'red.400'}
                        color={'white'}
                        _hover={{
                            bg: 'red.500',
                        }}>
                        Delete
                    </Button>

                </Stack>

            </Box>

            <Modal

                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input onChange={(e) => { handlechnageetitle(e) }} value={etitle} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Textarea onChange={(e) => { handlechnageedesc(e) }} value={edescription} resize={'none'} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => { updatetaskandclose(task._id, etitle, edescription) }} colorScheme='blue' mr={3}>
                            Update Task
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TaskItem
