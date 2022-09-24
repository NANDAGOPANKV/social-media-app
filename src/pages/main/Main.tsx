import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/Firebase";
import PostCard from "./PostCard";


export interface PostsData {
  id: string,
  UserId: string,
  description: string,
  title: string,
  userName: string
}

export default function Main() {
  const [postsLists, setPostsLists] = useState<PostsData[] | null>(null);
  // ref fdb
  const postRef = collection(db, "posts");

  // recive data from firebase
  const getPostsData = async () => {
    const data = await getDocs(postRef)
    console.log(data);
    setPostsLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostsData[])
  }

  //useEfect
  useEffect(() => {
    getPostsData()

  }, [])

  return <div>{postsLists?.map((post, index) => <PostCard key={index} post={post} />)}</div>;
}

