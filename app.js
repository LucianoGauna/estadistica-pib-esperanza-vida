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
    mostrarDistribucionVida(paises);
    mostrarBoxplotPib(paises);

    selectorEscala.addEventListener("change", mostrarGrafico);
  } catch (error) {
    console.error(error);
    mensajeError.textContent = "No se pudieron cargar los datos del gráfico.";
  }
}

iniciar();

async function mostrarCorrelacionesHistoricas() {
  try {
    const respuesta = await fetch("datos/evolucion_historica.json");

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los datos históricos");
    }

    const historico = await respuesta.json();
    mostrarEvolucionVida(historico);
    mostrarEvolucionPib(historico);

    const anios = historico.map((dato) => dato.Year);

    const datos = [
      {
        x: anios,
        y: historico.map((dato) => dato["Correlacion PIB"]),
        type: "scatter",
        mode: "lines+markers",
        name: "PIB original",
        line: {
          color: "#6dd3c7",
          width: 3,
        },
        hovertemplate: "Año: %{x}<br>r = %{y:.4f}<extra></extra>",
      },
      {
        x: anios,
        y: historico.map((dato) => dato["Correlacion log PIB"]),
        type: "scatter",
        mode: "lines+markers",
        name: "Logaritmo del PIB",
        line: {
          color: "#f0b86e",
          width: 3,
        },
        hovertemplate: "Año: %{x}<br>r = %{y:.4f}<extra></extra>",
      },
    ];

    const layout = {
      paper_bgcolor: "#121b2e",
      plot_bgcolor: "#121b2e",
      font: { color: "#e8edf5" },
      margin: { t: 35, r: 25, b: 70, l: 65 },
      xaxis: {
        title: { text: "Año" },
        tickmode: "array",
        tickvals: [
          2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2023,
        ],
        range: [2003.5, 2023.5],
        gridcolor: "#263247",
      },
      yaxis: {
        title: { text: "Correlación de Pearson (r)" },
        range: [0.6, 0.9],
        gridcolor: "#263247",
        zeroline: false,
      },
      legend: {
        orientation: "h",
        y: -0.25,
      },
      hovermode: "x unified",
    };

    Plotly.newPlot("grafico-correlaciones", datos, layout, {
      responsive: true,
      displaylogo: false,
    });
  } catch (error) {
    console.error(error);
    document.getElementById("grafico-correlaciones").textContent =
      "No se pudieron cargar los datos históricos.";
  }
}

mostrarCorrelacionesHistoricas();

function mostrarEvolucionVida(historico) {
  const anios = historico.map((dato) => dato.Year);

  const datos = [
    {
      x: anios,
      y: historico.map((dato) => dato.Media_vida),
      type: "scatter",
      mode: "lines+markers",
      name: "Media",
      line: {
        color: "#6dd3c7",
        width: 3,
      },
      hovertemplate: "Año: %{x}<br>Media: %{y:.2f} años<extra></extra>",
    },
    {
      x: anios,
      y: historico.map((dato) => dato.Mediana_vida),
      type: "scatter",
      mode: "lines+markers",
      name: "Mediana",
      line: {
        color: "#f0b86e",
        width: 3,
      },
      hovertemplate: "Año: %{x}<br>Mediana: %{y:.2f} años<extra></extra>",
    },
  ];

  const layout = {
    paper_bgcolor: "#121b2e",
    plot_bgcolor: "#121b2e",
    font: { color: "#e8edf5" },
    margin: { t: 35, r: 25, b: 70, l: 65 },
    xaxis: {
      title: { text: "Año" },
      tickmode: "array",
      tickvals: [
        2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2023,
      ],
      range: [2003.5, 2023.5],
      gridcolor: "#263247",
    },
    yaxis: {
      title: { text: "Esperanza de vida (años)" },
      range: [65, 76],
      gridcolor: "#263247",
      zeroline: false,
    },
    legend: {
      orientation: "h",
      y: -0.25,
    },
    hovermode: "x unified",
  };

  Plotly.newPlot("grafico-vida", datos, layout, {
    responsive: true,
    displaylogo: false,
  });
}

function mostrarEvolucionPib(historico) {
  const anios = historico.map((dato) => dato.Year);

  const datos = [
    {
      x: anios,
      y: historico.map((dato) => dato.Media_pib),
      type: "scatter",
      mode: "lines+markers",
      name: "Media",
      line: {
        color: "#6dd3c7",
        width: 3,
      },
      hovertemplate: "Año: %{x}<br>Media: %{y:,.0f}<extra></extra>",
    },
    {
      x: anios,
      y: historico.map((dato) => dato.Mediana_pib),
      type: "scatter",
      mode: "lines+markers",
      name: "Mediana",
      line: {
        color: "#f0b86e",
        width: 3,
      },
      hovertemplate: "Año: %{x}<br>Mediana: %{y:,.0f}<extra></extra>",
    },
  ];

  const layout = {
    paper_bgcolor: "#121b2e",
    plot_bgcolor: "#121b2e",
    font: { color: "#e8edf5" },
    margin: { t: 35, r: 25, b: 70, l: 80 },
    xaxis: {
      title: { text: "Año" },
      tickmode: "array",
      tickvals: [
        2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2023,
      ],
      range: [2003.5, 2023.5],
      gridcolor: "#263247",
    },
    yaxis: {
      title: {
        text: "PIB per cápita (PPA, dólares internacionales de 2021)",
      },
      tickformat: ",.0f",
      gridcolor: "#263247",
      zeroline: false,
    },
    legend: {
      orientation: "h",
      y: -0.25,
    },
    hovermode: "x unified",
  };

  Plotly.newPlot("grafico-pib", datos, layout, {
    responsive: true,
    displaylogo: false,
  });
}

