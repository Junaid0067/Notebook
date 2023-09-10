import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const host = "http://localhost:8080/api"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)
  //Get all notes
  const getallNotes = async () => {
    const response = await fetch(`${host}/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const allNotes = await response.json()
    
    setNotes(allNotes)
  }




  //Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();

    setNotes(notes.concat(note))
  }
  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json()
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
    

  }
  //Edit a note
  const editNote = async (id, title, tag, description) => {

    const response = await fetch(`${host}/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json()

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit a note
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i]
      if (element._id === id) {
        newNotes[i].title = title
        newNotes[i].tag = tag
        newNotes[i].description = description
        break;
      }
    
    }
    setNotes(newNotes);

  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getallNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState