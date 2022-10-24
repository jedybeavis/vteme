import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const PostItem = ({title,description, liked, likePost, DeletePost}) => {
    const showlike = (liked ? "success" : "primary")
    const textLike = (liked ? "DisLike" : "Like")
    return (
        <Card>
            <Card.Header>{title}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {description}
                    </p>
                </blockquote>
                
                <Button onClick={likePost} className="mt-3" variant={showlike}>{textLike}</Button>
                <br />
                <Button onClick={DeletePost} className="mt-3" variant='danger'>Delete</Button>
            </Card.Body>
        </Card>
    );
}