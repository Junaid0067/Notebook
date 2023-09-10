import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';

export default function NoteItem(props) {
    const { note,updateNote } = props;
    const context = useContext(NoteContext)
    const {deleteNote} = context
    return (
        <div className='col-md-10'>

            <div className="card text-center text-bg-light my-3 shadow">
                <div className="card-header">
                    <span style={{ float: "left" }}>{note.title}</span>
                    <i style={{ float: "right" }} className="mt-1 fa-solid fa-trash-can mx-2 float-right" onClick={()=>{deleteNote(note._id);props.showAlert("Note deleted successfully!","success")}}></i>
                    <i style={{ float: "right" }} className="mt-1 fa-solid fa-file-pen mx-2 float-right" onClick={()=>{updateNote(note)}}></i>
                </div>
                <div className="card-body">
                    <p className="card-text">{note.description}</p>
                </div>
                <div className="card-footer text-muted">
                    {new Date(note.date).toLocaleString()}
                </div>
            </div>
        </div>
    )
}
