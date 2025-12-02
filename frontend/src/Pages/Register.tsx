import { useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../context/Auth/Authcontext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onSubmit = async () => {
    setErrorMessage("");
    setEmailError("");
    setGeneralError("");

    const firstName = firstNameRef.current?.value?.trim();
    const lastName = lastNameRef.current?.value?.trim();
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      // 🔥 DEBUG LOGS YOU REQUESTED
      console.log("FULL REGISTER RESPONSE:", data);
      console.log("Token inside data.data ???", data.data);
      console.log("Token inside data.token ???", data.token);

      if (!response.ok) {
        if (response.status === 409) {
          setErrorMessage("User already exists with this email.");
        } else if (data?.message) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("Something went wrong during registration.");
        }
        return;
      }

      // Token is MOST LIKELY inside data.data
      const token = data.data;

      if (!token) {
        setGeneralError("Registration succeeded but token missing from server.");
        return;
      }

      // Log the user in
      login(email, "user", token);

      alert("Account created successfully!");
      navigate("/");

    } catch (error) {
      console.error("Registration error:", error);
      setGeneralError("Server connection error. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Container sx={{ textAlign: "center", maxWidth: 400 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Register New Account
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField inputRef={firstNameRef} label="First Name" />
          <TextField inputRef={lastNameRef} label="Last Name" />

          <TextField
            inputRef={emailRef}
            label="Email"
            error={!!emailError || !!errorMessage}
            helperText={emailError || errorMessage}
          />

          <TextField inputRef={passwordRef} label="Password" type="password" />

          {generalError && (
            <Typography color="error" variant="body2">
              {generalError}
            </Typography>
          )}

          <Button onClick={onSubmit} variant="contained" color="primary">
            Register
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
