import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPosts = (API_URL: string) => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}api/posts`);
      setPostList(res.data.posts);
    } catch (err) {
      setError(err as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [API_URL]);

  return { postList, setPostList, loading, error, fetchPosts };
};

export default useFetchPosts;
