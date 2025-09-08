import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router/dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import "./index.css";
import { persistor, store } from "./redux/store.ts";
import router from "./routes/router.tsx";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}></RouterProvider>
    </PersistGate>
    <Toaster richColors position="top-right" />
  </Provider>
);
