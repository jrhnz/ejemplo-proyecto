import { Habit } from "@/features/habit/habitSlice";
import { fetchHabits, markHabitAsDone } from "@/features/habit/habitAPI";
import { useEffect, useState } from "react";

const Habits: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const loadHabits = async () => {
    try {
      const data = await fetchHabits();
      setHabits(data);
    } catch (error) {
      console.error("Error loading habits:", error);
    }
  };

  const handleMarkAsDone = async (id: string) => {
    try {
      await markHabitAsDone(id);
      await loadHabits(); // recargar hábitos actualizados
    } catch (error) {
      console.error("Error marking habit as done:", error);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Habits</h1>
      <ul className="space-y-4">
        {habits.map((habit) => (
          <li
            key={habit._id}
            className="flex items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900">{habit.title}</p>
              <div className="w-full h-3 bg-gray-300 rounded mt-1 overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${Math.min(habit.days * 10, 100)}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => handleMarkAsDone(habit._id)}
              className="ml-4 px-3 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
            >
              Mark as Done
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Habits;
