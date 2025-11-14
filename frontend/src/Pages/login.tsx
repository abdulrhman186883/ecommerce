import { useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "../context/Auth/Authcontext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  
 
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();
  


  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onSubmit = async () => {
    setErrorMessage("");
    setEmailError("");
    setGeneralError("");

   
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  email, password }),
      });

      const token = await response.json();

      if (!response.ok) {
        // handle backend errors
        login(email ?? "", token.data);
        if (response.status === 409) {
          setErrorMessage("User already exists with this email.");
        } else if (token?.message) {
          setErrorMessage(token.message);
        } else {
          setErrorMessage("Something went wrong during login");
        }
        return;
      }


      login(email, token);
      navigate('/');
        

      console.log("loged in:", token);
      alert("Account Loged in successfully!");
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
          login to your Account
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          
          <TextField
            inputRef={emailRef}
            label="Email"
            name="email"
            error={!!emailError || !!errorMessage}
            helperText={emailError || errorMessage}
          />
          <TextField
            inputRef={passwordRef}
            label="Password"
            name="password"
            type="password"
          />

          {generalError && (
            <Typography color="error" variant="body2">
              {generalError}
            </Typography>
          )}

          <Button onClick={onSubmit} variant="contained" color="primary">
            login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
