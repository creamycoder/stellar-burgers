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
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';

const isAuth = false;

const App = () => (
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
          <ProtectedRoute isAuth={isAuth}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute isAuth={isAuth}>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedRoute isAuth={isAuth}>
            <ResetPassword />
          </ProtectedRoute>
        }
      />

      {/* Защищённые роуты */}
      <Route
        path='/profile'
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRoute isAuth={isAuth}>
            <ProfileOrders />
          </ProtectedRoute>
        }
      />

      {/* Ошибка 404 */}
      <Route path='*' element={<NotFound404 />} />

      {/* Модалки */}
      <Route
        path='/feed/:number'
        element={
          <Modal
            title={''}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title={''}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          >
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal
            title={''}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  </div>
);

export default App;
