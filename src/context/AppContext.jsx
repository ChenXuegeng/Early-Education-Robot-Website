import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 'u1',
    name: '乐乐小朋友',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    points: 120,
    officialPoints: 50, // For community rewards
    familyPoints: 70,   // For family rewards
    bio: '我喜欢编程和帮妈妈做家务！',
    postsCount: 5,
  });

  const [users] = useState([
    { id: 'u2', name: '小明', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
    { id: 'u3', name: '花花', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jude' },
  ]);

  const [posts, setPosts] = useState([
    {
      id: 'p1',
      authorId: 'u2',
      authorName: '小明',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      content: '今天我的机器人学会了扫地！太棒了！',
      image: null,
      likes: 5,
      likedBy: [],
      timestamp: '2小时前'
    },
    {
      id: 'p2',
      authorId: 'u1',
      authorName: '乐乐小朋友',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      content: '分享我设计的“迷宫清扫”路线，大家快来挑战！',
      image: 'https://placehold.co/600x400/orange/white?text=Maze+Map',
      likes: 12,
      likedBy: ['u2', 'u3'],
      timestamp: '5小时前'
    }
  ]);

  const addPost = (content, image) => {
    const newPost = {
      id: Date.now().toString(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content,
      image,
      likes: 0,
      likedBy: [],
      timestamp: '刚刚'
    };
    setPosts([newPost, ...posts]);
    setCurrentUser(prev => ({ ...prev, postsCount: prev.postsCount + 1 }));
  };

  const likePost = (postId) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        // Check if already liked by current user
        if (post.likedBy.includes(currentUser.id)) {
          return post; // Already liked
        }

        // Increment likes
        const updatedPost = {
          ...post,
          likes: post.likes + 1,
          likedBy: [...post.likedBy, currentUser.id]
        };

        // Award points to the author
        if (post.authorId === currentUser.id) {
          // If I like my own post, maybe no points? Or yes? Usually no.
          // Let's assume self-like doesn't give points or is allowed but logic is "others like me".
          // But for simplicity, let's just add points to author if author is NOT current user.
          // Wait, if I like SOMEONE ELSE'S post, THEY get points.
          // If SOMEONE ELSE likes MY post, I get points.
          // Since this is a single-user demo, I can only simulate "I like others".
          // To simulate "Others like me", I might need a "Simulate Like" button or just assume it happens.
          // However, the requirement says: "别人点赞我，我才获得积分".
          // So if I like 'p1' (Small Ming), Small Ming gets points.
          // If I want to see MY points increase, I need others to like MY post.
          // I will add a "Simulate Like on My Post" button in the UI for testing purposes, 
          // or just make the "Like" button toggle for demo purposes and maybe have a "Cheat" button to add likes to my posts.
        } else {
           // I am liking someone else's post. They should get points.
           // We don't track other users' points in detail in this simple state, but we could.
        }
        
        return updatedPost;
      }
      return post;
    }));
  };

  // Helper to simulate someone liking MY post (to show points increase)
  const simulateLikeOnMyPost = () => {
    // Find a post by me
    const myPosts = posts.filter(p => p.authorId === currentUser.id);
    if (myPosts.length > 0) {
      const randomPost = myPosts[0];
      setPosts(prev => prev.map(p => {
        if (p.id === randomPost.id) {
          return { ...p, likes: p.likes + 1 };
        }
        return p;
      }));
      // Add points to current user
      setCurrentUser(prev => ({
        ...prev,
        points: prev.points + 10,
        officialPoints: prev.officialPoints + 10
      }));
      alert(`有人点赞了你的帖子！积分 +10`);
    }
  };

  return (
    <AppContext.Provider value={{ currentUser, users, posts, addPost, likePost, simulateLikeOnMyPost }}>
      {children}
    </AppContext.Provider>
  );
};
