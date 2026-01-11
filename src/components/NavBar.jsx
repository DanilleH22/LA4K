import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { useEffect, useState } from 'react';

const NavBar = () => {


  const [buttonState, setButtonState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [copied, setCopied] = useState(false);
  
  const email = "hamiltonkdanille@hotmail.com";
  const subject = "Video Production Inquiry";
  const body = "Hello LA4K,\n\nI'm interested in your video production services. Could you provide more information about:\n\n• Project type:\n• Timeline:\n• Budget range:\n\nLooking forward to hearing from you!";


  const handleGetInTouch = () => {
    setButtonState('loading');
    
    // Simulate network delay
    setTimeout(() => {
      // Open email client
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Show success state briefly
      setButtonState('success');
      setTimeout(() => setButtonState('idle'), 2000);
    }, 800);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  const buttonConfig = {
    idle: {
      text: 'Get in Touch',
     
      className: 'primary'
    },
    loading: {
      text: 'Opening Email...',
      icon: <div className="loading-spinner" />,
      className: 'loading'
    },
    success: {
      text: 'Email Ready!',
     
      className: 'success'
    },
    error: {
      text: 'Try Again',
      
      className: 'error'
    }
  };

  const currentButton = buttonConfig[buttonState];



  return (
    <Navbar expand="lg" sticky="top" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="#" className={styles.brand}>
          LA4K
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="navbar-collapse" 
          className={styles.toggle}
        />
        <Navbar.Collapse
  id="navbar-collapse"
  className={styles.navbarCollapse}
>

          <Nav className={`${styles.nav} me-3`}>
            <Nav.Link href="#home" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link href="/about" className={styles.navLink}>
              About
            </Nav.Link>
            <Nav.Link href="/ContactUs" className={styles.navLink}>
              Contact Us
            </Nav.Link>
          </Nav>
          <Button  variant="primary" className={styles.button}
          disabled={buttonState === 'loading'}
            href="mailto:hamiltonkdanille@hotmail.com"
            onClick={handleGetInTouch}
          >
            {buttonState === 'loading' ? 'Loading…' : ' Get Started'}
           
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;