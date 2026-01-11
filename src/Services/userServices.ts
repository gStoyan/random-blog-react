const url = "/services/agilecoreservice/api/scagile-users";
import useFeatch from "../Hooks/useFetch";

export async function getAllUsers() {
  const state = useFeatch(url);
  return state;
}
