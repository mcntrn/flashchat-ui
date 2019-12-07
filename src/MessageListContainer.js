import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MessageContainer from './MessageContainer'

class MessageListContainer extends Component {
    render() {
        const { messages } = this.props;

        const rows = messages.map((row, index) => {
            return (
                <Row key={index}>
                    <Col sm={{ size: 'auto', offset: this.getAlignment(row) }}><MessageContainer message={row} /></Col>
                </Row>)
        });
        return (
            <Container>
                {rows}
            </Container>
        );
    }

    componentDidMount() {
        this.props.subscribeToNewComments();
    }

    getAlignment(message) {
        if (message.me) {
            return 8;
        }
        return 0;
    }
}


export default MessageListContainer;