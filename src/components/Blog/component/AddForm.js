import Form from 'react-bootstrap/Form';
import React, { Component } from 'react'

export default class AddForm extends Component {

    state = {
        titleValue:'',
        textValue:''
    }
    postTitleChange = e => {
        this.setState({
            titleValue: e.target.value
        })
    }
    postTextChange = (e) => {
        this.setState({
            textValue: e.target.value
        })
    }
  render() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" onChange={this.postTitleChange} placeholder="name@example.com" value={this.state.titleValue}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" onChange={this.postTextChange} rows={3} value={this.state.textValue}/>
            </Form.Group>
        </Form>
    )
  }
}
