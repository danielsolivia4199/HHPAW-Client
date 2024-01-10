import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <Link href="/orders" passHref>
        <Button variant="danger" type="button" size="lg" className="copy-btn">
          View Orders
        </Button>
      </Link>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Create Order
      </Button>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        View Revenue
      </Button>
    </div>
  );
}

export default Home;
