
import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import NoteContext from '../Context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
    const context = useContext(NoteContext)
    const { notes, getallNotes, editNote } = context
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
        getallNotes()
    }else{
        navigate("/login")
    }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", etag: "", edescription: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description })
        
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.etag, note.edescription)
        refClose.current.click()
        props.showAlert("Note updated successfully!","success")
        

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" onChange={onChange} value={note.etitle} name="etitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Tag" onChange={onChange} value={note.etag} name="etag" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write the details" name="edescription" value={note.edescription} onChange={onChange} ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-danger">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
                <div className='row'>
                    <h2 className='mt-4'>Your Notes</h2>
                    {notes.length ===0&& <div className='card shadow p-2 w-50 mx-3' style={{backgroundColor: "#c5aa6a"}}>
                    No notes to display
                    </div>}
                    {notes.map((note) => {
                        return <NoteItem showAlert = {props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
        </>
    )
}
