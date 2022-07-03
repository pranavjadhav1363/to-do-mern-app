const authuser = require("../middleware/authuser");
const express = require('express');
const Note = require("../models/NoteSchema");

const router = express.Router()


router.post('/create', authuser, async (req, res) => {
    let success = false
    let userID = await req.user.id;

    if (!userID) {

        return res.status(400).json({ success: success, err: "Email Id Already Exist" })
    }
    try {
        const newNote = await Note.create({
            userid: userID,
            title: req.body.title,
            description: req.body.description,
            // isimportant: req.body.isimportant,

        })
        if (newNote) {
            success = true
            return res.status(200).json({ success: success, respones: "Note added successfully", note: newNote })

        }

    } catch (error) {
        success = false
        console.log(error)
        return res.status(400).json({ success: success, err: "Note not Created" })

    }


})




router.get('/fetchtasks', authuser, async (req, res) => {
    const userID = await req.user.id
    let success = false

    if (!userID) {

        return res.status(400).json({ success: success, err: "Enable To Fetch Notes" })
    }


    const notes = await Note.find({ userid: userID });
    success = true

    return res.status(200).json({ success: success, notes: notes })



})



router.delete('/:id', authuser, async (req, res) => {
    const userID = await req.user.id
    let success = false

    if (!userID) {

        return res.status(400).json({ success: success, err: "User not found" })
    }
    try {
        const id = await req.params.id
        const delete_task = await Note.findByIdAndDelete({ _id: id });
        if (delete_task) {
            success = true
            return res.status(200).json({ success: success, delete_task: delete_task, response: "Task deleted" })

        }

    } catch (error) {
        success = false

        return res.status(400).json({ success: success, response: "Task not deleted" })


    }

})
router.put('/:id', authuser, async (req, res) => {
    const userID = await req.user.id
    let success = false

    if (!userID) {

        return res.status(400).json({ success: success, err: "User not found" })
    }
    try {
        const id = await req.params.id
        const Updatetask = await Note.findByIdAndUpdate(id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                isimportant: req.body.isimportant,

            }

        }, { new: true });
        if (Updatetask) {
            return res.status(400).json({ success: success, updatetask: Updatetask, response: "Task Updated Successfully" })

        }

    } catch (error) {
        success = false

        return res.status(400).json({ success: success, response: "Task not deleted" })

    }
})
module.exports = router;
