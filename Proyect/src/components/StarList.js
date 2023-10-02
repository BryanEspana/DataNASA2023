import { fetchFilteredStarData } from '../utils/starData.js';

export function StarList() {
    fetchFilteredStarData().then(data => {
        // Datos de la primera estrella filtrada
        const star = data[1]; 
        //star_name = nombre estrella
        document.getElementById("star-name").textContent = star[0];
        //número de exoplanetas orbitando al rededor de la estrella
        document.getElementById("st-ppnum").textContent = star[1];
        //Distancia en parsec
        document.getElementById("st_dist").textContent = star[2];
        // temperatura efectiva superficial en Kelvin
        document.getElementById("st_steff").textContent = star[3];
        //Radio en radios solares
        document.getElementById("st_rad").textContent = star[4];
        //Radio en masas solares
        document.getElementById("st_mass").textContent = star[4];
        //atracción gravitatoria de la estrella en la superficie (cm/s²)
        document.getElementById("st_logg").textContent = star[4];
        //edad de la estrella (GYr)
        document.getElementById("st_age").textContent = star[4];


        
    });
}