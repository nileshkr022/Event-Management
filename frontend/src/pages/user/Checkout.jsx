import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
  const grandTotal = cart.reduce((acc, current) => acc + (current.price * current.quantity), 0);

  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', 
    number: '', paymentMethod: 'Cash', state: '', pinCode: ''
  });

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
        const payload = {
            items: cart.map(i => ({ productId: i.productId, vendorId: i.vendorId, quantity: i.quantity, price: i.price })),
            totalAmount: grandTotal,
            shippingDetails: formData,
            paymentMethod: formData.paymentMethod
        };
        await api.post('/user/checkout', payload, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        
        sessionStorage.setItem('lastOrder', JSON.stringify({ ...formData, totalAmount: grandTotal }));
        sessionStorage.removeItem('cart');
        navigate('/user/success');
    } catch(err) {
        alert('Checkout failed!');
    }
  };

  return (
    <div className="main-boundary-box">
        
        {/* Header Section */}
        <div style={{ width: '90%', display: 'flex', gap: '20px', marginBottom: '30px', backgroundColor: '#0D47A1', padding: '20px', borderRadius: '15px' }}>
            <div style={{ flex: 1, color: 'white', fontSize: '20px', fontWeight: 'bold' }}>CHECKOUT SUMMARY</div>
            <div style={{ flex: 1, color: 'white', fontSize: '20px', fontWeight: 'bold', textAlign: 'right' }}>GRAND TOTAL: RS {grandTotal}/-</div>
        </div>
        
        <div style={{ backgroundColor: '#ECEFF1', width: '100%', padding: '30px 20px', borderRadius: '25px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#0D47A1', letterSpacing: '2px' }}>SHIPPING & PAYMENT DETAILS</h3>

            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {/* Left Column */}
                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <input style={styles.input} placeholder="Full Name" required onChange={e => setFormData({...formData, name: e.target.value})} />
                        <input style={styles.input} type="email" placeholder="Email Address" required onChange={e => setFormData({...formData, email: e.target.value})} />
                        <input style={styles.input} placeholder="Shipping Address" required onChange={e => setFormData({...formData, address: e.target.value})} />
                        <input style={styles.input} placeholder="City" required onChange={e => setFormData({...formData, city: e.target.value})} />
                    </div>
                    
                    {/* Right Column */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <input style={styles.input} placeholder="Phone Number" required onChange={e => setFormData({...formData, number: e.target.value})} />
                        
                        <select style={styles.input} value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})}>
                            <option value="Cash">CASH ON DELIVERY</option>
                            <option value="UPI">UPI / ONLINE</option>
                        </select>
                        
                        <input style={styles.input} placeholder="State" required onChange={e => setFormData({...formData, state: e.target.value})} />
                        <input style={styles.input} placeholder="Pin Code" required onChange={e => setFormData({...formData, pinCode: e.target.value})} />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button type="submit" style={styles.checkoutBtn}>COMPLETE SECURE ORDER</button>
                    <button type="button" onClick={() => navigate('/user/cart')} style={{ ...styles.checkoutBtn, backgroundColor: '#f44336', marginLeft: '20px' }}>CANCEL</button>
                </div>
            </form>
        </div>

    </div>
  );
}

const styles = {
    input: {
        padding: '18px',
        backgroundColor: '#fff',
        color: '#0D47A1',
        border: '2px solid #0D47A1',
        borderRadius: '12px',
        outline: 'none',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '15px'
    },
    checkoutBtn: {
        padding: '18px 60px',
        backgroundColor: '#0D47A1',
        color: 'white',
        border: 'none',
        borderRadius: '15px',
        cursor: 'pointer',
        fontSize: '18px',
        fontWeight: 'bold',
        letterSpacing: '1px'
    }
}
