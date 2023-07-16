import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [
    {
      "_id": "64913024d548b65fce995ffeb",
      "user": "6492a20089b7fbc4777af3c5",
      "title": "My Title",
      "description": "Adding this note here",
      "tag": "General",
      "date": "2023-06-21T13:59:41.514Z",
      "__v": 0
    },
    {
      "_id": "649302ab8d213d0fc74e4ce5",
      "user": "6492a20089b7fbc4777af3c5",
      "title": "My Title",
      "description": "Adding this note here",
      "tag": "personal",
      "date": "2023-06-21T14:01:15.785Z",
      "__v": 0
    },
    {
      "_id": "6493024d548b65f2ce995ffeb",
      "user": "6492a20089b7fbc4777af3c5",
      "title": "My Title",
      "description": "Adding this note here",
      "tag": "General",
      "date": "2023-06-21T13:59:41.514Z",
      "__v": 0
    },
    {
      "_id": "6439302ab8d213d0fc74e4ce5",
      "user": "6492a20089b7fbc4777af3c5",
      "title": "My Title",
      "description": "Adding this note here",
      "tag": "personal",
      "date": "2023-06-21T14:01:15.785Z",
      "__v": 0
    },
    {
      "_id": "6493024d548b65fce995ff5eb",
      "user": "6492a20089b7fbc4777af3c5",
      "title": "My Title",
      "description": "Adding this note here",
      "tag": "General",
      "date": "2023-06-21T13:59:41.514Z",
      "__v": 0
    },
    {
      "_id": "649302ab8d213d0fc764e4ce5",
      "user": "6492a20089b7fbc4777af3c5",
      "title": "My Title",
      "description": "Adding this note here",
      "tag": "personal",
      "date": "2023-06-21T14:01:15.785Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(initialNotes)
  
  const getallNotes = async()=>{
      try {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "authToken": localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        setNotes(json);
      }
      catch (error) {
        console.log(error.message);
      }
  }
  
  const addNote = async (title, description, tag) => {
    // TODO : API CALLS 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);
    await getallNotes();

    // Client Side
    // const note = {
    //   "_id": "649302ab8d213d0fc764e4ce5",
    //   "user": "6492a20089b7fbc4777af3c5",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-06-21T14:01:15.785Z",
    //   "__v": 0
    // }
    // setNotes(notes.concat(note));
  }
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const json = await response.json();
    console.log("Deleting the note : ",json);
    await getallNotes();
  }
  const editNote = async (id, title, description, tag) => {
    // API CALLS
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json); 
    await getallNotes();
    // Client Side updation
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title;
    //     element.description = description;
    //     element.tag = tag;
    //   }
    // }
  }
  return (
    <NoteContext.Provider value={{ notes, getallNotes,addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;