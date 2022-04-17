import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import CommentList from "./CommentList"

const viewCommentStyle = {
    color: 'grey',
    margin: 0
}

export default function Comment(props) {

    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState([])
    const { control, register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const fetchComments = () => {
        const token = localStorage.getItem("auth");
        axios.get(process.env.REACT_APP_BACKEND_API + "post/comment/list/" + props.postId, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setComments(res.data.comments);
        }).catch(err => {
            console.log('Err', err);
        })
    }

    useEffect(() => {
        fetchComments();
    }, [showComments])

    const postComment = (data) => {
        console.log('dddd ',data);
        const token = localStorage.getItem("auth");
        axios.post(process.env.REACT_APP_BACKEND_API + "post/comment/" + props.postId, data, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            // setComments(res.data.comments);
            toast.success('Commented!')
            reset();
            fetchComments();
        }).catch(err => {
            console.log('Err', err);
        })
        
    }

    return <>
        {showComments ?
            <>
                <h6 className="mt-3">Comments</h6>
                <form onSubmit={handleSubmit(postComment)}>
                    <div className="mb-1">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Comment"
                            {...register("comment", { required: true })}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">
                        Comment
                    </button>
                </form>

                <CommentList comments={comments} />
            </>
            :
            <p className="card-text" style={viewCommentStyle} onClick={() => setShowComments(true)} >
                View All {props.commentCount} Comments
            </p>
        }

    </>
}
