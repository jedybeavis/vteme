import React, { Component } from 'react';
import { photoreviews } from "../../share/photoreviews_poster";
import {Container, Row, Col} from 'react-bootstrap';
import { PhotoreviewItem } from "../../components/PhotoreviewItem/PhotoreviewItem";

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state ={
            phoreviewsArr: photoreviews
        }
    }

    componentWillMount() {
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const Photos = this.state.phoreviewsArr.map((item, id) =>{
            const oldate = 1357848000;
            const newdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(oldate);
            console.log(newdate);
            return(
                <Col className='mb-5'>
                    <PhotoreviewItem
                        key={item.id}
                        title={item.title}
                    />

                </Col>

            )
        })
        return (
            <Container fluid className={'pt-3'}>
                <h2>Фото</h2>
                <Row xs={1} lg={6} gap={3}>
                    {Photos}
                </Row>
            </Container>
        );
    }
}


export default MyComponent;
