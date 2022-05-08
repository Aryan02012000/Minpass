//import { useSpring } from "framer-motion";
import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { Marginer } from "../marginer";
import { Nav } from "./Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../homepage/button";
//import { HiddenItem } from "./HiddenItem"
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000;
  min-height: 100vh;
  color: #000;
`;

// const TableContainer = styled.div`
//   width: 95%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

// `;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
`;

const SomeContent = styled.h2`
  color: #fff;
`;

const HomeVault = () => {
  const [users, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      loadUsers();
    } else {
      navigate("/signup");
    }
  }, []);

  const [editUserId, setEditUserId] = useState(null);

  const [info, setinfo] = useState(false);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data);
  };
  const [addFormData, setAddFormData] = useState({
    name: " ",
    username: " ",
    password: " ",
  });

  const [editFormData, setEditFormData] = useState({
    name: " ",
    username: " ",
    password: " ",
  });

  const hanleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      username: addFormData.username,
      password: addFormData.password,
    };

    const newContacts = [...users, newContact];
    setUser(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editUserId,
      name: editFormData.name,
      username: editFormData.username,
      password: editFormData.password,
    };

    const newUsers = [...users];

    const index = users.findIndex((user) => user.id === editUserId);

    newUsers[index] = editedContact;

    setUser(newUsers);
    setEditUserId(null);
  };

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);

    const formValues = {
      name: user.name,
      username: user.username,
      password: user.password,
    };

    setEditFormData(formValues);
  };

  const handleDeleteClick = (userId) => {
    const newUsers = [...users];

    const index = users.findIndex((user) => user.id === userId);

    newUsers.splice(index, 1);

    setUser(newUsers);
  };

  return (
    <AppContainer>
      <Nav />
      <InnerContainer></InnerContainer>
      <SomeContent>Your Passwords</SomeContent>

      <form
        onSubmit={handleEditFormSubmit}
        style={{ width: "95%", display: "flex" }}
      >
        <table className="table table-dark table-striped shadows">
          <thead>
            <tr>
              <th scope="col">Site</th>
              <th scope="col">UserName</th>
              <th scope="col">Password</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <Fragment>
                {editUserId === user.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                  />
                ) : (
                  <ReadOnlyRow
                    user={user}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <Button onClick={() => setinfo(!info)}>Add info</Button>
      <Marginer direction="vertical" margin="2em" />
      <div
        style={{
          transform: info ? "scale(1)" : "scale(0)",
          transition: "all 250ms ease-in-out",
        }}
      >
        <h2 style={{ color: "white" }}>Add Details</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="name"
            style={{ margin: ".3em", fontSize: "1.2em" }}
            required="required"
            placeholder="Enter Site"
            onChange={hanleAddFormChange}
          />
          <input
            type="text"
            name="username"
            style={{ margin: ".3em", fontSize: "1.2em" }}
            required="required"
            placeholder="Enter UserName"
            onChange={hanleAddFormChange}
          />
          <input
            type="password"
            name="password"
            style={{ margin: ".3em", fontSize: "1.2em" }}
            required="required"
            placeholder="Enter Password"
            onChange={hanleAddFormChange}
          />
          <Button style={{ height: "2.3em" }}>Add</Button>
        </form>
      </div>
    </AppContainer>
  );
};

export default HomeVault;
