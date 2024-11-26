import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/dealsdray logo.png';

const Header = () => {
    const username = localStorage.getItem('username'); // Retrieve username from local storage

    const handleLogout = () => {
        localStorage.removeItem('username'); // Clear username from local storage
    };

    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 20px',
                background: '#f0f8ff', // Light blue background
                border: '1px solid black',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Logo */}
                <img
                    src={logo} alt="DealsDray Logo"
                    style={{ height: '40px' }}
                />
                
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link
                        to="/dashboard"
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                            transition: 'color 0.3s',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = 'blue')}
                        onMouseLeave={(e) => (e.target.style.color = 'black')}
                    >
                        Home
                    </Link>
                    <Link
                        to="/employee-list"
                        style={{
                            textDecoration: 'none',
                            color: 'black',
                            transition: 'color 0.3s',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = 'blue')}
                        onMouseLeave={(e) => (e.target.style.color = 'black')}
                    >
                        Employee List
                    </Link>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                <Link
                    to="/profile" // Adjust the path as necessary
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                        transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'blue')}
                    onMouseLeave={(e) => (e.target.style.color = 'black')}
                >
                    {username ? username : 'Guest'} {/* Display the username or 'Guest' */}
                </Link>
                <Link
                    to="/"
                    style={{
                        textDecoration: 'none',
                        color: 'black',
                        transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'blue')}
                    onMouseLeave={(e) => (e.target.style.color = 'black')}
                    onClick={handleLogout} // Call logout function
                >
                    Logout
                </Link>
            </div>
        </header>
    );
};

export default Header;