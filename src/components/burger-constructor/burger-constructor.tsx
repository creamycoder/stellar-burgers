import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectNewOrder,
  selectOrderRequest,
  setNewOrder
} from '../../services/orders/orders-slice';
import { useSelector, RootState, useDispatch } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { postUserBurderThunk } from '../../services/orders/actions';
import { selectBurgerConstructor } from '../../services/constructor/constructor-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userBurger = useSelector(selectBurgerConstructor);
  // ждем ответа сервера
  const orderRequest = useSelector(selectOrderRequest);
  // данные нового заказа
  const orderModalData = useSelector(selectNewOrder).order;

  const onOrderClick = () => {
    if (!userBurger.bun || orderRequest) {
      return;
    }
    const from = { pathname: '/' };
    const backgroundLocation = null;
    const itemsId = [
      userBurger.bun._id,
      ...userBurger.ingredients.map((ingredient) => ingredient._id),
      userBurger.bun._id
    ];
    dispatch(postUserBurderThunk(itemsId));
    return navigate(from, {
      replace: true,
      state: { background: backgroundLocation }
    });
  };

  const closeOrderModal = () => {
    dispatch(setNewOrder(false));
  };

  const price = useMemo(
    () =>
      (userBurger.bun ? userBurger.bun.price * 2 : 0) +
      userBurger.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [userBurger]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={userBurger}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
