import { Component } from "react";
import { PostItem } from "../PostItem/PostItem";
// import { posts } from "../../share/projectData"; // Тут храняться посты локально
import { showGetPosts, showText} from "../../share/projectLogic";
import {Users} from "../Users/Users";
import AddForm from "./component/AddForm";
import axios from "axios"

import {Container, Row, Col, ListGroup, Button, Spinner} from 'react-bootstrap';



export class Blog extends Component {

    constructor(props) {
        super(props);
        this.state ={
            limitPosts: 6,
            morePosts: 2,
            showUsers: false,
            showForm: false,
            // blogArr: JSON.parse(localStorage.getItem('blogPostBvs')) || posts
            blogArr: [],
            blogArrAll: [],

        }
    }
    componentDidUpdate() {
    }

    componentDidMount() {
        this.GetPosts();
        this.allPosts();
    }
    componentWillMount() {
    }
    allPosts = () => {
        axios.get(`https://634fe5de78563c1d82b2e4e2.mockapi.io/posts`)
            .then((response) => {
                this.setState({
                    blogArrAll: response.data
                })
            })
    }

    GetPosts = () => {
        axios.get(`https://634fe5de78563c1d82b2e4e2.mockapi.io/posts?page=1&limit=${this.state.limitPosts}`)
            .then((response) => {
                this.setState({
                    blogArr: response.data
                })
            })
    }
    
    LoadMorePost = (e) => {
        const newlimitPosts = this.state.limitPosts + this.state.morePosts;
        const temp = [...this.state.blogArrAll];
        this.setState({
            limitPosts: newlimitPosts
        }, () => {
            console.log(this.state.blogArr.length)
            console.log(temp.length)
            if (this.state.blogArr.length < temp.length) {
                this.GetPosts()
                console.log('грузим')
            } else {
                console.log('закончилось')
            }
        })
    }

    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            this.LoadMorePost();
            console.log('work')
        } else {
            console.log('Not work')
        }
    }

    // Метод Ставим лайк для поста
    likePosts = (pos) => {
        const temp = [...this.state.blogArr];                           // Перемменая с нашим масивом копируем сылку
        // temp[pos].likeCount++;                                       // Добавляем в масив  +1
        temp[pos].liked = !temp[pos].liked                              // Меняем в нашем скопированом масиве liked
        this.setState({
            blogArr: temp                                               // Меняем масив state на новый
        })
        localStorage.setItem('blogPostBvs', JSON.stringify(temp));      // Заносим масив в локалсторадже под названием blogPostBvs
    }
    // Метод Добавление поста
    AddNewPost = (blogPost) => {
        this.setState((state) => {
            const temp = [...this.state.blogArr];                       // копируем сылку массива
            temp.push(blogPost);                                        // Добавляем в новый масив Новый пост
            localStorage.setItem('blogPostBvs', JSON.stringify(temp));  // Заносим масив в локалсторадже под названием blogPostBvs
            return {
                blogArr: temp,                                          // Заносим новый масив в state масив
            }
        })
    }
    // Метод удаление поста
    DeletePost = (blogpost) => {
        if(window.confirm(`удалить: ${blogpost.title}`)){
            console.log(blogpost);
            axios.delete(`https://634fe5de78563c1d82b2e4e2.mockapi.io/posts/${blogpost.id}`)
                .then(() => {
                    this.GetPosts();
                })
                .catch((err) => {
                    console.log(err)
                })

            // const temp = [...this.state.blogArr];
            // temp.splice(id, 1)
            // this.setState({
            //     blogArr: temp                                            // Меняем масив state на новый
            // })
            // localStorage.setItem('blogPostBvs', JSON.stringify(temp));  // Заносим масив в локалсторадже под названием blogPostBvs
        }
    }
    // Метод Показывание пользователейн поста
    TooglePosts = () => {
        this.setState(state => {
            return{
                showUsers: !state.showUsers
            }
        })
    }
    ToogleForm = () => {
        this.setState(state => {
            return{
                showForm: !state.showForm
            }
        })
    }
    // Вывод страницы
    render() {
        const {showUsers, showForm} = this.state;
        const users = this.state.showUsers ? <Col><ListGroup><Users/></ListGroup></Col> : null;        // Проверка если showUsers = True то выводим пользователей
        const FormAddPost = this.state.showForm ? <AddForm AddNewPost = {this.AddNewPost} blogArr={this.state.blogArr} /> : null;
        const buttonText = showUsers ? 'Скрыть пользователей' : 'Показать пользователей';   // Проверка если showUsers = True то меняем имя кнопки
        const blogPosts = this.state.blogArr.map((item, id) =>{                 // Проходим по масиву blogArr и выводим компонент с поставим
            return(
                <Col className='mb-5'>
                    <PostItem
                        key={item.id}
                        title={(item.title.slice(0,45)) + '...'}
                        description={(item.description.slice(0,200)) + '...'}
                        liked={item.liked}
                        likePost={()=> this.likePosts(item.id)}
                        DeletePost={()=> this.DeletePost(item)}
                    />
                </Col>
            )
        })
        const spinner = <Col className="my-4 text-center"><Spinner animation="border" /></Col>;     // Конструкция спинера
        const loadingPost = (this.state.blogArr.length === 0) ? spinner : blogPosts;
        return(
            <Container fluid >

                <hr/>
                <h2>Посты</h2>
                <Row xs={1} lg={3} gap={3} onScroll={this.handleScroll} style={{overflowY: 'scroll', maxHeight: '450px'}}>
                    {loadingPost}
                </Row>
                <Button className='my-3 d-block' onClick={this.LoadMorePost} variant="dark">Eще</Button>
                {FormAddPost}
                <Button className='mb-5 d-block' onClick={this.ToogleForm} variant="primary">Добавить пост</Button>
                <h2>Пользователи</h2>
                <Row className='mb-3'>
                    {users}
                </Row>
                <Button className='mb-5 d-block' onClick={this.TooglePosts} variant="primary">{buttonText}</Button>
                <Button className='mb-3 d-block' onClick={() => showGetPosts(this.state.blogArr)} variant="info">Показать кол-во постов</Button>

            </Container>
        )
    }
}
