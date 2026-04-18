import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

export default function VendorDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', image: '' });

  const fetchProducts = async () => {
    try {
      const res = await api.get('/vendor/products', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setProducts(res.data);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.token) fetchProducts();
  }, [user]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
        await api.post('/vendor/products', formData, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        setFormData({ name: '', price: '', image: '' });
        fetchProducts(); 
    } catch(err) {
        alert('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
      console.log("del")
      try {
          await api.delete(`/vendor/products/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          fetchProducts();
      } catch(err) {
          alert('Delete failed');
      }
  };

  return (
    <div className="main-boundary-box">
        
       {/* Distinct Vendor Header */}
       <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', backgroundColor: '#004D40', color: 'white', padding: '20px 30px', borderRadius: '15px', border: '3px solid #004D40' }}>
         <div style={{ color: 'white', padding: '10px', fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>Vendor Portal: {user?.name || 'Vendor'}</div>
         <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => navigate('/vendor/product-status')} style={styles.navBtn}>Status Tracking</button>
            <button onClick={() => navigate('/vendor/request-item')} style={styles.navBtn}>User Requests</button>
            <button onClick={logout} style={{ ...styles.navBtn, backgroundColor: '#f44336', border: 'none' }}>Log Out</button>
         </div>
      </div>

      <div style={{ display: 'flex', width: '90%', gap: '40px', marginTop: '40px' }}>
          
          <div style={{ flex: 1, backgroundColor: '#E0F2F1', padding: '30px', borderRadius: '20px', border: '2px solid #004D40' }}>
              <h3 style={{ textAlign: 'center', color: '#004D40' }}>Add New Merchandise</h3>
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <input style={styles.input} placeholder="Product Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  <input style={styles.input} type="number" placeholder="Price (INR)" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  <input style={styles.input} placeholder="Image URL" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                  
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit" style={{ padding: '15px 30px', backgroundColor: '#004D40', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '12px', fontWeight: 'bold' }}>
                        CONFIRM ADD
                    </button>
                  </div>
              </form>
          </div>

          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{...styles.headerBox, flex: 1}}>Thumbnail</div>
                  <div style={{...styles.headerBox, flex: 1}}>Name</div>
                  <div style={{...styles.headerBox, flex: 1}}>Price</div>
                  <div style={{...styles.headerBox, flex: 1}}>Actions</div>
              </div>

              {products.map(p => (
                  <div key={p._id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{...styles.dataBox, flex: 1}}><img src={p.image} alt="p" style={{width:'60px', borderRadius: '5px'}}/></div>
                      <div style={{...styles.dataBox, flex: 1}}>{p.name}</div>
                      <div style={{...styles.dataBox, flex: 1}}>{p.price}/-</div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <button onClick={() => handleDelete(p._id)} style={{...styles.actionBtn, backgroundColor: '#f44336'}}>Delete</button>
                          <button style={{...styles.actionBtn, backgroundColor: '#004D40'}}>Update</button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}

const styles = {
    navBtn: {
        padding: '10px 25px', 
        backgroundColor: '#fff', 
        color: '#004D40', 
        border: 'none', 
        borderRadius: '10px', 
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px'
    },
    input: {
        backgroundColor: '#fff',
        padding: '15px',
        border: '2px solid #004D40',
        borderRadius: '10px',
        textAlign: 'center',
        outline: 'none'
    },
    headerBox: {
        backgroundColor: '#004D40',
        color: 'white',
        padding: '15px',
        textAlign: 'center',
        borderRadius: '10px',
        fontWeight: 'bold'
    },
    dataBox: {
        backgroundColor: '#E0F2F1',
        color: '#004D40',
        padding: '15px',
        textAlign: 'center',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90px',
        border: '1px solid #004D40'
    },
    actionBtn: {
        color: 'white',
        border: 'none',
        padding: '12px',
        cursor: 'pointer',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '12px'
    }
}
