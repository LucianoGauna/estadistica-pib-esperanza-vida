# Resultados del análisis estadístico

## ¿El dinero compra años de vida?

Este documento presenta los resultados de una investigación sobre la relación entre el **Producto Interno Bruto (PIB) per cápita** y la **esperanza de vida al nacer**.

El objetivo es determinar si existe una asociación estadística entre ambas variables, evaluar su intensidad y analizar cómo evolucionó durante el período **2004–2023**.

La investigación utiliza datos de [Our World in Data](https://ourworldindata.org/grapher/life-expectancy-un-vs-gdp-per-capita-wb), procesados mediante Python y Pandas.

El conjunto final contiene **3.820 observaciones correspondientes a 191 países y territorios durante veinte años**. Para garantizar comparaciones históricas consistentes, se utilizaron las mismas entidades a lo largo de todo el período.

El análisis comprende dos enfoques:

1. **Análisis de 2023:** estadística descriptiva, distribución de las variables, correlación, regresión y residuos.
2. **Análisis histórico de 2004–2023:** evolución de ambas variables y de sus correlaciones anuales.

Los valores del PIB per cápita están expresados en **dólares internacionales constantes de 2021, ajustados por paridad de poder adquisitivo (PPA)**.

---

## 1. Estadística descriptiva de 2023

Para analizar las características de ambas variables en un año específico, se seleccionaron las 191 observaciones correspondientes a 2023.

### 1.1. Esperanza de vida

Se calcularon las principales medidas de tendencia central y dispersión.

| Medida estadística              |               Resultado |
| ------------------------------- | ----------------------: |
| Media                           |              73,37 años |
| Mediana                         |              73,84 años |
| Desviación estándar poblacional |               7,12 años |
| Varianza poblacional            |             50,66 años² |
| Esperanza de vida máxima        | 85,71 años — San Marino |
| Esperanza de vida mínima        |    54,46 años — Nigeria |
| Rango                           |              31,25 años |

**Interpretación**

La esperanza de vida media fue de **73,37 años**, mientras que la mediana alcanzó los **73,84 años**.

La proximidad entre ambas medidas indica que ofrecen valores centrales similares. Sin embargo, la media ligeramente inferior es compatible con la influencia de entidades que presentan esperanzas de vida relativamente bajas.

La desviación estándar de **7,12 años** muestra que existen diferencias considerables respecto del promedio.

Por otro lado, la distancia de **31,25 años** entre San Marino y Nigeria evidencia una amplitud importante en los niveles de esperanza de vida.

Para describir la dispersión se utilizaron fórmulas poblacionales (`ddof=0`), ya que el propósito es caracterizar el conjunto completo de 191 entidades seleccionadas, sin estimar la dispersión de una población mayor mediante una muestra aleatoria.

### 1.2. Distribución de esperanza de vida

Se agruparon las entidades en intervalos de diez años.

| Esperanza de vida     | Entidades | Porcentaje |
| --------------------- | --------: | ---------: |
| 50 a menos de 60 años |         5 |      2,6 % |
| 60 a menos de 70 años |        56 |     29,3 % |
| 70 a menos de 80 años |        88 |     46,1 % |
| 80 a menos de 90 años |        42 |     22,0 % |
| **Total**             |   **191** |  **100 %** |

El intervalo más frecuente fue el comprendido entre **70 y menos de 80 años**, con 88 entidades.

Además, **130 de las 191 entidades (68,1 %) presentaron una esperanza de vida de al menos 70 años**.

El histograma de la presentación permite visualizar esta concentración y ubicar las medidas de tendencia central sobre la distribución.

### 1.3. PIB per cápita

| Medida estadística    |             Resultado |
| --------------------- | --------------------: |
| Media                 |             26.953,73 |
| Mediana               |             17.093,16 |
| PIB per cápita máximo | 130.296,84 — Singapur |
| PIB per cápita mínimo |    1.033,01 — Burundi |
| Primer cuartil (Q1)   |              6.494,39 |
| Segundo cuartil (Q2)  |             17.093,16 |
| Tercer cuartil (Q3)   |             40.809,01 |
| Rango intercuartílico |             34.314,62 |

_Valores expresados en dólares internacionales constantes de 2021, ajustados por PPA._

**Interpretación**

El PIB per cápita presenta una distribución considerablemente más asimétrica que la esperanza de vida.

La media de **26.953,73** supera a la mediana de **17.093,16** en aproximadamente **9.860,57 dólares internacionales**.

Esta diferencia refleja la influencia de entidades con valores económicos muy elevados, que incrementan el promedio general.

Por ejemplo, el PIB per cápita de Singapur fue aproximadamente **126 veces superior** al de Burundi.

Los cuartiles permiten profundizar en la distribución:

- Aproximadamente el 25 % de las entidades presenta un PIB per cápita igual o inferior a 6.494,39.
- La mediana divide la distribución en dos mitades.
- Aproximadamente el 75 % presenta valores iguales o inferiores a 40.809,01.

El **rango intercuartílico de 34.314,62** representa la amplitud del 50 % central de la distribución.

El diagrama de caja y bigotes permite representar estos valores y detectar posibles observaciones atípicas. Mediante el criterio habitual de 1,5 veces el rango intercuartílico, el límite superior es de aproximadamente **92.280,94 dólares internacionales**.

Las entidades que superan este límite pueden identificarse como posibles valores atípicos desde el punto de vista estadístico, sin que ello implique que sus datos sean incorrectos.

El PIB per cápita mide producción económica por habitante; no debe confundirse con el salario promedio ni con la riqueza patrimonial de las personas.

---

## 2. Relación entre PIB per cápita y esperanza de vida en 2023

### 2.1. Correlación de Pearson

Se calculó el coeficiente de correlación de Pearson para evaluar la dirección e intensidad de la asociación lineal entre las variables.

| Variables comparadas                                     | Correlación |
| -------------------------------------------------------- | ----------: |
| PIB per cápita y esperanza de vida                       |      0,7460 |
| Logaritmo natural del PIB per cápita y esperanza de vida |      0,8593 |

**Interpretación**

La correlación original de **0,7460** indica una asociación lineal positiva considerable.

En términos generales, las entidades con mayor PIB per cápita tienden a presentar una esperanza de vida más elevada.

Al transformar el PIB mediante su logaritmo natural, la correlación aumenta a **0,8593**, mostrando una asociación lineal más fuerte en la escala transformada.

El gráfico de dispersión permite comparar ambas representaciones.

Con el PIB en escala original se observa una relación creciente que tiende a aplanarse a medida que aumenta el nivel económico. Esta forma es compatible con una asociación de incrementos decrecientes: las diferencias proporcionales del PIB pueden estar relacionadas con cambios mayores en la esperanza de vida entre entidades de menores ingresos que entre entidades económicamente más ricas.

Sin embargo, **la correlación no permite establecer causalidad**.

### 2.2. Modelo de regresión logarítmica

Se ajustó un modelo de regresión por mínimos cuadrados utilizando el logaritmo natural del PIB per cápita como variable explicativa y la esperanza de vida como variable dependiente.

La ecuación obtenida fue:

**Esperanza de vida estimada = 22,4526 + 5,2791 × ln(PIB per cápita)**

| Parámetro  | Resultado |
| ---------- | --------: |
| Intercepto |   22,4526 |
| Pendiente  |    5,2791 |

La pendiente expresa que un incremento de una unidad en el logaritmo natural del PIB per cápita se asocia con aproximadamente **5,28 años adicionales** de esperanza de vida estimada.

Una interpretación más intuitiva es que **una duplicación del PIB per cápita se asocia, según el modelo, con aproximadamente 3,66 años adicionales de esperanza de vida estimada**.

Esta interpretación corresponde a la asociación observada entre entidades en 2023. No significa que duplicar efectivamente el PIB de un país produzca necesariamente ese aumento en la esperanza de vida.

### 2.3. Coeficiente de determinación (R²)

| Medida                                     | Resultado |
| ------------------------------------------ | --------: |
| R²                                         |    0,7383 |
| Variabilidad representada por el modelo    |   73,83 % |
| Variabilidad no representada por el modelo |   26,17 % |

El modelo logarítmico explica estadísticamente el **73,83 % de la variabilidad observada en la esperanza de vida** de las 191 entidades durante 2023.

Esto indica un ajuste considerable dentro del conjunto analizado, aunque no perfecto.

El porcentaje restante corresponde a variabilidad que el modelo no logra representar.

Es importante destacar que este resultado mide la capacidad de ajuste sobre los datos estudiados. **No significa que el PIB per cápita cause el 73,83 % de las diferencias de esperanza de vida**, ni garantiza la precisión de predicciones realizadas fuera del conjunto analizado.

---

## 3. Análisis de residuos de la regresión

Para identificar entidades que se apartan de las estimaciones del modelo, se calcularon los residuos de la regresión.

**Residuo = Esperanza de vida observada − Esperanza de vida estimada**

Un residuo positivo indica una esperanza de vida superior a la estimada por el modelo, mientras que uno negativo indica una esperanza de vida inferior.

### 3.1. Mayores residuos negativos

| Entidad           | Vida observada | Vida estimada | Residuo |
| ----------------- | -------------: | ------------: | ------: |
| Nigeria           |          54,46 |         69,79 |  −15,33 |
| Groenlandia       |          70,06 |         81,43 |  −11,37 |
| Nauru             |          62,11 |         71,97 |   −9,87 |
| Guinea Ecuatorial |          63,71 |         73,32 |   −9,61 |
| Guyana            |          70,18 |         79,50 |   −9,32 |

Nigeria presenta el mayor residuo negativo, con una esperanza de vida aproximadamente **15,33 años inferior** a la estimada por el modelo.

### 3.2. Mayores residuos positivos

| Entidad       | Vida observada | Vida estimada | Residuo |
| ------------- | -------------: | ------------: | ------: |
| Islas Salomón |          70,53 |         63,41 |   +7,12 |
| Jordania      |          77,81 |         71,24 |   +6,58 |
| Líbano        |          77,82 |         71,73 |   +6,08 |
| Malaui        |          67,35 |         61,56 |   +5,79 |
| Maldivas      |          81,04 |         75,32 |   +5,72 |

Islas Salomón presenta el mayor residuo positivo, con una esperanza de vida aproximadamente **7,12 años superior** a la estimada.

**Interpretación general**

Los resultados muestran que existen diferencias importantes entre los valores observados y los estimados a partir del PIB per cápita.

Estos casos indican que el nivel económico no representa por completo las diferencias de esperanza de vida entre países y territorios.

Los residuos permiten identificar entidades que merecen una investigación adicional, pero **no explican por sí mismos las causas de las diferencias**.

Tampoco constituyen necesariamente valores atípicos según una prueba estadística formal: se trata de los cinco residuos más altos y los cinco más bajos del conjunto estudiado.

---

## 4. Evolución histórica: 2004–2023

Para estudiar los cambios a lo largo del tiempo se analizaron las mismas **191 entidades durante veinte años**.

Esto permite comparar las estadísticas anuales sin que cambie la composición del conjunto estudiado.

Los promedios presentados a continuación no están ponderados por población: cada entidad tiene el mismo peso, independientemente de su cantidad de habitantes.

### 4.1. Evolución de la esperanza de vida

| Año  | Media | Mediana |
| ---- | ----: | ------: |
| 2004 | 68,20 |   70,92 |
| 2009 | 69,73 |   71,50 |
| 2014 | 71,44 |   72,68 |
| 2019 | 72,54 |   73,29 |
| 2020 | 71,99 |   72,32 |
| 2021 | 71,26 |   71,41 |
| 2022 | 72,58 |   73,54 |
| 2023 | 73,37 |   73,84 |

_Se muestran años seleccionados para facilitar la lectura. La serie completa de veinte años está disponible en `datos/evolucion_historica.json`._

**Interpretación**

La esperanza de vida media pasó de **68,20 años en 2004 a 73,37 años en 2023**, lo que representa un aumento aproximado de **5,17 años**.

Entre 2004 y 2019 se observó un crecimiento sostenido del promedio.

Sin embargo, durante 2020 y 2021 se produjo un retroceso:

- En 2019 la media fue de 72,54 años.
- En 2020 disminuyó a 71,99 años.
- En 2021 alcanzó 71,26 años.

La diferencia entre 2019 y 2021 fue de aproximadamente **−1,28 años**.

Este descenso coincide temporalmente con la pandemia de COVID-19, aunque el análisis realizado no permite cuantificar qué proporción del cambio corresponde a cada causa.

En 2022 y 2023 se observó una recuperación, hasta superar el nivel anterior a 2020.

También se identificó que la mediana fue superior a la media durante todo el período, aunque la distancia entre ambas medidas varió según el año.

### 4.2. Evolución del PIB per cápita

| Año  |     Media |   Mediana |
| ---- | --------: | --------: |
| 2004 | 21.057,63 | 11.607,94 |
| 2009 | 22.465,57 | 13.489,95 |
| 2014 | 24.226,22 | 14.287,95 |
| 2019 | 25.936,50 | 16.365,33 |
| 2020 | 24.087,79 | 15.381,59 |
| 2021 | 25.636,77 | 16.200,90 |
| 2022 | 26.408,88 | 16.835,02 |
| 2023 | 26.953,73 | 17.093,16 |

_Valores expresados en dólares internacionales constantes de 2021, ajustados por PPA. Se muestran años seleccionados._

**Interpretación**

Entre 2004 y 2023, el PIB per cápita medio aumentó de **21.057,63 a 26.953,73 dólares internacionales**, lo que representa un crecimiento aproximado del **28,0 %**.

Durante el mismo período, la mediana pasó de **11.607,94 a 17.093,16**, equivalente a un crecimiento aproximado del **47,3 %**.

La mediana aumentó proporcionalmente más que la media. Sin embargo, esto no demuestra por sí solo que haya disminuido la desigualdad económica entre entidades, ya que no se calcularon indicadores específicos de desigualdad.

La serie también presenta retrocesos económicos destacados:

- **2009:** la media del PIB per cápita disminuyó aproximadamente un 3,9 % respecto de 2008.
- **2020:** la media disminuyó aproximadamente un 7,1 % respecto de 2019.

Estas variaciones coinciden temporalmente con la crisis financiera internacional y la pandemia de COVID-19, respectivamente. No obstante, los resultados descriptivos no permiten determinar por sí solos la contribución de cada acontecimiento.

### 4.3. Comparación entre ambas variables a lo largo del tiempo

Un resultado interesante aparece al comparar los cambios anuales del PIB per cápita y de la esperanza de vida.

**En 2009**, el PIB per cápita medio disminuyó, mientras que la esperanza de vida media continuó aumentando.

**En 2021**, el PIB per cápita medio se recuperó respecto de 2020, mientras que la esperanza de vida media volvió a disminuir.

Esto muestra que ambas variables **no necesariamente evolucionan en la misma dirección cada año**.

No existe contradicción con las correlaciones positivas obtenidas: aquellas comparan las diferencias entre entidades dentro de cada año, mientras que este análisis observa los cambios de los promedios a lo largo del tiempo.

Son perspectivas estadísticas diferentes.

### 4.4. Evolución de las correlaciones

Para estudiar si la asociación entre PIB per cápita y esperanza de vida cambió durante el período, se calculó una correlación de Pearson independiente para cada año, utilizando las 191 entidades.

Se compararon tanto los valores originales del PIB como su transformación logarítmica.

| Año  | Correlación PIB | Correlación log(PIB) |
| ---- | --------------: | -------------------: |
| 2004 |          0,6500 |               0,8114 |
| 2005 |          0,6516 |               0,8091 |
| 2006 |          0,6533 |               0,8105 |
| 2007 |          0,6618 |               0,8152 |
| 2008 |          0,6716 |               0,8211 |
| 2009 |          0,6380 |               0,7954 |
| 2010 |          0,6591 |               0,8227 |
| 2011 |          0,6444 |               0,8235 |
| 2012 |          0,6585 |               0,8301 |
| 2013 |          0,6645 |               0,8351 |
| 2014 |          0,6758 |               0,8381 |
| 2015 |          0,7087 |               0,8459 |
| 2016 |          0,7183 |               0,8517 |
| 2017 |          0,7144 |               0,8546 |
| 2018 |          0,7244 |               0,8588 |
| 2019 |          0,7049 |               0,8429 |
| 2020 |          0,7425 |               0,8559 |
| 2021 |          0,7434 |               0,8410 |
| 2022 |          0,6685 |               0,8062 |
| 2023 |          0,7460 |               0,8593 |

**Interpretación**

La correlación entre PIB per cápita y esperanza de vida fue **positiva durante los veinte años estudiados**.

En ambos enfoques, la correlación de 2023 fue superior a la registrada en 2004:

| Modelo            |   2004 |   2023 | Diferencia |
| ----------------- | -----: | -----: | ---------: |
| PIB original      | 0,6500 | 0,7460 |    +0,0960 |
| Logaritmo del PIB | 0,8114 | 0,8593 |    +0,0479 |

La transformación logarítmica presentó una correlación lineal mayor que el PIB original en todos los años.

Sin embargo, la evolución **no fue uniforme**.

Se observaron descensos en determinados períodos, particularmente en 2009 y 2022, seguidos de recuperaciones posteriores.

Por lo tanto, puede afirmarse que la asociación terminó siendo más fuerte en 2023 que en 2004, pero no que haya aumentado de forma constante ni que estas diferencias sean necesariamente significativas desde el punto de vista inferencial.

El análisis histórico refuerza la existencia de una asociación positiva persistente entre las variables, sin demostrar una relación causal.

---

## 5. Revisión de valores extremos históricos

Durante el análisis se identificaron algunas observaciones de esperanza de vida excepcionalmente bajas.

| País o territorio        |  Año | Esperanza de vida |
| ------------------------ | ---: | ----------------: |
| República Centroafricana | 2009 |        14,67 años |
| República Centroafricana | 2022 |        18,82 años |
| República Centroafricana | 2019 |        31,53 años |
| Somalia                  | 2011 |        32,45 años |

Estos registros fueron identificados directamente en el dataset procesado y contrastados con las series publicadas por el Banco Mundial, disponibles a través de [FRED — República Centroafricana](https://fred.stlouisfed.org/series/SPDYNLE00INCAF) y [FRED — Somalia](https://fred.stlouisfed.org/series/SPDYNLE00INSOM).

[Our World in Data](https://ourworldindata.org/grapher/life-expectancy) advierte que determinadas estimaciones de mortalidad durante crisis pueden generar descensos abruptos concentrados en años específicos.

En particular, los valores extraordinariamente bajos de República Centroafricana en 2009 y 2022 requieren precaución debido a la metodología utilizada para asignar las estimaciones de mortalidad a determinados años.

Estos resultados no deben interpretarse automáticamente como cambios habituales de la esperanza de vida entre años consecutivos.

**Decisión metodológica**

Se decidió conservar estas observaciones en el conjunto principal.

Un valor extremo no constituye por sí solo un error y eliminarlo sin una justificación documentada podría introducir sesgos.

No obstante, su presencia debe considerarse al interpretar las estadísticas históricas, especialmente los valores mínimos y las correlaciones anuales.

Una posible ampliación del estudio sería realizar un análisis de sensibilidad para evaluar cuánto cambian los resultados ante diferentes tratamientos de estas observaciones. Ese análisis adicional no forma parte de los resultados presentados.

---

## 6. Conclusiones y discusión

Los resultados permiten responder a la pregunta central de la investigación.

### 6.1. Principales hallazgos

**1. Existe una asociación positiva importante entre PIB per cápita y esperanza de vida.**

En 2023 se obtuvo una correlación de Pearson de **0,7460** con el PIB original y de **0,8593** al utilizar su logaritmo natural.

Esto indica que, en general, las entidades con mayor nivel de producción económica por habitante tienden a presentar una esperanza de vida más elevada.

**2. La transformación logarítmica representa mejor la relación lineal.**

El PIB per cápita presenta una distribución fuertemente asimétrica y su asociación con la esperanza de vida no sigue una tendencia lineal simple en la escala original.

La transformación logarítmica produjo una correlación lineal superior y permitió ajustar un modelo con un **R² de 0,7383**.

**3. El nivel económico no representa completamente las diferencias observadas.**

Los residuos muestran entidades con esperanzas de vida considerablemente superiores o inferiores a las estimadas por el modelo.

Estos casos indican que la relación entre ambas variables es importante, pero insuficiente para describir todos los resultados.

**4. Ambas variables aumentaron en términos generales durante el período estudiado.**

Entre 2004 y 2023, la esperanza de vida media aumentó aproximadamente **5,17 años**, mientras que el PIB per cápita medio creció alrededor del **28 %**.

Sin embargo, hubo retrocesos y las dos variables no evolucionaron siempre en la misma dirección.

**5. La asociación se mantuvo positiva durante los veinte años.**

Las correlaciones anuales fueron positivas durante todo el período y terminaron siendo mayores en 2023 que en 2004, aunque presentaron fluctuaciones.

### 6.2. Respuesta a la pregunta de investigación

**¿El dinero compra años de vida?**

Los resultados sugieren que **el nivel económico importa, pero no lo explica todo**.

Los países y territorios con mayor PIB per cápita tienden a registrar esperanzas de vida más elevadas. Esta asociación fue fuerte en 2023 y persistió durante los veinte años analizados.

Sin embargo, los residuos de la regresión, las diferencias entre entidades y las variaciones históricas muestran que el PIB per cápita no permite determinar por sí solo cuánto vive una población.

Por lo tanto, la evidencia obtenida es compatible con la hipótesis de una asociación positiva entre ambas variables, pero **no permite afirmar que el aumento del PIB cause directamente una mayor esperanza de vida**.

### 6.3. Consideraciones metodológicas y limitaciones

Los resultados deben interpretarse teniendo en cuenta que:

- Las unidades analizadas son países y territorios, no individuos.
- Los promedios no están ponderados por población; cada entidad tiene el mismo peso.
- El conjunto final incluye únicamente entidades con datos completos para los veinte años, lo que puede limitar su representatividad.
- El PIB per cápita es una medida económica agregada y no describe directamente la distribución de ingresos, la calidad de vida o el acceso individual a recursos.
- La correlación y la regresión muestran asociaciones estadísticas, pero no establecen causalidad.
- El R² corresponde al ajuste del modelo sobre los datos de 2023 y no demuestra capacidad predictiva fuera de ese conjunto.
- Algunos valores históricos extremos están sujetos a particularidades metodológicas en las estimaciones de mortalidad.

### 6.4. Posibles ampliaciones

Una investigación futura podría incorporar variables adicionales, como:

- Acceso y cobertura de los servicios de salud.
- Educación.
- Condiciones sanitarias.
- Distribución de ingresos.
- Indicadores de mortalidad y condiciones demográficas.

También sería posible estudiar los cambios dentro de cada país a lo largo del tiempo, en lugar de limitarse a las correlaciones entre países calculadas de forma independiente para cada año.

Estas ampliaciones permitirían explorar con mayor profundidad las diferencias que el modelo actual no logra representar.

---

## 7. Herramientas, archivos y fuentes

### Herramientas utilizadas

- **Python:** procesamiento y análisis estadístico.
- **Pandas:** manipulación de datos, estadísticas descriptivas, agrupaciones y exportaciones.
- **NumPy:** transformación logarítmica y cálculo de la regresión.
- **Plotly.js:** visualizaciones estadísticas interactivas.
- **HTML, CSS y JavaScript:** desarrollo de la presentación web.

### Archivos principales del proyecto

| Archivo                              | Contenido                               |
| ------------------------------------ | --------------------------------------- |
| `datos/original.csv`                 | Dataset original                        |
| `datos/historico_2004_2023.csv`      | Dataset procesado                       |
| `datos/dispersion_2023.json`         | Datos del gráfico de dispersión         |
| `datos/residuos_2023.json`           | Residuos destacados del modelo          |
| `datos/evolucion_historica.json`     | Estadísticas y correlaciones históricas |
| `scripts/preparar_dataset.py`        | Preparación y validación de datos       |
| `scripts/analisis_estadistico.py`    | Cálculos estadísticos                   |
| `docs/metodologia.md`                | Documentación del procesamiento         |
| `index.html`, `styles.css`, `app.js` | Presentación web interactiva            |

### Fuentes de información

- [Our World in Data — PIB per cápita y esperanza de vida](https://ourworldindata.org/grapher/life-expectancy-un-vs-gdp-per-capita-wb)
- [Our World in Data — Esperanza de vida](https://ourworldindata.org/grapher/life-expectancy)
- [Banco Mundial — Esperanza de vida al nacer](https://data.worldbank.org/indicator/SP.DYN.LE00.IN)
- [FRED — República Centroafricana](https://fred.stlouisfed.org/series/SPDYNLE00INCAF)
- [FRED — Somalia](https://fred.stlouisfed.org/series/SPDYNLE00INSOM)

### Presentación interactiva

[¿El dinero compra años de vida? — GitHub Pages](https://lucianogauna.github.io/estadistica-pib-esperanza-vida/)

La presentación contiene siete visualizaciones que permiten explorar las distribuciones de las variables, su asociación, los residuos de la regresión y su evolución histórica entre 2004 y 2023.
