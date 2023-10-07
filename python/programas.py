
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
[7] pl_orbper = Periodo orbital (días) ----
[8] pl_orbsmax = Orbita en el semi-eje mayor AU ----
[9] pl_rade = Radio del planeta (Tierras) ----
[10] pl_masse = Masa del planeta (Tierras) ----
[11] pl_orbeccen = Eccentricidad ----
[12] pl_insol = Flujo de insolación [earth Flux]
[13] pl_eqt = Temperatura de quilibrio , planeta modelado como puerpo negro y calentado solo por la estrella
[14] pl_rvamp = Amplitud de velocidad radial [m/s]
[15] st_spectype = Tipo espectral de la estrella
[16] st_teff = Temperatura efectiva [K] ----
[17] st_rad = Radio [Solares] ----
[18] st_mass = Masa [Solares] ----
[19] st_met = Metalicidad [Dex] 
[20] st_metratio = Ratio de metalicidad [Fe/H] 
[21] st_lum = Luminosidad [log(solar)] 
[22] st_age = Edad de la estrella [GYr] ----
[23] sy_dist = Distancia al sistema planetario [pc]----

'''
import math
import pandas as pd
import numpy as np
import requests
from io import StringIO

#Estrellas a utilizar
Stars = ['alf Tau','HD 27442', '14 Her','61 Vir','tau Boo']
#Lista para guardar info de las estrellas que queremos
Final_Stars = []

url = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,hd_name,hip_name,sy_snum,disc_year,pl_refname,pl_orbper,pl_orbsmax,pl_rade,pl_masse,pl_orbeccen,pl_insol,pl_eqt,pl_rvamp,st_spectype,st_teff,st_rad,st_mass,st_met,st_metratio,st_lum,st_age,sy_dist+from+ps&format=csv'
response = requests.get(url)
if response.status_code != 200:
    raise ValueError(f"Error: Unable to fetch data from API. Status code: {response.status_code}")

data_io = StringIO(response.text)
df = pd.read_csv(data_io)
Data_Sys = df.values.tolist()



#quitando ' " ' de los conjuntos de datos
for i in range(len(Data_Sys)):
    for x in range(len(Data_Sys[i])):
        temp = Data_Sys[i][x]
        if isinstance(temp, str):  # Asegura que el dato es un string antes de usar 'strip()'
            temp = temp.strip('"')
            Data_Sys[i][x] = temp

#extrayendo toda la información de las estrellas a utilizar
for i in range(len(Data_Sys)):
    temp_data = Data_Sys[i]
    #se extrae el nombre de la estrella en cada sublista
    name_data = temp_data[1]
    
    #se ocupara con el nombre de las que queremos
    for x in range(len(Stars)):
        temp_stars = Stars[x]
         #si coincide se pasan los datos de la estrella
        if temp_stars == name_data:
            Final_Stars.append(temp_data)

#impresión            
for i in range(len(Final_Stars)):
    print(f'{Final_Stars[i][1]} -- ["{Final_Stars[i][0]}","{Final_Stars[i][18]}","{Final_Stars[i][17]}","{Final_Stars[i][13]}","{Final_Stars[i][23]}"]')
    
#----------------- Código para generar el color de cada una de las estrellas

        