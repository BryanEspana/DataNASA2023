import axios from 'axios';

const Stars = ['alf Tau','HD 27442', '14 Her','61 Vir','tau Boo'];

export async function fetchStarData() {
    const response = await fetch('https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,hd_name,hip_name,sy_snum,disc_year,pl_refname,pl_orbper,pl_orbsmax,pl_rade,pl_masse,pl_orbeccen,pl_insol,pl_eqt,pl_rvamp,st_spectype,st_teff,st_rad,st_mass,st_met,st_metratio,st_lum,st_age,sy_dist+from+ps&format=csv');
    const data = await response.text();
    return data;
}

