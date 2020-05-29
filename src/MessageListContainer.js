import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(1),
  },
}));

const MessageListContainer = (props) => {

  const classes = useStyles();
  const { messages, subscribeToNewComments } = props;

  useEffect(() => {
    subscribeToNewComments();
  }, [])

  const rows = messages.map((row, index) => {
    return (
      <Paper elevation={3} className={classes.paper}>
        <Grid container wrap="nowrap" spacing={1}>
          <Grid item>
            <AccountCircleIcon></AccountCircleIcon>
          </Grid>
          <Grid item xs>
            <Typography style={{ wordWrap: "break-word" }}>{row.text}</Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  });

  return (
    <div className={classes.root}>
      {rows}
    </div >
  );
}

export default MessageListContainer;