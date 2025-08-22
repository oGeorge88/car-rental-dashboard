import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '/src/styles/ScrollToTop.css'; // Create this CSS file for styling

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="scroll-to-top" style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 999 }}>
            {visible && (
                <button
                    onClick={scrollToTop}
                    className="scroll-button"
                    aria-label="Scroll to top"
                    style={{
                        background: 'linear-gradient(135deg, #28a745 60%, #218838 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        boxShadow: '0 4px 16px rgba(40,167,69,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s, box-shadow 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(135deg, #218838 60%, #28a745 100%)'}
                    onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(135deg, #28a745 60%, #218838 100%)'}
                >
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
