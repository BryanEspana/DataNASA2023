import requests

'''
SIgnificado de las columntas

star_name = nombre estrella
hd_name = Código de la estrella en cifrado HD
tm_name = Código de la estrella con 2mass
st-ppnum = número de exoplanetas orbitando al rededor de la estrella
st_dist = Distancia en parsec
st_steff = temperatura efectiva superficial en Kelvin
st_rad = Radio en radios solares
st_mass = Radio en masas solares
st_logg = atracción gravitatoria de la estrella en la superficie (cm/s²)
st_age = edad de la estrella (GYr)

'''


#Estrellas a utilizar
Stars = ['HIP 49669','Fomalhaut', 'alf Cen A','alf Ari','HIP 61084']
#Lista para guardar info de las estrellas que queremos
Final_Stars = []
url = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=missionstars&select=distinct%20star_name,hd_name,tm_name,st_ppnum,st_dist,st_teff,st_rad,st_mass,st_logg,st_age'
response = requests.get(url)
response.raise_for_status()  
#se pasa toda la base de datos a una listalineas 
lineas = response.text.strip().split("\n")

Datos = [linea.split(",") for linea in lineas]

#abrir el archivo y separar todas las columnas separandolas por coma y guardandolas en sub-listas





#Primero separar el nombre de las columnas a utilizar
Final_Stars.append(Datos[0])    
#separando las estrellas a utilizar

#se accede a la sublista
for i in range(len(Datos)):
    
    temp_datos = Datos[i]
    #se extrae el nombre de la estrella en cada sublista
    Nombre_datos = temp_datos[0]
    
    #se ocmpara con el nombre de las que queremos
    for x in range(len(Stars)):
        temp_stars = Stars[x]
         #si coincide se pasan los datos de la estrella
        if temp_stars == Nombre_datos:
            Final_Stars.append(temp_datos)

for i in range(len(Final_Stars)):
    print(Final_Stars[i])
            


            
            
        


    


    