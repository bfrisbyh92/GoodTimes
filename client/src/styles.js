import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  [theme.breakpoints.down("xs")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
  // On a small screen I need the form to be at the top of the screen
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(17,81,130,1)",
    fontSize: "8vw",
  },
  image: {
    marginLeft: "15px",
  },
}));
