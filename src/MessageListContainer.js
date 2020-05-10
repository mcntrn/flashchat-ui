import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
  },
  gridList: {
    width: 500,
    height: 600,
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
    <Paper key={index} className={classes.paper}>
        <GridListTile  cols={1}>
        <Grid container spacing={2}>
            <Grid item>
                <AccountCircleIcon></AccountCircleIcon>
            </Grid>
            <Grid item>
                <Typography>{row.text}</Typography>
            </Grid>
        </Grid>
        </GridListTile>
    </Paper>
    )
  });

  return (
    <div className={classes.root}>
        <GridList cellHeight='auto' className={classes.gridList} cols={1}>
        {rows}
        </GridList>    
    </div>
  );
}

export default MessageListContainer;