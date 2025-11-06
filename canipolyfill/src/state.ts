import { createContext } from "preact";
import { signal } from "@preact/signals";
import { getModulesByQuery } from "./getModulesByQuery";
import { validateQuery } from "./valdiateQuery";

export function createAppState() {
  const $modules = signal(new Array<string>());
  const $error = signal<null | string>(null);

  const setTargetQuery = (query: string) => {
    const error = validateQuery(query);
    $error.value = error;

    if (!error) {
      $modules.value = getModulesByQuery(query);
    }
  };

  return { $modules, $error, setTargetQuery };
}

export type AppState = ReturnType<typeof createAppState>;
export const defaultAppState = createAppState();
export const AppState = createContext(defaultAppState);
