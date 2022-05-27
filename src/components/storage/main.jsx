import "./ds.css";
import ReactMarkdown from "react-markdown";
import { Button } from "../homepage/button";
import cryptoUtils from "../cryptoUtils";
import axios from "axios";
import config from "../../config.json";
import { useEffect, useState } from "react";

function Main({ activeNote, setActiveNote, onUpdateNote, setLoading }) {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("Untitled Note");

  useEffect(() => {
    (async () => {
      if (!activeNote || !activeNote.body) {
        return;
      }

      try {
        const keydata = window.localStorage.getItem("derivedKey");
        const key = await cryptoUtils.importKey(keydata, "raw");

        const decryptedNote = await cryptoUtils.decrypt(
          key,
          Buffer.from(activeNote.body, "base64").toString()
        );

        setTitle(activeNote.title);
        setNote(decryptedNote);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [activeNote]);

  const saveNote = async () => {
    try {
      setLoading(true);
      const keydata = window.localStorage.getItem("derivedKey");
      const key = await cryptoUtils.importKey(keydata, "raw");

      const encryptedNote = Buffer.from(
        await cryptoUtils.encrypt(key, note),
        "utf8"
      ).toString("base64");

      const lastModified = Date.now();

      const res = await axios.post(config.serverAddress + "/add_note", {
        jwt: window.localStorage.getItem("token"),
        noteid: activeNote.id,
        title: title,
        body: encryptedNote,
        timestamp: lastModified,
      });

      if (res.status === 200) {
        // console.log(encryptedNote);

        // console.log(Buffer.from(encryptedNote).toString("base64"));

        onUpdateNote({
          ...activeNote,
          body: encryptedNote,
          title: title,
          lastModified,
        });
        setActiveNote(false);
        setTitle("");
        setNote("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!activeNote)
    return <div className="no-active-note">No note selected</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{title}</h1>
        <ReactMarkdown className="markdown-preview">{note}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Main;
