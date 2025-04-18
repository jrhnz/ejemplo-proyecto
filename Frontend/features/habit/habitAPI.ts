export const fetchHabits = async () => {
  const response = await fetch("https://habits-3ighw7c57-juan-reynosos-projects.vercel.app/habits");
if (!response.ok) {
  throw new Error("Failed to fetch habits");
}
  return await response.json();
};

export const markHabitAsDone = async (id: string) => {
  const response = await fetch(`https://habits-3ighw7c57-juan-reynosos-projects.vercel.app/habits/markasdone/${id}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to mark habit as done");
  }

  return await response.json();
};
