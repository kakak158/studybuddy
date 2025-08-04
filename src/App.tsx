import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import TimerPage from "./pages/Timer";
import StartScreen from "./pages/StartScreen";

import TodoListPage from "./pages/TodoList";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between w-full p-4 bg-gray-100">
        <h1 className="text-2xl font-bold italic">StudyBuddy</h1>
        <nav className="xs:text-md sm:text-lg md:text-xl">
          <Link to="/home">Home</Link> | <Link to="/timer">Timer</Link> |{" "}
          <Link to="/to-do">To-do List</Link>
        </nav>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<StartScreen />} />
      <Route path="home" element={<Home />} />
      <Route path="timer" element={<TimerPage />} />
      <Route path="to-do" element={<TodoListPage />} />
      <Route
        path="*"
        element={<div className="text-white text-xl">404 Not Found</div>}
      />
    </Route>
  </Routes>
);

export default App;