function mostrarDistribucionVida(paises) {
  // Esperanza de vida de cada entidad en 2023
  const valores = paises.map((pais) => pais["Life expectancy"]);

  const datos = [
    {
      x: valores,
      type: "histogram",
      name: "Países y territorios",
      xbins: {
        start: 50,
        end: 90,
        size: 10,
      },
      marker: {
        color: "#6dd3c7",
        line: {
          color: "#121b2e",
          width: 2,
        },
      },
      opacity: 0.85,
      hovertemplate: "Cantidad de entidades: %{y}<extra></extra>",
    },
  ];

  const layout = {
    paper_bgcolor: "#121b2e",
    plot_bgcolor: "#121b2e",
    font: { color: "#e8edf5" },
    margin: { t: 45, r: 25, b: 75, l: 75 },
    bargap: 0.06,
    showlegend: false,
    xaxis: {
      title: { text: "Esperanza de vida (años)" },
      range: [50, 90],
      tickvals: [50, 60, 70, 80, 90],
      gridcolor: "#263247",
      zeroline: false,
    },
    yaxis: {
      title: { text: "Cantidad de países y territorios" },
      rangemode: "tozero",
      gridcolor: "#263247",
      zeroline: false,
    },
    shapes: [
      {
        type: "line",
        x0: 73.37,
        x1: 73.37,
        y0: 0,
        y1: 1,
        yref: "paper",
        line: {
          color: "#f0b86e",
          width: 3,
          dash: "dash",
        },
      },
      {
        type: "line",
        x0: 73.84,
        x1: 73.84,
        y0: 0,
        y1: 1,
        yref: "paper",
        line: {
          color: "#e8edf5",
          width: 2,
          dash: "dot",
        },
      },
    ],
  };

  Plotly.newPlot("grafico-distribucion-vida", datos, layout, {
    responsive: true,
    displaylogo: false,
  });
}

function mostrarBoxplotPib(paises) {
  const valoresPib = paises.map((pais) => pais["GDP per capita"]);

  const nombres = paises.map((pais) => pais.Entity);

  const datos = [
    {
      x: valoresPib,
      text: nombres,
      hoveron: "points",
      hovertemplate:
        "<b>%{text}</b>" + "<br>PIB per cápita: %{x:,.0f}" + "<extra></extra>",
      type: "box",
      orientation: "h",
      name: "PIB per cápita",
      boxpoints: "outliers",
      fillcolor: "rgba(109, 211, 199, 0.35)",
      line: {
        color: "#6dd3c7",
        width: 2,
      },
      marker: {
        color: "#f0b86e",
        size: 8,
        opacity: 0.85,
      },
    },
  ];

  const layout = {
    paper_bgcolor: "#121b2e",
    plot_bgcolor: "#121b2e",
    font: { color: "#e8edf5" },
    margin: { t: 40, r: 30, b: 85, l: 60 },
    showlegend: false,
    xaxis: {
      title: {
        text: "PIB per cápita (PPA, dólares internacionales de 2021)",
      },
      range: [0, 140000],
      tickformat: ",.0f",
      gridcolor: "#263247",
      zeroline: false,
    },
    yaxis: {
      showticklabels: false,
      showgrid: false,
      zeroline: false,
    },
  };

  Plotly.newPlot("grafico-boxplot-pib", datos, layout, {
    responsive: true,
    displaylogo: false,
  });
}

async function mostrarResiduos() {
  try {
    const respuesta = await fetch("datos/residuos_2023.json");

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los residuos");
    }

    const residuos = await respuesta.json();

    const datos = [
      {
        x: residuos.map((pais) => pais.Residuo),
        y: residuos.map((pais) => pais.Entity),
        customdata: residuos.map((pais) => [
          pais["Life expectancy"],
          pais["Esperanza estimada"],
        ]),
        type: "bar",
        orientation: "h",
        marker: {
          color: residuos.map((pais) =>
            pais.Residuo >= 0 ? "#6dd3c7" : "#f0b86e",
          ),
        },
        hovertemplate:
          "<b>%{y}</b>" +
          "<br>Vida observada: %{customdata[0]:.2f} años" +
          "<br>Vida estimada: %{customdata[1]:.2f} años" +
          "<br>Residuo: %{x:+.2f} años" +
          "<extra></extra>",
      },
    ];

    const layout = {
      paper_bgcolor: "#121b2e",
      plot_bgcolor: "#121b2e",
      font: { color: "#e8edf5" },
      margin: { t: 35, r: 35, b: 75, l: 170 },
      showlegend: false,
      bargap: 0.25,

      xaxis: {
        title: { text: "Residuo (años)" },
        range: [-17, 9],
        gridcolor: "#263247",
        zeroline: true,
        zerolinecolor: "#e8edf5",
        zerolinewidth: 2,
      },

      yaxis: {
        automargin: true,
        autorange: "reversed",
      },
    };

    Plotly.newPlot("grafico-residuos", datos, layout, {
      responsive: true,
      displaylogo: false,
    });
  } catch (error) {
    console.error(error);

    document.getElementById("grafico-residuos").textContent =
      "No se pudieron cargar los residuos.";
  }
}

mostrarResiduos();
