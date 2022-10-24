import { users } from "../../share/projectData";
import ListGroup from 'react-bootstrap/ListGroup';

export const Users = () => {

    const listUsers = users.map((item) =>{
        return(
            <ListGroup.Item>Cras justo odio
                {item.name}
            </ListGroup.Item>
        )
    })
    return (
        <>
            {listUsers}
        </>
    )
}