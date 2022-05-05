import Main from "./main";
import Sidebar from "./sidebar";
import './ds.css'
import { useEffect, useState } from "react";
import uuid from "react-uuid"; 

function Divide() {

    if(!window.localStorage.notes){
        window.localStorage.setItem('notes',JSON.stringify([]))
    }
    const [notes, setNotes]= useState(JSON.parse(localStorage.notes) || []);
    const [activeNote, setActiveNote] = useState(false);

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
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
        if(note.id === activeNote){
            return updatedNote;
        }

        return note;
    });

    setNotes(updatedNoteArray);
};


    const onDeleteNote = (idToDelete) => {
        setNotes(notes.filter((note) => note.id !== idToDelete))
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
    <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
    );
}
   
   export default Divide;