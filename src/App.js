import React from 'react';

import Topbar from './Topbar'
import MessageListContainer from './MessageListContainer';
import MessageInput from './MessageInput'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';



import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

function App() {

    const classes = useStyles();

    const MESSAGES_QUERY = gql`
    query {
        messages {
            id
            text
        }
    }`;

    const MESSAGE_SUBSCRIPTION = gql`
    subscription {
        message {
          id
          text
        }
    }`;

    const { loading, error, data, subscribeToMore } = useQuery(MESSAGES_QUERY);

    //TODO: make loading more elegant
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
        <Topbar/>
        <Grid container>
        {/* <Grid container item xs={12}>
            <Topbar/>
        </Grid> */}
        <Grid container item xs={12}>
            <MessageListContainer messages={data.messages}
                    subscribeToNewComments={() =>
                        subscribeToMore({
                            document: MESSAGE_SUBSCRIPTION,
                            variables: {},
                            updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) return prev;
                                const newMessage = subscriptionData.data.message;

                                return Object.assign({}, prev, {
                                    messages: prev.messages.concat(newMessage)
                                });
                            }
                        })
                    }
                />
        </Grid>
        <Grid container item xs={12}>
            <MessageInput />
        </Grid>
      </Grid>
      </div>
      
    )
}

export default App;