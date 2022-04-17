import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateFeed from "../feed/CreateFeed";
import FeedItem from "../feed/FeedItem";
import FeedList from "../feed/FeedList";
import MainLayout from "../layout/MainLayout";


export default function Home(props) {
    const navigate = useNavigate();
    const [posts, setPosts ] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (!token) {
            navigate('/login')
        }
        fetchPost();
    }, [])

    const fetchPost = () => {
        const token = localStorage.getItem("auth");
        axios.get(process.env.REACT_APP_BACKEND_API + "post/list?page=0&limit=10", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setPosts(res.data.posts);
        }).catch(err => {
            console.log('Err', err);
        })
    }

    console.log('ppp',posts);

    return <>
        <MainLayout>
            <div className="container">
                <div className="row justify-content-center">
                    <CreateFeed />
                    <div className="col-md-7">
                        <hr />
                    </div>

                    <FeedList posts={posts} />



                </div>
            </div>
        </MainLayout>
    </>
}