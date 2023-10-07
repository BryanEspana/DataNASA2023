
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


#Estrellas a utilizar
Stars = ['alf Tau','HD 27442', '14 Her','61 Vir','tau Boo']
#Lista para guardar info de las estrellas que queremos
Final_Stars = []

#se pasa toda la base de datos a una lista
Data_Sys = []
        
with open("info exoplanets.txt", "r") as data:
    for line in data:
        Data_Sys.append([(x) for x in line.strip().split(",")])
        

#quitando ' " ' de los conjuntos de datos
for i in range(len(Data_Sys)):
    for x in range(len(Data_Sys[i])):
        temp = Data_Sys[i][x]
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

'''#impresión            
for i in range(len(Final_Stars)):
    print(Final_Stars[i])'''
    
#----------------- Código para generar el color de cada una de las estrellas

cte_Wein = 0.0028976#constante de la Ley de wein

t_eff = []
name = []

for i in range(len(Final_Stars)):
    
    x = Final_Stars[i]
    name_ = x[0]
    

    # Verifica si temporal[16] es una cadena vacía antes de intentar convertirla
    try:
        temperature = float(x[16])
    except:
        pass
    

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

#print(rgb)
#df = pd.DataFrame(zip(name,t_eff,rgb)) #Código solo para imprimir una tabla 
#print(df)


                      
                      
    
        
        