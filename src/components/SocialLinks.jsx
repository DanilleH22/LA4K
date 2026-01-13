import React, { useState } from 'react';
import '../styles/SocialLinks.modules.css';

const SocialLinks = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const socialMediaData = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: 'https://wa.me/qr/XMU4FLMI55LTP1',
      icon: 'fab fa-whatsapp',
      color: '#25D366',
      hoverColor: '#128C7E'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      url: 'https://www.facebook.com/share/1Z1uWdRtHj/',
      icon: 'fab fa-facebook-f',
      color: '#1877F2',
      hoverColor: '#0D5FD9'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/mrla4k?igsh=MTFjYnJ0ZGVwMWcxeQ==',
      icon: 'fab fa-instagram',
      color: '#E4405F',
      hoverColor: '#C13584'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: 'https://youtube.com/@kinla4k?si=vcpFMuCbxxBBo7Tt',
      icon: 'fab fa-youtube',
      color: '#FF0000',
      hoverColor: '#CC0000'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      url: 'https://www.tiktok.com/@lockedaltitude?_r=1&_t=ZN-92ytf49doiE',
      icon: 'fab fa-tiktok',
      color: '#550a50ff',
      hoverColor: '#FF0050'
    },
  ];

  const handleMouseEnter = (id) => {
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="social-links-container">
      
      <div className="social-icons-wrapper">
        {socialMediaData.map((item) => (
          <div 
            key={item.id}
            className="social-icon-container"
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(item.url)}
            style={{
              '--brand-color': item.color,
              '--hover-color': item.hoverColor,
              transform: hoveredItem === item.id ? 'translateY(-8px)' : 'none'
            }}
          >
            <div className="social-icon">
              <i className={item.icon}></i>
            </div>
            <div 
              className="social-tooltip"
              style={{
                opacity: hoveredItem === item.id ? 1 : 0,
                backgroundColor: item.color
              }}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
      
     
    </div>
  );
};

export default SocialLinks;