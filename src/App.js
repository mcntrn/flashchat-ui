import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Topbar from './Topbar'
import MessageListContainer from './MessageListContainer';
import MessageInput from './MessageInput'



import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

function App() {

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
            <Topbar />
            <Container>
                <Row>
                    <Col sm="12">
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
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <MessageInput />
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default App;