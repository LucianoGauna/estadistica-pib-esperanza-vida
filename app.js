const grafico = document.getElementById("grafico-dispersion");
const selectorEscala = document.getElementById("escala");
const mensajeError = document.getElementById("mensaje-error");

async function iniciar() {
  try {
    const respuesta = await fetch("datos/dispersion_2023.json");

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar el archivo JSON");
    }

    const paises = await respuesta.json();

    function mostrarGrafico() {
      const escala = selectorEscala.value;

      const datos = [
        {
          x: paises.map((pais) => pais["GDP per capita"]),
          y: paises.map((pais) => pais["Life expectancy"]),
          text: paises.map((pais) => pais.Entity),
          customdata: paises.map(
            (pais) => pais["World region according to OWID"],
          ),
          type: "scatter",
          mode: "markers",
          name: "Países y territorios",
          marker: {
            size: 9,
            color: "#6dd3c7",
            opacity: 0.75,
          },
          hovertemplate:
            "<b>%{text}</b>" +
            "<br>PIB per cápita: %{x:,.0f}" +
            "<br>Esperanza de vida: %{y:.1f} años" +
            "<br>Región: %{customdata}" +
            "<extra></extra>",
        },
      ];

      // Coeficientes calculados previamente con Python
      const pendiente = 5.2791;
      const intercepto = 22.4526;

      // Ordenar los PIB para dibujar una línea continua
      const valoresPib = paises
        .map((pais) => pais["GDP per capita"])
        .sort((a, b) => a - b);

      // Calcular las predicciones del modelo
      const esperanzasEstimadas = valoresPib.map(
        (pib) => intercepto + pendiente * Math.log(pib),
      );

      // Agregar la línea de regresión al gráfico
      datos.push({
        x: valoresPib,
        y: esperanzasEstimadas,
        type: "scatter",
        mode: "lines",
        name: "Regresión logarítmica",
        line: {
          color: "#f0b86e",
          width: 3,
        },
        hovertemplate: "Esperanza estimada: %{y:.2f} años" + "<extra></extra>",
      });

      const layout = {
        paper_bgcolor: "#121b2e",
        plot_bgcolor: "#121b2e",
        font: { color: "#e8edf5" },
        margin: { t: 25, r: 25, b: 70, l: 65 },
        xaxis: {
          title: {
            text: "PIB per cápita (PPA, dólares internacionales de 2021)",
          },
          type: escala === "log" ? "log" : "linear",
          gridcolor: "#263247",
          zeroline: false,
          ...(escala === "log"
            ? {
                tickmode: "array",
                tickvals: [1000, 3000, 10000, 30000, 100000],
                ticktext: ["1.000", "3.000", "10.000", "30.000", "100.000"],
              }
            : {}),
        },
        yaxis: {
          title: { text: "Esperanza de vida (años)" },
          gridcolor: "#263247",
          zeroline: false,
        },
        hovermode: "closest",
      };

      Plotly.react(grafico, datos, layout, {
        responsive: true,
        displaylogo: false,
      });
    }

    mostrarGrafico();

    selectorEscala.addEventListener("change", mostrarGrafico);
  } catch (error) {
    console.error(error);
    mensajeError.textContent = "No se pudieron cargar los datos del gráfico.";
  }
}

iniciar();
