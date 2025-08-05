import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  //localStorage.removeItem("startTime");

  const [name, setName] = useState("");

  const navigate = useNavigate();
  // const [timePassed, setTimePassed] = useState(0);

  const startRef = useRef<number | null>(null);

  const [timeStudied, setTimeStudied] = useState("");
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const startTimeString = localStorage.getItem("startTime");
    const startTime = startTimeString ? JSON.parse(startTimeString) : null;

    if (startTime) {
      startRef.current = startTime;
    } else {
      startRef.current = Date.now();
    }

    const interval = setInterval(() => {
      if (startRef.current !== null) {
        const elapsedMs = Date.now() - startRef.current;
        const seconds = Math.floor(elapsedMs / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        setTimeStudied(`${hours}h ${minutes}m`);
      }
    }, 1000);

    if (userData) {
      setName(userData.name);
    } else {
      navigate("/");
    }
    return () => clearInterval(interval); // cleanup
    // const timeUsedString = localStorage.getItem("timePassed");
    // const timeUsed = timeUsedString ? JSON.parse(timeUsedString) : null;

    // if (timeUsed) {
    //   setTimePassed(timeUsed);
    // }

    // setInterval(() => {
    //   setTimePassed(timePassed + 1);
    //   localStorage.setItem("timePassed", JSON.stringify(timePassed));
    // }, 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem("startTime", JSON.stringify(startRef.current));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-bl from-violet-700 to-fuchsia-700 text-white">
      {/* Center content with max width */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center flex-grow pt-10 px-4">
        <h1 className="text-7xl font-bold md:text-8xl">
          Welcome back, {name} 👋
        </h1>
        <p className="text-2xl italic py-3">Your new productivity app</p>

        <div className="bg-purple-50 rounded-2xl shadow-lg p-6 w-full text-black m-6">
          <h1 className="mb-5 text-4xl font-extrabold text-purple-700">
            Dashboard
          </h1>
          <div className="grid md:grid-cols`-2 grid-cols-1 gap-2">
            <div className="bg-purple-100 p-5 rounded-2xl">
              <h1 className="text-2xl font-bold text-purple-700">My Apps</h1>
              <div className="grid grid-cols-2 gap-2 m-2">
                <Link to="/timer">
                  <button className="bg-purple-50 drop-shadow-2xl px-4 py-3 rounded-xl hover:bg-violet-700 hover:text-white active:text-white active:bg-violet-800 transition text-black w-full">
                    Timer
                  </button>
                </Link>
                <Link to="/to-do">
                  <button className="bg-purple-50 drop-shadow-2xl px-4 py-3 rounded-xl hover:bg-violet-700 hover:text-white active:text-white active:bg-violet-800 transition text-black w-full">
                    To‑do List
                  </button>
                </Link>
                {/* Add more app buttons as needed */}
              </div>
            </div>
            <div className="bg-purple-100 p-5 rounded-2xl">
              <h1 className="text-2xl font-bold text-purple-700">
                Achievements
              </h1>
              <div className="grid grid-cols-2 gap-2 m-2">
                {/* Render only the four most recent achievements */}
                <div className="bg-purple-200 p-2 rounded-lg">
                  <h2 className="font-bold text-lg text-purple-800">
                    Superstar
                  </h2>
                  <p className="text-sm text-purple-800">
                    Study 5 hours in one day
                  </p>
                </div>
                <div className="bg-purple-200 p-2 rounded-lg">
                  <h2 className="font-bold text-lg text-purple-800">
                    Mastermind
                  </h2>
                  <p className="text-sm text-purple-800">
                    Complete 10 tasks in a day
                  </p>
                </div>
                <div className="bg-purple-200 p-2 rounded-lg">
                  <h2 className="font-bold text-lg text-purple-800">
                    Night Owl
                  </h2>
                  <p className="text-sm text-purple-800">Study past midnight</p>
                </div>
                <div className="bg-purple-200 p-2 rounded-lg">
                  <h2 className="font-bold text-lg text-purple-800">
                    Early Bird
                  </h2>
                  <p className="text-sm text-purple-800">
                    Start studying before 6 AM
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-purple-100 p-5 rounded-2xl">
              <h1 className="text-2xl font-bold text-purple-700">Streak</h1>
              <p className="text-5xl font-bold text-orange-600">🔥 7 days</p>
              {timeStudied === "" ? (
                <p className="text-sm text-orange-600 mt-2 font-bold">
                  Loading...
                </p>
              ) : (
                <p className="text-sm text-orange-600 mt-2 font-bold">
                  You've studied {timeStudied} today! Keep it up!
                </p>
              )}
            </div>
            <div className="bg-purple-100 p-5 rounded-2xl">
              <h1 className="text-2xl font-bold text-purple-700">Goals</h1>
              <div className="bg-purple-200 p-2 rounded-lg">
                <h2 className="font-bold text-lg text-purple-800">
                  Hard Worker
                </h2>
                <p className="text-sm text-purple-800">Study 6 hours today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer pushes footer down if content is too short */}
        <div className="flex-grow" />
      </div>

      <footer className="py-6 bg-black text-white text-center">
        Built by Kanyechi © 2025
      </footer>
    </div>
  );
};

export default Home;
