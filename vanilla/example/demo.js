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
      showWordCount={false}
      onChange={(html, json) => {
        console.log(html, json);
      }}
    />
  );
}`;

document.getElementById('year').textContent = new Date().getFullYear();

// Tab switching functions
function switchInstallTab(event, tabName) {
  // Remove active class from all tab buttons
  const tabButtons = event.target.parentElement.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  
  // Add active class to clicked button
  event.target.classList.add('active');
  
  // Hide all tab panes
  const tabPanes = event.target.closest('.tab-container').querySelectorAll('.tab-pane');
  tabPanes.forEach(pane => pane.classList.remove('active'));
  
  // Show selected tab pane
  document.getElementById(`${tabName}-tab`).classList.add('active');
}

function switchCdnTab(event, tabName) {
  // Remove active class from all CDN sub-tab buttons
  const cdnButtons = event.target.parentElement.querySelectorAll('.cdn-subtab-btn');
  cdnButtons.forEach(btn => btn.classList.remove('active'));
  
  // Add active class to clicked button
  event.target.classList.add('active');
  
  // Hide all CDN tab panes
  const cdnPanes = event.target.closest('#cdn-tab').querySelectorAll('.cdn-tab-pane');
  cdnPanes.forEach(pane => pane.classList.remove('active'));
  
  // Show selected CDN tab pane
  document.getElementById(`${tabName}-tab`).classList.add('active');
}

function switchUsageTab(event, tabName) {
  // Remove active class from all usage tab buttons
  const tabButtons = event.target.parentElement.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  
  // Add active class to clicked button
  event.target.classList.add('active');
  
  // Hide all usage panes
  const usagePanes = event.target.closest('.tab-container').querySelectorAll('.usage-pane');
  usagePanes.forEach(pane => pane.classList.remove('active'));
  
  // Show selected usage pane
  document.getElementById(`${tabName}-tab`).classList.add('active');
}

function copyUsageCode(button) {
  // Determine which tab is active
  const reactTab = document.getElementById('react-tab');
  const isReact = reactTab.classList.contains('active');
  const code = isReact ? usageCodeReact : usageCodeVanilla;
  
  copyToClipboard(code, button);
}

async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = button.textContent;
    button.textContent = '✓ Copied';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
    alert('Failed to copy to clipboard');
  }
}

const editor = new Editium({
  container: document.getElementById('editor'),
  placeholder: 'Experience the full power of rich text editing...',
  toolbar: 'all',
  showWordCount: true,
  height: '300px',
  minHeight: '200px',
  maxHeight: '400px',
  onImageUpload: async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }
});
