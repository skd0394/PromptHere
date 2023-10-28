"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const anotherProfile = ({params}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams=useSearchParams()
    const search=searchParams.get('name');

  const [myPosts, setMyPosts] = useState([]);

//   console.log(search)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);


  return (
    <Profile
      name={search}
      desc={`Welcome to ${search} personalized profile page. Share his exceptional prompts and inspire others with the power of his imagination`}
      data={myPosts}
    />
  );
};

export default anotherProfile;
