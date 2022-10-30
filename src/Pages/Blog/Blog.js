import { Component } from "react";
import { PostItem } from "../../components/PostItem/PostItem";
import { SpinnerBox } from "../../components/SpinnerBox/SpinnerBox";
// import { posts } from "../../share/projectData"; // Тут храняться посты локально
import { showGetPosts} from "../../share/projectLogic";
// import {Users} from "../Users/Users";
import AddForm from "./component/AddForm";
import axios from "axios"

import {Container, Row, Col, Button} from 'react-bootstrap';



export class Blog extends Component {

    constructor(props) {
        super(props);
        this.state ={
            limitPosts: 6,
            morePosts: 2,
            showForm: false,
            isPendind: false,
            // blogArr: JSON.parse(localStorage.getItem('blogPostBvs')) || posts
            blogArr: [],
            blogArrAll: [],

        }
    }
    componentDidMount() {
        this.GetPosts();
        this.allPosts();
    }
    componentWillMount() {
    }
    allPosts = () => {
        axios.get(`http://localhost:3004/posts`)
            .then((response) => {
                this.setState({
                    blogArrAll: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    GetPosts = () => {
        axios.get(`http://localhost:3004/posts`)
            .then((response) => {
                this.setState({
                    blogArr: response.data,
                    isPendind: false
                })
            })
            .catch((error) => {
                console.log(error)
            })

    }

    LoadMorePost = (e) => {
        const newlimitPosts = this.state.limitPosts + this.state.morePosts;
        const temp = [...this.state.blogArrAll];
        this.setState({
            limitPosts: newlimitPosts,
            isPendind: true

        }, () => {
            if (this.state.blogArr.length < temp.length) {
                this.GetPosts()
            }
        })
    }

    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            this.setState({
                isPendind: true
            })
            this.LoadMorePost();
        }
    }

    // Метод Ставим лайк для поста
    likePosts = (postId) => {
        const temp = {...postId};
        temp.liked = !temp.liked;
        console.log(temp);
        axios.put(`https://634fe5de78563c1d82b2e4e2.mockapi.io/posts/${postId.id}`, temp)
            .then((response) => {
                console.log(postId.id);
                console.log(response.data);
                console.log(temp.liked);
                this.GetPosts()

        })
    }
    // Метод Добавление поста
    AddNewPost = (blogPost) => {
        this.setState({
            isPendind: true
        })
        axios.post('https://634fe5de78563c1d82b2e4e2.mockapi.io/posts/', blogPost)
            .then((response) =>{
                console.log('Посто создаст');
                this.GetPosts()
                this.allPosts()
            })
    }
    // Метод удаление поста
    DeletePost = (blogpost) => {
        this.setState({
            isPendind: true
        })
        if(window.confirm(`удалить: ${blogpost.title}`)){
            axios.delete(`http://localhost:3004/posts/${blogpost.id}`)
                .then(() => {
                    this.GetPosts();
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    // Метод Показывание пользователейн поста
    ToogleForm = () => {
        this.setState(state => {
            return{
                showForm: !state.showForm
            }
        })
    }
    // Вывод страницы
    render() {
        const { showForm} = this.state;   // Проверка если showUsers = True то выводим пользователей
        const FormAddPost = showForm ? <AddForm AddNewPost = {this.AddNewPost} blogArr={this.state.blogArr} /> : null;
        const blogPosts = this.state.blogArr.map((item, id) =>{                 // Проходим по масиву blogArr и выводим компонент с поставим
            return(
                <Col className='mb-5' key={id}>
                    <PostItem
                        title={(item.title.slice(0,45)) + '...'}
                        description={(item.description.slice(0,200)) + '...'}
                        liked={item.liked}
                        likePost={()=> this.likePosts(item)}
                        DeletePost={()=> this.DeletePost(item)}
                    />
                </Col>
            )
        })
        const loadingPost = (this.state.blogArr.length === 0) ? <SpinnerBox /> : blogPosts;
        return(
            <Container fluid className={'pt-3'}>
                <h2>Посты</h2>
                <Row xs={1} lg={3} gap={3}  style={{overflowY: 'scroll', overflowX: 'hidden', maxHeight: '450px', minHeight: '450px', position: 'relative'}}>
                    {loadingPost}
                    { this.state.isPendind && <Col><SpinnerBox /> </Col>}
                </Row>
                <Button className='my-3 d-block' onClick={this.LoadMorePost} variant="dark">Eще</Button>
                <hr/>
                {FormAddPost}
                <Button className='mb-5 d-block' onClick={this.ToogleForm} variant="primary">Добавить пост</Button>


                <Button className='mb-3 d-block' onClick={() => showGetPosts(this.state.blogArr)} variant="info">Показать кол-во постов</Button>

            </Container>
        )
    }
}
