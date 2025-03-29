import { useState, useEffect } from 'react';
import SignInForm from '../components/SignInForm';
import person from "../assets/person.png"

const SignInPage = () => {
    const [isHidden, setIsHidden] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // console.log(isHidden)
    return (
        <div style={{ display: 'flex', overflow: 'hidden' }}>
            <div><SignInForm hidden={isHidden} /></div>
            {!isHidden && <div style={{ height: '100vh', width: '30vw' }}>
                <img src={person} alt='image' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            }
        </div>
    )
}

export default SignInPage