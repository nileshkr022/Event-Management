import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup/user', formData);
      alert('User Registry Successful! Proceeding to Login.');
      navigate('/');
    } catch (err) {
      alert('Registry Failed: Check your details');
    }
  };

  return (
    <div className="main-boundary-box">
      
      {/* Title Bar */}
      <div style={{ width: '100%', padding: '25px', backgroundColor: '#0D47A1', color: 'white', textAlign: 'center', marginBottom: '40px', borderRadius: '15px' }}>
        <h2 style={{ margin: 0, letterSpacing: '4px', textTransform: 'uppercase' }}>USER REGISTRY HUB</h2>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '20px', border: '3px solid #0D47A1', width: '90%', maxWidth: '450px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#0D47A1' }}>CREATE YOUR ACCOUNT</h3>
        
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 'bold', color: '#0D47A1', fontSize: '14px' }}>Full Legal Name</label>
                <input 
                    type="text" 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter Name"
                    style={styles.inputBox}
                    required 
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 'bold', color: '#0D47A1', fontSize: '14px' }}>Email Address</label>
                <input 
                    type="email" 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="example@mail.com"
                    style={styles.inputBox}
                    required 
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 'bold', color: '#0D47A1', fontSize: '14px' }}>Secure Password</label>
                <input 
                    type="password" 
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    style={styles.inputBox}
                    required 
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                <button type="submit" style={styles.signupBtn}>AUTHORIZE USER REGISTRY</button>
            </div>
        </form>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', fontSize: '14px' }}>
            <Link to="/" style={{ color: '#0D47A1', fontWeight: 'bold', textDecoration: 'none' }}>ALREADY REGISTERED? GO TO LOGIN</Link>
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
        fontSize: '16px'
    },
    signupBtn: {
        padding: '15px 40px',
        backgroundColor: '#0D47A1',
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
