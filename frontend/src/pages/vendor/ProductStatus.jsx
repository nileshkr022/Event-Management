import { useState, useEffect, useContext } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function ProductStatus() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/vendor/orders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setOrders(res.data);
      } catch(err) {
        console.error(err);
      }
    };
    if (user?.token) fetchOrders();
  }, [user]);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/vendor/orders/${orderId}`, { status }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status } : o));
    } catch(err) {
      alert('Update failed');
    }
  };

  return (
    <div className="main-boundary-box">
       <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
         <button onClick={() => navigate('/vendor/dashboard')} style={styles.navBtn}>BACK TO PORTAL</button>
         <button onClick={logout} style={{ ...styles.navBtn, backgroundColor: '#f44336', color: '#fff', border: 'none'}}>SIGN OUT</button>
      </div>

      <div style={{ width: '90%', padding: '25px', backgroundColor: '#004D40', color: 'white', textAlign: 'center', marginBottom: '30px', borderRadius: '15px' }}>
        <h2 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '4px' }}>Service Order Management</h2>
      </div>

      <div style={{ width: '95%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Header Row */}
        <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{...styles.headerBox, flex: 2}}>Client & Requested Services</div>
            <div style={{...styles.headerBox, flex: 1}}>Total Earnings</div>
            <div style={{...styles.headerBox, flex: 1}}>Request Date</div>
            <div style={{...styles.headerBox, flex: 1.5}}>Update Workflow</div>
        </div>

        {/* Data Rows */}
        {orders.map((order, idx) => (
             <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{...styles.dataBox, flex: 2, textAlign: 'left', paddingLeft: '20px'}}>
                    <div style={{fontWeight: 'bold', color: '#004D40'}}>{order.shippingDetails?.name || order.userId?.name || 'Client Account'}</div>
                    <div style={{fontSize: '12px', color: '#666'}}>{order.shippingDetails?.email || order.userId?.email}</div>
                    <div style={{marginTop: '10px', fontSize: '13px'}}>
                        {order.items.map((i, k) => <div key={k}>• {i.productId?.name} (x{i.quantity})</div>)}
                    </div>
                </div>
                <div style={{...styles.dataBox, flex: 1, fontWeight: 'bold'}}>RS {order.totalAmount}/-</div>
                <div style={{...styles.dataBox, flex: 1}}>{new Date(order.createdAt).toLocaleDateString()}</div>
                <div style={{...styles.dataBox, flex: 1.5, gap: '5px', backgroundColor: '#E0F2F1'}}>
                    <select 
                        value={order.status} 
                        onChange={e => updateStatus(order._id, e.target.value)}
                        style={styles.statusSelect}
                    >
                        <option value="received">Received</option>
                        <option value="ready">Ready</option>
                        <option value="out for delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
             </div>
        ))}
        {orders.length === 0 && <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>No active requests found.</p>}
      </div>
    </div>
  );
}

const styles = {
    navBtn: {
        padding: '12px 30px', 
        backgroundColor: '#004D40', 
        color: 'white', 
        borderRadius: '12px', 
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        letterSpacing: '1px'
    },
    headerBox: {
        backgroundColor: '#004D40', 
        color: 'white', 
        padding: '18px 10px',
        borderRadius: '12px',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '15px'
    },
    dataBox: {
        backgroundColor: '#fff',
        color: '#333',
        padding: '20px',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #004D40',
        minHeight: '100px'
    },
    statusSelect: {
        padding: '10px',
        borderRadius: '10px',
        border: '2px solid #004D40',
        backgroundColor: '#fff',
        fontWeight: 'bold',
        width: '90%',
        cursor: 'pointer'
    }
}
