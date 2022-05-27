import React from 'react'
import { Button } from "../homepage/button";
import { HiddenItem } from "./HiddenItem"
const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td><HiddenItem password={user.password}></HiddenItem></td>
       <td>
       <Button style={{margin:".3em"}} onClick={(event) => handleEditClick(event, user)}>Edit</Button>
       {/* <Button onClick={() => handleDeleteClick(user.id)}>Delete</Button> */}
       </td>
      </tr>
        );
};
export default ReadOnlyRow
