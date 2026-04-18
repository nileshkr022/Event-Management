import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

export default function VendorPage() {
  const { category } = useParams();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await api.get(`/user/vendors/${category}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setVendors(res.data);
      } catch(err) {
        console.error(err);
      }
    };
    if (user?.token) fetchVendors();
  }, [category, user]);

  return (
    <div className="main-boundary-box">
       <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
         <button onClick={() => navigate('/user/portal')} style={styles.button}>BACK TO PORTAL</button>
         <button onClick={logout} style={{ ...styles.button, backgroundColor: '#f44336', color: '#fff', border: 'none'}}>SIGN OUT</button>
      </div>

      <div style={{ width: '95%', maxWidth: '900px', display: 'flex', gap: '0', marginBottom: '40px', borderRadius: '15px', overflow: 'hidden', border: '3px solid #0D47A1' }}>
         <div style={{...styles.headerBox, flex: 1}}>SERVICE CATEGORY</div>
         <div style={{...styles.headerBox, flex: 1, backgroundColor: '#fff', color: '#0D47A1'}}>{category.toUpperCase()}</div>
      </div>

      <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        {vendors.map(vendor => (
             <div key={vendor._id} style={styles.card}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <h3 style={{ color: 'white', margin: 0, letterSpacing: '1px' }}>{vendor.name}</h3>
                    <p style={{ color: '#E3F2FD', fontSize: '14px', margin: 0 }}>{vendor.email}</p>
                </div>
                <button 
                  onClick={() => navigate(`/user/vendors/${vendor._id}/products`)} 
                  style={{...styles.button, backgroundColor: '#fff', color: '#0D47A1', padding: '12px 25px', fontSize: '14px', border: 'none'}}
                >
                  VIEW CATALOG
                </button>
             </div>
        ))}
        {vendors.length === 0 && <p style={{ color: '#666', fontSize: '18px' }}>No vendors found for {category}.</p>}
      </div>
    </div>
  );
}

const styles = {
    button: {
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
        padding: '20px', 
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
        letterSpacing: '2px'
    },
    card: {
        backgroundColor: '#0D47A1',
        borderRadius: '20px',
        width: '90%',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '25px',
        justifyContent: 'space-between',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s'
    }
}
