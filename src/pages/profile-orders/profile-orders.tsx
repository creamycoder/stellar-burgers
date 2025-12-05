import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  selectNewOrder,
  selectUserOrders
} from '../../services/orders/orders-slice';
import { useDispatch, useSelector } from '../../services/store';
import { selectUser } from '../../services/user/user-slice';
import { getUserOrdersThunk } from '../../services/orders/actions';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectUserOrders);
  const user = useSelector(selectUser);
  const newOrder = useSelector(selectNewOrder);

  useEffect(() => {
    if (user) {
      dispatch(getUserOrdersThunk());
    }
  }, [dispatch, user, newOrder]);

  return <ProfileOrdersUI orders={orders} />;
};
