ZOHO.embeddedApp.on("PageLoad", async function (origin) {
    try {
        console.log("Page Loaded with data");
        let caseId = origin.EntityId[0];
        console.log("ID del caso:", caseId);

        // Obtener datos del caso y extraer comentarios
        let caseData = await getRecord("Cases", caseId);
        console.log(caseData.Related_To.id);
        let text = caseData.Comments[0]?.comment_content || '';
        console.log("Datos del comentario:", text);

        // Analizar el sentimiento del comentario
        let sentiment = await analyzerResult(text);
        console.log("Sentimiento:", sentiment);

        // Mostrar comentario
        showComments(text);

        // Actualizar el registro con el sentimiento
        let updateCase = await updateRecord("Cases", {
            'id': caseId,
            'Sentimiento': sentiment
        });

        let productLabels = ['vino de consagrar'];
        let productObject = {
            positive: 0,
            negative: 0,
            neutral: 0
        };
        let allCases = await searchRecord("Cases", `(Related_To.id:equals:${caseData.Related_To.id})`);
        console.log("casos: ", allCases.data);
        allCases.data.forEach(c => {
            let sentimentCase = c.Sentimiento.toLowerCase() || '';
            if (sentimentCase == 'positivo') {
                productObject.positive += 1;
            } else if (sentimentCase == 'negativo') {
                productObject.negative += 1;
            } else {
                productObject.neutral += 1;
            };

            productObject = {
                positive: productObject.positive,
                negative: productObject.negative,
                neutral: productObject.neutral
            };

            productLabels = Object.keys(productObject);
            console.log(`product: ${JSON.stringify(productObject)}`);
        });

        console.log(`product: ${productLabels}`);
        // Crear gráfica con los resultados del análisis de sentimientos
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: productLabels,
                datasets: [{
                        label: 'Positivo',
                        data: [12, 19, 3], // Reemplazar con datos reales
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                    {
                        label: 'Neutro',
                        data: [5, 10, 2], // Reemplazar con datos reales
                        backgroundColor: 'rgba(201, 203, 207, 0.6)',
                    },
                    {
                        label: 'Negativo',
                        data: [3, 2, 1], // Reemplazar con datos reales
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Comentarios'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Productos'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Análisis de Sentimientos por Producto'
                    },
                    legend: {
                        position: 'top'
                    }
                },
            },
        });

    } catch (error) {
        console.error(`Error al cargar los datos: ${error}`);
    }
});

ZOHO.embeddedApp.init();