import Main from "./main";
import Sidebar from "./sidebar";
import "./ds.css";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import axios from "axios";
import config from "../../config.json";

function Divide() {
  // if (!window.localStorage.notes) {
  //   window.localStorage.setItem("notes", JSON.stringify([]));
  // }
  //   const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    // localStorage.setItem("notes", JSON.stringify(notes));
    (async () => {
      try {
        const res = await axios.post(config.serverAddress + "/all_notes", {
          jwt: window.localStorage.getItem("token"),
        });

        setNotes(
          res.data.map((n) => ({
            id: n.id,
            title: n.title,
            body: n.body,
            lastModified: n.lastModified,
          }))
        );
      } catch (e) {
        console.log(e);
      }
    })();
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNoteArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNoteArray);
    // console.log(updatedNote);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="rowC">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main
        activeNote={getActiveNote()}
        setActiveNote={setActiveNote}
        onUpdateNote={onUpdateNote}
      />
    </div>
  );
}

export default Divide;
