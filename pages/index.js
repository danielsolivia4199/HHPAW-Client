/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { Button, Image } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh', padding: '30px', maxWidth: '400px', margin: '0 auto',
      }}
    >
      <Image src="https://25.media.tumblr.com/720f89e6cc6c766a3acefb3f3024b88a/tumblr_mf9wr14Ds31rufswgo1_400.gif" alt="Loading" style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }} />
      <h2 style={{ marginBottom: '20px' }}>Hello {user.fbUser.displayName}!</h2>
      <Link href="/orders" passHref>
        <a><Button variant="danger" type="button" size="lg" className="home-btn">View Orders</Button></a>
      </Link>

      <Link href="/orders/new" passHref>
        <a><Button variant="danger" type="button" size="lg" className="home-btn">Create Order</Button></a>
      </Link>

      <Link href="/revenue" passHref>
        <a><Button variant="danger" type="button" size="lg" className="home-btn">View Revenue</Button></a>
      </Link>
    </div>
  );
}

export default Home;
