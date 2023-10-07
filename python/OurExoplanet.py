'''
SIgnificado de las columnas


---Tabla Sistema Planetario
[0] pl_name = Nombre del Planeta
[1] hostname = Nombre de la estrella más comúnmente llamada
[2] hd_name = codigo HD
[3] hip_name = Código HIP
[4] sy_snum = Número de estrellas en el sistema planetario
[5] disc_year = Año de descubrimiento del planeta 
[6] pl_refname = Referencia del año de de descubrimiento
[7] pl_orbper = Periodo orbital (días) 
[8] pl_orbsmax = Orbita en el semi-eje mayor AU 
[9] pl_rade = Radio del planeta (Tierras) 
[10] pl_masse = Masa del planeta (Tierras) 
[11] pl_orbeccen = Eccentricidad 
[12] pl_insol = Flujo de insolación [earth Flux]
[13] pl_eqt = Temperatura de quilibrio , planeta modelado como puerpo negro y calentado solo por la estrella
[14] pl_rvamp = Amplitud de velocidad radial [m/s]
[15] st_spectype = Tipo espectral de la estrella
[16] st_teff = Temperatura efectiva [K] 
[17] st_rad = Radio [Solares] 
[18] st_mass = Masa [Solares] 
[19] st_met = Metalicidad [Dex] 
[20] st_metratio = Ratio de metalicidad [Fe/H] 
[21] st_lum = Luminosidad [log(solar)] 
[22] st_age = Edad de la estrella [GYr] 
[23] sy_dist = Distancia al sistema planetario [pc

---- Sub-lista de estrellas creadas 

[0] hostname = Nombre de la estrella más comúnmente llamada
[1] hd_name = codigo HD
[2] hip_name = Código HIP
[3] sy_snum = Número de estrellas en el sistema planetario
[4] st_spectype = Tipo espectral de la estrella
[5] st_teff = Temperatura efectiva [K] 
[6] st_rad = Radio [Solares] 
[7] st_mass = Masa [Solares] 
[8] st_met = Metalicidad [Dex] 
[9] st_metratio = Ratio de metalicidad [Fe/H] 
[10] st_lum = Luminosidad [log(solar)] 
[11] st_age = Edad de la estrella [GYr] 
[12] sy_dist = Distancia al sistema planetario [pc]
'''
import math
import pandas as pd
import numpy as np
import requests
from io import StringIO


response = requests.get('https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,hd_name,hip_name,sy_snum,disc_year,pl_refname,pl_orbper,pl_orbsmax,pl_rade,pl_masse,pl_orbeccen,pl_insol,pl_eqt,pl_rvamp,st_spectype,st_teff,st_rad,st_mass,st_met,st_metratio,st_lum,st_age,sy_dist+from+ps&format=csv')  # Cambia 'URL_DE_LA_API_AQUI' por la URL real de la API
csv_data = response.text

data_io = StringIO(csv_data)
df = pd.read_csv(data_io)

Data_Sys = df.values.tolist()
        
for i in range(len(Data_Sys)):
    for x in range(len(Data_Sys[i])):
        temp = Data_Sys[i][x]
        if isinstance(temp, str):  # Verifica si el objeto es una cadena
            temp = temp.strip('"')
        Data_Sys[i][x] = temp
#---------- determinando estrella más adecuada
#Rango de luminosidad basados en el del sol
lum_min = 0.5
lum_max = 1.5

Stars_1 = []

for i in range(len(Data_Sys)):
    temp = Data_Sys[i]
    temp_list = []
    lum = 0
    try:
        lum = 10**(float(temp[21]))
    except:
        pass
    
    if lum <= lum_max and lum >= lum_min:
        
        Stars_1.append([temp[1],temp[2],temp[3],temp[4],temp[15],temp[16],temp[17],temp[18],temp[19],temp[20],temp[21],temp[22],temp[23]])
    

#filtrando por temperatura efectiva parecida a la del sol
teff_min = 5200
teff_max= 6000

mass_min = 0.8
mass_max = 1.2

met_max = 0.014
met_min = 0.010

Stars_2 = []
for i in range(len(Stars_1)):
    temp = Stars_1[i]
    teff = 0
    mass = 0
    met = 0
    
    try:
        teff = float(temp[5])
        mass = float(temp[7])
        met = float(temp[8])
    except:
        pass
    
    if teff <= teff_max and teff >= teff_min and mass <= mass_max and mass >= mass_min and met <= met_max and met >= met_min:
        Stars_2.append(temp)
#Calculando la distancia efectiva a la que debería estar un planeta dada la estrella

def HZ_dist(L):
    d = (L/1)**(1/2)
    return d

Stars_2_final = []
for temp in Stars_2:
    lum = 10**(float(temp[10]))
    dist = HZ_dist(lum)
    temp_with_dist = temp + [dist]
    Stars_2_final.append(temp_with_dist)
n = 10  # Puedes cambiar este valor al número de filas que desees imprimir
for row in Data_Sys[:n]:
    print(row)

if len(Stars_2_final) > 18:
    print(Stars_2_final[18])
else:
    print("Stars_2_final tiene menos de 19 elementos.")

for star in Stars_2_final:
    print(star)
