"use client";
import PostCard from "@/components/PostCard";

type Props = {};
function LikesPage({}: Props) {
  return (
    <div className="title">
      <h1>My Like List</h1>
      <div>
        {/* {myLikeList.map((post) => (
          <PostCard key={post._id} post={post} />
        ))} */}
      </div>
    </div>
  );
}

export default LikesPage;
