# Resultados del análisis estadístico

## ¿El dinero compra años de vida?

Este documento reúne los resultados del análisis de la relación entre el Producto Interno Bruto (PIB) per cápita y la esperanza de vida.

La investigación utiliza información de **191 países y territorios durante el período 2004–2023**, con un total de 3.820 observaciones.

El análisis se divide en dos partes:

1. **Análisis de 2023:** descripción de las variables, correlación, regresión y detección de casos que se apartan de la tendencia.
2. **Análisis histórico de 2004–2023:** evolución de las variables y de su relación a lo largo del tiempo. *(Pendiente de realizar).*

Los valores económicos están expresados en dólares internacionales constantes de 2021, ajustados por paridad de poder adquisitivo (PPA).

---

## 1. Análisis estadístico de 2023

Para estudiar la relación entre riqueza económica y esperanza de vida en un año específico, se seleccionaron las **191 observaciones correspondientes a 2023**.

### 1.1. Estadísticas descriptivas de esperanza de vida

Se calcularon las principales medidas de tendencia central y dispersión.

| Medida estadística | Resultado |
|---|---:|
| Media | 73,37 años |
| Mediana | 73,84 años |
| Varianza poblacional | 50,66 años² |
| Desviación estándar poblacional | 7,12 años |
| Esperanza de vida máxima | 85,71 años — San Marino |
| Esperanza de vida mínima | 54,46 años — Nigeria |

**Interpretación**

La esperanza de vida media de las 191 entidades fue de 73,37 años, mientras que la mediana alcanzó los 73,84 años.

La proximidad entre ambos valores indica que las dos medidas de tendencia central ofrecen resultados similares, aunque la media ligeramente inferior podría estar influida por entidades con esperanzas de vida relativamente bajas.

La desviación estándar de 7,12 años muestra que existe una dispersión considerable entre las entidades estudiadas.

Por otra parte, la diferencia entre los valores extremos de San Marino y Nigeria fue de **31,25 años**, lo que evidencia contrastes importantes en la esperanza de vida entre países y territorios.

Para las medidas descriptivas de dispersión se utilizó la fórmula poblacional (`ddof=0`), ya que el objetivo es describir el conjunto completo de 191 entidades seleccionadas para el estudio.

### 1.2. Distribución de esperanza de vida

Se agruparon las observaciones en intervalos de diez años para estudiar su distribución.

| Intervalo de esperanza de vida | Entidades | Porcentaje |
|---|---:|---:|
| 50 a menos de 60 años | 5 | 2,6 % |
| 60 a menos de 70 años | 56 | 29,3 % |
| 70 a menos de 80 años | 88 | 46,1 % |
| 80 a menos de 90 años | 42 | 22,0 % |
| **Total** | **191** | **100 %** |

**Interpretación**

El intervalo más frecuente fue el de **70 a menos de 80 años**, con 88 entidades, equivalentes al 46,1 % del total.

Además, el 68,1 % de las entidades presentó una esperanza de vida de al menos 70 años.

La distribución muestra una concentración importante en los intervalos superiores, aunque también existen países y territorios con valores considerablemente inferiores.

Estos resultados permiten describir la distribución general, pero no explican todavía cuáles son las causas de las diferencias observadas.

---

### 1.3. Estadísticas descriptivas del PIB per cápita

Se calcularon la media, la mediana y los valores extremos del PIB per cápita.

| Medida estadística | Resultado |
|---|---:|
| Media | 26.953,73 |
| Mediana | 17.093,16 |
| PIB per cápita máximo | 130.296,84 — Singapur |
| PIB per cápita mínimo | 1.033,01 — Burundi |

*Valores expresados en dólares internacionales constantes de 2021, ajustados por PPA.*

**Interpretación**

A diferencia de lo observado con la esperanza de vida, el PIB per cápita presenta una diferencia considerable entre su media y su mediana.

La media supera a la mediana en aproximadamente **9.860,57 dólares internacionales**, lo que sugiere una distribución asimétrica hacia valores económicos elevados.

Esto ocurre porque algunas entidades presentan un PIB per cápita muy superior al de la mayoría, elevando el promedio general.

Por ejemplo, Singapur presenta un PIB per cápita aproximadamente 126 veces superior al de Burundi.

Es importante aclarar que el PIB per cápita representa el valor de la producción económica por habitante, no el salario promedio de los trabajadores.

### 1.4. Cuartiles y dispersión del PIB per cápita

Para comprender mejor la distribución económica de las entidades, se calcularon los cuartiles y el rango intercuartílico.

| Medida | Resultado |
|---|---:|
| Primer cuartil (Q1, 25 %) | 6.494,39 |
| Segundo cuartil (Q2, 50 %) | 17.093,16 |
| Tercer cuartil (Q3, 75 %) | 40.809,01 |
| Rango intercuartílico (Q3 − Q1) | 34.314,62 |

