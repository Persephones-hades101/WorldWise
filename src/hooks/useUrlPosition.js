import { useSearchParams } from "react-router-dom"

export function useUrlPosition() {

  const [searchParams, setSearchParams] = useSearchParams()

  // console.log("Query Params:", searchParams.toString());  // Log the full query string
  // console.log("Lat:", searchParams.get("lat"));
  // console.log("Lng:", searchParams.get("lng"));

  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")

  return [lat, lng];
}