import React from 'react';
import {
    Card,
    CardText,
    CardBody
} from 'reactstrap';

const MessageContainer = (props) => {
    return (
        <div>
            <Card>
                <CardBody>
                    <CardText>{props.message.text}</CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default MessageContainer;