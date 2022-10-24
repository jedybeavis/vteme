import "./blog.css";
import { Component } from "react";
import { PostItem } from "../PostItem/PostItem";
import { posts } from "../../share/projectData";
import { showGetPosts, showText} from "../../share/projectLogic";
import {Users} from "../Users/Users";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import AddForm from "./component/AddForm";



export class Blog extends Component {
    state = {
        showUsers: true,
        blogArr: JSON.parse(localStorage.getItem('blogPostBvs')) || posts // Тут масив который в локал сторадж заходит или который в share/projectData
    }

    likePosts = (pos) => {
        const temp = [...this.state.blogArr]; // Перемменая с нашим масивом копируем сылку
        // temp[pos].likeCount++; // Добавляем в масив  +1
        temp[pos].liked = !temp[pos].liked // Меняем в нашем скопированом масиве
        this.setState({
            blogArr: temp // Меняем масив state на новый
        })
        localStorage.setItem('blogPostBvs', JSON.stringify(temp)); // Заносим масив в локалсторадже под названием blogPostBvs
    }

    DeletePost = pos => {
        if(window.confirm('Вы уверены')){
            const temp = [...this.state.blogArr];
            temp.splice(pos, 1)
            this.setState({
                blogArr: temp // Меняем масив state на новый
            })
            localStorage.setItem('blogPostBvs', JSON.stringify(temp)); // Заносим масив в локалсторадже под названием blogPostBvs
        }
        
    }

    TooglePosts = () => {
        this.setState(state => {
            return{
                showUsers: !state.showUsers
            }
        })
    }
    render() {
        const {showUsers} = this.state;
        const users = showUsers ? <Col><ListGroup><Users/></ListGroup></Col> : null;
        const buttonText = showUsers ? 'Скрыть пользователей' : 'Показать пользователей';
        const blogPosts = this.state.blogArr.map((item, pos) =>{
            return(
                <Col className='mb-5'>
                    <PostItem 
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        liked={item.liked}
                        likePost={()=> this.likePosts(pos)}
                        DeletePost={()=> this.DeletePost(pos)}
                    />
                </Col>
            )
        })

        return(
            <Container fluid>
                <h2>Добавить пост</h2>
                <AddForm />
                <hr></hr>
                <h2>Посты</h2>
                <Row xs={1} lg={2} gap={3}>
                    {blogPosts}
                </Row>
                <Button className='mb-5 d-block' variant="primary">Создать пост</Button>
                
                
                
                <h2>Пользователи</h2>
                <Row className='mb-3'>
                    {users}
                </Row>
                <Button className='mb-5 d-block' onClick={this.TooglePosts} variant="primary">{buttonText}</Button>
                <Button className='mb-3 d-block' onClick={() => showGetPosts(posts)} variant="info">Показать кол-во постов</Button>
                <Button className='mb-3 d-block' onClick={() => showText('hello')} variant="dark">Показать привет</Button>
            </Container>
        )
    }
}
