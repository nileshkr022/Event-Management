import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function RequestItem() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Mock data for "User Requests" (Custom Inquiries)
  const [inquiries] = useState([]);

  return (
    <div className="main-boundary-box">
        
        {/* Navigation Bar */}
        <div style={{ width: '95%', display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
             <button onClick={() => navigate('/vendor/dashboard')} style={styles.navBtn}>← DASHBOARD</button>
             <button onClick={logout} style={{ ...styles.navBtn, backgroundColor: '#f44336', border: 'none', color: 'white' }}>SIGN OUT</button>
        </div>

        {/* Dashboard Title Header */}
        <div style={{ width: '95%', padding: '25px', backgroundColor: '#004D40', color: 'white', textAlign: 'center', marginBottom: '40px', borderRadius: '15px', border: '3px solid #004D40', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <h2 style={{ margin: 0, letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>CUSTOM SERVICE INQUIRIES</h2>
        </div>

        {/* Inquiry Table Container */}
        <div style={{ width: '95%', backgroundColor: '#ECEFF1', padding: '30px', borderRadius: '25px', border: '3px solid #004D40' }}>
            
            {/* Header Row */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px solid #004D40' }}>
                <div style={{...styles.tableHeader, flex: 1}}>ID</div>
                <div style={{...styles.tableHeader, flex: 2}}>SENDER</div>
                <div style={{...styles.tableHeader, flex: 3}}>INQUIRY SUBJECT</div>
                <div style={{...styles.tableHeader, flex: 1.5}}>TYPE</div>
                <div style={{...styles.tableHeader, flex: 1.5}}>STATUS</div>
            </div>

            {/* Inquiry Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {inquiries.map((req) => (
                    <div key={req.id} style={styles.inquiryRow}>
                        <div style={{ flex: 1, fontWeight: 'bold' }}>{req.id}</div>
                        <div style={{ flex: 2 }}>{req.user}</div>
                        <div style={{ flex: 3, fontStyle: 'italic' }}>"{req.subject}"</div>
                        <div style={{ flex: 1.5 }}>
                            <span style={styles.badge}>{req.type}</span>
                        </div>
                        <div style={{ flex: 1.5 }}>
                            <button style={styles.replyBtn}>REPLY</button>
                        </div>
                    </div>
                ))}
            </div>

        </div>

        <div style={{ marginTop: '40px', color: '#666', fontSize: '13px' }}>
            * This hub handles all custom requirements not available in the standard catalog.
        </div>

    </div>
  );
}

const styles = {
    navBtn: {
        padding: '12px 30px', 
        backgroundColor: '#fff', 
        color: '#004D40', 
        border: '2px solid #004D40', 
        borderRadius: '12px', 
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '13px',
        letterSpacing: '1px'
    },
    tableHeader: {
        fontWeight: '900',
        color: '#004D40',
        fontSize: '13px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    inquiryRow: {
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        padding: '15px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        border: '1px solid #004D40',
        fontSize: '14px',
        color: '#333'
    },
    badge: {
        backgroundColor: '#E0F2F1',
        color: '#004D40',
        padding: '5px 12px',
        borderRadius: '50px',
        fontSize: '11px',
        fontWeight: 'bold',
        display: 'inline-block'
    },
    replyBtn: {
        padding: '8px 20px',
        backgroundColor: '#004D40',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        fontSize: '11px',
        fontWeight: 'bold',
        letterSpacing: '1px'
    }
}
