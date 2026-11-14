
from pathlib import Path
import pandas as pd

# Obtener la ubicación de la raíz del proyecto
RUTA_PROYECTO = Path(__file__).resolve().parent.parent

# Ubicar el CSV original
RUTA_CSV = RUTA_PROYECTO / "datos" / "original.csv"

# Leer el CSV y convertirlo en un DataFrame
df = pd.read_csv(RUTA_CSV)

# Mostrar información básica
print("=== DATASET ORIGINAL ===")
print(f"Cantidad de registros: {len(df)}")
print(f"Cantidad de columnas: {len(df.columns)}")

print("\nColumnas disponibles:")
print(df.columns.tolist())

print("\nPrimeros cinco registros:")
print(df.head())


# Seleccionar los registros comprendidos entre 2004 y 2023
df_historico = df[df["Year"].between(2004, 2023)].copy()

print("\n=== FILTRO POR AÑOS ===")
print(f"Registros originales: {len(df)}")
print(f"Registros entre 2004 y 2023: {len(df_historico)}")

print("\nAños incluidos:")
print(sorted(df_historico["Year"].unique()))


# Identificar valores faltantes en las variables principales
columnas_necesarias = [
    "Life expectancy",
    "GDP per capita",
    "World region according to OWID"
]

print("\n=== VALORES FALTANTES ===")

print(df_historico[columnas_necesarias].isna().sum())


# Conservar temporalmente las filas con información completa
df_completo = df_historico.dropna(
    subset=columnas_necesarias
).copy()

print("\n=== REGISTROS COMPLETOS ===")
print(f"Antes: {len(df_historico)}")
print(f"Después: {len(df_completo)}")
print(f"Registros excluidos: {len(df_historico) - len(df_completo)}")


# Contar la cantidad de años disponibles para cada entidad
anios_por_entidad = df_completo.groupby("Entity")["Year"].nunique()

print("\n=== AÑOS DISPONIBLES POR ENTIDAD ===")

print(anios_por_entidad.sort_values().head(10))

# Conservar las entidades que tienen datos en los 20 años
entidades_completas = anios_por_entidad[
    anios_por_entidad == 20
].index

print(f"\nEntidades con 20 años completos: {len(entidades_completas)}")


# Conservar solamente las entidades con 20 años completos
df_final = df_completo[
    df_completo["Entity"].isin(entidades_completas)
].copy()

# Ordenar los registros por entidad y año
df_final = df_final.sort_values(
    by=["Entity", "Year"]
).reset_index(drop=True)

print("\n=== DATASET FINAL ===")
print(f"Registros: {len(df_final)}")
print(f"Entidades: {df_final['Entity'].nunique()}")
print(f"Años: {df_final['Year'].nunique()}")


# Comprobar registros duplicados por entidad y año
duplicados = df_final.duplicated(
    subset=["Entity", "Year"]
).sum()

print(f"Duplicados por entidad y año: {duplicados}")

# Verificar que el dataset cumple nuestras condiciones
assert duplicados == 0, "Se encontraron registros duplicados"
assert len(df_final) == 3820, "La cantidad de registros no coincide"
assert df_final["Entity"].nunique() == 191
assert df_final["Year"].nunique() == 20


# Definir la ruta del archivo procesado
RUTA_SALIDA = RUTA_PROYECTO / "datos" / "historico_2004_2023.csv"

# Exportar el DataFrame a CSV
df_final.to_csv(RUTA_SALIDA, index=False)

print(f"\nArchivo generado correctamente: {RUTA_SALIDA.name}")







