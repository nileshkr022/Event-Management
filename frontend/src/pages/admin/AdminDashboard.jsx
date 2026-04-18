import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [view, setView] = useState('home'); // home, maintainUser, maintainVendor, security
  
  const [vendorId, setVendorId] = useState('');
  const [duration, setDuration] = useState('6 months');
  const [vendors, setVendors] = useState([]);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
        try {
            const vRes = await api.get('/admin/vendors', { headers: { Authorization: `Bearer ${user.token}` } });
            setVendors(vRes.data);
        } catch(err) {
            console.error(err);
        }
    };
    if (user?.token) fetchAdminData();
  }, [user]);

  const addMembership = async (e) => {
      e.preventDefault();
      try {
          await api.post('/admin/memberships', { vendorId, duration }, { headers: { Authorization: `Bearer ${user.token}` } });
          alert('Membership Granted successfully!');
      } catch(err) {
          alert('Failed to grant membership. Vendor might already have active status.');
      }
  };

  const changePassword = async (e) => {
      e.preventDefault();
      try {
          await api.put('/admin/change-password', { newPassword }, { headers: { Authorization: `Bearer ${user.token}` } });
          alert('Security Key Updated Successfully!');
          setNewPassword('');
          logout();
      } catch(err) {
          alert('Security Update Failed');
      }
  };

  const UI_Home = () => (
      <div style={{ backgroundColor: '#E8EAF6', padding: '60px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', position: 'relative', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <div style={{ backgroundColor: '#1A237E', padding: '30px 80px', color: 'white', fontSize: '28px', fontWeight: 'bold', borderRadius: '15px', textTransform: 'uppercase', letterSpacing: '4px', textAlign: 'center' }}>
              ADMIN COMMAND CENTER
          </div>

          <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
              <button style={{ ...styles.navBtn, backgroundColor: '#f44336', border: 'none', color: 'white' }} onClick={logout}>LOGOUT</button>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '15px 40px', border: '2px solid #1A237E', color: '#1A237E', fontSize: '20px', fontWeight: 'bold', borderRadius: '50px' }}>
              ID: {user?.name?.toUpperCase() || 'SYSTEM ADMIN'}
          </div>

          <div style={{ display: 'flex', gap: '30px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={styles.dashboardCard} onClick={() => setView('maintainUser')}>
                  <div style={styles.cardCircle}>U</div>
                  <h3 style={{ margin: '15px 0' }}>USER REPOSITORY</h3>
                  <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>Manage permissions and subscription status</p>
              </div>
              
              <div style={styles.dashboardCard} onClick={() => setView('maintainVendor')}>
                  <div style={{ ...styles.cardCircle, backgroundColor: '#004D40' }}>V</div>
                  <h3 style={{ margin: '15px 0' }}>VENDOR REPOSITORY</h3>
                  <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>Registry auditing and marketplace status</p>
              </div>

              <div style={{ ...styles.dashboardCard, border: '3px solid #6200EA' }} onClick={() => setView('security')}>
                  <div style={{ ...styles.cardCircle, backgroundColor: '#6200EA' }}>S</div>
                  <h3 style={{ margin: '15px 0' }}>SYSTEM SECURITY</h3>
                  <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>Override credentials and access keys</p>
              </div>
          </div>
      </div>
  );

  const UI_Maintain = (title) => (
      <div style={{ backgroundColor: '#E8EAF6', padding: '40px', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', width: '100%', paddingBottom: '20px', borderBottom: '2px solid #1A237E' }}>
              <button style={styles.navBtn} onClick={() => setView('home')}>← BACK TO HOME</button>
              <h2 style={{ margin: 0, color: '#1A237E', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '900' }}>{title} HUB</h2>
              <button style={{ ...styles.navBtn, backgroundColor: '#f44336', color: 'white', border: 'none' }} onClick={logout}>TERMINATE SESSION</button>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '2px solid #1A237E', marginBottom: '30px' }}>
              <h4 style={{ margin: '0 0 20px 0', color: '#1A237E', borderLeft: '5px solid #1A237E', paddingLeft: '15px' }}>SUBSCRIPTION & STATUS MANAGEMENT</h4>
              <form onSubmit={addMembership} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <select onChange={e => setVendorId(e.target.value)} required style={styles.inputField}>
                      <option value="">Select Target Entity</option>
                      {vendors.map(v => <option key={v._id} value={v._id}>{v.name} ({v.email})</option>)}
                  </select>
                  <select onChange={e => setDuration(e.target.value)} style={styles.inputField}>
                      <option value="6 months">Term: 6 Months</option>
                      <option value="1 year">Term: 1 Year</option>
                      <option value="2 years">Term: 2 Years</option>
                  </select>
                  <button type="submit" style={styles.primaryActionBtn}>GRANT PERMISSIONS</button>
              </form>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={styles.actionCard}>
                  <h5 style={{ margin: '0 0 15px 0', color: '#1A237E' }}>ENTITY AUDIT</h5>
                  <button style={styles.secondaryBtn}>MODIFY EXISTING</button>
                  <button style={styles.secondaryBtn}>VIEW ACTIVITY</button>
              </div>
              <div style={styles.actionCard}>
                  <h5 style={{ margin: '0 0 15px 0', color: '#1A237E' }}>IDENTITY CONTROLS</h5>
                  <button style={styles.secondaryBtn}>CREATE NEW ACCOUNT</button>
                  <button style={styles.secondaryBtn}>UPDATE PERMISSIONS</button>
              </div>
              <div style={styles.actionCard}>
                  <h5 style={{ margin: '0 0 15px 0', color: '#1A237E' }}>SECURITY OVERRIDE</h5>
                  <button style={{ ...styles.secondaryBtn, backgroundColor: '#ffebee', color: '#c62828', border: '2px solid #c62828' }}>RESTRICT ACCESS</button>
                  <button style={{ ...styles.secondaryBtn, backgroundColor: '#ffebee', color: '#c62828', border: '2px solid #c62828' }}>PURGE ENTITY</button>
              </div>
          </div>
      </div>
  );

  const UI_Security = () => (
      <div style={{ backgroundColor: '#F3E5F5', padding: '40px', width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', width: '100%' }}>
              <button style={{ ...styles.navBtn, borderColor: '#6200EA', color: '#6200EA' }} onClick={() => setView('home')}>← BACK</button>
              <h2 style={{ margin: 0, color: '#6200EA', textTransform: 'uppercase', letterSpacing: '2px' }}>SYSTEM SECURITY</h2>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '3px solid #6200EA' }}>
              <h4 style={{ margin: '0 0 20px 0', color: '#6200EA' }}>CHANGE ACCESS KEY</h4>
              <form onSubmit={changePassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontWeight: 'bold', fontSize: '13px' }}>NEW SYSTEM PASSWORD</label>
                      <input 
                          type="password" 
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          style={{ ...styles.inputField, borderColor: '#6200EA', flex: 'none' }}
                          required 
                      />
                  </div>
                  <button type="submit" style={{ ...styles.primaryActionBtn, backgroundColor: '#6200EA' }}>UPDATE CORE CREDENTIALS</button>
                  <p style={{ fontSize: '12px', color: '#777', textAlign: 'center', marginTop: '10px' }}>Note: Changing the password will terminate all active sessions.</p>
              </form>
          </div>
      </div>
  );

  return (
    <div className="main-boundary-box">
       {view === 'home' && UI_Home()}
       {view === 'maintainUser' && UI_Maintain('Maintain User')}
       {view === 'maintainVendor' && UI_Maintain('Maintain Vendor')}
       {view === 'security' && UI_Security()}
    </div>
  );
}

const styles = {
    navBtn: {
        padding: '12px 25px', 
        backgroundColor: '#fff', 
        color: '#1A237E', 
        border: '2px solid #1A237E', 
        borderRadius: '12px', 
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '13px',
        letterSpacing: '1px'
    },
    dashboardCard: {
        backgroundColor: '#fff',
        padding: '30px',
        width: '280px',
        borderRadius: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        border: '3px solid #1A237E',
        transition: 'all 0.3s',
        boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
    },
    cardCircle: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#1A237E',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold'
    },
    inputField: {
        flex: 1, 
        minWidth: '200px',
        padding: '15px', 
        borderRadius: '12px', 
        border: '2px solid #1A237E',
        outline: 'none',
        fontWeight: 'bold'
    },
    primaryActionBtn: {
        padding: '15px 30px',
        backgroundColor: '#1A237E',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        letterSpacing: '1px'
    },
    actionCard: {
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '20px',
        border: '2px solid #1A237E',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    secondaryBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#E8EAF6',
        color: '#1A237E',
        border: '2px solid #1A237E',
        borderRadius: '10px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '13px'
    }
}
