import React, { useState, useEffect } from 'react';
import HistoricalImageScroll from './HistoricalImageScroll';
import { useAuth } from '../contexts/AuthContext';
import { isConfigured } from '../firebase/config';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';

function UnifiedLanding({ onEnterMap }) {
  const { currentUser, userProfile, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignInClick = () => {
    if (!isConfigured) {
      alert('⚠️ Firebase is not configured yet!\n\nTo enable authentication:\n1. See FIREBASE_SETUP.md\n2. Create a Firebase project\n3. Add your config to src/firebase/config.js\n\nFor now, you can see the UI but authentication won\'t work.');
      return;
    }
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  const fullText = `The destruction of Gaza and the persistent conflation of Judaism with the state of Israel have caused division with Jewish communities. While some Jews have grown more unified in their support for Israel, others have agonized over the brutality inflicted upon Palestinians.

Many Jews have begun to grapple with a fundamental question in one form or another: Must Jewish identity be centered around a political state and political power?

Youth in the Diaspora (YID) offers an alternative to the narrative that political empowerment is requisite for Jewish religious and cultural survival. It presents an interactive and evolving repository of Jewish life in the diaspora throughout millennia of Jewish history and highlights the contributions of Jews to their societies, their communities, and to Judaism itself.

YID aims to connect young Jews who seek to celebrate their identity and history with others who share similar ethical principles.`;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 15);
      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
    }
  }, [currentIndex, fullText]);

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
        padding: '20px 0'
      }}>
        <div style={{
          width: '95%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: '60px',
          paddingRight: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <img
              src={import.meta.env.BASE_URL + 'logo.png'}
              alt="Youth in the Diaspora"
              style={{
                height: '40px',
                width: 'auto'
              }}
            />
            <span style={{
              fontSize: '20px',
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
            gap: '32px',
            alignItems: 'center'
          }}>
            <a
              href="#why-us"
              style={{
                fontSize: '16px',
                fontWeight: '500',
                fontFamily: "'Montserrat', sans-serif",
                color: '#4a5568',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#0A1F44'}
              onMouseOut={(e) => e.target.style.color = '#4a5568'}
            >
              Why Us
            </a>
            <a
              href="#contact"
              style={{
                fontSize: '16px',
                fontWeight: '500',
                fontFamily: "'Montserrat', sans-serif",
                color: '#4a5568',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#0A1F44'}
              onMouseOut={(e) => e.target.style.color = '#4a5568'}
            >
              Contact Us
            </a>
            <a
              href="#sources"
              style={{
                fontSize: '16px',
                fontWeight: '500',
                fontFamily: "'Montserrat', sans-serif",
                color: '#4a5568',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#0A1F44'}
              onMouseOut={(e) => e.target.style.color = '#4a5568'}
            >
              Sources
            </a>

            {/* Authentication UI */}
            {!currentUser ? (
              /* Not logged in - Show Sign In button */
              <button
                onClick={handleSignInClick}
                style={{
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #0A1F44 0%, #1E3A5F 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(10, 31, 68, 0.2)',
                  fontFamily: "'Montserrat', sans-serif",
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 31, 68, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(10, 31, 68, 0.2)';
                }}
              >
                Sign In
              </button>
            ) : (
              /* Logged in - Show user menu */
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    padding: '6px 12px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(10, 31, 68, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#0A1F44',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: '700',
                      fontFamily: "'Playfair Display', serif"
                    }}
                  >
                    {userProfile?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#0A1F44' }}>
                    {userProfile?.displayName || 'User'}
                  </span>
                  <span style={{ fontSize: '10px', color: '#4a5568' }}>▼</span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '8px',
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(10, 31, 68, 0.15)',
                      minWidth: '180px',
                      overflow: 'hidden',
                      zIndex: 100
                    }}
                  >
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowUserMenu(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#0A1F44',
                        cursor: 'pointer',
                        fontFamily: "'Montserrat', sans-serif",
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#F7FAFC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      View Profile
                    </button>

                    <div style={{ height: '1px', background: '#E2E8F0', margin: '4px 0' }} />

                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#DC2626',
                        cursor: 'pointer',
                        fontFamily: "'Montserrat', sans-serif",
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#FEE2E2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
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
          padding: '60px 40px'
        }}>
          <div style={{
            width: '95%',
            maxWidth: '800px'
          }}>
            <pre style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#1a1a1a',
              whiteSpace: 'pre-wrap',
              margin: '0',
              fontWeight: '400'
            }}>
              {displayedText}
            </pre>
          </div>
        </div>
      )}

      {/* Main Landing Content */}
      {typingComplete && (
        <div>
          {/* Hero Section */}
          <section style={{
            padding: '120px 0 80px',
            background: '#FFFFFF'
          }}>
            <div style={{
              width: '95%',
              maxWidth: '1200px',
              margin: '0 auto',
              paddingLeft: '60px',
              paddingRight: '40px'
            }}>
              <h1 style={{
                margin: '0 0 24px 0',
                fontSize: '48px',
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
                fontSize: '24px',
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

          {/* Banner Image */}
          <section style={{
            padding: '40px 0',
            background: '#FFFFFF'
          }}>
            <div style={{
              width: '95%',
              maxWidth: '1200px',
              margin: '0 auto',
              paddingLeft: '60px',
              paddingRight: '40px'
            }}>
              {/* Image */}
              <img
                src={import.meta.env.BASE_URL + 'banner-image.png'}
                alt="Watchmen Over Jerusalem Isaiah LXII"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px 12px 0 0',
                  boxShadow: '0 4px 20px rgba(10, 31, 68, 0.15)',
                  display: 'block'
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
                  gap: '12px'
                }}>
                  {/* Left: Title and Location */}
                  <div>
                    <h3 style={{
                      margin: '0 0 4px 0',
                      fontSize: '15px',
                      fontWeight: '500',
                      fontFamily: "'Playfair Display', serif",
                      color: '#5a6a7a',
                      lineHeight: '1.3'
                    }}>
                      Watchmen Over Jerusalem Isaiah LXII
                    </h3>
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
              </div>
            </div>
          </section>

          {/* Explore the Map Button */}
          <section style={{
            padding: '40px 0',
            background: '#FFFFFF'
          }}>
            <div style={{
              width: '95%',
              maxWidth: '1200px',
              margin: '0 auto',
              paddingLeft: '60px',
              paddingRight: '40px',
              display: 'flex',
              justifyContent: 'center'
            }}>
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
          </section>

          {/* Historical Image Scroll */}
          <HistoricalImageScroll />

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

          {/* Why Us */}
          <section id="why-us" style={{
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
                <p style={{ margin: '0' }}>
                  YID aims to connect young Jews who seek to celebrate their identity and history with others who share similar ethical principles.
                </p>
              </div>
            </div>
          </section>

          {/* Sources */}
          <section id="sources" style={{
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
                margin: '0 0 40px 0',
                fontSize: '32px',
                fontWeight: '700',
                fontFamily: "'Playfair Display', serif",
                color: '#0A1F44',
                lineHeight: '1.3'
              }}>
                Sources
              </h2>

              <div style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#4a5568',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                <p style={{ margin: '0 0 16px 0' }}>
                  <strong style={{ color: '#0A1F44' }}>Population Data:</strong> American Jewish Year Book, Jewish Virtual Library, local Jewish community organizations
                </p>
                <p style={{ margin: '0 0 16px 0' }}>
                  <strong style={{ color: '#0A1F44' }}>Historical Events:</strong> United States Holocaust Memorial Museum, Yad Vashem, historical archives
                </p>
                <p style={{ margin: '0 0 16px 0' }}>
                  <strong style={{ color: '#0A1F44' }}>Migration Data:</strong> HIAS, Jewish refugee organization records, immigration archives
                </p>
                <p style={{ margin: '0' }}>
                  <strong style={{ color: '#0A1F44' }}>Cultural Information:</strong> Community contributions, historical societies, academic research
                </p>
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section id="contact" style={{
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
                margin: '0 0 24px 0',
                fontSize: '32px',
                fontWeight: '700',
                fontFamily: "'Playfair Display', serif",
                color: '#0A1F44',
                lineHeight: '1.3'
              }}>
                Contact Us
              </h2>

              <p style={{
                margin: '0 0 32px 0',
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#4a5568',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                Have questions, suggestions, or stories to share? We'd love to hear from you.
              </p>

              <div style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#4a5568',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                <p style={{ margin: '0 0 12px 0' }}>
                  <strong style={{ color: '#0A1F44' }}>Email:</strong> contact@youthinthediaspora.org
                </p>
                <p style={{ margin: '0' }}>
                  <strong style={{ color: '#0A1F44' }}>Contribute:</strong> Use the "Add Pin" feature on the map to share your community's story
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section style={{
            padding: '80px 0',
            background: '#FFFFFF'
          }}>
            <div style={{
              width: '95%',
              maxWidth: '1200px',
              margin: '0 auto',
              paddingLeft: '60px',
              paddingRight: '40px',
              textAlign: 'center'
            }}>
              <h2 style={{
                margin: '0 0 24px 0',
                fontSize: '36px',
                fontWeight: '700',
                fontFamily: "'Playfair Display', serif",
                color: '#0A1F44',
                lineHeight: '1.3'
              }}>
                Ready to explore?
              </h2>
              <p style={{
                margin: '0 0 32px 0',
                fontSize: '18px',
                color: '#4a5568',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                Discover centuries of Jewish diaspora history
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
          </section>
        </div>
      )}

      {/* Modals */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showProfileModal && <UserProfile onClose={() => setShowProfileModal(false)} />}
    </div>
  );
}

export default UnifiedLanding;
