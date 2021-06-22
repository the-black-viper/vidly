import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const GenreFilter = ({ onChange, genres }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem key="all" button onClick={() => onChange("all")}>
          <ListItemText primary={"All Movies"} />
        </ListItem>
        {genres.map((genre) => (
          <ListItem key={genre} button onClick={() => onChange(genre)}>
            <ListItemText primary={genre} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default GenreFilter;
