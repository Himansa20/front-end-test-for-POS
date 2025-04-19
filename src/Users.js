import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UserTable";
import { useEffect, useState } from "react";
import Axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get('http://localhost:8080/api/v1/getusers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Axios Error : ", err);
      });
  };

  const addUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
    };

    Axios.post('http://localhost:8080/api/v1/adduser',payload)

      .then(() => {
        console.log("Success!");
        getUsers();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch((err) => {
        console.error("Axios Error : ", err);
      });
  };

  const updateUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
    };

    Axios.put('http://localhost:8080/api/v1/updateuser', payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch((err) => {
        console.error("Axios Error : ", err);
      });
  };

  const deleteUser = (data) => {

    // const payload = {
    //   id: data.id,
    //   name: data.name,
    // };

    Axios.delete(`http://localhost:8080/api/v1/deleteuser/${data.id}`)
      .then(() => {
        getUsers();
      })
      .catch((err) => {
        console.error("Axios Error : ", err);
      });
  };


  return (
    <Box
      sx={{
        width: "calc(100% - 100px)",
        m: "auto",
        mt: "100px",
      }}
    >
      <UserForm 
      addUser={addUser} 
      updateUser= {updateUser}
      submitted={submitted}
      data={selectedUser}
      isEdit = {isEdit}
      />
      <UsersTable
        rows={users}
        selectedUser={(data) => {
          setSelectedUser(data);
          setIsEdit(true);
        }}
        deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
      />
    </Box>
  );
};

export default Users;
