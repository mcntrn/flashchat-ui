import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';


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
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

function MessageInput() {

    const SEND_MESSAGE = gql`
    mutation SendMessage($text: String!) {
        sendMessage(text: $text) {
        id
        text
        }
    }`;

    const [sendMessage, { data }] = useMutation(SEND_MESSAGE, {});

    const [value, setValue] = useState(' ');

    const classes = useStyles();

    function handleSubmit(event) {
        // console.log('you sent it:' + value);
        sendMessage({ 'variables': { 'text': value } });
        setValue(' ');
    }

    function handleChange(event) {
        setValue(event.target.value);
    }

    return (
        <div className={classes.root}>
        <Grid container 
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center">
          <Grid item xs={12}>
            <TextField
                id="standard-multiline-flexible"
                label="Message"
                multiline
                rowsMax={8}
                value={value}
                onChange={handleChange}
            />
            <IconButton color="primary" onClick={handleSubmit}  aria-label="delete" className={classes.margin}>
                <Send fontSize="small" />
            </IconButton>
          </Grid>

        </Grid>
      </div>
    );
}
export default MessageInput;