import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "../../homepage/button";
import "./FileUploader.css";
import { theme } from "../../../theme";
import axios from "axios";
import config from "../../../config.json";

export const FileUpload = ({ files, setFiles, removeFile }) => {
  const [loading, setLoading] = useState(false);

  const uploadHandler = (event) => {
    const file = event.target.files[0];
    file.isUploading = true;
    setLoading(true);

    // const fr = new FileReader();
    // fr.onloadend = function (e) {
    //   setFiles([...files, { name: file.name, content: e.target.result }]);
    // };
    // fr.readAsText(file);

    // setFiles([...files, file]);

    //upload file

    const formData = new FormData();
    formData.append(
      //file.name,
      "imageFile",
      file
    );

    axios
      .post(config.serverAddress + "/add_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setFiles([...files, res.data]);
        } else {
          console.error(res.data);
        }
        file.isUploading = false;
        // setFiles([...files, { name: file.name, content: e.target.result }]);
      })
      .catch((err) => {
        //inform the user
        console.error(err);
        file.isUploading = false;
        removeFile(file.name);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <input
            type="file"
            style={{
              position: "relative",
              textAlign: "right",
              opacity: "0",
              "z-index": "2",
              cursor: "pointer",
              height: "46px",
              "max-width": "200px",
            }}
            onChange={uploadHandler}
          />
          <Button
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              zIndex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.1rem",
              // padding: 1em;
              transition: "background-color 0.4s",
              boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.5)",
            }}
          >
            <i
              style={{
                width: "1.5em",
                height: "1.5em",
                padding: "0.4em",
                backgroundColor: "#fff",
                color: "#aaa",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "0.8em",
                fontSize: "0.8em",
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload
          </Button>
        </div>
        <p className="main">Supports text files</p>
        <p className="info"> TXT, JSON, YAML ...</p>
      </div>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "#0000007f",
            zIndex: 999,
            color: "white",
            fontSize: "4em",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          Uploading
        </div>
      )}
    </>
  );
};
