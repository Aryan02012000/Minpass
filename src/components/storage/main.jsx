import "./ds.css";
import ReactMarkdown from "react-markdown";
import { Button } from "../homepage/button";

function Main({ activeNote, onUpdateNote }) {
  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  const saveNote = () => {};

  if (!activeNote)
    return <div className="no-active-note">No note selected</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="text"
            id="title"
            value={activeNote.title}
            onChange={(e) => onEditField("title", e.target.value)}
            autoFocus
            style={{ flexGrow: 1 }}
          />
          <Button style={{ margin: "0 0 1em 1em" }} onClick={saveNote}>
            Save
          </Button>
        </div>
        <textarea
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Main;
