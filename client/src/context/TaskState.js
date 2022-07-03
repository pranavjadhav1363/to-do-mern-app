import TaskContext from "./TaskContext";
import React, { useState } from 'react'
import { useToast } from "@chakra-ui/react";





const TaskState = (props) => {

    const toast = useToast()


    const [Tasks, setTasks] = useState([]);

    // const Checktoken = () => {

    //     let token = localStorage.getItem('token')
    //     if (!token) {
    //         return navigate('/')
    //     }
    // }

    const FetchTasks = async () => {

        const token = await localStorage.getItem('token')
        const response = await fetch('/task/fetchtasks', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })

        const json = await response.json()
        setTasks(Tasks.concat(json.notes))

    }

    const addTasks = async (title, description) => {
        const token = await localStorage.getItem('token')
        const response = await fetch('/task/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ title, description })
        })
        const json = await response.json();
        if (json.success) {
            setTasks(Tasks.concat(json.note))
            return toast({
                title: "Task Creted Successfully",
                // description: "We've created your account for you.",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
        }

    }
    const deleteTask = async (id) => {
        const token = await localStorage.getItem('token')
        const response = await fetch(`/task/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },

        })

        let filteredarray = Tasks.filter((task) => { return task._id !== id })
        setTasks(filteredarray);
        return toast({
            title: "Task Deleted Successfully",
            // description: "We've created your account for you.",
            status: 'info',
            duration: 5000,
            isClosable: true,
            position: 'top-left'
        })



    }

    const updatetask = async (id, title, description) => {
        const token = await localStorage.getItem('token')
        const response = await fetch(`/task/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({ title, description })

        })

        const objIndex = Tasks.findIndex((task => task._id === id));
        Tasks[objIndex].title = title
        Tasks[objIndex].description = description
        const newarray = Tasks
        setTasks(newarray)

        return true



    }




    return (<TaskContext.Provider value={{ Tasks, setTasks, FetchTasks, addTasks, deleteTask, updatetask }}>
        {props.children}
    </TaskContext.Provider>)
}


export default TaskState