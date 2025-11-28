import React, { useState, useEffect } from 'react';

function HistoricalImageScroll() {
  // Curated artwork images - stored in public/historical/ folder
  const baseUrl = import.meta.env.BASE_URL || '/';
  const historicalImages = [
    { src: `${baseUrl}historical/Menorah.png`, title: null },
    { src: `${baseUrl}historical/Mordechai.png`, title: null },
    { src: `${baseUrl}historical/Esther.png`, title: null },
    { src: `${baseUrl}historical/Watchmen.png`, title: 'Watchmen Over Jerusalem Isaiah LXII' },
    { src: `${baseUrl}historical/SimpleMenorah.png`, title: null },
    { src: `${baseUrl}historical/Einstein.png`, title: null },
    { src: `${baseUrl}historical/Painting1.png`, title: null },
    { src: `${baseUrl}historical/Painting3.png`, title: null },
    { src: `${baseUrl}historical/Painting4.png`, title: null },
    { src: `${baseUrl}historical/Painting5.png`, title: null },
    { src: `${baseUrl}historical/Painting6.png`, title: null },
    { src: `${baseUrl}historical/Painting7.png`, title: null },
    { src: `${baseUrl}historical/Painting8.png`, title: null },
    { src: `${baseUrl}historical/Painting9.png`, title: null },
    { src: `${baseUrl}historical/Painting10.png`, title: null },
    { src: `${baseUrl}historical/Painting11.png`, title: null }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % historicalImages.length);
        setFade(true);
      }, 500); // Half second for fade out, then switch and fade in
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [historicalImages.length]);

  const currentImage = historicalImages[currentIndex];

  return (
    <div style={{
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FFFFFF',
      padding: '20px 20px 20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '750px',
        transition: 'opacity 0.5s ease-in-out',
        opacity: fade ? 1 : 0
      }}>
        <img
          src={currentImage.src}
          alt="Jewish diaspora artwork"
          referrerPolicy="no-referrer"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            borderRadius: '12px 12px 0 0'
          }}
          onError={(e) => {
            console.error('Image failed to load:', currentImage.src);
            e.target.style.display = 'none';
          }}
        />

        {/* Attribution Box */}
        <div style={{
          background: '#FAFBFC',
          borderRadius: '0 0 12px 12px',
          padding: '16px 24px',
          borderTop: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(10, 31, 68, 0.08)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '12px'
          }}>
            {/* Left: Title and Location */}
            <div>
              {currentImage.title && (
                <h3 style={{
                  margin: '0 0 4px 0',
                  fontSize: '15px',
                  fontWeight: '500',
                  fontFamily: "'Playfair Display', serif",
                  color: '#5a6a7a',
                  lineHeight: '1.3'
                }}>
                  {currentImage.title}
                </h3>
              )}
              <p style={{
                margin: '0',
                fontSize: '12px',
                fontWeight: '400',
                fontFamily: "'Montserrat', sans-serif",
                color: '#8a99a8'
              }}>
                Made in Boston, USA
              </p>
            </div>

            {/* Right: Artist Name */}
            <div style={{
              textAlign: 'right'
            }}>
              <div style={{
                fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                fontSize: '20px',
                fontWeight: '400',
                color: '#5a6a7a',
                marginBottom: '2px',
                lineHeight: '1'
              }}>
                Zayda
              </div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                fontWeight: '400',
                color: '#8a99a8',
                lineHeight: '1.4'
              }}>
                Solomon S Richmond
                <br />
                (digital adaptation)
              </div>
            </div>
          </div>

          {/* Visit Exhibit Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '12px',
            borderTop: '1px solid #E2E8F0'
          }}>
            <button
              onClick={() => window.location.href = '#exhibit'}
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(135deg, #0A1F44 0%, #1E3A5F 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                boxShadow: '0 2px 8px rgba(10, 31, 68, 0.2)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(10, 31, 68, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(10, 31, 68, 0.2)';
              }}
            >
              Visit Exhibit
            </button>
          </div>
        </div>
      </div>

      {/* Indicator dots */}
      <div style={{
        marginTop: '30px',
        display: 'flex',
        gap: '10px'
      }}>
        {historicalImages.map((_, index) => (
          <div
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: index === currentIndex ? '#0A1F44' : '#CBD5E0',
              transition: 'background 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setFade(true);
              }, 250);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HistoricalImageScroll;
