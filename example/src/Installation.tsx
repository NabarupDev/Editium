import React, { useState } from 'react';

const Installation: React.FC = () => {
  const [copiedNpm, setCopiedNpm] = useState(false);
  const [copiedYarn, setCopiedYarn] = useState(false);
  const [copiedPnpm, setCopiedPnpm] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);

  const handleCopy = async (text: string, setter: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const usageCode = `import { Editium } from 'editium';

function App() {
  return (
    <Editium
      initialValue={[]}
      toolbar="all"
      placeholder="Start typing..."
      onChange={(html, json) => {
        console.log(html, json);
      }}
    />
  );
}`;

  const CodeBlock: React.FC<{ 
    command: string; 
    copied: boolean; 
    onCopy: () => void;
  }> = ({ command, copied, onCopy }) => (
    <div style={{
      position: 'relative',
      backgroundColor: '#1e1e1e',
      borderRadius: '8px',
      padding: '16px 20px',
      marginBottom: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #333'
    }}>
      <code style={{
        color: '#d4d4d4',
        fontSize: '14px',
        fontFamily: 'Monaco, "Courier New", monospace',
        fontWeight: '400'
      }}>
        {command}
      </code>
      <button
        onClick={onCopy}
        style={{
          background: '#2d2d2d',
          border: '1px solid #444',
          borderRadius: '6px',
          padding: '6px 12px',
          color: '#d4d4d4',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          fontWeight: '500',
          minWidth: '70px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#383838';
          e.currentTarget.style.borderColor = '#555';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = '#2d2d2d';
          e.currentTarget.style.borderColor = '#444';
        }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  );

  return (
    <section style={{
      marginTop: '60px',
      marginBottom: '40px',
      padding: '40px 30px',
      backgroundColor: '#fafafa',
      borderRadius: '12px',
      border: '1px solid #e5e5e5'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: '#000',
          fontSize: '28px',
          fontWeight: '600',
          marginBottom: '12px',
          letterSpacing: '-0.02em'
        }}>
          Getting Started
        </h2>
        
        <p style={{
          color: '#666',
          fontSize: '16px',
          lineHeight: '1.6',
          marginBottom: '30px',
          fontWeight: '400'
        }}>
          Install Editium in your React project using your preferred package manager:
        </p>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            color: '#333',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            NPM
          </h3>
          <CodeBlock
            command="npm install editium"
            copied={copiedNpm}
            onCopy={() => handleCopy('npm install editium', setCopiedNpm)}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            color: '#333',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Yarn
          </h3>
          <CodeBlock
            command="yarn add editium"
            copied={copiedYarn}
            onCopy={() => handleCopy('yarn add editium', setCopiedYarn)}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            color: '#333',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            PNPM
          </h3>
          <CodeBlock
            command="pnpm add editium"
            copied={copiedPnpm}
            onCopy={() => handleCopy('pnpm add editium', setCopiedPnpm)}
          />
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '20px',
          border: '1px solid #e0e0e0',
          marginTop: '30px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <h3 style={{
              color: '#000',
              fontSize: '16px',
              fontWeight: '500',
              margin: '0'
            }}>
              Quick Usage
            </h3>
            <button
              onClick={() => handleCopy(usageCode, setCopiedUsage)}
              style={{
                background: '#2d2d2d',
                border: '1px solid #444',
                borderRadius: '6px',
                padding: '6px 12px',
                color: '#d4d4d4',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: '500',
                minWidth: '70px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#383838';
                e.currentTarget.style.borderColor = '#555';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#2d2d2d';
                e.currentTarget.style.borderColor = '#444';
              }}
            >
              {copiedUsage ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <pre style={{
            backgroundColor: '#1e1e1e',
            borderRadius: '6px',
            padding: '16px',
            overflow: 'auto',
            margin: '0'
          }}>
            <code style={{
              color: '#d4d4d4',
              fontSize: '13px',
              fontFamily: 'Monaco, "Courier New", monospace',
              lineHeight: '1.6'
            }}>
{usageCode}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default Installation;
