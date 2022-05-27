import React, { useEffect, useState } from "react";
import { Button } from "../homepage/button";
import cryptoUtils from "../cryptoUtils";

const EditableRow = ({ editFormData, handleEditFormChange }) => {
  // const [name, setName] = useState(editFormData.name);
  const [username, setUsername] = useState(editFormData.username);
  const [password, setPassword] = useState(editFormData.password);

  useEffect(() => {
    (async () => {
      try {
        const keydata = window.localStorage.getItem("derivedKey");
        const key = await cryptoUtils.importKey(keydata, "raw");

        const decryptedPass = await cryptoUtils.decrypt(
          key,
          editFormData.password
        );

        setPassword(decryptedPass);
      } catch (err) {
        console.log(err);
      }
    })();
    // }, [editFormData.password]);
  }, []);

  const handleSubmit = async () => {
    try {
      const keydata = window.localStorage.getItem("derivedKey");
      const key = await cryptoUtils.importKey(keydata, "raw");

      const encryptedPass = await cryptoUtils.encrypt(key, password);

      handleEditFormChange({
        name: editFormData.name,
        username,
        password: encryptedPass,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter site name..."
          readOnly={true}
          name="name"
          value={editFormData.name}
          //   onChange={(e) => setName(e.target.value)}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter user name..."
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter password..."
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </td>
      <td>
        <Button onClick={handleSubmit}> Save </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
