function setPlanetToLoad(index, starIndex, planetIndex) {
    localStorage.setItem('planetToLoad',index.toString())
    localStorage.setItem('starIndex',starIndex.toString())
    localStorage.setItem('planetIndexLS',planetIndex.toString())
}
