import React, { useState } from 'react';
import { Editium } from '../../react';
import Installation from './Installation';
import Footer from './Footer';

const App: React.FC = () => {
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');

  const handleChange = (html: string, json: any) => {
    setHtmlOutput(html);
    setJsonOutput(JSON.stringify(json, null, 2));
  };

  // Example image upload handler (you would replace this with your actual upload logic)
  const handleImageUpload = async (file: File): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would upload to your server/CDN and return the URL
    // For demo purposes, create a local object URL
    const objectUrl = URL.createObjectURL(file);
    
    console.log('Image uploaded:', file.name);
    // In production, return the actual uploaded URL from your server
    // return 'https://your-cdn.com/images/' + file.name;
    return objectUrl;
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        Editium
      </h1>


      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#555', marginBottom: '10px' }}>Your Editor</h2>
        <Editium
          toolbar="all"
          placeholder="Experience the full power of rich text editing..."
          onChange={handleChange}
          onImageUpload={handleImageUpload}
          height="200px"
          showWordCount={true}
        />
      </div>
      
      <Installation />
      <Footer />
    </div>
  );
};

export default App;