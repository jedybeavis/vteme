import { users } from "../../share/projectData";
import {Container, ListGroup} from 'react-bootstrap';
import { Component } from "react";

export class Users extends Component {

    render() {
        const listUsers = users.map((item, id) =>{
            return(
                <ListGroup.Item key={id}>{item.name}</ListGroup.Item>
            )
        })
        return (
            <Container fluid className={'pt-3'}>
                <h2>Пользователи</h2>
                <ListGroup>
                    {listUsers}
                </ListGroup>
            </Container>

        );
    }
}
