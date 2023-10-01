
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



import math
import pandas as pd
import numpy as np


#Estrellas a utilizar
Stars = ['HIP 49669','Fomalhaut', 'alf Cen A','alf Ari','HIP 61084']
#Lista para guardar info de las estrellas que queremos
Final_Stars = []

#se pasa toda la base de datos a una lista
Datos = []

#abrir el archivo y separar todas las columnas separandolas por coma y guardandolas en sub-listas
with open("info estrellas.txt", "r") as datos:
    
    for linea in datos:
        Datos.append([(x) for x in linea.strip().split(",")])
    


    
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
    

#------------- Inicio de código para el cambio de color
            
cte_Wein = 0.0028976#constante de la Ley de wein

t_eff = []
name = []

for i in range(len(Final_Stars)):
    name_ = Final_Stars[i][0]
    temperature = float(Final_Stars[i][5])
    
    name.append(name_)
    t_eff.append(temperature)
    


def convert_K_to_RGB(colour_temperature):
    """
    Converts from K to RGB, algorithm courtesy of 
    http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
    """
    #range check
    if colour_temperature < 1000: 
        colour_temperature = 1000
    elif colour_temperature > 40000:
        colour_temperature = 40000
    
    tmp_internal = colour_temperature / 100.0
    
    # red 
    if tmp_internal <= 66:
        red = 255
    else:
        tmp_red = 329.698727446 * math.pow(tmp_internal - 60, -0.1332047592)
        if tmp_red < 0:
            red = 0
        elif tmp_red > 255:
            red = 255
        else:
            red = tmp_red
    
    # green
    if tmp_internal <=66:
        tmp_green = 99.4708025861 * math.log(tmp_internal) - 161.1195681661
        if tmp_green < 0:
            green = 0
        elif tmp_green > 255:
            green = 255
        else:
            green = tmp_green
    else:
        tmp_green = 288.1221695283 * math.pow(tmp_internal - 60, -0.0755148492)
        if tmp_green < 0:
            green = 0
        elif tmp_green > 255:
            green = 255
        else:
            green = tmp_green
    
    # blue
    if tmp_internal >=66:
        blue = 255
    elif tmp_internal <= 19:
        blue = 0
    else:
        tmp_blue = 138.5177312231 * math.log(tmp_internal - 10) - 305.0447927307
        if tmp_blue < 0:
            blue = 0
        elif tmp_blue > 255:
            blue = 255
        else:
            blue = tmp_blue
    
    return red, green, blue

rgb = []#código de las estrellas en orden a como aparecen en la lista de las estrellas deseadas

for i in t_eff:
    color_rgb = convert_K_to_RGB(i)
    rgb.append(color_rgb)

#df = pd.DataFrame(zip(name,t_eff,rgb)) #Código solo para imprimir una tabla 
#print(df)

            
            
        


    


    