import Card from 'react-bootstrap/Card';

export const PhotoreviewItem = ({title,description}) => {
    return (
        <Card>
            <Card.Header>{title}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {description}
                    </p>
                </blockquote>
            </Card.Body>
        </Card>
    );
}
