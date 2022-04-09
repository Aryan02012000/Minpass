import React from 'react'
import { Button } from "../homepage/button";

const EditableRow = ({ editFormData, handleEditFormChange }) => {
    return (
        <tr>
            <td>
                <input
                type="text"
                required="required"
                placeholder="Enter site name..."
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
                >
                </input>
            </td>
            <td>
            <input
                type="text"
                required="required"
                placeholder="Enter user name..."
                name="username"
                value={editFormData.username}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
            <input
                type="password"
                required="required"
                placeholder="Enter password..."
                name="password"
                value={editFormData.password}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <Button> Save </Button>
            </td>
        </tr>
    )
}

export default EditableRow
