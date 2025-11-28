import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import Timeline from './components/Timeline';
import CityInfoPanel from './components/CityInfoPanel';
import EventInfoPanel from './components/EventInfoPanel';
import EnhancedContributionForm from './components/EnhancedContributionForm';
import UnifiedLanding from './components/UnifiedLanding';
import ThematicSelector from './components/ThematicSelector';
import { citiesData, availableYears, getPopulationForYear } from './data/populationData';
import { getEventsForYear } from './data/historicalEvents';
import { migrationFlows } from './data/migrationFlows';
import { migrationRoutes } from './data/migrationData';
import { getGlobalPopulation } from './data/globalPopulationData';
import './App.css';

function App() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showContributionForm, setShowContributionForm] = useState(false);
  const [showMigrations, setShowMigrations] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [pinPlacementMode, setPinPlacementMode] = useState(false);
  const [userPins, setUserPins] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [highlightedCities, setHighlightedCities] = useState([]);
  const [activeMigrations, setActiveMigrations] = useState([]);
  const [zaydaMode, setZaydaMode] = useState(false);
  const [zaydaCities, setZaydaCities] = useState([]);

  // Load contributions and pins from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('jewishMapContributions');
    if (saved) {
      try {
        setContributions(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading contributions:', e);
      }
    }

    const savedPins = localStorage.getItem('jewishMapUserPins');
    if (savedPins) {
      try {
        setUserPins(JSON.parse(savedPins));
      } catch (e) {
        console.error('Error loading pins:', e);
      }
    }
  }, []);

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setSelectedEvent(null);
    setShowContributionForm(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedCity(null);
    setShowContributionForm(false);
  };

  const handleClosePanel = () => {
    setSelectedCity(null);
  };

  const handleCloseEventPanel = () => {
    setSelectedEvent(null);
  };

  const handleShowContributeForm = () => {
    setShowContributionForm(true);
  };

  const handleCloseContributeForm = () => {
    setShowContributionForm(false);
  };

  const handleSubmitContribution = (contribution) => {
    const updated = [...contributions, contribution];
    setContributions(updated);
    localStorage.setItem('jewishMapContributions', JSON.stringify(updated));
    setShowContributionForm(false);
    alert('Thank you for your contribution! It has been saved locally.');
  };

  const handlePlacePin = (lat, lng) => {
    const newPin = {
      id: Date.now(),
      coordinates: [lat, lng],
      timestamp: Date.now(),
      name: 'Custom Location'
    };
    console.log('Creating new pin at:', lat, lng);
    console.log('Pin coordinates array:', [lat, lng]);
    const updated = [...userPins, newPin];
    console.log('Total pins:', updated.length);
    setUserPins(updated);
    localStorage.setItem('jewishMapUserPins', JSON.stringify(updated));
    setPinPlacementMode(false);

    // Open info panel for this pin (user can click button to open contribution form)
    setSelectedCity(newPin);
    setSelectedEvent(null);
  };

  const handleTogglePinMode = () => {
    setPinPlacementMode(!pinPlacementMode);
    setSelectedCity(null);
    setSelectedEvent(null);
  };

  const handleClearPins = () => {
    if (window.confirm('Are you sure you want to clear all your custom pins?')) {
      setUserPins([]);
      localStorage.removeItem('jewishMapUserPins');
      setSelectedCity(null);
    }
  };

  const getCityContributions = (cityId) => {
    return contributions.filter(c => c.cityId === cityId);
  };

  const activeEvents = getEventsForYear(selectedYear);

  console.log('App render - showLanding:', showLanding, 'zaydaMode:', zaydaMode, 'zaydaCities:', zaydaCities.length);

  const handleEnterMap = (options = {}) => {
    console.log('handleEnterMap called with options:', options);

    // Handle Zayda's migration journey
    if (options.showOnlyZayda) {
      // Create custom city markers for Zayda's journey
      const journeyCities = [
        {
          id: 'zviahel-ukraine',
          name: 'Zviahel, Ukraine',
          coordinates: [50.2547, 27.7528],
          country: 'Ukraine',
          populationData: { 1912: 5000 }
        },
        {
          id: 'warsaw-poland',
          name: 'Warsaw, Poland',
          coordinates: [52.2297, 21.0122],
          country: 'Poland',
          populationData: { 1912: 10000 }
        },
        {
          id: 'malden-massachusetts',
          name: 'Malden, Massachusetts',
          coordinates: [42.4252, -71.0720],
          country: 'United States',
          populationData: { 1912: 3000 }
        }
      ];

      // Create Zayda's migration route with stop in Poland
      const zaydaMigration = [
        {
          id: 'zayda-journey-1',
          name: "Zayda Solomon's Journey - Ukraine to Poland",
          from: {
            lat: 50.2547,
            lon: 27.7528,
            name: 'Zviahel, Ukraine'
          },
          to: {
            lat: 52.2297,
            lon: 21.0122,
            name: 'Warsaw, Poland'
          },
          startYear: 1912,
          endYear: 1912,
          volume: 'small',
          description: 'Hidden in a donkey cart under blankets with his sister Betty and mother, escaping Ukraine.'
        },
        {
          id: 'zayda-journey-2',
          name: "Zayda Solomon's Journey - Poland to America",
          from: {
            lat: 52.2297,
            lon: 21.0122,
            name: 'Warsaw, Poland'
          },
          to: {
            lat: 42.4252,
            lon: -71.0720,
            name: 'Malden, Massachusetts'
          },
          startYear: 1912,
          endYear: 1912,
          volume: 'small',
          description: 'Journey across the Atlantic to join family in America.'
        }
      ];

      console.log('Setting Zayda mode with cities:', journeyCities);
      console.log('Setting migrations:', zaydaMigration);

      // Set all state and immediately hide landing
      setZaydaCities(journeyCities);
      setZaydaMode(true);
      setSelectedYear(1912);
      setShowMigrations(true);
      setActiveMigrations(zaydaMigration);
      setHighlightedCities([]);
      setShowLanding(false);
    } else {
      setShowLanding(false);
    }
  };

  const handleTopicSelect = (topic, topicKey) => {
    if (!topic) {
      // Clear topic mode
      setActiveTopic(null);
      setHighlightedCities([]);
      setActiveMigrations([]);
      // Don't force migrations off - let user control it
      return;
    }

    setActiveTopic(topic);
    setHighlightedCities(topic.cities);

    // Set year to focus year for this topic
    setSelectedYear(topic.focusYear);

    // Handle custom migrations (from community/city search)
    if (topic.customMigrations && topic.customMigrations.length > 0) {
      setActiveMigrations(topic.customMigrations);
      setShowMigrations(true); // Auto-show migrations for search results
    }
    // Filter migrations for this topic's theme
    else if (topic.migrationTheme) {
      const relevantMigrations = migrationFlows
        .filter(flow => flow.theme === topic.migrationTheme)
        .map(flow => ({
          // Transform migrationFlows structure to match migrationRoutes structure
          id: flow.id,
          name: flow.name,
          from: {
            lat: flow.fromCoords[0],
            lon: flow.fromCoords[1],
            name: flow.from
          },
          to: {
            lat: flow.toCoords[0],
            lon: flow.toCoords[1],
            name: flow.to
          },
          startYear: flow.period[0],
          endYear: flow.period[1],
          volume: flow.volume,
          description: flow.description
        }));
      setActiveMigrations(relevantMigrations);
      setShowMigrations(true); // Auto-show migrations for topics
    } else {
      setActiveMigrations([]);
    }
  };

  return (
    <div className="app">
      {showLanding && <UnifiedLanding onEnterMap={handleEnterMap} />}

        {!showLanding && (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
          {/* Thematic Selector */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '80px',
            zIndex: 1000
          }}>
            <ThematicSelector
              onTopicSelect={handleTopicSelect}
              hasActiveTheme={highlightedCities.length > 0}
            />
          </div>

          <MapView
            cities={zaydaMode ? zaydaCities : citiesData}
            selectedYear={selectedYear}
            onCityClick={handleCityClick}
            onEventClick={handleEventClick}
            showMigrations={showMigrations}
            pinPlacementMode={pinPlacementMode}
            onPlacePin={handlePlacePin}
            userPins={userPins}
            highlightedCities={highlightedCities}
            activeMigrations={activeMigrations}
            zaydaMode={zaydaMode}
          />

          {/* Bottom Left Control Cluster */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            zIndex: 1000,
            width: '45%',
            maxWidth: '400px'
          }}>
            {/* Control Buttons Row */}
            <div style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}>
              {/* Migration toggle button */}
              <button
                onClick={() => setShowMigrations(!showMigrations)}
                style={{
                  padding: '10px 16px',
                  background: showMigrations ? '#0A1F44' : 'rgba(255, 255, 255, 0.95)',
                  color: showMigrations ? '#FFFFFF' : '#0A1F44',
                  border: '1px solid rgba(10, 31, 68, 0.2)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(10, 31, 68, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Montserrat', sans-serif",
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => {
                  if (showMigrations) {
                    e.target.style.background = '#1E3A5F';
                  } else {
                    e.target.style.background = '#F7FAFC';
                  }
                }}
                onMouseOut={(e) => {
                  if (showMigrations) {
                    e.target.style.background = '#0A1F44';
                  } else {
                    e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                  }
                }}
              >
                {showMigrations ? '✓ ' : ''}Migrations
              </button>

              {/* Stats toggle button */}
              <button
                onClick={() => setShowStats(!showStats)}
                style={{
                  padding: '10px 16px',
                  background: showStats ? '#0A1F44' : 'rgba(255, 255, 255, 0.95)',
                  color: showStats ? '#FFFFFF' : '#0A1F44',
                  border: '1px solid rgba(10, 31, 68, 0.2)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(10, 31, 68, 0.15)',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Montserrat', sans-serif",
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => {
                  if (showStats) {
                    e.target.style.background = '#1E3A5F';
                  } else {
                    e.target.style.background = '#F7FAFC';
                  }
                }}
                onMouseOut={(e) => {
                  if (showStats) {
                    e.target.style.background = '#0A1F44';
                  } else {
                    e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                  }
                }}
              >
                {showStats ? 'Hide Stats' : 'Show Stats'}
              </button>

              {/* How to Use button */}
              <button
                onClick={() => setShowHowToUse(true)}
                style={{
                  padding: '10px 16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#0A1F44',
                  border: '1px solid rgba(10, 31, 68, 0.2)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(10, 31, 68, 0.15)',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Montserrat', sans-serif",
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#F7FAFC';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                }}
              >
                How to Use
              </button>

              {/* Stats Panel - Compact */}
              {showStats && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(10, 31, 68, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 8px rgba(10, 31, 68, 0.15)'
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#0A1F44',
                        fontFamily: "'Montserrat', sans-serif",
                        lineHeight: '1'
                      }}>
                        {getGlobalPopulation(selectedYear).toLocaleString()}
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#4a5568',
                        fontFamily: "'Montserrat', sans-serif",
                        textTransform: 'uppercase',
                        marginTop: '4px',
                        fontWeight: '500'
                      }}>
                        Global Pop
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#0A1F44',
                        fontFamily: "'Montserrat', sans-serif",
                        lineHeight: '1'
                      }}>
                        {citiesData.length}
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#4a5568',
                        fontFamily: "'Montserrat', sans-serif",
                        textTransform: 'uppercase',
                        marginTop: '4px',
                        fontWeight: '500'
                      }}>
                        Cities
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#0A1F44',
                        fontFamily: "'Montserrat', sans-serif",
                        lineHeight: '1'
                      }}>
                        {contributions.length}
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: '#4a5568',
                        fontFamily: "'Montserrat', sans-serif",
                        textTransform: 'uppercase',
                        marginTop: '4px',
                        fontWeight: '500'
                      }}>
                        Contrib
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline - Always full width */}
            <Timeline
              years={availableYears}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
          </div>

          {/* Pin placement buttons - Top Right */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '10px',
            zIndex: 1000
          }}>
            <button
              onClick={handleTogglePinMode}
              style={{
                padding: '10px 16px',
                background: pinPlacementMode ? '#0A1F44' : 'rgba(255, 255, 255, 0.95)',
                color: pinPlacementMode ? '#FFFFFF' : '#0A1F44',
                border: '1px solid rgba(10, 31, 68, 0.2)',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(10, 31, 68, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
                fontFamily: "'Montserrat', sans-serif",
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                if (pinPlacementMode) {
                  e.target.style.background = '#1E3A5F';
                } else {
                  e.target.style.background = '#F7FAFC';
                }
              }}
              onMouseOut={(e) => {
                if (pinPlacementMode) {
                  e.target.style.background = '#0A1F44';
                } else {
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                }
              }}
            >
              {pinPlacementMode ? 'Click Map to Place' : 'Add Pin'}
            </button>

            {/* Clear pins button */}
            {userPins.length > 0 && (
              <button
                onClick={handleClearPins}
                style={{
                  padding: '10px 16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#4a5568',
                  border: '1px solid rgba(10, 31, 68, 0.2)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(10, 31, 68, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Montserrat', sans-serif",
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#F7FAFC';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                }}
              >
                Clear ({userPins.length})
              </button>
            )}
          </div>
        </div>
      )}

      {selectedCity && (
        <CityInfoPanel
          city={selectedCity}
          selectedYear={selectedYear}
          onClose={handleClosePanel}
          onShowContributeForm={handleShowContributeForm}
        />
      )}

      {selectedEvent && (
        <EventInfoPanel
          event={selectedEvent}
          onClose={handleCloseEventPanel}
        />
      )}

      {showContributionForm && selectedCity && (
        <EnhancedContributionForm
          city={selectedCity}
          onClose={handleCloseContributeForm}
          onSubmit={handleSubmitContribution}
        />
      )}

      {/* How to Use Modal */}
      {showHowToUse && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10001,
          padding: '20px'
        }}
        onClick={() => setShowHowToUse(false)}
        >
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '40px',
            position: 'relative',
            boxShadow: '0 10px 40px rgba(10, 31, 68, 0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowHowToUse(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#F7FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#4a5568',
                padding: '0',
                lineHeight: '1',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#E2E8F0';
                e.target.style.color = '#0A1F44';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#F7FAFC';
                e.target.style.color = '#4a5568';
              }}
            >
              ×
            </button>

            <h2 style={{
              margin: '0 0 40px 0',
              fontSize: '32px',
              fontWeight: '700',
              fontFamily: "'Playfair Display', serif",
              color: '#0A1F44',
              lineHeight: '1.3'
            }}>
              How to Use the Map
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '30px'
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
                  fontSize: '15px',
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
                  fontSize: '15px',
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
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: '#4a5568',
                  fontFamily: "'Montserrat', sans-serif"
                }}>
                  Toggle migration routes to see movement patterns across centuries
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
