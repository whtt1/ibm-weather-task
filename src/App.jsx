import { useState, useEffect } from 'react';
import { 
    Grid, Column, ComboBox, Tile, Tag, Loading, 
    Header, HeaderName 
} from '@carbon/react';
import { trackCityView, getTopCities } from './storage';
import './App.scss';

const App = () => {
    const [items, setItems] = useState([]);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [topCities, setTopCities] = useState([]);

    useEffect(() => {
        setTopCities(getTopCities());
    }, []);

    const handleInputChange = async (input) => {
      const query = typeof input === 'string' ? input : input?.target?.value;

      if (!query || query.length < 3) return;

      try {
          const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`);
          const data = await res.json();
          
          if (data.results) {
              setItems(data.results.map(c => ({
                  id: `${c.latitude}-${c.longitude}`,
                  label: `${c.name}, ${c.country}`,
                  name: c.name,
                  latitude: c.latitude,
                  longitude: c.longitude
              })));
          }
      } catch (err) { 
          console.error("Geocoding fetch failed:", err); 
      }
    };

    const handleSelection = async (data) => {
        const city = data.selectedItem;
        if (!city) return;

        setLoading(true);
        
        fetch('http://localhost:5000/api/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city: city.name })
        });

        trackCityView(city.name);
        setTopCities(getTopCities());

        try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&daily=temperature_2m_max,relative_humidity_2m_max,windspeed_10m_max&timezone=auto`);
            const forecast = await res.json();
            setWeather({ name: city.name, ...forecast });
        } catch (err) { console.error("Weather error", err); }
        
        setLoading(false);
    };

    return (
        <div className="container">
            <Header aria-label="IBM Weather">
                <HeaderName href="#" prefix="IBM">Weather</HeaderName>
            </Header>

            <Grid className="main-content">
                <Column lg={12} md={8} sm={4}>
                    <div className="search-section">
                        <ComboBox
                            id="city-search"
                            titleText="Search City"
                            placeholder="Type a city (e.g., Vilnius)"
                            items={items}
                            onInputChange={handleInputChange}
                            onChange={({ selectedItem }) => handleSelection({ selectedItem })}
                            initialSelectedItem={null}
                        />
                        
                        <div className="top-cities-section">
                            <p>Most Viewed:</p>
                            {topCities.map(name => (
                                <Tag key={name} type="blue">{name}</Tag>
                            ))}
                        </div>
                    </div>

                    {loading && <Loading withOverlay={false} />}

                    {weather && !loading && (
                        <div className="weather-results">
                            <Tile className="current-weather">
                                <h2>{weather.name}</h2>
                                <h1 className="temp-main">{weather.current_weather.temperature}°C</h1>
                                <p>Wind: {weather.current_weather.windspeed} km/h</p>
                            </Tile>

                            <h4 style={{ margin: '1.5rem 0' }}>5-Day Forecast</h4>
                            <div className="forecast-grid">
                                {weather.daily.time.slice(0, 5).map((date, i) => (
                                    <Tile key={date} className="forecast-card">
                                        <strong>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</strong>
                                        <p>{weather.daily.temperature_2m_max[i]}°C</p>
                                    </Tile>
                                ))}
                            </div>
                        </div>
                    )}
                </Column>
            </Grid>
        </div>
    );
};

export default App;