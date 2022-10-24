// import { Container, Row, Col, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components/Header/Header';
import { Blog } from './components/Blog/Blog';

function App() {
	return (
		<div className="App">
			<Header/>
			<Blog/>
		</div>
	);
}

export default App;
