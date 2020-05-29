import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(2)}px auto`,
        padding: theme.spacing(3),
        color: theme.palette.text.secondary,
    },
}));

function MessageInput() {

    const SEND_MESSAGE = gql`
    mutation SendMessage($text: String!) {
        sendMessage(text: $text) {
        _id
        text
        }
    }`;

    const [sendMessage, { data }] = useMutation(SEND_MESSAGE, {});

    const [value, setValue] = useState(' ');

    const classes = useStyles();

    function handleSubmit(event) {
        sendMessage({ 'variables': { 'text': value } });
        setValue(' ');
    }

    function handleChange(event) {
        setValue(event.target.value);
    }

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container>
                    <Grid item xs={10}>
                        <TextField
                            id="standard-multiline-flexible"
                            multiline
                            fullWidth
                            rowsMax={2}
                            value={value}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton color="primary" onClick={handleSubmit} aria-label="delete" className={classes.margin}>
                            <Send fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
export default MessageInput;