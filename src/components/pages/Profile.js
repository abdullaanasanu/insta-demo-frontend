import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";


export default function Profile(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState()
    const params = useParams();

    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (!token) {
            navigate('/login')
        }
        fetchProfile();
    }, [])

    const fetchProfile = () => {
        const token = localStorage.getItem("auth");
        if (params.id) {
            axios.get(process.env.REACT_APP_BACKEND_API + "profile/"+params.id, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(res => {
                setProfile(res.data);
            }).catch(err => {
                console.log('Err', err);
            })
        }else{
            axios.get(process.env.REACT_APP_BACKEND_API + "profile/get-profile", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(res => {
                setProfile(res.data);
            }).catch(err => {
                console.log('Err', err);
            })
        }
        
    }

    const handleFollow = () => {
        const token = localStorage.getItem("auth");
        axios.post(process.env.REACT_APP_BACKEND_API + "profile/follow",{
            followingTo: params.id
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            toast.success("Following");
            fetchProfile();
        }).catch(err => {
            console.log('Err', err);
        })
    }

    console.log('proo ', params);

    return <>
        <MainLayout>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-3">
                        <img src="https://cdn.pixabay.com/photo/2018/11/08/23/52/man-3803551_960_720.jpg" style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "150px" }} />
                    </div>
                    <div className="col-9">
                        <h4>{profile?.user.fullName}</h4>
                        <h5>@{profile?.user.username}</h5>
                        <div className="row text-center mt-3">
                            <div className="col-4">
                                <h6>Posts</h6>
                                <h4>{profile?.posts.length}</h4>
                            </div>
                            <div className="col-4">
                                <h6>Followers</h6>
                                <h4>{profile?.followers}</h4>
                            </div>
                            <div className="col-4">
                                <h6>Following</h6>
                                <h4>{profile?.followering}</h4>
                            </div>
                        </div>
                    </div>


                </div>
                {location.pathname !== "/profile" &&
                    <div className="row">
                        <div className="col-4 mt-4 text-center">
                            {profile?.isFollowing ? 
                                <button type="button" className="btn btn-primary" disabled>Followed</button>
                            :
                                <button type="button" className="btn btn-primary" onClick={handleFollow}>Follow</button>
                            }
                            
                            
                        </div>

                    </div>
                }

                <hr />
                <div className="row mt-5">
                    {profile?.posts.map(post => {
                        return post.contentType === "video" ?
                            <div className="col-4 p-0">
                                <video id="video1" className="card-img-top" autoplay>
                                    <source src={process.env.REACT_APP_BACKEND_API + "public/images/" + post.contentLink} type="video/mp4" />
                                    Your browser does not support HTML video.
                                </video>
                            </div>
                            :
                            <div className="col-4 p-0">
                                <img src={process.env.REACT_APP_BACKEND_API + "public/images/" + post.contentLink} width={"100%"} height={"200px"} style={{ objectFit: "cover" }} />
                            </div>

                    })}

                </div>
            </div>
        </MainLayout>
    </>
}