import CommentItem from "./CommentItem"

export default function CommentList(props) {
    console.log('cccc ',props.comments);
    return <>
        {props.comments.map((comment) => {
            return <CommentItem comment={comment} />
        })}
    </>
}