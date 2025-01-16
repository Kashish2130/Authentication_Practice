import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NextPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //when i am logging in log in is happening but there is a problem in fetching data

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      console.log(localStorage.getItem("token"));
      console.log(token);
      if (!token) {
        setError("Unauthorized");
        navigate("/"); // Redirect to login page
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUsers(response.data);
        } else {
          setError("Failed to fetch users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Unauthorized");
        navigate("/"); // Redirect to login page
      }
    };

    fetchUsers();
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>List of Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id}>
              {user.firstname} {user.lastname} - {user.email}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default NextPage;
