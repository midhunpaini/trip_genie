import { RouterProvider, createBrowserRouter, Redirect } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Trip from "./pages/Trip";
import { useState } from "react";
import ModalContext from "./utils/context/modalContext";
import useUser from "./utils/hooks/useUser";
import UserContext from "./utils/context/userContext";
import { logoutUser } from "./utils/helper";

const App = () => {
  const [modal, setModal] = useState("hide");
  const user = useUser();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/trip",
      element: <Trip/>
    },
  ]);
  
  return (
    <>
      <UserContext.Provider
        value={{
          user: user.user,
          setUser: user.setUser,
          logout: logoutUser,
        }}
      >
        <ModalContext.Provider
          value={{
            modal: modal,
            setModal: setModal,
          }}
        >
          <RouterProvider router={appRouter} />
        </ModalContext.Provider>
      </UserContext.Provider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
