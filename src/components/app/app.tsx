import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ProtectedRoute,
  UnAuthRoute
} from '../protected-route/protected-route';

const isAuth = false;

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        {/* Главная страница */}
        <Route path='/' element={<ConstructorPage />} />

        {/* Лента */}
        <Route path='/feed' element={<Feed />} />

        {/* Гостевые роуты */}
        <Route
          path='/login'
          element={
            <UnAuthRoute>
              <Login />
            </UnAuthRoute>
          }
        />
        <Route
          path='/register'
          element={
            <UnAuthRoute>
              <Register />
            </UnAuthRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <UnAuthRoute>
              <ForgotPassword />
            </UnAuthRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <UnAuthRoute>
              <ResetPassword />
            </UnAuthRoute>
          }
        />

        {/* Защищённые роуты */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          {/* Модалки */}
          <Route
            path='/feed/:number'
            element={
              <Modal title={''} onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={''} onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={''} onClose={onCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          {/* Ошибка 404 */}
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      )}
      ;
    </div>
  );
};

export default App;
