import { useEffect } from "react";
import MealsDetails from "./MealDetails";
import useHttp from "../hooks/use-http";
import Error from "./Error";

export default function Meals() {
  const [response, error, loading, makeRequest] = useHttp([]);

  useEffect(() => {
    makeRequest({
      method: "GET",
      url: "http://localhost:3000/meals",
    });
  }, [makeRequest]);

  if (loading)
    return (
      <p style={{ textAlign: "center", fontSize: "20px" }}>Fetching....</p>
    );

  if (error) {
    return <Error title="Failed to fetch Meals" message={error} />;
  }

  return (
    <ol id="meals">
      {" "}
      {response.map((meal) => (
        <MealsDetails meal={meal} key={meal.id} />
      ))}
    </ol>
  );
}
