import Form from 'react-bootstrap/Form';
import React, { Component } from 'react'

export default class AddForm extends Component {

    state = {
        titleValue:'',
        textValue:''
    }
    postTitleChange = (e) => {
        this.setState({
            titleValue: e.target.value
        })
    }
    postTextChange = (e) => {
        this.setState({
            textValue: e.target.value
        })
    }

    CreatePost = (e) =>{
        e.preventDefault();
        const post = {
            title: this.state.titleValue,
            description: this.state.textValue,
            liked: false
        }
        this.props.AddNewPost(post);
    }
  render() {
    return (
        <Form onSubmit={this.CreatePost}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" onChange={this.postTitleChange} placeholder="name@example.com" value={this.state.titleValue}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" onChange={this.postTextChange} rows={3} value={this.state.textValue}/>
            </Form.Group>
            <button onClick={this.CreatePost}>12312321</button>
        </Form>
    )
  }
}
