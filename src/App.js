// import { Container, Row, Col, Card } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Header } from './components/Header/Header';
import { Blog } from './Pages/Blog/Blog';
import Photoreviews from "./Pages/Photoreviews/Photoreviews";
import {Users} from "./Pages/Users/Users";


function App() {
	return (
        <Router>
            <div className="App">
                <Header/>
                <main>
                    <Routes>
                        <Route exact path="/" element={<Blog/>} />
                        <Route path="/photoreviews" element={<Photoreviews/>}/>
                        <Route path="/users" element={<Users/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
	);
}

export default App;
