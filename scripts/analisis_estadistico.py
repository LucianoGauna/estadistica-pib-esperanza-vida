from pathlib import Path
import pandas as pd
import numpy as np

# 1. Ubicar y leer el dataset procesado
RUTA_PROYECTO = Path(__file__).resolve().parent.parent
RUTA_CSV = RUTA_PROYECTO / "datos" / "historico_2004_2023.csv"

df = pd.read_csv(RUTA_CSV)

# 2. Seleccionar los registros correspondientes a 2023
df_2023 = df[df["Year"] == 2023].copy()

print("=== ANÁLISIS ESTADÍSTICO - 2023 ===")
print(f"Cantidad de entidades: {len(df_2023)}")

# 3. Seleccionar la variable que queremos estudiar
esperanza_vida = df_2023["Life expectancy"]

# 4. Calcular las primeras medidas estadísticas
media = esperanza_vida.mean()
mediana = esperanza_vida.median()

print("\n=== ESPERANZA DE VIDA ===")
print(f"Media: {media:.2f} años")
print(f"Mediana: {mediana:.2f} años")


# Identificar los registros con mayor y menor esperanza de vida
indice_maximo = df_2023["Life expectancy"].idxmax()
indice_minimo = df_2023["Life expectancy"].idxmin()

pais_maximo = df_2023.loc[indice_maximo]
pais_minimo = df_2023.loc[indice_minimo]

print("\n=== VALORES EXTREMOS - 2023 ===")
print(
    f"Mayor esperanza de vida: {pais_maximo['Entity']} "
    f"({pais_maximo['Life expectancy']:.2f} años)"
)
print(
    f"Menor esperanza de vida: {pais_minimo['Entity']} "
    f"({pais_minimo['Life expectancy']:.2f} años)"
)


# Calcular la dispersión de la esperanza de vida
desviacion_estandar = esperanza_vida.std(ddof=0)
varianza = esperanza_vida.var(ddof=0)

print("\n=== DISPERSIÓN - 2023 ===")
print(f"Desviación estándar: {desviacion_estandar:.2f} años")
print(f"Varianza: {varianza:.2f} años²")


# Agrupar esperanzas de vida en intervalos de 10 años
intervalos = [50, 60, 70, 80, 90]

frecuencias = pd.cut(
    esperanza_vida,
    bins=intervalos,
    right=False
).value_counts().sort_index()

print("\n=== DISTRIBUCIÓN DE ESPERANZA DE VIDA - 2023 ===")
print(frecuencias)

print(f"\nTotal de entidades: {frecuencias.sum()}")



# Seleccionar la variable PIB per cápita de 2023
pib_per_capita = df_2023["GDP per capita"]

# Calcular medidas descriptivas
media_pib = pib_per_capita.mean()
mediana_pib = pib_per_capita.median()

# Identificar valores extremos
indice_pib_max = pib_per_capita.idxmax()
indice_pib_min = pib_per_capita.idxmin()

pais_pib_max = df_2023.loc[indice_pib_max]
pais_pib_min = df_2023.loc[indice_pib_min]

print("\n=== PIB PER CÁPITA - 2023 ===")
print(f"Media: {media_pib:,.2f}")
print(f"Mediana: {mediana_pib:,.2f}")

print(
    f"PIB per cápita máximo: {pais_pib_max['Entity']} "
    f"({pais_pib_max['GDP per capita']:,.2f})"
)

print(
    f"PIB per cápita mínimo: {pais_pib_min['Entity']} "
    f"({pais_pib_min['GDP per capita']:,.2f})"
)


# Calcular los cuartiles del PIB per cápita
q1_pib = pib_per_capita.quantile(0.25)
q2_pib = pib_per_capita.quantile(0.50)
q3_pib = pib_per_capita.quantile(0.75)

# Calcular el rango intercuartílico
rango_intercuartilico = q3_pib - q1_pib

print("\n=== CUARTILES DEL PIB PER CÁPITA - 2023 ===")
print(f"Q1 (25 %): {q1_pib:,.2f}")
print(f"Q2 (50 %): {q2_pib:,.2f}")
print(f"Q3 (75 %): {q3_pib:,.2f}")
print(f"Rango intercuartílico: {rango_intercuartilico:,.2f}")


# Calcular la correlación entre PIB per cápita y esperanza de vida
correlacion = df_2023[
    ["GDP per capita", "Life expectancy"]
].corr(method="pearson")

print("\n=== CORRELACIÓN - 2023 ===")
print(correlacion)



# Crear una copia del PIB per cápita transformado
pib_logaritmico = np.log(pib_per_capita)

# Comparar las dos correlaciones
correlacion_original = pib_per_capita.corr(esperanza_vida)
correlacion_logaritmica = pib_logaritmico.corr(esperanza_vida)

print("\n=== COMPARACIÓN DE CORRELACIONES - 2023 ===")
print(f"PIB original: {correlacion_original:.4f}")
print(f"Logaritmo del PIB: {correlacion_logaritmica:.4f}")


# Exportar los datos de 2023 para el gráfico de dispersión
columnas_grafico = [
    "Entity",
    "GDP per capita",
    "Life expectancy",
    "World region according to OWID"
]

