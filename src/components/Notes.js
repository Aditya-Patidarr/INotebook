import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItem from "./Noteitem"
import { Addnote } from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate= useNavigate();
  const { notes, getallNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getallNotes();
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])


  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

  const handleClick = (e) => {
    console.log("Updating the Note:", note);
    editNote(note.id, note.etitle, note.edescription, note.etag)
    props.showAlert("success","Note Updated Successfully");
    refClose.current.click();
  }
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const ref = useRef(null)
  const refClose = useRef(null)
  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={note.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={note.edescription}
                    className="form-control"
                    name="edescription"
                    id="edescription"
                    onChange={handleChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note.etag}
                    className="form-control"
                    name="etag"
                    id="etag"
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-1">
        {notes.length === 0 && "Nothing to display!!"}
        </div>
        {
          notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          })
        }
      </div>
    </>
  )
}

export default Notes