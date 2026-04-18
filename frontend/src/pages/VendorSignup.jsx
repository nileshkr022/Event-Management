import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function VendorSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', category: 'Catering' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup/vendor', formData);
      alert('Vendor Registry Successful! Redirecting to login.');
      navigate('/');
    } catch (err) {
      alert('Registry Failed: Check details');
    }
  };

  return (
    <div className="main-boundary-box">
      
      {/* Title Bar */}
      <div style={{ width: '100%', padding: '25px', backgroundColor: '#0D47A1', color: 'white', textAlign: 'center', marginBottom: '40px', borderRadius: '15px' }}>
        <h2 style={{ margin: 0, letterSpacing: '4px', textTransform: 'uppercase' }}>VENDOR REGISTRY HUB</h2>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '20px', border: '3px solid #0D47A1', width: '90%', maxWidth: '500px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#004D40' }}>PARTNER ONBOARDING</h3>
        
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 'bold', color: '#0D47A1', fontSize: '14px' }}>Business Name</label>
                <input 
                    type="text" 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter Business Name"
                    style={styles.inputBox}
                    required 
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 'bold', color: '#0D47A1', fontSize: '14px' }}>Business Email</label>
                <input 
                    type="email" 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="vendor@company.com"
                    style={styles.inputBox}
                    required 
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 'bold', color: '#0D47A1', fontSize: '14px' }}>Security Password</label>
                <input 
                    type="password" 
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    style={styles.inputBox}
                    required 
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 'bold', color: '#0D47A1', fontSize: '14px' }}>Service Category</label>
                <select 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    style={styles.inputBox}
                >
                    <option value="Catering">Catering</option>
                    <option value="Florist">Florist</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Lighting">Lighting</option>
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                <button type="submit" style={styles.signupBtn}>AUTHORIZE VENDOR ONBOARDING</button>
            </div>
        </form>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', fontSize: '14px' }}>
            <Link to="/" style={{ color: '#0D47A1', fontWeight: 'bold', textDecoration: 'none' }}>ALREADY A PARTNER? LOGIN</Link>
        </div>
      </div>

    </div>
  );
}

const styles = {
    inputBox: {
        width: 'auto',
        padding: '12px',
        border: '2px solid #0D47A1',
        borderRadius: '12px',
        outline: 'none',
        fontSize: '16px',
        backgroundColor: '#fff'
    },
    signupBtn: {
        padding: '15px 40px',
        backgroundColor: '#004D40',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px',
        width: '100%',
        letterSpacing: '1px'
    }
}
