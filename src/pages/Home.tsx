import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  // const [timePassed, setTimePassed] = useState(0);
  const [time, setTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeStudied, setTimeStudied] = useState(0);
  useEffect(() => {
    setTime(new Date());
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const interval = setInterval(() => {
      const now = new Date();
      const seconds = Math.trunc(
        (Number(currentTime.getTime()) - Number(time.getTime())) / 1000
      );
      console.log("Interval tick:", now, "secondsStudied:", seconds);
      setCurrentTime(now);
      setTimeStudied(seconds);
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
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
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
              <p className="text-sm text-orange-600 mt-2 font-bold">
                You've studied {timeStudied}s today! Keep it up!
              </p>
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
