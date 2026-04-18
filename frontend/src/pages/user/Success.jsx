import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  const lastOrder = JSON.parse(sessionStorage.getItem('lastOrder') || '{}');

  return (
    <div className="main-boundary-box">
        
        <div style={{ backgroundColor: '#ECEFF1', padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '850px', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
            
            <div style={{ backgroundColor: '#0D47A1', color: 'white', padding: '10px 30px', borderRadius: '50px', fontWeight: 'bold', fontSize: '12px', letterSpacing: '2px' }}>
                PAYMENT CONFIRMED
            </div>
            
            <h1 style={{ margin: 0, color: '#0D47A1', fontSize: '28px', fontWeight: '900', letterSpacing: '1px' }}>THANK YOU</h1>
            
            <div style={{ backgroundColor: '#fff', color: '#0D47A1', padding: '15px 30px', textAlign: 'center', borderRadius: '15px', border: '2px solid #0D47A1', fontSize: '18px', fontWeight: 'bold', width: 'fit-content' }}>
                TOTAL AMOUNT: RS {lastOrder.totalAmount}/-
            </div>

            <div style={{ display: 'flex', gap: '20px', width: '100%', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {/* Left Column */}
                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={styles.dataLabel}>CLIENT NAME</div>
                    <div style={styles.dataBox}>{lastOrder.name || '---'}</div>
                    
                    <div style={styles.dataLabel}>EMAIL</div>
                    <div style={styles.dataBox}>{lastOrder.email || '---'}</div>
                    
                    <div style={styles.dataLabel}>ADDRESS</div>
                    <div style={styles.dataBox}>{lastOrder.address || '---'}</div>
                </div>
                
                {/* Right Column */}
                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={styles.dataLabel}>PHONE</div>
                    <div style={styles.dataBox}>{lastOrder.number || '---'}</div>
                    
                    <div style={styles.dataLabel}>PAYMENT METHOD</div>
                    <div style={styles.dataBox}>{lastOrder.paymentMethod || '---'}</div>
                    
                    <div style={styles.dataLabel}>CITY / STATE</div>
                    <div style={styles.dataBox}>{lastOrder.city}, {lastOrder.state}</div>
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <button onClick={() => navigate('/user/portal')} style={styles.actionBtn}>
                    CONTINUE HUB
                </button>
            </div>
        </div>

    </div>
  );
}

const styles = {
    dataLabel: {
        fontSize: '11px',
        fontWeight: 'bold',
        color: '#0D47A1',
        marginLeft: '10px',
        textTransform: 'uppercase'
    },
    dataBox: {
        padding: '12px',
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: '12px',
        textAlign: 'center',
        border: '1px solid #0D47A1',
        fontWeight: '500',
        fontSize: '14px'
    },
    actionBtn: {
        padding: '15px 40px', 
        backgroundColor: '#0D47A1', 
        color: 'white', 
        border: 'none', 
        borderRadius: '15px', 
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '15px',
        letterSpacing: '2px'
    }
}
