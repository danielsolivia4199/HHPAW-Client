import OrderForm from '../../components/order/OrderForm';
import { useAuth } from '../../utils/context/authContext';

const NewOrder = () => {
  const { user } = useAuth();
  return (
    <div>
      <OrderForm user={user} />
    </div>
  );
};

export default NewOrder;
