import { client } from "../sanity/client";
import { urlFor } from '../sanityImage';

import React, { useState, useEffect } from "react";


export default function Footer() {
  const [content, setContent] = useState(null);
    
     useEffect(() => {
    client.fetch(`*[_type == "footer"][0]{
      footerHeading,
      footerText,
     
      
    
    }`).then((data) => {
      console.log("FOOTER DATA:", data);
      setContent(data);
    });
  }, []);
  
    if (!content) {
      return <div style={{ color: 'white', padding: '2rem' }}>Loading Case Study content…</div>;
    }
  return (
    <section className="footer">  
      <div className="footer-inner">
        <h1>{content.footerHeading}</h1>
        <p>{content.footerText}</p>
        <p>&copy; 2025 LA4K. All rights reserved.</p>
      </div>
    </section>
  )
}