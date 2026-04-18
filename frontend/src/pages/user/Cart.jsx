import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Cart() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const updateQuantity = (index, value) => {
    const newCart = [...cart];
    newCart[index].quantity = parseInt(value, 10);
    setCart(newCart);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem('cart');
  };

  const grandTotal = cart.reduce((acc, current) => acc + (current.price * current.quantity), 0);

  return (
    <div className="main-boundary-box">
       <div style={{ width: '90%', display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
         <button onClick={() => navigate('/user/portal')} style={styles.buttonTop}>Home</button>
         <button style={styles.buttonTop}>View Product</button>
         <button style={styles.buttonTop}>Request Item</button>
         <button style={styles.buttonTop} onClick={() => navigate('/user/order-status')}>Product Status</button>
         <button onClick={logout} style={styles.buttonTop}>LogOut</button>
      </div>

       <div style={{ width: '95%', maxWidth: '900px', padding: '15px', backgroundColor: '#0D47A1', color: 'white', textAlign: 'center', marginBottom: '20px', borderRadius: '15px' }}>
        <h2 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '20px' }}>Shopping Cart</h2>
      </div>

      <div style={{ width: '95%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* Header Row */}
        <div style={{ display: 'flex', gap: '10px', textAlign: 'center' }}>
            <div style={{...styles.colBox, flex: 1}}>Image</div>
            <div style={{...styles.colBox, flex: 2}}>Name</div>
            <div style={{...styles.colBox, flex: 1}}>Price</div>
            <div style={{...styles.colBox, flex: 1}}>Quantity</div>
            <div style={{...styles.colBox, flex: 1}}>Total Price</div>
            <div style={{...styles.colBox, flex: 1}}>Action</div>
        </div>

        {/* Data Rows */}
        {cart.map((item, index) => (
             <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center', textAlign: 'center' }}>
                <div style={{...styles.dataBox, flex: 1}}><img src={item.image} alt="product" style={{width:'50px'}} /></div>
                <div style={{...styles.dataBox, flex: 2}}>{item.name}</div>
                <div style={{...styles.dataBox, flex: 1}}>{item.price}/-</div>
                <div style={{...styles.dataBox, flex: 1}}>
                    <select value={item.quantity} onChange={e => updateQuantity(index, e.target.value)} style={{width: '100%'}}>
                        {[1,2,3,4,5,6,7,8,9,10].map(v => <option key={v} value={v}>{v} V</option>)}
                    </select>
                </div>
                <div style={{...styles.dataBox, flex: 1}}>{item.price * item.quantity}/-</div>
                <div style={{...styles.dataBox, flex: 1}}>
                    <button onClick={() => removeItem(index)} style={{backgroundColor: '#42A5F5', color: '#fff', border:'none', padding:'5px'}}>Remove</button>
                </div>
             </div>
        ))}
        {cart.length === 0 && <p>Your cart is empty.</p>}

        {/* Footer Row */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', alignItems: 'center' }}>
            <div style={{...styles.colBox, flex: 5, textAlign: 'left', paddingLeft: '20px'}}>Grand Total</div>
            <div style={{...styles.colBox, flex: 1}}>{grandTotal}/-</div>
            <div style={{...styles.colBox, flex: 1, backgroundColor: 'transparent'}}>
                <button onClick={clearCart} style={{backgroundColor: '#fff', color: 'black', border:'1px solid black', padding:'10px', width:'100%'}}>Delete All</button>
            </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <button onClick={() => navigate('/user/checkout')} disabled={cart.length === 0} style={{ padding: '10px 40px', border: '1px solid green', color: 'green', backgroundColor: '#fff', cursor: 'pointer' }}>
                Proceed to CheckOut
            </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
    buttonTop: {
        padding: '10px 20px', 
        backgroundColor: '#fff', 
        color: 'green', 
        border: '1px solid green', 
        borderRadius: '5px', 
        cursor: 'pointer'
    },
    colBox: {
        backgroundColor: '#0D47A1', 
        color: 'white', 
        padding: '10px',
        borderRadius: '5px',
        fontWeight: 'bold'
    },
    dataBox: {
        backgroundColor: '#42A5F5',
        color: 'white',
        padding: '20px 10px',
        borderRadius: '10px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}
