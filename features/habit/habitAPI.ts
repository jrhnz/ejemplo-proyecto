export const fetchHabits = async () => {
  const response = await fetch("http://localhost:3000/habitos");
if (!response.ok) {
  throw new Error("Failed to fetch habits");
}
  return await response.json();
};
