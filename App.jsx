import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.log(err));
  }, []);

  const addNote = () => {
    axios.post("http://localhost:5000/api/notes", { title, content })
      .then(res => setNotes([...notes, res.data]));
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
      .then(() => setNotes(notes.filter(note => note._id !== id)));
  };

  return (
    <div>
      <h1>Notes App</h1>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={addNote}>Add Note</button>
      {notes.map(note => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
