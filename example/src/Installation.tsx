import React, { useState } from 'react';

const Installation: React.FC = () => {
  const [activeInstallTab, setActiveInstallTab] = useState<'npm' | 'yarn' | 'pnpm' | 'cdn'>('npm');
  const [activeCdnTab, setActiveCdnTab] = useState<'bundle' | 'separate'>('bundle');
  const [activeUsageTab, setActiveUsageTab] = useState<'vanilla' | 'react'>('react');
  
  const [copiedNpm, setCopiedNpm] = useState(false);
  const [copiedYarn, setCopiedYarn] = useState(false);
  const [copiedPnpm, setCopiedPnpm] = useState(false);
  const [copiedCdnUnpkg, setCopiedCdnUnpkg] = useState(false);
  const [copiedCdnJsdelivr, setCopiedCdnJsdelivr] = useState(false);
  const [copiedCdnUnpkgCss, setCopiedCdnUnpkgCss] = useState(false);
  const [copiedCdnUnpkgJs, setCopiedCdnUnpkgJs] = useState(false);
  const [copiedCdnJsdelivrCss, setCopiedCdnJsdelivrCss] = useState(false);
  const [copiedCdnJsdelivrJs, setCopiedCdnJsdelivrJs] = useState(false);
  const [copiedUsageVanilla, setCopiedUsageVanilla] = useState(false);
  const [copiedUsageReact, setCopiedUsageReact] = useState(false);

  const handleCopy = async (text: string, setter: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const usageCodeVanilla = `const editor = new Editium({
  container: document.getElementById('editor'),
  placeholder: 'Start typing...',
  toolbar: 'all',
  height: '300px',
  minHeight: '200px',
  maxHeight: '400px',
  showWordCount: true,
  onChange: (data) => {
    console.log(data.html, data.json);
  }
});`;

  const usageCodeReact = `import { Editium } from 'editium';

function App() {
  return (
    <Editium
      initialValue={[]}
      toolbar="all"
      placeholder="Start typing..."
      height="300px"
      minHeight="200px"
      maxHeight="400px"
      showWordCount={true}
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
        fontWeight: '400',
        wordBreak: 'break-all'
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
          minWidth: '70px',
          marginLeft: '12px',
          flexShrink: 0
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

  const TabButton: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        background: active ? '#2d2d2d' : 'transparent',
        color: active ? '#fff' : '#666',
        border: 'none',
        borderBottom: active ? '2px solid #0066ff' : '2px solid transparent',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s',
        outline: 'none'
      }}
      onMouseOver={(e) => {
        if (!active) {
          e.currentTarget.style.color = '#333';
        }
      }}
      onMouseOut={(e) => {
        if (!active) {
          e.currentTarget.style.color = '#666';
        }
      }}
    >
      {children}
    </button>
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
          Choose your preferred installation method and start building with Editium
        </p>

        {/* Installation Method Tabs */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e0e0e0',
          overflow: 'hidden',
          marginBottom: '30px'
        }}>
          {/* Tab Headers */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#fafafa'
          }}>
            <TabButton 
              active={activeInstallTab === 'npm'} 
              onClick={() => setActiveInstallTab('npm')}
            >
              NPM
            </TabButton>
            <TabButton 
              active={activeInstallTab === 'yarn'} 
              onClick={() => setActiveInstallTab('yarn')}
            >
              Yarn
            </TabButton>
            <TabButton 
              active={activeInstallTab === 'pnpm'} 
              onClick={() => setActiveInstallTab('pnpm')}
            >
              PNPM
            </TabButton>
            <TabButton 
              active={activeInstallTab === 'cdn'} 
              onClick={() => setActiveInstallTab('cdn')}
            >
              CDN
            </TabButton>
          </div>

          {/* Tab Content */}
          <div style={{ padding: '24px' }}>
            {activeInstallTab === 'npm' && (
              <div>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                  Install via Node Package Manager
                </p>
                <CodeBlock
                  command="npm install editium"
                  copied={copiedNpm}
                  onCopy={() => handleCopy('npm install editium', setCopiedNpm)}
                />
              </div>
            )}

            {activeInstallTab === 'yarn' && (
              <div>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                  Install via Yarn package manager
                </p>
                <CodeBlock
                  command="yarn add editium"
                  copied={copiedYarn}
                  onCopy={() => handleCopy('yarn add editium', setCopiedYarn)}
                />
              </div>
            )}

            {activeInstallTab === 'pnpm' && (
              <div>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                  Install via PNPM package manager
                </p>
                <CodeBlock
                  command="pnpm add editium"
                  copied={copiedPnpm}
                  onCopy={() => handleCopy('pnpm add editium', setCopiedPnpm)}
                />
              </div>
            )}

            {activeInstallTab === 'cdn' && (
              <div>
                {/* CDN Sub-tabs */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '20px',
                  borderBottom: '1px solid #e0e0e0',
                  paddingBottom: '8px'
                }}>
                  <button
                    onClick={() => setActiveCdnTab('bundle')}
                    style={{
                      padding: '6px 16px',
                      background: activeCdnTab === 'bundle' ? '#f0f0f0' : 'transparent',
                      border: activeCdnTab === 'bundle' ? '1px solid #d0d0d0' : '1px solid transparent',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: activeCdnTab === 'bundle' ? '#000' : '#666',
                      transition: 'all 0.2s'
                    }}
                  >
                    Bundled (Recommended)
                  </button>
                  <button
                    onClick={() => setActiveCdnTab('separate')}
                    style={{
                      padding: '6px 16px',
                      background: activeCdnTab === 'separate' ? '#f0f0f0' : 'transparent',
                      border: activeCdnTab === 'separate' ? '1px solid #d0d0d0' : '1px solid transparent',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: activeCdnTab === 'separate' ? '#000' : '#666',
                      transition: 'all 0.2s'
                    }}
                  >
                    Separate Files
                  </button>
                </div>

                {activeCdnTab === 'bundle' && (
                  <div>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                      Single file includes CSS, icons, and JavaScript
                    </p>
                    <h4 style={{ fontSize: '13px', color: '#888', marginBottom: '8px', fontWeight: '500' }}>
                      unpkg
                    </h4>
                    <CodeBlock
                      command='<script src="https://unpkg.com/editium/vanilla/editium.bundle.js"></script>'
                      copied={copiedCdnUnpkg}
                      onCopy={() => handleCopy('<script src="https://unpkg.com/editium/vanilla/editium.bundle.js"></script>', setCopiedCdnUnpkg)}
                    />
                    <h4 style={{ fontSize: '13px', color: '#888', marginBottom: '8px', fontWeight: '500', marginTop: '16px' }}>
                      jsDelivr
                    </h4>
                    <CodeBlock
                      command='<script src="https://cdn.jsdelivr.net/npm/editium/vanilla/editium.bundle.js"></script>'
                      copied={copiedCdnJsdelivr}
                      onCopy={() => handleCopy('<script src="https://cdn.jsdelivr.net/npm/editium/vanilla/editium.bundle.js"></script>', setCopiedCdnJsdelivr)}
                    />
                  </div>
                )}

                {activeCdnTab === 'separate' && (
                  <div>
                    <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                      For custom configurations
                    </p>
                    <h4 style={{ fontSize: '13px', color: '#888', marginBottom: '8px', fontWeight: '500' }}>
                      unpkg
                    </h4>
                    <CodeBlock
                      command='<link rel="stylesheet" href="https://unpkg.com/editium/vanilla/editium.css">'
                      copied={copiedCdnUnpkgCss}
                      onCopy={() => handleCopy('<link rel="stylesheet" href="https://unpkg.com/editium/vanilla/editium.css">', setCopiedCdnUnpkgCss)}
                    />
                    <CodeBlock
                      command='<script src="https://unpkg.com/editium/vanilla/editium.js"></script>'
                      copied={copiedCdnUnpkgJs}
                      onCopy={() => handleCopy('<script src="https://unpkg.com/editium/vanilla/editium.js"></script>', setCopiedCdnUnpkgJs)}
                    />
                    <h4 style={{ fontSize: '13px', color: '#888', marginBottom: '8px', fontWeight: '500', marginTop: '16px' }}>
                      jsDelivr
                    </h4>
                    <CodeBlock
                      command='<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/editium/vanilla/editium.css">'
                      copied={copiedCdnJsdelivrCss}
                      onCopy={() => handleCopy('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/editium/vanilla/editium.css">', setCopiedCdnJsdelivrCss)}
                    />
                    <CodeBlock
                      command='<script src="https://cdn.jsdelivr.net/npm/editium/vanilla/editium.js"></script>'
                      copied={copiedCdnJsdelivrJs}
                      onCopy={() => handleCopy('<script src="https://cdn.jsdelivr.net/npm/editium/vanilla/editium.js"></script>', setCopiedCdnJsdelivrJs)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Usage Section with Tabs */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e0e0e0',
          overflow: 'hidden'
        }}>
          {/* Usage Tab Headers */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#fafafa',
            padding: '0 20px'
          }}>
            <div style={{ display: 'flex' }}>
              <TabButton 
                active={activeUsageTab === 'react'} 
                onClick={() => setActiveUsageTab('react')}
              >
                React
              </TabButton>
              <TabButton 
                active={activeUsageTab === 'vanilla'} 
                onClick={() => setActiveUsageTab('vanilla')}
              >
                Vanilla JS
              </TabButton>
            </div>
            <button
              onClick={() => handleCopy(
                activeUsageTab === 'react' ? usageCodeReact : usageCodeVanilla,
                activeUsageTab === 'react' ? setCopiedUsageReact : setCopiedUsageVanilla
              )}
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
              {(activeUsageTab === 'react' ? copiedUsageReact : copiedUsageVanilla) ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          {/* Usage Tab Content */}
          <div style={{ padding: '20px' }}>
            {activeUsageTab === 'react' && (
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
{usageCodeReact}
                </code>
              </pre>
            )}

            {activeUsageTab === 'vanilla' && (
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
{usageCodeVanilla}
                </code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Installation;