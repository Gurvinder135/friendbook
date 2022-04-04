import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

export default function Login({ buttonClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const clear = () => {
    setPassword("");
    setUsername("");
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
              setPassword(e.target.value);
            }}
            className="login_input"
            required
            type="password"
            id="outlined-required"
            label="Password"
            value={password}
            placeholder="Password"
          />
        </div>
        <Button
          onClick={(e) => {
            buttonClick(e, username, password);
            clear();
          }}
          className="login_button"
          variant="contained"
        >
          Login
        </Button>
        <hr />
        <Button
          onClick={(e) => {
            buttonClick(e, "gurvinder123", "qwerty");
            clear();
          }}
          className="login_button1"
          variant="contained"
        >
          Test Drive Without Login!
        </Button>
        <hr />
        <Button
          onClick={(e) => {
            buttonClick(e);
            clear();
          }}
          className="register_button"
          variant="contained"
          color="success"
        >
          Create New Account
        </Button>
      </Box>
    </Card>
  );
}
