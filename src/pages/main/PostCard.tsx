import React, { useState, useEffect } from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/Firebase';
import { PostsData } from './Main'


interface interfacePosts {
    post: PostsData
}

interface Linkes {
    likeId: string,
    userId: string,
}

export default function PostCard(props: interfacePosts) {
    const [likes, setLikes] = useState<Linkes[] | null>(null)
    const { post } = props
    const [user] = useAuthState(auth)

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id))

    // show likes 
    const handleLikeAmout = async () => {
        const data = await getDocs(likesDoc)
        console.log('likes');
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
        console.log(data.docs.length);
    }

    // Add Likes function
    const handleAddLikes = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id })
            if (user) {
                setLikes((prev) => prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }])
            }
        } catch (error) {
            console.log(error);

        }
    }

    // Remove Likes function
    const handleRemoveLikes = async () => {
        try {
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid))
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, 'likes', likeId)
            await deleteDoc(likeToDelete)

            if (user) {
                setLikes((prev) => prev && prev?.filter((liked) => liked.likeId !== likeId))
            }
        } catch (error) {
            console.log(error);

        }
    }

    //has user Likes
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        handleLikeAmout()
    }, [])


    return (
        <div>
            <div className="title">
                <h2>{post?.title}</h2>
            </div>
            <div className="body">
                <p>{post?.description}</p>
            </div>
            <div className="footer">
                <p>@{post?.userName}</p>
                <button onClick={hasUserLiked ? handleRemoveLikes : handleAddLikes} >{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
                {likes && <p>likes: {likes.length}</p>}
                <br /><br />
            </div>
        </div>
    )
}

