import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DateFormatter({ date }: { date: Date }) {
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");
  const navigate = useNavigate();

  // Auth check + referral handling
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;

    if (userData) {
      // “Use” the referral without storing it in state:
      console.log("Referral code:", userData.referral);
      // (If you need to use name/age later, grab them here the same way)
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Date & time formatting
  useEffect(() => {
    if (!date) return;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    setFormattedDate(`${day}/${month}/${year}`);
    setFormattedTime(`${hours}:${minutes}:${seconds}`);
  }, [date]);

  return (
    <div
      className="
        fixed top-20 right-4 z-50
        max-w-xs p-4 sm:p-6
        bg-white/90 backdrop-blur-2xs
        rounded-2xl shadow-xl
        transform hover:scale-105 transition
        text-center text-black
      "
    >
      <h1 className="text-5xl font-bold">{formattedTime}</h1>
      <h3 className="text-3xl font-light">{formattedDate}</h3>
    </div>
  );
}

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <DateFormatter date={time} />;
}
