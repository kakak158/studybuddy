import { useEffect, useRef, useState } from "react";
import Clock from "./Clock";
import lofiMusic from "./lofi.mp3"; // Place your lofi track in src
import finishSound from "./finish.mp3"; // Place your finish sound in src

const Timer = () => {
  const ogTime = "0:00";
  const [seconds, setSeconds] = useState<number>(
    Number(ogTime.split(":")[0]) * 60
  );
  const [time, setTime] = useState<string>(ogTime);
  const timerRunningRef = useRef<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const pausedRef = useRef<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);
  const restartRef = useRef<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Persist seconds to localStorage after initial load
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("seconds", JSON.stringify(seconds));
    }
  }, [seconds, hasLoaded]);

  // Load from localStorage on mount, and sync display
  useEffect(() => {
    const stored = localStorage.getItem("seconds");
    if (stored != null) {
      const sec = JSON.parse(stored) as number;
      setSeconds(sec);
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      setTime(`${m}:${s.toString().padStart(2, "0")}`);
    }
    setHasLoaded(true);
  }, []);

  // Sync refs
  useEffect(() => {
    pausedRef.current = paused;
    restartRef.current = restart;
  }, [paused, restart]);

  // Audio refs
  const musicRef = useRef<HTMLAudioElement>(null);
  const finishRef = useRef<HTMLAudioElement>(null);

  function runTimer() {
    // Prevent starting if already running or no time left
    if (timerRunningRef.current || seconds <= 1) return;
    timerRunningRef.current = true;

    musicRef.current?.play().catch(() => {});

    const interval = setInterval(() => {
      // Handle restart request
      if (restartRef.current) {
        clearInterval(interval);
        setSeconds(Number(ogTime.split(":")[0]) * 60);
        setTime(ogTime);
        setPaused(false);
        setRestart(false);
        timerRunningRef.current = false;
        musicRef.current?.pause();
        musicRef.current!.currentTime = 0;
        return;
      }

      if (pausedRef.current) {
        musicRef.current?.pause();
        return;
      } else {
        musicRef.current?.play().catch(() => {});
      }

      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTime("0:00");
          timerRunningRef.current = false;
          musicRef.current?.pause();
          finishRef.current?.play();
          localStorage.removeItem("seconds");
          return 0;
        }
        const newSeconds = prev - 1;
        const minutes = Math.floor(newSeconds / 60);
        const secs = newSeconds % 60;
        setTime(`${minutes}:${secs.toString().padStart(2, "0")}`);
        return newSeconds;
      });
    }, 1000);
  }

  return (
    <>
      <div className="h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-to-bl from-violet-700 to-fuchsia-700 px-4">
        <Clock />
        <div className="bg-gray-100 rounded-2xl shadow-lg p-8 md:scale-200 max-w-sm w-full text-center">
          <h1 className="text-8xl font-semibold mb-4">{time}</h1>
          <p className="text-gray-600 mb-6">A timer designed to help.</p>
          <div className="grid grid-cols-3 gap-2 items-center justify-between">
            <button
              className="bg-white drop-shadow-2xl px-4 py-3 rounded-xl hover:bg-violet-700 hover:text-white active:text-white active:bg-violet-800 transition text-black"
              onClick={runTimer}
            >
              Start
            </button>
            {paused === false ? (
              <button
                className="bg-white drop-shadow-2xl px-4 py-3 rounded-xl hover:bg-violet-700 hover:text-white active:text-white active:bg-violet-800 transition text-black"
                onClick={() => setPaused(true)}
              >
                Pause
              </button>
            ) : (
              <button
                className="bg-white drop-shadow-2xl px-4 py-3 rounded-xl hover:bg-violet-700 hover:text-white active:text-white active:bg-violet-800 transition text-black"
                onClick={() => setPaused(false)}
              >
                Resume
              </button>
            )}
            <button
              className="bg-white drop-shadow-2xl px-4 py-3 rounded-xl hover:bg-violet-700 hover:text-white active:text-white active:bg-violet-800 transition text-black"
              onClick={() => setRestart(true)}
            >
              Restart
            </button>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-700">
              Put timer time over here
            </label>
            <input
              type="text"
              placeholder="e.g. 1:00"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-1 caret-violet-700 accent-none"
              onChange={(e) => {
                if (!timerRunningRef.current) {
                  try {
                    const [minStr, secStr] = e.target.value.split(":");
                    const minutes = Number(minStr);
                    const seconds = Number(secStr);
                    const totalSeconds = minutes * 60 + seconds;

                    setSeconds(totalSeconds);
                    setTime(`${minutes}:${secStr.padStart(2, "0")}`);
                  } catch {
                    setTime("Invalid!");
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      {/* Audio elements */}
      <audio
        ref={musicRef}
        src={lofiMusic}
        loop
        preload="auto"
        className="fixed bottom-4 left-4 w-48"
      />
      <audio ref={finishRef} src={finishSound} preload="auto" />
    </>
  );
};

export default Timer;
