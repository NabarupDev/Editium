import React from 'react';

const Footer: React.FC = () => {
  const links = [
    { name: 'Documentation', url: 'https://github.com/NabarupDev/Editium#readme' },
    { name: 'GitHub', url: 'https://github.com/NabarupDev/Editium' },
    { name: 'NPM Package', url: 'https://www.npmjs.com/package/editium' },
  ];

  return (
    <footer style={{
      marginTop: '80px',
      padding: '50px 20px',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #eaeaea'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '40px'
      }}>
        <div style={{
          flex: '1',
          minWidth: '200px'
        }}>
          <h3 style={{
            color: '#000',
            marginBottom: '8px',
            fontSize: '18px',
            fontWeight: '500',
            letterSpacing: '-0.02em'
          }}>
            Editium
          </h3>
          
          <p style={{
            color: '#666',
            fontSize: '14px',
            lineHeight: '1.5',
            fontWeight: '400',
            margin: '0'
          }}>
            A powerful and flexible rich text editor for React and Vanilla JavaScript
          </p>
        </div>

        <div>
          <h4 style={{
            color: '#000',
            fontSize: '13px',
            fontWeight: '500',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Resources
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#666',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '400',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#000'}
                onMouseOut={(e) => e.currentTarget.style.color = '#666'}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '40px auto 0',
        paddingTop: '30px',
        borderTop: '1px solid #eaeaea',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <p style={{
          color: '#999',
          fontSize: '13px',
          margin: '0',
          fontWeight: '400'
        }}>
          © {new Date().getFullYear()} Editium • MIT License
        </p>
        <p style={{
          color: '#999',
          fontSize: '13px',
          margin: '0',
          fontWeight: '400'
        }}>
          Built with ❤️ by{' '}
          <a
            href="https://github.com/NabarupDev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#666',
              textDecoration: 'none',
              fontWeight: '400',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#000'}
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            Nabarup
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;