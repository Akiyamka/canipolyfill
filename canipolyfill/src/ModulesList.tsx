import { useContext } from "preact/hooks";
import { AppState } from "./state";

export function ModulesList() {
  const { $modules } = useContext(AppState);
  return (
    <ul>
      {$modules.value.map((module) => (
        <li key={module}>{module}</li>
      ))}
    </ul>
  );
}
