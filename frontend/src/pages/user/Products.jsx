import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

export default function Products() {
  const { vendorId } = useParams();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [vendorName, setVendorName] = useState('Loading Shop...');

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Products
      try {
        const prodRes = await api.get(`/user/vendors/${vendorId}/products`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setProducts(prodRes.data);
      } catch(err) {
        console.error("Products fetch failed:", err);
      }

      // Fetch Vendor Name
      try {
        const vendorRes = await api.get(`/user/vendors/detail/${vendorId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (vendorRes.data && vendorRes.data.name) {
            setVendorName(vendorRes.data.name);
        } else {
            setVendorName("AXCIOM VENDOR");
        }
      } catch(err) {
        console.error("Vendor fetch failed:", err);
        setVendorName("AXCIOM VENDOR");
      }
    };
    if (user?.token) fetchData();
  }, [vendorId, user]);

  const addToCart = (product) => {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i.productId === product._id);
    if(existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            productId: product._id,
            vendorId: product.vendorId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <div className="main-boundary-box">
       <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
         <button onClick={() => navigate('/user/portal')} style={{...styles.button, backgroundColor: '#fff', color: 'green'}}>Home</button>
         <button onClick={logout} style={{...styles.button, backgroundColor: '#fff', color: 'green'}}>LogOut</button>
      </div>

      <div style={{ width: '95%', maxWidth: '800px', display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
         <div style={{...styles.headerBox, padding: '10px 40px', borderRadius: '5px', backgroundColor: '#0D47A1'}}>PRODUCTS</div>
         <div style={{...styles.headerBox, padding: '10px 40px', borderRadius: '5px', marginLeft: '20px', backgroundColor: '#0D47A1', textTransform: 'uppercase'}}>{vendorName}</div>
      </div>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        {products.map(product => (
             <div key={product._id} style={styles.card}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
                <h4 style={{ color: 'white', margin: '5px 0' }}>{product.name}</h4>
                <p style={{ color: 'white', fontSize: '14px', flex: 1 }}>{product.price}/-</p>
                <button 
                  onClick={() => addToCart(product)} 
                  style={{...styles.button, backgroundColor: '#fff', color: 'green', width: '90%', marginBottom: '10px'}}
                >
                  Add to Cart
                </button>
             </div>
        ))}
        {products.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
}

const styles = {
    button: {
        padding: '10px 20px', 
        borderRadius: '5px', 
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    headerBox: {
        backgroundColor: '#42A5F5', 
        color: 'white', 
        textAlign: 'center',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#42A5F5',
        borderRadius: '20px',
        width: '180px',
        height: '240px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px'
    }
}
