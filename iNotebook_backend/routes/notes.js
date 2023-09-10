const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Route1:Get all notes: GET "/api/auth/fetchallnotes": Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured")
    }
})

//Route2: Add a new note: POST "/api/auth/addnote": Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 3 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured")
    }
})
//Route3: Add a new note: POST "/api/auth/updatenote": Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.send({ note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured")
    }
    //create newNote object

})
//Route4: Delete a new note: Delete "/api/notes/deletenote": Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //Find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.send({ "Success": "Successfully Deleted", note: note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured")
    }
})

module.exports = router