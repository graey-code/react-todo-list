import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export function useAuth () {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error ('useAuth must be used with an AuthProvider');
    }
    return context;
}

export function AuthProvider ({children}) {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    // functions will go here...

    // Login function
    const login = async (userEmail, password) => {
        try {
            const options = {
                method: 'Post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: userEmail, password}),
                credentials: 'include',
            };

            const res = await fetch('/api/users/logon', options);
            const data = await res.json();

            if (res.status === 200 && data.name && data.csrfToken) {
                // Success: update state
                setEmail(data.name);
                setToken(data.csrfToken);
                return {success: true};

            } else {
                // Failure: return error
                return {
                    success: false,
                    error: `Authentication failed: ${data?.message}`,
                };
            }
        } catch(error) {
            return {
                success: false,
                error: 'Network error during login',
            };
        }

    };

    // Logout function
    const logout = async (userEmail, password) => {
        if (!token) {
            setEmail('');
            setToken('');
        }
        try {
            const options = {
                method: 'Post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: userEmail, password}),
                credentials: 'include',
            };

            const res = await fetch('/api/users/logoff', options);
            const data = await res.json();

            if (res.status === 200 && data.name && data.csrfToken) {
                // Success: update state
                setEmail('');
                setToken('');
                return {success: true};

            } else {
                // Failure: return error
                setEmail('');
                setToken('');
                return {
                    
                    success: false,
                    error: `Authentication failed: ${data?.message}`,
                };
            }
        } catch(error) {
            return {
                success: false,
                error: 'Network error during logout',
            };
        }

    }; 


    // context value object
    const value = {
        email,
        token,
        isAuthenticated: !!token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}

        </AuthContext.Provider>
    );
}