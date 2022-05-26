import React from "react";
import "./FileItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faSpinner,
  // faTrash,
} from "@fortawesome/free-solid-svg-icons";
const FileItem = ({ file, content }) => {
  const blobData = new Blob([atob(content)], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blobData);

  return (
    <li
      style={{
        listStyle: "none",
        margin: "1.2em 8.9em",
        backgroundColor: "#bbb",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        padding: "1.2em 1.5em",
      }}
      className="list=item"
      key={file.name}
    >
      <FontAwesomeIcon
        icon={faFileAlt}
        style={{
          "font-size": "1.2em",
          marginRight: "0.8em",
        }}
      />
      <a
        style={{
          "font-size": "1rem",
          flex: "1",
          "text-decoration": "none",
          cursor: "pointer",
        }}
        href={url}
        download={file.name}
      >
        {file.name}
      </a>
      <div className="actions">
        {file.isUploading && (
          <FontAwesomeIcon icon={faSpinner} className="fa-spiner" />
        )}
        {/* {!file.isUploading &&
          <FontAwesomeIcon
            icon={faTrash} style={{
              "font-size": "1.2em",
              "margin-right": "0.8em"
            }}
            onClick={() => deleteFile(file.name)} />
        } */}
      </div>
    </li>
  );
};

export default FileItem;
