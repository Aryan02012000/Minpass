import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button } from '../../homepage/button'
import './FileUploader.css'
import { theme } from '../../../theme'
import axios from 'axios'
export const FileUpload = ({files, setFiles, removeFile}) => {
    const uploadHandler = (event) => {
    const file = event.target.files[0];
    file.isUploading = true;
    setFiles([...files, file])

    //upload file

    const formData = new FormData();
    formData.append(
        //file.name,
        "imageFile",
        file,
        
    )
    axios.post('http://192.168.1.5:5000/upload', formData, {headers: {"Content-Type":"multipart/form-data"}})
    .then((res) =>{
        file.isUploading = false;
        setFiles([...files, file])
    }
    )
   .catch((err) => {
        //inform the user
        console.error(err)
        removeFile(file.name)
   })
    }
  return (
    <>
    <div className='file-card'>
        <div className="file-inputs">
        <input type="file" 
        style={{
            "position": "relative",
            "text-align": "right",
            "opacity": "0",
            "z-index": "2",
            "cursor": "pointer",
            "height": "46px",
            "max-width": "200px",
        }}
        onChange={uploadHandler}
        />
        <Button style={{
            "position": "absolute",
            "top": "0px",
            "left": "0px",
            "width": "100%",
            "height": "100%",
            "z-index": "1",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "font-size": "1.1rem",
            // padding: 1em;
            "transition": "background-color 0.4s",
            "box-shadow": "0px 8px 24px rgba(149, 157, 165, 0.5)",
        }}>
            <i style={{
                 "width": "1.5em",
                 "height": "1.5em",
                 "padding": "0.4em",
                 "background-color": "#fff",
                 "color": "#aaa",
                 "border-radius": "50%",
                 "display": "flex",
                 "justify-content": "center",
                 "align-items": "center",
                 "margin-right": "0.8em",
                 "font-size": "0.8em",
            }}>
                <FontAwesomeIcon icon= {faPlus} />

            </i>
            Upload
        </Button>
        </div>
        <p className='main'> Support files</p>
        <p className='info'> PDF, JPG, PNG</p> 
    </div>
 
    </>
  )
}
