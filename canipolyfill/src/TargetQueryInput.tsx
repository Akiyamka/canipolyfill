import { useContext } from "preact/hooks";
import { AppState } from "./state";

export function TargetQueryInput() {
  const { setTargetQuery } = useContext(AppState);
  return <input type="text" placeholder="> 0.5%, last 2 versions" onChange={(e) => setTargetQuery(e.currentTarget.value)} />
}
