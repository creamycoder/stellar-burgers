import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { FC, useEffect } from 'react';
import {
  selectFeedOrders,
  selectOrdersLoading
} from '../../services/orders/orders-slice';
import { getIngredientsThunk } from '../../services/ingredients/actions';
import { getFeedsThunk } from '../../services/orders/actions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  const feedOrders: TOrder[] = useSelector(selectFeedOrders);
  const ordersLoading = useSelector(selectOrdersLoading);

  if (ordersLoading || !feedOrders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={feedOrders}
      handleGetFeeds={() => {
        dispatch(getFeedsThunk());
      }}
    />
  );
};
