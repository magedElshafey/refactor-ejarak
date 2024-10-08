import React from "react";
import ReactDOM from "react-dom/client";
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
import HandleLanguages from "./components/App/HandleLanguages";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    },
  },
});
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
