import {
  RouterProvider,
  createBrowserRouter,
  Redirect,
} from "react-router-dom";
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
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import Testing from "./pages/Testing";
import GroupOptionContext from "./utils/context/groupOptionContext";

const App = () => {
  const [groupOption, setGroupOption] = useState(["Friends","Family","Couple","Solo", "Business","Other",]);
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
      element: (
        <Provider store={store}>
          <Trip />
        </Provider>
      ),
    },
    {
      path: "/test",
      element: <Testing/>,
    }
  ]);

  return (
    <>
    <GroupOptionContext.Provider
    value={{
      setGroupOption:setGroupOption,
      groupOption:groupOption
    }}>
      <UserContext.Provider
        value={{
          user: user.user,
          setUser: user.setUser,
          logout: logoutUser,
          loading: user.loading,
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
      </GroupOptionContext.Provider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
