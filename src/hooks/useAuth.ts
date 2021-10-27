import { setUser, userSelector } from "@/features/auth";
import { getSessionId, moviesApi } from "@/helpers";
import { User } from "@/types/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const dispatch = useDispatch();
  let token: string;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("request_token");
  }

  // not sure if I need this later on

  // const logInUser = async () => {
  //   let sessionId = localStorage.getItem("session_id");
  //   if (token && sessionId) {
  //     if (localStorage.getItem("session_id")) {
  //       const { data: userData } = await moviesApi.get<User>(
  //         `/account?session_id=${localStorage.getItem("session_id")}`
  //       );
  //       console.log(userData);
  //       dispatch(setUser(userData));
  //     } else {
  //       console.log("no session id");
  //       sessionId = await getSessionId();

  //       const { data: userData } = await moviesApi.get<User>(
  //         `/account?session_id=${sessionId}`
  //       );

  //       dispatch(setUser(userData));
  //     }
  //   }
  // };

  const getSession = async () => {
    if (token) {
      if (localStorage.getItem("session_id")) {
        const { data: userData } = await moviesApi.get<User>(
          `/account?session_id=${localStorage.getItem("session_id")}`
        );
        // console.log(userData, "userData, getsession from line 40");
        dispatch(setUser(userData));
      } else {
        const sessionToken = await getSessionId();

        const { data: userData } = await moviesApi.get<User>(
          `/account?session_id=${sessionToken}`
        );
        // console.log(userData, "userData, getsession");

        dispatch(setUser(userData));
      }
    }
  };
  const logOut = () => {
    localStorage.removeItem("session_id");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("request_token");

    window.location.href = "/";
  };

  useEffect(() => {
    getSession();
  }, [token]);
  return {
    isAuthenticated,
    logOut,
    user,
  };
};

export default useAuth;
