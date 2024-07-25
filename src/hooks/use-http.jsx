import axios from "axios";
import { useCallback, useState } from "react";

export default function useHttp(initialData) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(initialData);

  function ClearData() {
    setResponse(initialData);
    setError(undefined);
  }

  const makeRequest = useCallback(async function makeRequest(reqConfig) {
    setLoading(true);
    try {
      const response = await axios(reqConfig);
      setResponse(response.data);
    } catch (e) {
      setError(e.response.data.message || "Something went wrong!");
    }

    setLoading(false);
  }, []);

  return [response, error, loading, makeRequest, ClearData];
}
