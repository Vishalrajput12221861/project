document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const data = document.getElementById('data').value.trim();
    const visualizationType = document.getElementById('visualizationType').value;

    // Split the entered data into an array
    const dataArray = data.split(',').map(item => Number(item.trim()));
    console.log(dataArray);
    console.log(visualizationType);

    // Call the function to generate the selected visualization type
    generateVisualization(dataArray, visualizationType);
});

function generateVisualization(dataArray, visualizationType) {
    console.log(dataArray);
    console.log(visualizationType);
    const ctx = document.getElementById('myChart').getContext('2d');
    let chart;

    // Generate chart based on selected type
    switch (visualizationType) {
        case 'bar':
            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dataArray.map((_, index) => `Data ${index + 1}`),
                    datasets: [{
                        label: 'Data',
                        data: dataArray,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            break;
        case 'line':
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dataArray.map((_, index) => `Data ${index + 1}`),
                    datasets: [{
                        label: 'Data',
                        data: dataArray,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    onClick: function(event, elements) {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            dataArray.splice(index, 1); // Remove the selected data point
                            chart.destroy(); // Destroy the existing chart
                            generateVisualization(dataArray, visualizationType); // Re-generate the visualization
                        }
                    }
                }
            });
            break;
        case 'pie':
            chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: dataArray.map((_, index) => `Data ${index + 1}`),
                    datasets: [{
                        label: 'Data',
                        data: dataArray,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    onClick: function(event, elements) {
                        if (elements.length > 0) {
                            const index = elements[0].index;
                            dataArray.splice(index, 1); // Remove the selected data point
                            chart.destroy(); // Destroy the existing chart
                            generateVisualization(dataArray, visualizationType); // Re-generate the visualization
                        }
                    }
                }
            });
            break;
        default:
            console.error('Invalid visualization type');
            break;
    }
}
