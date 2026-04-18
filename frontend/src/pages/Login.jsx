import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if(!user) return;
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'vendor') navigate('/vendor/dashboard');
      else if (user.role === 'user') navigate('/user/portal');
    } catch (err) {
      alert('Login Failed: Check credentials');
    }
  };

  return (
    <div className="main-boundary-box">
      
      {/* Title Bar */}
      <div style={{ width: '100%', padding: '25px', backgroundColor: '#0D47A1', color: 'white', textAlign: 'center', marginBottom: '60px', borderRadius: '15px' }}>
        <h2 style={{ margin: 0, letterSpacing: '4px', textTransform: 'uppercase' }}>Event Management System</h2>
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '20px', width: '90%', maxWidth: '400px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#0D47A1' }}>ACCOUNT LOGIN</h3>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 'bold', color: '#0D47A1', fontSize: '14px' }}>Username / Email</label>
                <input 
                    type="text" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Enter ID"
                    style={styles.inputBox}
                    required 
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 'bold', color: '#0D47A1', fontSize: '14px' }}>Security Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="••••••••"
                    style={styles.inputBox}
                    required 
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                <button type="submit" style={styles.loginBtn}>AUTHORIZE ACCESS</button>
            </div>
        </form>

        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '25px', fontSize: '14px' }}>
            <Link to="/signup/vendor" style={{ color: '#0D47A1', fontWeight: 'bold', textDecoration: 'none' }}>VENDOR REGISTRY</Link>
            <span style={{ color: '#ccc' }}>|</span>
            <Link to="/signup/user" style={{ color: '#0D47A1', fontWeight: 'bold', textDecoration: 'none' }}>USER REGISTRY</Link>
        </div>
      </div>

    </div>
  );
}

const styles = {
    inputBox: {
        width: 'auto',
        padding: '15px',
        border: '2px solid #0D47A1',
        borderRadius: '12px',
        outline: 'none',
        fontSize: '16px'
    },
    loginBtn: {
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
