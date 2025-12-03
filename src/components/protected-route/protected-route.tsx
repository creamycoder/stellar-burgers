import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface IProtectedRouteProps {
  children: ReactElement;
  isAuth?: boolean;
  guest?: boolean; // пока нету нормальной авторизации
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
  isAuth,
  guest = false
}) => {
  // Защищённые страницы (profile)
  if (!guest && !isAuth) {
    return <Navigate to='/login' replace />;
  }

  // Гостевые страницы (login/register)
  if (guest && isAuth) {
    return <Navigate to='/' replace />;
  }
  return children;
};
