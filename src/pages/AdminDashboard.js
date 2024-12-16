import React from "react";
import { Link } from "react-router-dom";



const AdminDashboard = () => {
 // State to track loading status
    // State to track errors

    // Fetch counts for users and properties (you can remove this if you don't need it)
   

    return (
        <div style={styles.container}>
         
            <h1 style={styles.heading}>Admin Dashboard</h1>



            {/* Show error message if there's an issue fetching data */}
          

            <h2 style={styles.subHeading}>Admin Operations</h2>
            <div style={styles.linksContainer}>
                <Link to="/admin-manage-users" style={styles.link}>Manage Users</Link>
                <Link to="/admin-manage-properties" style={styles.link}>Manage Properties</Link>
                <Link to="/admin-analytics" style={styles.link}>Analytics</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#121212',
        color: '#fff',
        padding: '20px',
        minHeight: '100vh',
        fontFamily: 'Poppins, sans-serif',
    },
    heading: {
        textAlign: 'center',
        fontSize: '36px',
        color: '#fff',
        marginTop: '20px',
        fontWeight: '600',
    },
    subHeading: {
        textAlign: 'center',
        fontSize: '24px',
        color: '#fff',
        marginTop: '40px',
    },
    linksContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
    },
    link: {
        padding: '14px 28px',
        backgroundColor: '#2196F3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        margin: '10px 0',
        fontSize: '18px',
        textAlign: 'center',
        width: '220px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
    },
    loading: {
        textAlign: 'center',
        fontSize: '20px',
        color: '#fff',
    },
    error: {
        textAlign: 'center',
        fontSize: '20px',
        color: '#f44336',
    },
};

export default AdminDashboard;
