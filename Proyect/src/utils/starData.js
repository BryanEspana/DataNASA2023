// starData.js
export async function fetchAndFilterStars() {
    try {
      const response = await fetch('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=missionstars&select=distinct%20star_name,hd_name,tm_name,st_ppnum,st_dist,st_teff,st_rad,st_mass,st_logg,st_age');
      const data = await response.text();
      const lines = data.trim().split('\n');
      const starsData = lines.map(line => line.split(','));
      return filterStars(starsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  function filterStars(starsData) {
    const targetStars = ['HIP 49669', 'Fomalhaut', 'alf Cen A', 'alf Ari', 'HIP 61084'];
    return starsData.filter(starData => targetStars.includes(starData[0]));
  }
  
  