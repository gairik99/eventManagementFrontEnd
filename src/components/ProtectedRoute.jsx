import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // Retrieve user info from context
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.token) {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user?.token) {
        return null;
    }
    return children;
};

export default ProtectedRoute;