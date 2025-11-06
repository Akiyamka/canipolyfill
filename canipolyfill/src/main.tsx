import { render } from "preact";
import "./index.css";
import { App } from "./app.tsx";
import { AppState, defaultAppState } from "./state.ts";

render(
  <AppState.Provider value={defaultAppState}>
    <App />
  </AppState.Provider>,
  document.getElementById("app")!,
);
