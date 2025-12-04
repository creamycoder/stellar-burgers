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
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { checkUserAuth, setIsAuthChecked } from '../../services/user/actions';
import { TIngredient } from '@utils-types';
import { selectIngredients } from '../../services/ingredients/ingredients-slice';
import { getIngredientsThunk } from '../../services/ingredients/actions';

const isAuth = false;

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  const onCloseModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth()).finally(() => dispatch(setIsAuthChecked(true)));
  }, [dispatch]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredientsThunk());
    }
  }, [dispatch, ingredients.length]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
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
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
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
              <Modal title={'Детали ингредиента'} onClose={onCloseModal}>
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
        </Routes>
      )}
      ;
    </div>
  );
};

export default App;
