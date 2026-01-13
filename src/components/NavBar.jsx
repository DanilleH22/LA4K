import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { useEffect, useState } from 'react';

const NavBar = () => {


     const [buttonState, setButtonState] = useState('idle'); 
    const [copied, setCopied] = useState(false);
    
    const whatsappPhone = "447769873047"; 
    const whatsappMessage = "Hello LA4K,\n\nI'm interested in your media production services. Could you provide more information about:\n\n• Project type:\n• Timeline:\n• Budget range:\n\nLooking forward to hearing from you!";
  
  
  
   // Email fallback (optional)
    const email = "Mrla4k@gmail.com";
  
    const handleGetInTouch = () => {
      setButtonState('loading');
      
      // Simulate network delay
      setTimeout(() => {
        // Check if user is on mobile for better UX
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
          // For mobile: Try to open WhatsApp app directly
          window.location.href = `whatsapp://send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`;
          
          // Fallback after 2 seconds if WhatsApp not installed
          setTimeout(() => {
            if (document.hidden) {
              // WhatsApp opened successfully
            } else {
              // WhatsApp not installed, open web version
              window.open(`https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            }
          }, 2000);
        } else {
          // For desktop: Open WhatsApp Web
          window.open(`https://web.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        }
        
        // Show success state briefly
        setButtonState('success');
        setTimeout(() => setButtonState('idle'), 2000);
      }, 800);
    };
  
    
  
    const buttonConfig = {
      idle: {
        text: 'Get in Touch on WhatsApp',
        className: 'primary'
      },
      loading: {
        text: 'Opening WhatsApp...',
        className: 'loading'
      },
      success: {
        text: 'WhatsApp Ready!',
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
        <Navbar.Brand href="/" className={styles.brand}>
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
            <Nav.Link href="/" className={styles.navLink}>
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
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
      onClick={(e) => {
        e.preventDefault(); 
        handleGetInTouch();
      }}
      target="_blank"
      rel="noopener noreferrer"
          >
            {buttonState === 'loading' ? 'Loading…' : ' Get Started'}
           
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;