**Interpretación**

Aproximadamente el 25 % de las entidades presenta un PIB per cápita igual o inferior a 6.494,39 dólares internacionales, mientras que el 75 % se ubica por debajo de aproximadamente 40.809,01.

El rango intercuartílico de 34.314,62 indica una gran amplitud económica dentro de la mitad central de las entidades estudiadas.

La combinación de estos resultados con la diferencia entre media y mediana evidencia una distribución económica muy desigual entre las entidades, que requiere considerar cuidadosamente la escala utilizada para representar el PIB per cápita.

---

## 2. Relación entre PIB per cápita y esperanza de vida

### 2.1. Correlación de Pearson

Se calculó el coeficiente de correlación de Pearson para evaluar la dirección e intensidad de la asociación lineal entre ambas variables.

| Variables comparadas | Correlación |
|---|---:|
| PIB per cápita y esperanza de vida | 0,7460 |
| Logaritmo natural del PIB per cápita y esperanza de vida | 0,8593 |

**Interpretación**

La correlación original de 0,7460 muestra una asociación lineal positiva considerable entre el PIB per cápita y la esperanza de vida.

Esto significa que, en general, las entidades con mayor producción económica por habitante tienden a presentar una esperanza de vida más elevada.

Al transformar el PIB per cápita mediante su logaritmo natural, la correlación aumenta a **0,8593**, indicando una asociación lineal todavía más fuerte en la escala transformada.

La transformación logarítmica permite representar mejor las diferencias proporcionales entre niveles económicos y reduce la concentración visual de entidades con PIB relativamente bajo.

Los gráficos de dispersión muestran que la relación presenta una tendencia creciente que se aplana progresivamente cuando se utiliza el PIB en su escala original.

Esto es compatible con una relación de rendimientos decrecientes: entre entidades de menor PIB per cápita, las diferencias económicas pueden asociarse con diferencias mayores de esperanza de vida que entre entidades económicamente más ricas.

Sin embargo, estos resultados representan **asociaciones estadísticas y no permiten establecer causalidad**.

### 2.2. Modelo de regresión

A partir de los resultados anteriores, se ajustó una regresión por mínimos cuadrados utilizando el logaritmo natural del PIB per cápita como variable explicativa y la esperanza de vida como variable dependiente.

La ecuación obtenida fue:

**Esperanza de vida estimada = 22,4526 + 5,2791 × ln(PIB per cápita)**

| Parámetro | Resultado |
|---|---:|
| Intercepto | 22,4526 |
| Pendiente | 5,2791 |

**Interpretación**

La pendiente indica que un aumento de una unidad en el logaritmo natural del PIB per cápita se asocia con un incremento estimado de aproximadamente 5,28 años de esperanza de vida.

Una interpretación más intuitiva es que **duplicar el PIB per cápita se asocia, según el modelo, con aproximadamente 3,66 años adicionales de esperanza de vida estimada**.

Esta relación describe las diferencias observadas entre entidades en 2023; no representa una predicción causal de lo que ocurriría si un país duplicara efectivamente su PIB per cápita.

### 2.3. Coeficiente de determinación (R²)

Se calculó el coeficiente de determinación para evaluar qué proporción de la variabilidad observada de la esperanza de vida es explicada estadísticamente por el modelo.

| Medida | Resultado |
|---|---:|
| R² | 0,7383 |
| Variabilidad explicada por el modelo | 73,83 % |
| Variabilidad no explicada por el modelo | 26,17 % |

**Interpretación**

El modelo de regresión basado en el logaritmo del PIB per cápita explica estadísticamente el **73,83 % de la variabilidad observada** en la esperanza de vida de las 191 entidades durante 2023.

El 26,17 % restante corresponde a variabilidad que el modelo no consigue representar.

Este resultado indica un ajuste considerable, aunque no perfecto.

El coeficiente R² describe la capacidad de ajuste del modelo sobre los datos analizados. No significa que el PIB per cápita sea la causa del 73,83 % de las diferencias de esperanza de vida.

---

## 3. Países y territorios que se apartan de la tendencia

Para identificar entidades que presentan esperanzas de vida superiores o inferiores a las estimadas por la regresión, se calcularon los **residuos del modelo**.

El residuo se obtiene restando la esperanza de vida estimada a la esperanza de vida real:

**Residuo = Esperanza de vida real − Esperanza de vida estimada**

Un residuo positivo indica que la entidad presenta una esperanza de vida superior a la estimada, mientras que uno negativo indica que se encuentra por debajo.

### 3.1. Mayores residuos negativos

| Entidad | Esperanza real | Esperanza estimada | Residuo |
|---|---:|---:|---:|
| Nigeria | 54,46 | 69,79 | −15,33 |
| Groenlandia | 70,06 | 81,43 | −11,37 |
| Nauru | 62,11 | 71,97 | −9,87 |
| Guinea Ecuatorial | 63,71 | 73,32 | −9,61 |
| Guyana | 70,18 | 79,50 | −9,32 |

