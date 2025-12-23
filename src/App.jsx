import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PointsCenter from './pages/PointsCenter';
import Profile from './pages/Profile';

import OfficialTasks from './pages/OfficialTasks';
import Achievements from './pages/Achievements';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/points" element={<PointsCenter />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tasks" element={<OfficialTasks />} />
            <Route path="/achievements" element={<Achievements />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
