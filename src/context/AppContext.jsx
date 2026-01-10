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
    { id: 'u4', name: '阿豪', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahao' },
    { id: 'u5', name: '小宝', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Xiaobao' },
    { id: 'u6', name: '泽神', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zesheng' },
    { id: 'u7', name: '噜噜', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lulu' },
    {id: 'u8', name: '钉钉', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LeleMom' },
    {id: 'u9', name: '阿柳', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aliu' },

  ]);

  const [posts, setPosts] = useState([
    {
      id: 'p1',
      authorId: 'u2',
      authorName: '小明',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      content: '今天我的机器人学会了扫地！太棒了！',
      media: null,
      taskId: null,
      likes: 5,
      likedBy: [],
      timestamp: '2小时前'
    },
    {
      id: 'p2',
      authorId: 'u1',
      authorName: '乐乐小朋友',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      content: '分享我设计的"迷宫清扫"路线，大家快来挑战！🤖✨\n\n这是一个适合初学者的路线规划，机器人会按照优化的路径清扫整个迷宫区域。',
      media: null,
      taskId: null,
      likes: 12,
      likedBy: ['u2', 'u3'],
      timestamp: '5小时前'
    }
  ]);

  // Task-specific video comments (for challenges)
  const [taskComments, setTaskComments] = useState([
    {
      id: 'c1',
      taskId: 't1',
      authorId: 'u2',
      authorName: '小明',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      content: '我用了A*算法，效果很不错！',
      video: null,
      likes: 3,
      likedBy: [],
      timestamp: '1小时前'
    },
    {
      id: 'c2',
      taskId: 't2',
      authorId: 'u3',
      authorName: '花花',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jude',
      content: '我设计的搬运流程用了状态机，很稳定！',
      video: null,
      likes: 2,
      likedBy: [],
      timestamp: '30分钟前'
    },
    {
      id: 'c3',
      taskId: 't3',
      authorId: 'u2',
      authorName: '小明',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      content: '超声波传感器搭配PID控制真的很有效！',
      video: null,
      likes: 1,
      likedBy: [],
      timestamp: '15分钟前'
    }
  ]);

  const addPost = (content, media, taskId = null) => {
    const newPost = {
      id: Date.now().toString(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content,
      media: media || null,
      taskId: taskId || null,
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

  // Add a new task comment with optional video url
  const addTaskComment = (taskId, content, videoUrl) => {
    const newComment = {
      id: `c_${Date.now()}`,
      taskId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      content,
      video: videoUrl || null,
      likes: 0,
      likedBy: [],
      timestamp: '刚刚'
    };
    setTaskComments(prev => [newComment, ...prev]);
    
    // 同时添加到社区首页帖子
    const taskTitles = { t1: '最优路径规划挑战', t2: '物流搬运编程任务', t3: '避障编程挑战' };
    const postContent = `【${taskTitles[taskId] || '任务'}】${content}`;
    const media = videoUrl ? { type: 'video', url: videoUrl } : null;
    addPost(postContent, media, taskId);
  };

  // Current user likes a comment (author gets points only if it's not current user and we tracked their points)
  const likeTaskComment = (commentId) => {
    setTaskComments(prev => prev.map(c => {
      if (c.id !== commentId) return c;
      if (c.likedBy.includes(currentUser.id)) return c;
      const updated = { ...c, likes: c.likes + 1, likedBy: [...c.likedBy, currentUser.id] };
      // If the comment author is current user, we won't add points here; use simulate function to emulate others' likes
      return updated;
    }));
  };

  // Simulate someone else liked my comment: increase likes and award points
  const simulateLikeOnMyTaskComment = (commentId) => {
    setTaskComments(prev => prev.map(c => {
      if (c.id !== commentId || c.authorId !== currentUser.id) return c;
      return { ...c, likes: c.likes + 1 };
    }));
    setCurrentUser(prev => ({
      ...prev,
      points: prev.points + 10,
      officialPoints: prev.officialPoints + 10
    }));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      posts,
      addPost,
      likePost,
      simulateLikeOnMyPost,
      taskComments,
      addTaskComment,
      likeTaskComment,
      simulateLikeOnMyTaskComment
    }}>
      {children}
    </AppContext.Provider>
  );
};
