import { Link } from "react-router-dom"

const NotFoundPage = () => {
    return (
        <div>
            <h2>404 - Not found Page</h2>
            <Link to={'/'}>Home Page</Link>
        </div>
    )
}

export default NotFoundPage;