Nigeria presenta la mayor diferencia negativa: su esperanza de vida es aproximadamente **15,33 años inferior** a la estimada por el modelo según su PIB per cápita.

Los demás casos también muestran diferencias importantes respecto de la tendencia general.

### 3.2. Mayores residuos positivos

| Entidad | Esperanza real | Esperanza estimada | Residuo |
|---|---:|---:|---:|
| Islas Salomón | 70,53 | 63,41 | +7,12 |
| Jordania | 77,81 | 71,24 | +6,58 |
| Líbano | 77,82 | 71,73 | +6,08 |
| Malaui | 67,35 | 61,56 | +5,79 |
| Maldivas | 81,04 | 75,32 | +5,72 |

Las Islas Salomón presentan la mayor diferencia positiva, con una esperanza de vida aproximadamente **7,12 años superior** a la estimada por la regresión.

**Interpretación general**

Estos resultados demuestran que, aunque existe una asociación positiva importante entre riqueza económica y esperanza de vida, algunas entidades se apartan considerablemente de la tendencia.

Los residuos permiten identificar casos que merecen una investigación más profunda. Sin embargo, no constituyen por sí solos una explicación de las causas de esas diferencias.

Tampoco implican necesariamente errores en los datos: una entidad puede apartarse de la tendencia por factores que el modelo no contempla.

*Pendiente:* investigar con fuentes adicionales algunos de los casos más destacados y evaluar posibles explicaciones.

---

## 4. Resultados provisionales de 2023

Los resultados obtenidos hasta el momento permiten establecer las siguientes observaciones:

1. Existe una asociación positiva considerable entre PIB per cápita y esperanza de vida entre las 191 entidades analizadas.
2. La relación presenta un ajuste lineal más fuerte cuando el PIB per cápita se transforma mediante su logaritmo natural.
3. El modelo logarítmico explica estadísticamente el 73,83 % de la variabilidad observada de la esperanza de vida.
4. Existen diferencias importantes entre entidades que no quedan completamente representadas por su nivel económico.
5. Los casos con residuos extremos sugieren que otros factores, además del PIB per cápita, podrían resultar relevantes para comprender la esperanza de vida.

Estas observaciones **no constituyen todavía las conclusiones finales de la investigación**.

Para completar el estudio es necesario analizar la evolución histórica entre 2004 y 2023, investigar algunos casos particulares y evaluar las limitaciones del modelo.

---

## 5. Análisis histórico: 2004–2023

### Revisión de valores extremos de esperanza de vida

Durante el análisis histórico se identificaron observaciones excepcionalmente bajas de esperanza de vida:

| País | Año | Esperanza de vida |
|---|---:|---:|
| República Centroafricana | 2009 | 14,67 años |
| República Centroafricana | 2022 | 18,82 años |
| República Centroafricana | 2019 | 31,53 años |
| Somalia | 2011 | 32,45 años |

Estos valores fueron contrastados con las series estadísticas del Banco Mundial, disponibles a través de [FRED — República Centroafricana](https://fred.stlouisfed.org/series/SPDYNLE00INCAF) y [FRED — Somalia](https://fred.stlouisfed.org/series/SPDYNLE00INSOM).

[Our World in Data](https://ourworldindata.org/grapher/life-expectancy) advierte que determinadas estimaciones de mortalidad durante crisis humanitarias pueden producir descensos abruptos de esperanza de vida concentrados en años específicos.

En particular, los valores de República Centroafricana de 2009 y 2022 requieren una interpretación cuidadosa debido a la metodología utilizada para estimar la mortalidad durante esos períodos.

Por este motivo, se decidió **conservar las observaciones en el dataset principal**, evitando excluir valores únicamente por resultar extremos.

Estos casos se consideran relevantes para comprender las limitaciones de los indicadores y evaluar posteriormente cuánto influyen en los resultados estadísticos.

---

## 6. Consideraciones para la interpretación

Los resultados deben interpretarse teniendo en cuenta que:

- Las unidades de análisis son países y territorios, no personas individuales.
- Cada entidad tiene el mismo peso en los análisis principales, independientemente de su población.
- El PIB per cápita mide producción económica por habitante y no salario promedio.
- La correlación y la regresión muestran asociaciones, pero no demuestran relaciones de causa y efecto.
- El coeficiente R² describe el ajuste del modelo sobre los datos utilizados y no garantiza su capacidad predictiva fuera de ellos.
- Los residuos extremos identifican diferencias respecto de una tendencia estadística, sin explicar automáticamente sus causas.
- El análisis de 2023 describe un único año y deberá complementarse con los resultados históricos.

La metodología de selección, limpieza y preparación de los datos se encuentra documentada en `docs/metodologia.md`.