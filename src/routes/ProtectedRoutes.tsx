import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const token = useAppSelector(useCurrentToken);
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoutes;