df_2023[columnas_grafico].to_json(
    RUTA_PROYECTO / "datos" / "dispersion_2023.json",
    orient="records",
    indent=2
)

print("\nDatos del gráfico exportados a dispersion_2023.json")


# Regresión lineal utilizando el logaritmo del PIB per cápita
pendiente, intercepto = np.polyfit(
    pib_logaritmico,
    esperanza_vida,
    1
)

print("\n=== REGRESIÓN LINEAL LOGARÍTMICA - 2023 ===")
print(f"Pendiente: {pendiente:.4f}")
print(f"Intercepto: {intercepto:.4f}")

# Calcular las esperanzas de vida estimadas por el modelo
df_2023["Esperanza estimada"] = (
    intercepto + pendiente * pib_logaritmico
)

# Comparar valores reales con estimados
df_2023["Residuo"] = (
    df_2023["Life expectancy"] - df_2023["Esperanza estimada"]
)

print("\n=== PAÍSES CON RESIDUOS MÁS NEGATIVOS ===")
print(
    df_2023.nsmallest(5, "Residuo")[
        ["Entity", "Life expectancy", "Esperanza estimada", "Residuo"]
    ].to_string(index=False)
)

print("\n=== PAÍSES CON RESIDUOS MÁS POSITIVOS ===")
print(
    df_2023.nlargest(5, "Residuo")[
        ["Entity", "Life expectancy", "Esperanza estimada", "Residuo"]
    ].to_string(index=False)
)


# Suma de cuadrados de los residuos del modelo
suma_errores = (df_2023["Residuo"] ** 2).sum()

# Suma de cuadrados respecto de la media real
suma_total = (
    (df_2023["Life expectancy"] - media) ** 2
).sum()

# Coeficiente de determinación
r_cuadrado = 1 - (suma_errores / suma_total)

print("\n=== CALIDAD DEL AJUSTE - 2023 ===")
print(f"R²: {r_cuadrado:.4f}")
print(f"Porcentaje de variabilidad explicada: {r_cuadrado * 100:.2f}%")



# ========================================
# ANÁLISIS HISTÓRICO: 2004-2023
# ========================================

resultados_historicos = []

# Agrupar las observaciones por año
for anio, datos_anio in df.groupby("Year"):

    pib = datos_anio["GDP per capita"]
    vida = datos_anio["Life expectancy"]

    # Correlación utilizando el PIB original
    correlacion_pib = pib.corr(vida)

    # Correlación utilizando el logaritmo del PIB
    correlacion_log = np.log(pib).corr(vida)

    # Guardar los resultados de ese año
    resultados_historicos.append({
        "Year": anio,
        "Correlacion PIB": correlacion_pib,
        "Correlacion log PIB": correlacion_log
    })

# Convertir los resultados en un DataFrame
df_correlaciones = pd.DataFrame(resultados_historicos)

print("\n=== EVOLUCIÓN DE LA CORRELACIÓN: 2004-2023 ===")
print(df_correlaciones.to_string(index=False))


# Calcular la evolución anual de la esperanza de vida
evolucion_vida = df.groupby("Year")["Life expectancy"].agg(
    Media="mean",
    Mediana="median",
    Minimo="min",
    Maximo="max"
)

print("\n=== EVOLUCIÓN DE ESPERANZA DE VIDA: 2004-2023 ===")
print(evolucion_vida.round(2).to_string())


# Identificar observaciones con esperanza de vida
# excepcionalmente baja durante el período histórico

casos_extremos = df[
    df["Life expectancy"] < 40
].sort_values("Life expectancy")

print("\n=== ESPERANZAS DE VIDA INFERIORES A 40 AÑOS ===")

print(
    casos_extremos[
        ["Entity", "Year", "Life expectancy", "GDP per capita"]
    ].to_string(index=False)
)

print(f"\nTotal de observaciones: {len(casos_extremos)}")


# ========================================
# EVOLUCIÓN DEL PIB PER CÁPITA: 2004-2023
# ========================================

evolucion_pib = df.groupby("Year")["GDP per capita"].agg(
    Media="mean",
    Mediana="median",
    Minimo="min",
    Maximo="max"
)

print("\n=== EVOLUCIÓN DEL PIB PER CÁPITA: 2004-2023 ===")
print(evolucion_pib.round(2).to_string())


# ========================================
# EXPORTACIÓN DEL ANÁLISIS HISTÓRICO
# ========================================

# Unir los resultados usando el año como referencia
df_historico_resultados = (
    df_correlaciones
    .merge(
        evolucion_vida.reset_index(),
        on="Year"
    )
    .merge(
        evolucion_pib.reset_index(),
        on="Year",
        suffixes=("_vida", "_pib")
    )
)

print("\n=== RESULTADOS HISTÓRICOS UNIFICADOS ===")
print(df_historico_resultados.head())

# Exportar los resultados para la presentación web
RUTA_JSON_HISTORICO = (
    RUTA_PROYECTO / "datos" / "evolucion_historica.json"
)

df_historico_resultados.to_json(
    RUTA_JSON_HISTORICO,
    orient="records",
    indent=2
)

print("\nArchivo generado: evolucion_historica.json")
