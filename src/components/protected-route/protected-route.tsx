import { FC, ReactElement } from 'react';

interface IProtectedRouteProps {
  children: ReactElement;
  isAuth?: boolean; // пока нету нормальной авторизации
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
  isAuth = false
}) => {
  return children;
};
