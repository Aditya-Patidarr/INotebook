import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

export const Addnote = (props) => {
  const context = useContext(noteContext);
  const {addNote} = context ;
  const [note, setNote] = useState({title:"",description:"",tag:""})
  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    props.showAlert("success","Note Added Successfully")
    setNote({title:"",description:"",tag:""});
  }
  const handleChange = (e)=>{
    setNote({...note,[e.target.name] : e.target.value})
  }

  return (
    <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={note.title}
              name="title"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              value={note.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              value={note.tag}
              name="tag"
              id="tag"
              onChange={handleChange}
            />
          </div>
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
  )
}
