import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

export default function Register({ buttonClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const clear = () => {
    setPassword("");
    setUsername("");
    setLastname("");
    setFirstname("");
  };
  return (
    <Card className="login" sx={{ minWidth: 275 }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="login_input"
            required
            id="outlined-required"
            label="Username"
            value={username}
            placeholder="Username"
          />
        </div>
        <div>
          <TextField
            onChange={(e) => {
              setFirstname(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              );
            }}
            className="login_input"
            required
            type="text"
            id="outlined-required"
            label="Firstname"
            value={firstname}
            placeholder="Firstname"
          />
        </div>
        <div>
          <TextField
            onChange={(e) => {
              setLastname(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              );
            }}
            className="login_input"
            required
            type="text"
            id="outlined-required"
            label="Lastname"
            value={lastname}
            placeholder="Lastname"
          />
        </div>
        <div>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="login_input"
            required
            type="text"
            id="outlined-required"
            label="Password"
            value={password}
            placeholder="Password"
          />
        </div>

        <Button
          onClick={(e) => {
            buttonClick(e, username, password, firstname, lastname);
            clear();
          }}
          className="login_button"
          variant="contained"
          color="success"
        >
          Create New Account
        </Button>
        <hr />
        <Button
          onClick={(e) => {
            buttonClick(e);
            clear();
          }}
          className="register_button"
          variant="contained"
        >
          Login
        </Button>
      </Box>
    </Card>
  );
}
