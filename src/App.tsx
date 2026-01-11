import { ArtworkTable } from './components/ArtworkTable';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/art-gallery-background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      padding: '2rem',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        zIndex: 0,
      }} />
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        padding: '2.5rem',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '2px solid #e9ecef',
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '2.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}>
            Art Institute Collection
          </h1>
          <p style={{
            margin: '0.5rem 0 0 0',
            fontSize: '1.1rem',
            color: '#6c757d',
            fontWeight: 400,
          }}>
            Browse and explore artworks from the Art Institute of Chicago
          </p>
        </div>
        <ArtworkTable />
      </div>
    </div>
  );
}

export default App;
