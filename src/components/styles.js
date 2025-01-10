import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#FFF9F9",
    // backgroundColor: theme.palette.background.default,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    borderRadius: "5px",
    // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    width: "100%",
    marginRight: "100px",
    // backgroundColor: theme.palette.common.white,
  },
  header: {
    marginBottom: "2rem",
    textAlign: "center",
  },
  logo: {
    // logo styling here (e.g., width, height, margin)
  },
  user: {
    textAlign: "center",
  },
  welcome: {
    marginBottom: "6px",
  },
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginBottom: "1rem",
  },
  email: {
    marginBottom: "1rem",
  },
  logoutButton: {
    backgroundColor: "#7B1984",
    color: "#fff",
    // padding: "1rem 1rem",
    borderRadius: "18px",
    border: "none",
    cursor: "pointer",
    width: "152px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    width: "360px",
  },
  googleButton: {
    padding: "1rem 2rem",
    backgroundColor: "#292929",
    color: "#fff",
    borderRadius: "18px",
    cursor: "pointer",
    cursor: "pointer",
    width: "360px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));
