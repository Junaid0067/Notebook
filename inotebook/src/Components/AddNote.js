import NoteContext from '../Context/notes/NoteContext'
import { useContext, React, useState } from 'react'

export default function AddNote(props) {
    const {showAlert} = props
    const context = useContext(NoteContext)
    const { addNote } = context
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", tag: "", description: "" })
        props.showAlert("Note added successfully!","success")
    }
    const [note, setNote] = useState({ title: "", tag: "", description: "" })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div style={{ float: "left", width: "40%" }} className='container mt-5 mx-3 p-3 card shadow'>
            <h2 style={{backgroundColor: "#c5aa6a",height:"45px"}} className="card mt-3 shadow text-center">Add a note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" value={note.title} onChange={onChange} name="title" minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Tag" value={note.tag} onChange={onChange} name="tag" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write the details" value={note.description} name="description" onChange={onChange} minLength={3} required></textarea>
                </div>
                <button disabled={note.title.length<3 || note.description.length<3} onClick={handleClick} className="btn btn-danger">Add Note</button>
            </form>
        </div>
    )
}
