import React, { useEffect } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { useStyles } from "./styles";
import { image } from "../images/image";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, signInWithGoogle, logout } = useFirebase();
  const classes = useStyles();
  const navigate = useNavigate();

   // If user is already logged in, redirect to dashboard
   useEffect(() => {
    if (user) {
      navigate("/taskmanager");
    }
  }, [user, navigate]);

  return (
    <Stack
      className={classes.root}
      direction={"row"}
      justifyContent={"space-between"}
    >
      <Stack className={classes.container}>
        {user ? (
          <div className={classes.user}>
            <h3 className={classes.welcome}>Welcome, {user.displayName}</h3>
            <p className={classes.email}>Email: {user.email}</p>
            <button onClick={logout} className={classes.logoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <div className={classes.loginForm}>
            <Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <img
                  src={image.taskicon}
                  style={{ width: "32px", height: "32px", marginRight: "6px" }}
                />{" "}
                <span
                  style={{
                    color: "#7B1984",
                    fontSize: "26px",
                    fontWeight: 700,
                  }}
                >
                  TaskBuddy
                </span>
              </Stack>
              <Stack>
                <p style={{ fontSize: "12px", fontWeight: 500 }}>
                  Streamline your workflow and track progress effortlessly with
                  our all-in-one task management app.
                </p>
              </Stack>
            </Stack>
            <button onClick={signInWithGoogle} className={classes.googleButton}>
              <img
                src={image.googleLogo}
                style={{ width: "20px", height: "20px", marginRight: "6px" }}
              />{" "}
              Continue with Google
            </button>
          </div>
        )}
      </Stack>
      <Stack style={{ width: "100%" }}>
        <img src={image.taskImageLoginPage} alt="" srcset="" />
      </Stack>
    </Stack>
  );
};

export default Login;
