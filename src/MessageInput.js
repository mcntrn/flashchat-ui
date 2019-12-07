import React, { useState } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';
import { gql } from "apollo-boost";
import { useMutation } from '@apollo/react-hooks';

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

    function handleSubmit(event) {
        // console.log('you sent it:' + value);
        sendMessage({ 'variables': { 'text': value } });
        setValue(' ');
    }

    function handleChange(event) {
        setValue(event.target.value);
    }

    return (
        <div>
            <br />
            <InputGroup>
                <Input type="text" value={value} onChange={handleChange} />
                <InputGroupAddon addonType="prepend"><Button onClick={handleSubmit} >Send</Button></InputGroupAddon>
            </InputGroup>
            <br />
        </div>
    );

}
export default MessageInput;