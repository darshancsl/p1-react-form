import React, { useEffect, useState } from 'react'
import { Button, Table } from "react-bootstrap";

const Dasboard = () => {

  const [userDetails, setUserDetails] = useState([]);

  const handleDelete = (e) => {
    e.preventDefault();
    const newUsers = userDetails;
    const users = newUsers.filter(user => user.username !== e.target.id);
    setUserDetails(users);
    localStorage.setItem("userDetails", JSON.stringify(users));
  }

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem('userDetails')))
  }, [setUserDetails])

  return (
    <>
      <h1 className="fw-bold text-center py-5">User Details</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>UserName</th>
          <th>Email</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {
          userDetails?.map(({ username, email, tags}) => {
            return (
              <tr key={username}>
                <td>{username}</td>
                <td>{email}</td>
                <td>{tags.map(el => '#'+el + ' ')}</td>
                <td><Button variant="danger" onClick={handleDelete} id={username}>Delete</Button></td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
    </>
  )
}

export default Dasboard