import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [referral, setReferral] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify({ name, age, referral }));
    navigate("/home"); // Navigate to dashboard
  };

  return (
    <div className="h-screen bg-gradient-to-tr from-indigo-600 to-purple-600 flex justify-center items-center transition-all duration-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-10 rounded-2xl shadow-2xl w-96 space-y-4 animate-fade-in"
      >
        <h1 className="text-3xl font-bold mb-2 text-center">
          Welcome to StudyBuddy
        </h1>

        <div>
          <label className="block mb-1">Your First Name</label>
          <input
            className="w-full p-2 rounded-md border"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Your Age</label>
          <input
            className="w-full p-2 rounded-md border"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">How did you hear about us?</label>
          <input
            className="w-full p-2 rounded-md border"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Let's Go!
        </button>
      </form>
    </div>
  );
};

export default StartScreen;
