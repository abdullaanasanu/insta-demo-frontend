import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import moment from 'moment'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Comment from './Comment'



TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export default function FeedItem(props) {
    const [liked, setLiked] = useState(props.post.isLiked)
    const [likes, setLikes] = useState(props.post.likes)

    const handleLike = () => {
        const token = localStorage.getItem("auth");
        axios.get(process.env.REACT_APP_BACKEND_API + "post/like/"+props.post._id, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setLiked(true)
            setLikes(likes + 1)
        }).catch(err => {
            console.log('Err', err);
        })
    }

    const handleUnlike = () => {
        const token = localStorage.getItem("auth");
        axios.delete(process.env.REACT_APP_BACKEND_API + "post/like/"+props.post._id, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setLiked(false)
            setLikes(likes - 1)
        }).catch(err => {
            console.log('Err', err);
        })
    }

    return <>
        <div className="col-md-7  card mb-3 " style={{ padding: 0 }}>
            {props.post.contentType === "video" ?
                <video id="video1" className="card-img-top" autoplay>
                    <source src={process.env.REACT_APP_BACKEND_API + "public/images/" + props.post.contentLink} type="video/mp4" />
                    Your browser does not support HTML video.
                </video>
                :
                <img src={process.env.REACT_APP_BACKEND_API + "public/images/" +props.post.contentLink} className="card-img-top" alt="..." />
            }


            
            <div className="card-body pt-2">
                <div className="row text-center" style={{ fontSize: 30 }}>
                    <div className="col-4">
                        <div className="row" >
                            <div className="col-4">
                                {liked ? 
                                    <i className="fa-solid fa-heart text-danger" style={{cursor: "pointer"}} onClick={handleUnlike}></i>
                                :
                                    <i className="fa-regular fa-heart" style={{cursor: "pointer"}} onClick={handleLike}></i>
                                }
                                
                            </div>
                            <div className="col-4">
                                <i className="fa-regular fa-comment"></i>
                            </div>
                            <div className="col-4">
                                <i className="fa-regular fa-paper-plane"></i>
                            </div>
                        </div>



                    </div>
                    <div className="col-8 d-flex justify-content-end">
                        <i className="fa-regular fa-bookmark"></i>
                    </div>
                </div>
                <h6 className="card-title">{likes} Likes</h6>
                <p className="card-text mb-0">
                    <Link to={"/profile/"+props.post.postedBy?._id}><strong className='text-dark'>{props.post.postedBy?.fullName}</strong></Link> {props.post.description}
                </p>
                <Comment commentCount={props.post.comments} postId={props.post._id} />
                <p className="card-text">
                    {/* <small className="text-muted">{timeAgo.format(moment(props.post.postedAt))}</small> */}
                </p>
            </div>
        </div>
    </>
} 