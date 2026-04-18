import { useState, useEffect, useContext } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function OrderStatus() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/user/orders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(res.data);
      } catch(err) {
        console.error(err);
      }
    };
    if (user?.token) fetchOrders();
  }, [user]);

  return (
    <div className="main-boundary-box">
       <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
         <button onClick={() => navigate('/user/portal')} style={styles.navBtn}>BACK TO PORTAL</button>
         <button onClick={logout} style={{ ...styles.navBtn, backgroundColor: '#f44336', color: '#fff', border: 'none'}}>SIGN OUT</button>
      </div>

      <div style={{ width: '90%', padding: '25px', backgroundColor: '#0D47A1', color: 'white', textAlign: 'center', marginBottom: '30px', borderRadius: '15px' }}>
        <h2 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '4px' }}>My Service Bookings</h2>
      </div>

      <div style={{ width: '95%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Header Row */}
        <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{...styles.headerBox, flex: 2}}>Vendors & Items</div>
            <div style={{...styles.headerBox, flex: 1}}>Final Cost</div>
            <div style={{...styles.headerBox, flex: 1}}>Date Requested</div>
            <div style={{...styles.headerBox, flex: 1.5}}>Service Status</div>
        </div>

        {/* Data Rows */}
        {orders.map((order, idx) => (
             <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{...styles.dataBox, flex: 2}}>
                    <div style={{ fontSize: '14px', textAlign: 'left' }}>
                        {order.items.map((i, k) => <div key={k} style={{marginBottom: '5px'}}>• {i.productId?.name || 'Item'} (x{i.quantity})</div>)}
                    </div>
                </div>
                <div style={{...styles.dataBox, flex: 1, fontWeight: 'bold'}}>RS {order.totalAmount}/-</div>
                <div style={{...styles.dataBox, flex: 1}}>{new Date(order.createdAt).toLocaleDateString()}</div>
                <div style={{...styles.dataBox, flex: 1.5, backgroundColor: '#E3F2FD', color: '#0D47A1', fontWeight: 'bold', border: '2px solid #0D47A1'}}>
                    {order.status.toUpperCase()}
                </div>
             </div>
        ))}
        {orders.length === 0 && <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>No bookings found.</p>}
      </div>
    </div>
  );
}

const styles = {
    navBtn: {
        padding: '12px 30px', 
        backgroundColor: '#0D47A1', 
        color: 'white', 
        borderRadius: '12px', 
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        letterSpacing: '1px'
    },
    headerBox: {
        backgroundColor: '#0D47A1', 
        color: 'white', 
        padding: '18px 10px',
        borderRadius: '12px',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '15px'
    },
    dataBox: {
        backgroundColor: '#f5f5f5',
        color: '#333',
        padding: '20px',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1px solid #ddd',
        minHeight: '80px'
    }
}
