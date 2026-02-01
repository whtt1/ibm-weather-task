const STORAGE_KEY = 'weather_city_views';

export const trackCityView = (cityName) => {
    const views = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    views[cityName] = (views[cityName] || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
};

export const getTopCities = () => {
    const views = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return Object.entries(views)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([name]) => name);
};