# Metodología de preparación de datos

## 1. Fuente de los datos

Para el trabajo **«¿El dinero compra años de vida?»** se utilizó un conjunto de datos obtenido de [Our World in Data](https://ourworldindata.org/grapher/life-expectancy-un-vs-gdp-per-capita-wb).

El dataset contiene información histórica sobre el Producto Interno Bruto (PIB) per cápita y la esperanza de vida de distintos países y territorios.

El archivo original, descargado en formato CSV, contiene **19.400 registros y 7 columnas**.

Las variables disponibles son:

| Variable | Descripción |
|---|---|
| Entity | Nombre del país o territorio |
| Code | Código identificador de la entidad |
| Year | Año de la observación |
| Life expectancy | Esperanza de vida al nacer, expresada en años |
| GDP per capita | PIB per cápita, expresado en dólares internacionales constantes de 2021, ajustados por paridad de poder adquisitivo (PPA) |
| Population | Población de la entidad |
| World region according to OWID | Región geográfica según Our World in Data |

Las variables principales de la investigación son el **PIB per cápita** y la **esperanza de vida**. Las demás permiten identificar, organizar y agrupar las observaciones.

## 2. Herramientas utilizadas

Para la preparación del dataset se utilizaron:

- **Python:** lenguaje utilizado para automatizar el procesamiento de los datos.
- **Pandas:** biblioteca empleada para leer el CSV, filtrar registros, identificar valores faltantes, agrupar entidades y exportar los resultados.
- **Visual Studio Code:** entorno utilizado para desarrollar y ejecutar el script.

El procesamiento se encuentra implementado en `scripts/preparar_dataset.py`, permitiendo reproducir las operaciones realizadas sobre el archivo original.

## 3. Selección del período de estudio

El dataset original contiene observaciones de distintos años, desde 1950 hasta 2025.

Se decidió estudiar el período comprendido entre **2004 y 2023**, ambos inclusive, con el objetivo de analizar la relación entre el PIB per cápita y la esperanza de vida durante veinte años.

Para realizar esta selección se utilizó la columna `Year`, conservando únicamente los registros correspondientes al período elegido.

Como resultado de este primer filtro, la cantidad de observaciones pasó de **19.400 a 5.220 registros**.

## 4. Identificación y tratamiento de valores faltantes

Luego de seleccionar el período, se verificó la existencia de valores faltantes en tres columnas necesarias para el análisis:

| Variable | Valores faltantes |
|---|---:|
| Life expectancy | 160 |
| GDP per capita | 1.009 |
| World region according to OWID | 480 |

Se decidió excluir las observaciones que no tuvieran información completa en estas variables.

La ausencia de valores de PIB per cápita o esperanza de vida impide utilizar esas observaciones para analizar la relación entre ambas magnitudes.

También se exigió información geográfica para poder realizar comparaciones regionales y mantener un criterio uniforme de selección.

Después de aplicar este filtro, se conservaron **3.951 registros**, mientras que **1.269 fueron excluidos**.

Cabe aclarar que una misma observación puede presentar valores faltantes en varias columnas. Por ese motivo, la cantidad de registros excluidos no necesariamente coincide con la suma de los valores faltantes individuales.

## 5. Selección de entidades con información histórica completa

Para analizar la evolución entre 2004 y 2023 se decidió trabajar con las mismas entidades durante todo el período.

Mediante Pandas se agruparon los registros por entidad y se contabilizó la cantidad de años distintos disponibles para cada una.

Se identificaron **191 países y territorios con información completa durante los veinte años**.

Las entidades que no cumplían esta condición fueron excluidas del conjunto utilizado para el análisis histórico.

Esta decisión permite comparar la evolución de las variables sin que cambie la composición del conjunto de entidades entre un año y otro.

El resultado es un **panel balanceado**: cada entidad cuenta con una observación para cada año del período.

## 6. Validación y exportación del dataset

Una vez seleccionadas las entidades, los registros se ordenaron alfabéticamente por entidad y cronológicamente por año.

También se verificó que:

- El conjunto contuviera 191 entidades distintas.
- Cada entidad tuviera 20 observaciones anuales.
- No existieran registros duplicados para una misma combinación de entidad y año.
- Los años estuvieran comprendidos entre 2004 y 2023.
- Las variables requeridas no presentaran valores faltantes.

Finalmente, se exportó el resultado al archivo `datos/historico_2004_2023.csv`.

## 7. Resumen del procesamiento

| Etapa | Registros |
|---|---:|
| Dataset original | 19.400 |
| Selección del período 2004–2023 | 5.220 |
| Eliminación de registros con valores faltantes | 3.951 |
| Selección de entidades con los 20 años completos | 3.820 |

El conjunto final contiene:

- **3.820 observaciones.**
- **191 países y territorios.**
- **20 años de información (2004–2023).**
- **7 columnas.**

Cada fila representa una entidad geográfica observada en un año específico.

## 8. Consideraciones metodológicas

La selección de entidades con veinte años completos permite realizar comparaciones históricas consistentes. Este criterio implicó excluir únicamente 8 países o territorios que disponían de información válida para una parte del período, conservando así 191 de las 199 entidades disponibles (el 96 %).

Por lo tanto, el dataset final no incluye todas las entidades presentes en la fuente original.

Asimismo, el conjunto incluye tanto países soberanos como territorios y otras entidades geográficas individuales. Estas observaciones se conservan bajo el criterio de disponibilidad y continuidad de los datos.

En los análisis donde se calcule el promedio de los países y territorios, cada entidad tendrá el mismo peso, independientemente de su población. Por lo tanto, esos promedios no deben interpretarse como la esperanza de vida de una persona promedio del mundo.

El dataset procesado se utilizará posteriormente para calcular medidas estadísticas, analizar la relación entre las variables y estudiar su evolución durante el período seleccionado.