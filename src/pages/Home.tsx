import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [studying, setStudying] = useState(false);
  const [name, setName] = useState("");
  const [timeStudied, setTimeStudied] = useState<string | number>("_____");

  const navigate = useNavigate();

  const startRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // load userData once
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const studyingString = localStorage.getItem("studying");
    const study = studyingString ? JSON.parse(studyingString) : null;

    if (study) {
      setStudying(study);
    }
    if (userData !== null) {
      setName(userData.name);
    } else {
      navigate("/");
    }
  }, []);

  // whenever `studying` changes, start or stop the interval
  useEffect(() => {
    localStorage.setItem("studying", JSON.stringify(studying));
    if (studying) {
      setTimeStudied("0h 0m");
      // --- on start ---
      // initialize startRef (from storage or now)
      const stored = localStorage.getItem("startTime");
      if (stored) {
        startRef.current = JSON.parse(stored);
      } else {
        startRef.current = Date.now();
        localStorage.setItem("startTime", JSON.stringify(startRef.current));
      }

      // kick off the interval
      intervalRef.current = setInterval(() => {
        if (startRef.current !== null) {
          const elapsedMs = Date.now() - startRef.current;
          const totalSeconds = Math.floor(elapsedMs / 1000);
          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          setTimeStudied(`${hours}h ${minutes}m`);
        }
      }, 1000);
    } else {
      // --- on stop ---
      // clear the interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        localStorage.removeItem("startTime");
      }
    }

    // cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [studying]);

  const startStudy = () => {
    // toggle studying state
    setStudying((prev) => !prev);
  };

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
            <div className="bg-purple-100 p-5 rounded-2xl flex flex-col items-center">
              <h1 className="text-2xl font-bold text-purple-700">Streak</h1>
              <p className="text-5xl font-bold text-orange-600">🔥 7 days</p>

              <button
                className={`text-xl text-white font-bold drop-shadow-2xl px-4 py-3 rounded-xl transition w-full m-3
            ${
              studying
                ? "animated-orange-gradient hover:opacity-90 active:opacity-80"
                : "bg-orange-600  hover:bg-orange-700"
            }
          `}
                onClick={startStudy}
              >
                {studying ? "Stop studying" : "Start studying"}
              </button>

              {studying ? (
                <p className="text-sm text-orange-600 mt-2 font-bold">
                  You've studied {timeStudied} this session! Keep it up!
                </p>
              ) : (
                <p className="text-sm text-orange-600 mt-2 font-bold">
                  You studied {timeStudied} last session! Keep on studying!
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
