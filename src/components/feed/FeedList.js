import FeedItem from "./FeedItem";

export default function FeedList(props) {
    return <>
        {props?.posts.map(post => <FeedItem post={post} />)}
    </>
}