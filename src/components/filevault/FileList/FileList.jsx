import axios from 'axios'
import React from 'react'
import FileItem from '../FileItem/FileItem'
const FileList = ({files, removeFile}) => {
    
    const deleteFileHandler = (_name) => {
          axios.delete(`http://192.168.1.5:5000/?name=${_name}`)
          .then((res) => removeFile(_name))
          .catch((err) => console.error(err))
        }
  
    return (
    <ul className="fileList">
        {
            files &&
            files.map(f => <FileItem 
                key={f.name}
                file={f}
                deleteFile={deleteFileHandler}
            />)

        }
    </ul>
  )
}

export default FileList