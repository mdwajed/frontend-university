import type { ReactNode } from "react";

export interface TRoutes {
  path: string;
  element: ReactNode;
}
export interface TSidebaritem {
  key: string;
  label: ReactNode;
  children?: TSidebaritem[];
}

export interface TUserPaths {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPaths[];
}

export type TUserRole = "admin" | "faculty" | "student";
