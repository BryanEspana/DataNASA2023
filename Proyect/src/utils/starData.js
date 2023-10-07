// starData.js
export async function fetchAndFilterStars() {
    try {
      const response = await fetch('https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=missionstars&select=distinct%20star_name,hd_name,tm_name,st_ppnum,st_dist,st_teff,st_rad,st_mass,st_logg,st_age&limit=10');
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
  
  window.addEventListener('DOMContentLoaded', async () => {
    const allStars = await fetchAndFilterStars();
    const selectElement = document.getElementById('starResults');
    const noResultsElement = document.getElementById("noResults");

    const inputSearch = document.querySelector('input[placeholder="SEARCH STAR"]');
    inputSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        // Si el término de búsqueda está vacío
        if (!searchTerm) {
            selectElement.style.display = 'none';  // Escondemos el <select>
            noResultsElement.style.display = 'none';  // Escondemos el mensaje de "No se encontraron resultados"
            return;
        }

        const filteredStars = allStars.filter(starData => starData[0].toLowerCase().includes(searchTerm));

        if (filteredStars.length > 0) {
            selectElement.style.display = 'block';  // Mostramos el <select>
            noResultsElement.style.display = 'none';

            // Limpiamos el contenido anterior del select
            selectElement.innerHTML = '';

            // Añadimos las estrellas filtradas al select
            for (let star of filteredStars) {
                const option = document.createElement('option');
                option.value = star[0];
                option.textContent = star[0];
                selectElement.appendChild(option);
            }
        } else {
            selectElement.style.display = 'none';  // Escondemos el <select>
            noResultsElement.style.display = 'block';  // Mostramos el mensaje de "No se encontraron resultados"
        }
    });

    selectElement.addEventListener('change', function() {
      const selectedStarName = this.value;
    
      // Si la opción por defecto es seleccionada, simplemente regresa y no hagas nada.
      if (!selectedStarName) return;
      
      // Resto del código...
      const selectedStar = allStars.find(star => star[0] === selectedStarName);
      if (selectedStar) {
          currentIndex = allStars.indexOf(selectedStar);
          displayStarInfo(selectedStar);
      }
  });
  return FinalStars;  // por ejemplo, si quieres que la función retorne la lista FinalStars

});

