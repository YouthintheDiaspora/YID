import React, { useState, useEffect } from 'react';
import HistoricalImageScroll from './HistoricalImageScroll';

function UnifiedLanding({ onEnterMap }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [activePage, setActivePage] = useState('home'); // 'home', 'why-us', 'contact', 'sources', 'exhibit'
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [focusedPainting, setFocusedPainting] = useState(null);

  // Handle hash changes for exhibit link
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#exhibit') {
        setActivePage('exhibit');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fullText = `The destruction of Gaza and the persistent conflation of Judaism with the state of Israel have caused division with Jewish communities. While some Jews have grown more unified in their support for Israel, others have agonized over the brutality inflicted upon Palestinians.

Many Jews have begun to grapple with a fundamental question in one form or another: Must Jewish identity be centered around a political state and political power?

Youth in the Diaspora (YID) offers an alternative to the narrative that political empowerment is requisite for Jewish religious and cultural survival. It presents an interactive and evolving repository of Jewish life in the diaspora throughout millennia of Jewish history and highlights the contributions of Jews to their societies, their communities, and to Judaism itself.

YID aims to connect young Jews who seek to celebrate their identity and history with others who share similar ethical principles.`;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 25);
      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
    }
  }, [currentIndex, fullText]);

  const handleSkip = () => {
    setDisplayedText(fullText);
    setCurrentIndex(fullText.length);
    setTypingComplete(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#FFFFFF',
      zIndex: 10000,
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      {/* Navigation Header */}
      <nav style={{
        position: 'sticky',
        top: 0,
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        zIndex: 100,
        padding: isMobile ? '12px 0' : '20px 0'
      }}>
        <div style={{
          width: '95%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: isMobile ? '16px' : '60px',
          paddingRight: isMobile ? '16px' : '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: isMobile ? 'wrap' : 'nowrap'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '8px' : '12px',
            marginBottom: isMobile ? '12px' : '0',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            <img
              src={import.meta.env.BASE_URL + 'logo.png'}
              alt="Youth in the Diaspora"
              style={{
                height: isMobile ? '28px' : '40px',
                width: 'auto'
              }}
            />
            <span style={{
              fontSize: isMobile ? '16px' : '20px',
              fontWeight: '700',
              fontFamily: "'Playfair Display', serif",
              color: '#0A1F44',
              letterSpacing: '-0.5px'
            }}>
              Youth in the Diaspora
            </span>
          </div>

          {/* Navigation Links */}
          <div style={{
            display: 'flex',
            gap: isMobile ? '16px' : '32px',
            alignItems: 'center',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-around' : 'flex-end'
          }}>
            <button
              onClick={() => setActivePage('home')}
              style={{
                fontSize: isMobile ? '13px' : '16px',
                fontWeight: '500',
                fontFamily: "'Montserrat', sans-serif",
                color: activePage === 'home' ? '#0A1F44' : '#4a5568',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: isMobile ? '8px 4px' : '0',
                minWidth: isMobile ? '44px' : 'auto',
                minHeight: isMobile ? '44px' : 'auto'
              }}
              onMouseOver={(e) => e.target.style.color = '#0A1F44'}
              onMouseOut={(e) => e.target.style.color = activePage === 'home' ? '#0A1F44' : '#4a5568'}
            >
              Home
            </button>
            <button
              onClick={() => setActivePage('why-us')}
              style={{
                fontSize: isMobile ? '13px' : '16px',
                fontWeight: '500',
                fontFamily: "'Montserrat', sans-serif",
                color: activePage === 'why-us' ? '#0A1F44' : '#4a5568',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: isMobile ? '8px 4px' : '0',
                minWidth: isMobile ? '44px' : 'auto',
                minHeight: isMobile ? '44px' : 'auto'
              }}
              onMouseOver={(e) => e.target.style.color = '#0A1F44'}
              onMouseOut={(e) => e.target.style.color = activePage === 'why-us' ? '#0A1F44' : '#4a5568'}
            >
              Why Us
            </button>
            <button
              onClick={() => setActivePage('contact')}
              style={{
                fontSize: isMobile ? '13px' : '16px',
                fontWeight: '500',
                fontFamily: "'Montserrat', sans-serif",
                color: activePage === 'contact' ? '#0A1F44' : '#4a5568',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: isMobile ? '8px 4px' : '0',
                minWidth: isMobile ? '44px' : 'auto',
                minHeight: isMobile ? '44px' : 'auto',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => e.target.style.color = '#0A1F44'}
              onMouseOut={(e) => e.target.style.color = activePage === 'contact' ? '#0A1F44' : '#4a5568'}
            >
              Contact{isMobile ? '' : ' Us'}
            </button>
            <button
              onClick={() => setActivePage('sources')}
              style={{
                fontSize: isMobile ? '13px' : '16px',
                fontWeight: '500',
                fontFamily: "'Montserrat', sans-serif",
                color: activePage === 'sources' ? '#0A1F44' : '#4a5568',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: isMobile ? '8px 4px' : '0',
                minWidth: isMobile ? '44px' : 'auto',
                minHeight: isMobile ? '44px' : 'auto'
              }}
              onMouseOver={(e) => e.target.style.color = '#0A1F44'}
              onMouseOut={(e) => e.target.style.color = activePage === 'sources' ? '#0A1F44' : '#4a5568'}
            >
              Sources
            </button>
          </div>
        </div>
      </nav>

      {/* Opening Message */}
      {!typingComplete && (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '40px 20px' : '60px 40px',
          position: 'relative'
        }}>
          <div style={{
            width: '95%',
            maxWidth: '800px'
          }}>
            <pre style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile ? '15px' : '18px',
              lineHeight: '1.8',
              color: '#1a1a1a',
              whiteSpace: 'pre-wrap',
              margin: '0 0 40px 0',
              fontWeight: '400'
            }}>
              {displayedText}
            </pre>
            <button
              onClick={handleSkip}
              style={{
                padding: isMobile ? '10px 20px' : '12px 28px',
                background: 'transparent',
                color: '#0A1F44',
                border: '2px solid #0A1F44',
                borderRadius: '6px',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif",
                transition: 'all 0.2s ease',
                display: 'block',
                margin: '0 auto'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#0A1F44';
                e.target.style.color = '#FFFFFF';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#0A1F44';
              }}
            >
              Skip →
            </button>
          </div>
        </div>
      )}

      {/* Main Landing Content */}
      {typingComplete && activePage === 'home' && (
        <div>
          {/* Hero Section */}
          <section style={{
            padding: isMobile ? '40px 0 20px' : '120px 0 30px',
            background: '#FFFFFF'
          }}>
            <div style={{
              width: '95%',
              maxWidth: '1200px',
              margin: '0 auto',
              paddingLeft: isMobile ? '20px' : '60px',
              paddingRight: isMobile ? '20px' : '40px'
            }}>
              <h1 style={{
                margin: '0 0 24px 0',
                fontSize: isMobile ? '28px' : '48px',
                fontWeight: '700',
                fontFamily: "'Playfair Display', serif",
                color: '#0A1F44',
                lineHeight: '1.2',
                letterSpacing: '-0.5px'
              }}>
                Youth in the Diaspora
              </h1>

              <p style={{
                margin: '0',
                fontSize: isMobile ? '16px' : '24px',
                fontWeight: '400',
                color: '#4a5568',
                fontFamily: "'Montserrat', sans-serif",
                lineHeight: '1.5',
                maxWidth: '700px'
              }}>
                An interactive map documenting 175 years of Jewish diaspora communities
              </p>
            </div>
          </section>

          {/* Rotating Artwork Gallery */}
          <section style={{
            padding: '0',
            background: '#FFFFFF'
          }}>
            <HistoricalImageScroll />
          </section>

          {/* Explore the Map Button */}
          <section style={{
            padding: isMobile ? '30px 0' : '40px 0',
            background: '#FFFFFF'
          }}>
            <div style={{
              width: '95%',
              maxWidth: '1200px',
              margin: '0 auto',
              paddingLeft: isMobile ? '20px' : '60px',
              paddingRight: isMobile ? '20px' : '40px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button
                onClick={onEnterMap}
                style={{
                  padding: isMobile ? '16px 32px' : '18px 40px',
                  fontSize: isMobile ? '15px' : '17px',
                  fontWeight: '700',
                  fontFamily: "'Montserrat', sans-serif",
                  background: 'linear-gradient(135deg, #0A1F44 0%, #1E3A5F 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(10, 31, 68, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  minHeight: '48px',
                  width: isMobile ? '100%' : 'auto',
                  maxWidth: isMobile ? '320px' : 'none'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(10, 31, 68, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(10, 31, 68, 0.3)';
                }}
              >
                Explore the Map
              </button>
            </div>
          </section>

          {/* What This Map Shows */}
          <section style={{
            padding: '80px 0',
            background: '#F7FAFC',
            borderTop: '1px solid #E2E8F0'
          }}>
            <div style={{
              width: '95%',
              maxWidth: '1200px',
              margin: '0 auto',
              paddingLeft: '60px',
              paddingRight: '40px'
            }}>
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  margin: '0 0 16px 0',
                  fontSize: '32px',
                  fontWeight: '700',
                  fontFamily: "'Playfair Display', serif",
                  color: '#0A1F44',
                  lineHeight: '1.3'
                }}>
                  What This Map Shows
                </h2>
                <div style={{
                  width: '80px',
                  height: '4px',
                  background: '#0A1F44',
                  borderRadius: '2px'
                }} />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px'
              }}>
                <div
                  style={{
                    padding: '32px',
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(10, 31, 68, 0.15)';
                    e.currentTarget.style.borderColor = '#0A1F44';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#0A1F44'
                  }}>
                    Population Data
                  </h3>
                  <ul style={{
                    margin: '0',
                    padding: '0 0 0 20px',
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#4a5568',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    <li>130+ cities worldwide</li>
                    <li>1850 to present day</li>
                    <li>Pre and post-Holocaust demographics</li>
                  </ul>
                </div>

                <div
                  style={{
                    padding: '32px',
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(10, 31, 68, 0.15)';
                    e.currentTarget.style.borderColor = '#0A1F44';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#0A1F44'
                  }}>
                    Cultural Heritage
                  </h3>
                  <ul style={{
                    margin: '0',
                    padding: '0 0 0 20px',
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#4a5568',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    <li>Community traditions and landmarks</li>
                    <li>Historical contributions</li>
                    <li>Sephardic and Ashkenazi histories</li>
                  </ul>
                </div>

                <div
                  style={{
                    padding: '32px',
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(10, 31, 68, 0.15)';
                    e.currentTarget.style.borderColor = '#0A1F44';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: '700',
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#0A1F44'
                  }}>
                    Migration Patterns
                  </h3>
                  <ul style={{
                    margin: '0',
                    padding: '0 0 0 20px',
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#4a5568',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    <li>Major diaspora movements</li>
                    <li>Soviet emigration waves</li>
                    <li>Post-war displacement</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section style={{
            padding: '80px 0',
            background: '#FFFFFF'
          }}>
            <div style={{
              width: '95%',
              maxWidth: '1200px',
              margin: '0 auto',
              paddingLeft: '60px',
              paddingRight: '40px'
            }}>
              <h2 style={{
                margin: '0 0 40px 0',
                fontSize: '32px',
                fontWeight: '700',
                fontFamily: "'Playfair Display', serif",
                color: '#0A1F44',
                lineHeight: '1.3'
              }}>
                How to Use
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '40px'
              }}>
                {/* Step 1 */}
                <div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#0A1F44',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '16px'
                  }}>1</div>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#0A1F44'
                  }}>
                    Select a Year
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '16px',
                    lineHeight: '1.7',
                    color: '#4a5568',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    Use the timeline slider to travel through 175 years of history
                  </p>
                </div>

                {/* Step 2 */}
                <div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#0A1F44',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '16px'
                  }}>2</div>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#0A1F44'
                  }}>
                    Click Cities
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '16px',
                    lineHeight: '1.7',
                    color: '#4a5568',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    Explore detailed population data, cultural heritage, and landmarks
                  </p>
                </div>

                {/* Step 3 */}
                <div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#0A1F44',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '16px'
                  }}>3</div>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#0A1F44'
                  }}>
                    View Migrations
                  </h3>
                  <p style={{
                    margin: '0',
                    fontSize: '16px',
                    lineHeight: '1.7',
                    color: '#4a5568',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    Toggle migration routes to see movement patterns across centuries
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Insights */}
          <section style={{
            padding: '80px 0',
            background: '#F7FAFC',
            borderTop: '1px solid #E2E8F0'
          }}>
            <div style={{
              width: '95%',
              maxWidth: '1200px',
              margin: '0 auto',
              paddingLeft: '60px',
              paddingRight: '40px'
            }}>
              <h2 style={{
                margin: '0 0 24px 0',
                fontSize: '32px',
                fontWeight: '700',
                fontFamily: "'Playfair Display', serif",
                color: '#0A1F44',
                lineHeight: '1.3'
              }}>
                Key Historical Insights
              </h2>

              <div style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#4a5568',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                <p style={{ margin: '0 0 20px 0' }}>
                  Global Jewish population peaked at <strong style={{ color: '#0A1F44' }}>16.6 million in 1939</strong>. The Holocaust killed 6 million Jews. Today's population of <strong style={{ color: '#0A1F44' }}>15.8 million</strong> is still below pre-Holocaust levels.
                </p>
                <p style={{ margin: '0 0 20px 0' }}>
                  Major European cities show dramatic demographic shifts:
                </p>
                <ul style={{
                  margin: '0',
                  padding: '0 0 0 20px'
                }}>
                  <li>Warsaw: 380,000 Jews (1940) → 4,500 today</li>
                  <li>Vienna: 166,000 Jews (1939) → 10,000 today</li>
                  <li>Budapest: 200,000 Jews (1940) → 47,000 today</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* Why Us Page */}
      {typingComplete && activePage === 'why-us' && (
        <div style={{ minHeight: '80vh', padding: '80px 0', background: '#FFFFFF' }}>
          <div style={{
            width: '95%',
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: '60px',
            paddingRight: '40px'
          }}>
            <h2 style={{
              margin: '0 0 40px 0',
              fontSize: '36px',
              fontWeight: '700',
              fontFamily: "'Playfair Display', serif",
              color: '#0A1F44',
              lineHeight: '1.3'
            }}>
              Why Youth in the Diaspora?
            </h2>

            <div style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#4a5568',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              <p style={{ margin: '0 0 20px 0' }}>
                The destruction of Gaza and the persistent conflation of Judaism with the state of Israel have caused division with Jewish communities. While some Jews have grown more unified in their support for Israel, others have agonized over the brutality inflicted upon Palestinians.
              </p>
              <p style={{ margin: '0 0 20px 0' }}>
                Many Jews have begun to grapple with a fundamental question in one form or another: <strong style={{ color: '#0A1F44' }}>Must Jewish identity be centered around a political state and political power?</strong>
              </p>
              <p style={{ margin: '0 0 20px 0' }}>
                Youth in the Diaspora (YID) offers an alternative to the narrative that political empowerment is requisite for Jewish religious and cultural survival. It presents an interactive and evolving repository of Jewish life in the diaspora throughout millennia of Jewish history and highlights the contributions of Jews to their societies, their communities, and to Judaism itself.
              </p>
              <p style={{ margin: '0 0 40px 0' }}>
                YID aims to connect young Jews who seek to celebrate their identity and history with others who share similar ethical principles.
              </p>

              <button
                onClick={onEnterMap}
                style={{
                  padding: '18px 40px',
                  fontSize: '17px',
                  fontWeight: '700',
                  fontFamily: "'Montserrat', sans-serif",
                  background: 'linear-gradient(135deg, #0A1F44 0%, #1E3A5F 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(10, 31, 68, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(10, 31, 68, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(10, 31, 68, 0.3)';
                }}
              >
                Explore the Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Page */}
      {typingComplete && activePage === 'contact' && (
        <div style={{ minHeight: '80vh', padding: '80px 0', background: '#FFFFFF' }}>
          <div style={{
            width: '95%',
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: '60px',
            paddingRight: '40px'
          }}>
            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '36px',
              fontWeight: '700',
              fontFamily: "'Playfair Display', serif",
              color: '#0A1F44',
              lineHeight: '1.3'
            }}>
              Contact Us
            </h2>

            <p style={{
              margin: '0 0 40px 0',
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#4a5568',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Have questions, suggestions, or want to collaborate? We'd love to hear from you. Reach out for inquiries about partnerships, contributions, or general questions about the project.
            </p>

            <div style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#4a5568',
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: '40px'
            }}>
              <p style={{ margin: '0 0 16px 0' }}>
                <strong style={{ color: '#0A1F44' }}>Email:</strong>{' '}
                <a href="mailto:connect.youthinthediaspora@gmail.com" style={{ color: '#0A1F44', textDecoration: 'underline' }}>
                  connect.youthinthediaspora@gmail.com
                </a>
              </p>
              <p style={{ margin: '0' }}>
                <strong style={{ color: '#0A1F44' }}>Contribute:</strong> Use the "Add Pin" feature on the map to share your community's story
              </p>
            </div>

            <button
              onClick={onEnterMap}
              style={{
                padding: '18px 40px',
                fontSize: '17px',
                fontWeight: '700',
                fontFamily: "'Montserrat', sans-serif",
                background: 'linear-gradient(135deg, #0A1F44 0%, #1E3A5F 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(10, 31, 68, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(10, 31, 68, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(10, 31, 68, 0.3)';
              }}
            >
              Explore the Map
            </button>
          </div>
        </div>
      )}

      {/* Sources Page */}
      {typingComplete && activePage === 'sources' && (
        <div style={{ minHeight: '80vh', padding: '80px 0', background: '#FFFFFF' }}>
          <div style={{
            width: '95%',
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: '60px',
            paddingRight: '40px'
          }}>
            <h2 style={{
              margin: '0 0 40px 0',
              fontSize: '36px',
              fontWeight: '700',
              fontFamily: "'Playfair Display', serif",
              color: '#0A1F44',
              lineHeight: '1.3'
            }}>
              Sources
            </h2>

            <div style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#4a5568',
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: '40px'
            }}>
              <p style={{ margin: '0 0 20px 0' }}>
                <strong style={{ color: '#0A1F44' }}>Population Data:</strong> American Jewish Year Book, Jewish Virtual Library, local Jewish community organizations
              </p>
              <p style={{ margin: '0 0 20px 0' }}>
                <strong style={{ color: '#0A1F44' }}>Historical Events:</strong> United States Holocaust Memorial Museum, Yad Vashem, historical archives
              </p>
              <p style={{ margin: '0 0 20px 0' }}>
                <strong style={{ color: '#0A1F44' }}>Migration Data:</strong> HIAS, Jewish refugee organization records, immigration archives
              </p>
              <p style={{ margin: '0' }}>
                <strong style={{ color: '#0A1F44' }}>Cultural Information:</strong> Community contributions, historical societies, academic research
              </p>
            </div>

            <button
              onClick={onEnterMap}
              style={{
                padding: '18px 40px',
                fontSize: '17px',
                fontWeight: '700',
                fontFamily: "'Montserrat', sans-serif",
                background: 'linear-gradient(135deg, #0A1F44 0%, #1E3A5F 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(10, 31, 68, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(10, 31, 68, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(10, 31, 68, 0.3)';
              }}
            >
              Explore the Map
            </button>
          </div>
        </div>
      )}

      {/* Exhibit Page */}
      {typingComplete && activePage === 'exhibit' && (
        <div style={{ minHeight: '80vh', padding: isMobile ? '40px 0' : '80px 0', background: '#FFFFFF' }}>
          <div style={{
            width: '95%',
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : '60px',
            paddingRight: isMobile ? '20px' : '40px'
          }}>
            <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <h2 style={{
                margin: '0',
                fontSize: isMobile ? '28px' : '36px',
                fontWeight: '700',
                fontFamily: "'Playfair Display', serif",
                color: '#0A1F44',
                lineHeight: '1.3'
              }}>
                Art Exhibit
              </h2>
              <button
                onClick={() => { setActivePage('home'); window.location.hash = ''; }}
                style={{
                  padding: '10px 20px',
                  background: '#FFFFFF',
                  color: '#0A1F44',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', sans-serif"
                }}
              >
                ← Back to Home
              </button>
            </div>

            {/* About the Artist Section - Moved to Top */}
            <div style={{
              marginBottom: isMobile ? '60px' : '80px',
              paddingBottom: isMobile ? '40px' : '60px',
              borderBottom: '2px solid #E2E8F0'
            }}>
              <h3 style={{
                margin: '0 0 30px 0',
                fontSize: isMobile ? '24px' : '32px',
                fontWeight: '700',
                fontFamily: "'Playfair Display', serif",
                color: '#0A1F44',
                lineHeight: '1.3'
              }}>
                About the Artist
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
                gap: isMobile ? '30px' : '50px',
                alignItems: 'start'
              }}>
                {/* Artist Photo */}
                <div>
                  <img
                    src={`${import.meta.env.BASE_URL}historical/Zayda.png`}
                    alt="Zayda - Solomon S Richmond"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(10, 31, 68, 0.15)'
                    }}
                  />
                  <div style={{
                    marginTop: '16px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                      fontSize: '28px',
                      color: '#5a6a7a',
                      marginBottom: '4px'
                    }}>
                      Zayda
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#8a99a8',
                      fontFamily: "'Montserrat', sans-serif"
                    }}>
                      Solomon S Richmond
                    </div>
                  </div>
                </div>

                {/* Artist Bio */}
                <div>
                  <p style={{
                    margin: '0 0 20px 0',
                    fontSize: isMobile ? '15px' : '17px',
                    lineHeight: '1.8',
                    color: '#4a5568',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    Solomon was born in Zville (Zviahel), Ukraine in 1906 and passed in Boston, Massachusetts in 2006. Around 1912, he, his older sister Betty, and their mother decided to join their family who had already immigrated to America. He was only 6 years old when he traveled to America.
                  </p>
                  <p style={{
                    margin: '0 0 20px 0',
                    fontSize: isMobile ? '15px' : '17px',
                    lineHeight: '1.8',
                    color: '#4a5568',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    Zayda Solomon told stories about being snuck out of Ukraine in a donkey cart, hidden under blankets with his sister. He recalled his mother saying, "Shush! Shush! Be quiet or we will be found." Zayda, Betty, and their mother passed through Poland and thankfully arrived safely in America. Ever since, generations of his family have grown.
                  </p>
                  <p style={{
                    margin: '0 0 20px 0',
                    fontSize: isMobile ? '15px' : '17px',
                    lineHeight: '1.8',
                    color: '#4a5568',
                    fontFamily: "'Montserrat', sans-serif"
                  }}>
                    Around 1929 he began painting. Through his artwork, Zayda explores different artistic styles, periods, and themes of Jewish identity, diaspora, and cultural heritage.
                  </p>
                  <button
                    onClick={() => {
                      console.log('Button clicked! Calling onEnterMap');
                      onEnterMap({
                        migration: 'zayda-solomon',
                        showOnlyZayda: true
                      });
                    }}
                    style={{
                      padding: isMobile ? '12px 24px' : '14px 32px',
                      background: 'linear-gradient(135deg, #0A1F44 0%, #1E3A5F 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: "'Montserrat', sans-serif",
                      boxShadow: '0 4px 15px rgba(10, 31, 68, 0.3)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(10, 31, 68, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(10, 31, 68, 0.3)';
                    }}
                  >
                    View Zayda's Migration Journey on Map →
                  </button>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
              gap: isMobile ? '20px' : '30px'
            }}>
              {[
                { src: 'Menorah.png', title: null },
                { src: 'Mordechai.png', title: null },
                { src: 'Esther.png', title: null },
                { src: 'Watchmen.png', title: 'Watchmen Over Jerusalem Isaiah LXII' },
                { src: 'SimpleMenorah.png', title: null },
                { src: 'Einstein.png', title: null },
                { src: 'Painting1.png', title: null },
                { src: 'Painting3.png', title: null },
                { src: 'Painting4.png', title: null },
                { src: 'Painting5.png', title: null },
                { src: 'Painting6.png', title: null },
                { src: 'Painting7.png', title: null },
                { src: 'Painting8.png', title: null },
                { src: 'Painting9.png', title: null },
                { src: 'Painting10.png', title: null },
                { src: 'Painting11.png', title: null }
              ].map((image, index) => (
                <div
                  key={index}
                  style={{
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                  onClick={() => setFocusedPainting(image)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}historical/${image.src}`}
                    alt="Jewish diaspora artwork"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '12px 12px 0 0',
                      display: 'block'
                    }}
                  />
                  <div style={{
                    background: '#FAFBFC',
                    borderRadius: '0 0 12px 12px',
                    padding: isMobile ? '10px' : '16px',
                    borderTop: '1px solid #E2E8F0',
                    boxShadow: '0 2px 8px rgba(10, 31, 68, 0.08)'
                  }}>
                    {image.title && (
                      <h3 style={{
                        margin: '0 0 6px 0',
                        fontSize: isMobile ? '11px' : '14px',
                        fontWeight: '500',
                        fontFamily: "'Playfair Display', serif",
                        color: '#5a6a7a'
                      }}>
                        {image.title}
                      </h3>
                    )}
                    <p style={{
                      margin: '0 0 4px 0',
                      fontSize: isMobile ? '9px' : '11px',
                      color: '#8a99a8',
                      fontFamily: "'Montserrat', sans-serif"
                    }}>
                      Made in Boston, USA
                    </p>
                    <div style={{
                      fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                      fontSize: isMobile ? '13px' : '16px',
                      color: '#5a6a7a',
                      marginTop: '6px'
                    }}>
                      Zayda
                    </div>
                    <div style={{
                      fontSize: isMobile ? '8px' : '10px',
                      color: '#8a99a8',
                      fontFamily: "'Montserrat', sans-serif"
                    }}>
                      Solomon S Richmond (digital adaptation)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal/Lightbox for focused painting */}
      {focusedPainting && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: isMobile ? '20px' : '40px',
            cursor: 'pointer'
          }}
          onClick={() => setFocusedPainting(null)}
        >
          <div
            style={{
              maxWidth: '1200px',
              maxHeight: '90vh',
              width: '100%',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setFocusedPainting(null)}
              style={{
                position: 'absolute',
                top: isMobile ? '-35px' : '-45px',
                right: '0',
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: isMobile ? '28px' : '36px',
                cursor: 'pointer',
                fontWeight: '300',
                padding: '0',
                lineHeight: '1',
                zIndex: 10001
              }}
            >
              ×
            </button>

            {/* Painting image */}
            <img
              src={`${import.meta.env.BASE_URL}historical/${focusedPainting.src}`}
              alt="Jewish diaspora artwork"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '12px 12px 0 0',
                display: 'block'
              }}
            />

            {/* Caption box */}
            <div style={{
              background: '#FAFBFC',
              borderRadius: '0 0 12px 12px',
              padding: isMobile ? '16px' : '24px 32px',
              borderTop: '1px solid #E2E8F0',
              boxShadow: '0 4px 16px rgba(10, 31, 68, 0.2)'
            }}>
              {focusedPainting.title && (
                <h3 style={{
                  margin: '0 0 12px 0',
                  fontSize: isMobile ? '16px' : '20px',
                  fontWeight: '500',
                  fontFamily: "'Playfair Display', serif",
                  color: '#5a6a7a',
                  lineHeight: '1.3'
                }}>
                  {focusedPainting.title}
                </h3>
              )}
              <p style={{
                margin: '0 0 8px 0',
                fontSize: isMobile ? '13px' : '15px',
                color: '#8a99a8',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                Made in Boston, USA
              </p>
              <div style={{
                fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                fontSize: isMobile ? '20px' : '24px',
                color: '#5a6a7a',
                marginTop: '12px',
                marginBottom: '4px'
              }}>
                Zayda
              </div>
              <div style={{
                fontSize: isMobile ? '12px' : '13px',
                color: '#8a99a8',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                Solomon S Richmond
                <br />
                (digital adaptation)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UnifiedLanding;
