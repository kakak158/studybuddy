import React, { useEffect, useState } from "react";
import Clock from "./Clock";

type TodoItem = [text: string, done: boolean];

const TodoList: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [items, setItems] = useState<TodoItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("todoItems", JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
    setHasLoaded(true);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setItems((prev) => [...prev, [inputValue.trim(), false]]);
      setInputValue("");
    }
  };

  const handleDelete = (indexToDelete: number) => {
    setItems((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleToggle = (indexToToggle: number) => {
    setItems((prev) =>
      prev.map((item, i) => (i === indexToToggle ? [item[0], !item[1]] : item))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-bl from-violet-700 to-fuchsia-700 text-white text-center items-center relative">
      <Clock />

      <div className="bg-gray-100 rounded-2xl shadow-lg p-6 max-w-sm md:max-w-3xl w-full text-black mt-40 relative">
        <label className="block text-gray-600 text-sm mb-2">
          Type your entry here
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-center"
          placeholder="e.g. Buy groceries"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <div className="text-left mt-4 text-gray-700 space-y-2">
          {items.map(([text, done], index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-300 pb-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={done}
                  onChange={() => handleToggle(index)}
                />
                <span
                  className={`text-lg ${done ? "line-through italic" : ""}`}
                >
                  {text}
                </span>
              </div>

              <button
                className="text-right bg-gray-200 p-1 rounded-md text-sm hover:bg-gray-300 transition"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Optional bottom padding for extra scroll space */}
      <div className="h-20" />
    </div>
  );
};

export default TodoList;
