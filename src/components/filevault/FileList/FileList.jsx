import axios from "axios";
import React from "react";
import FileItem from "../FileItem/FileItem";
const FileList = ({ files, removeFile }) => {
  return (
    <ul className="fileList">
      {files &&
        files.map((f) => (
          <FileItem
            key={f.name}
            file={f}
            content={f.content}
            // deleteFile={deleteFileHandler}
          />
        ))}
    </ul>
  );
};

export default FileList;
