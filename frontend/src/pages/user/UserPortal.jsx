import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function UserPortal() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleVendorSelect = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    if(cat) {
      navigate(`/user/vendors/${cat}`);
    }
  };

  return (
    <div className="main-boundary-box">
       {/* Distinct User Header */}
       <div style={{ width: '90%', padding: '25px', backgroundColor: '#0D47A1', color: 'white', textAlign: 'center', marginBottom: '40px', borderRadius: '15px' }}>
         <h2 style={{ margin: 0, letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>HUB: {user?.name || 'USER'}</h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', width: '80%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Vendor Dropdown */}
        <select 
            value={selectedCategory} 
            onChange={handleVendorSelect} 
            style={{ padding: '15px', backgroundColor: '#42A5F5', color: 'white', borderRadius: '12px', cursor: 'pointer', ...styles.button }}
        >
            <option value="" disabled>Select Vendor</option>
            <option value="Catering">Catering</option>
            <option value="Florist">Florist</option>
            <option value="Decoration">Decoration</option>
            <option value="Lighting">Lighting</option>
        </select>

        <button style={styles.button} onClick={() => navigate('/user/cart')}>Shopping Cart</button>
        <button style={styles.button}>Guest List</button>
        <button style={styles.button} onClick={() => navigate('/user/order-status')}>Order Tracking</button>
      </div>

      <div style={{ marginTop: '50px' }}>
        <button style={{ ...styles.button, backgroundColor: '#f44336', border: '2px solid #b71c1c' }} onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
}

const styles = {
    button: {
        padding: '15px 40px', 
        backgroundColor: '#42A5F5', 
        color: 'white', 
        borderRadius: '12px', 
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'all 0.3s'
    }
}
