import React from "react";
import ReactDOM from "react-dom/client";
import HandleLanguages from "./components/App/HandleLanguages";
// style
import "./index.css";
// routes
import AppRouter from "./routes/AppRouter";
// i18n
import "./i18n";
// react query
import { QueryClientProvider, QueryClient } from "react-query";
// redux
import { Provider } from "react-redux";
// global context
import GlobalContext from "./hooks/GlobalContext";
import store from "./store/store";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <GlobalContext>
        <HandleLanguages />
        <AppRouter />
      </GlobalContext>
    </Provider>
  </QueryClientProvider>
);
