function setPlanetIndex(index) {
    localStorage.setItem('planetIndexLS',index.toString())
}

let starIndex;
if (localStorage.getItem('starIndex') !== null) {
    starIndex = parseInt(localStorage.getItem('starIndex'))
    console.log("Loaded starIndex from localStorage ", starIndex)
} else {
    starIndex = 0
    console.log("Initialized starIndex to 0")
}

const exoPlanetData = [
    [["tau Boo b","1.4","1.44","nan","15.6521"]],
    [["14 Her b","0.9","0.93","nan","17.9323"]],
    [["61 Vir b","0.94","0.96","nan","8.50332"],["61 Vir c","0.91","1.03","nan","8.50332"],["61 Vir d","0.94","0.96","nan","8.50332"]],
    [["alf Tau b","1.13","45.1","nan","20.4332"]],
    [["HD 27442 b","1.23","nan","nan","18.2704"]],
    [["SA-2977","1.04 UA","4.72 Tierras","1.68","10C"]]
]

function isValid3DIndex(matrix, x, y, z) {
    if (!Array.isArray(matrix)) return false;
    if (x < 0 || x >= matrix.length) return false;
    if (!Array.isArray(matrix[x])) return false;
    if (y < 0 || y >= matrix[x].length) return false;
    if (!Array.isArray(matrix[x][y])) return false;
    if (z < 0 || z >= matrix[x][y].length) return false;

    return true;
}

function displayInfoInSelector(){
    if (isValid3DIndex(exoPlanetData, starIndex, 0, 0)) {
        document.getElementById('exoplanet1name').textContent = exoPlanetData[starIndex][0][0];
    } else {
        document.getElementById('exoplanet1').style.visibility = "hidden";
    }

    if (isValid3DIndex(exoPlanetData, starIndex, 1, 0)) {
        document.getElementById('exoplanet2name').textContent = exoPlanetData[starIndex][1][0];
    }
    else {
        document.getElementById('exoplanet2').style.visibility = "hidden";
    }

    if (isValid3DIndex(exoPlanetData, starIndex, 2, 0)) {
        document.getElementById('exoplanet3name').textContent = exoPlanetData[starIndex][2][0];
    }
    else {
        document.getElementById('exoplanet3').style.visibility = "hidden";
    }
}

displayInfoInSelector();