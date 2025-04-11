import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you’re looking for doesn’t exist.</p>
            <button
                onClick={() => navigate('/')}
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}
            >
                Go to Home
            </button>
        </div>
    );
}

export default NotFoundPage;