import { Link } from "react-router-dom";

export default function CommentItem(props) {
    return <>
        <p className="my-0"><Link to={"/profile/"+props.comment.commentedBy._id}><strong className="text-dark">{props.comment.commentedBy.fullName}</strong></Link> {props.comment.comment}</p>
    </>
}