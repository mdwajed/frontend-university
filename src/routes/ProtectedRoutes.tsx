import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router";
import {
  logOut,
  useCurrentToken,
  type TUser,
} from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import verifyToken from "../utils/verifyToken";

interface IProtectedRouteProps {
  children: ReactNode;
  role?: string;
}
const ProtectedRoutes = ({ children, role }: IProtectedRouteProps) => {
  const [redirect, setRedirect] = useState(false);
  const token = useAppSelector(useCurrentToken);

  const user: TUser | undefined = token
    ? (verifyToken(token) as TUser)
    : undefined;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (role && user?.role && role !== user?.role) {
      dispatch(logOut());
      setRedirect(true);
    }
  }, [role, , user?.role, dispatch]);

  if (!token || redirect) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoutes;
