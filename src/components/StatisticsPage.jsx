
import { useState, useEffect } from 'react';
import { Container, Table, Row, Col, Card, Alert } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import carsData from '/src/data/cars.json';

const StatisticsPage = () => {
    const [data, setData] = useState({ brands: {}, models: {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const brands = {};
        const models = {};
        if (carsData && carsData.Cars) {
            carsData.Cars.forEach(car => {
                const brand = car.NameMMT.split(' ')[0];
                const model = car.Model;
                let price = parseFloat(car.Prc.replace(/,/g, ''));
                if (isNaN(price)) price = 0;
                if (!brands[brand]) brands[brand] = { count: 0, value: 0 };
                brands[brand].count += 1;
                brands[brand].value += price;
                if (!models[brand]) models[brand] = {};
                if (!models[brand][model]) models[brand][model] = 0;
                models[brand][model] += 1;
            });
        }
        setData({ brands, models });
        setLoading(false);
    }, []);

    // Prepare data for charts
    const pieData = {
        labels: Object.keys(data.brands),
        datasets: [
            {
                data: Object.values(data.brands).map(b => b.value),
                backgroundColor: [
                    '#28a745', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                    '#FF9F40', '#FFCD56', '#7C4DFF', '#F39C12', '#e83e8c'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }
        ]
    };

    const modelLabels = [...new Set(Object.keys(data.models).reduce((acc, brand) => {
        return [...acc, ...Object.keys(data.models[brand])];
    }, []))];

    const colorPalette = [
        '#28a745', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FFCD56', '#7C4DFF', '#F39C12', '#e83e8c'
    ];

    const stackedBarData = {
        labels: Object.keys(data.models),
        datasets: modelLabels.map((model, index) => {
            const dataForModel = Object.keys(data.models).map(brand => data.models[brand][model] || 0);
            return {
                label: model,
                data: dataForModel,
                backgroundColor: colorPalette[index % colorPalette.length],
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1
            };
        })
    };


    return (
        <Container fluid style={{ marginTop: '100px', marginBottom: '40px', maxWidth: '1200px' }}>
            <Row className="mb-4">
                <Col md={12}>
                    <Card className="shadow-sm border-0" aria-label="Statistics Overview">
                        <Card.Body>
                            <h2 className="mb-2" style={{ color: '#218838', fontWeight: 700 }}>Car Statistics Dashboard</h2>
                            <p className="text-muted" style={{ fontSize: '1.15rem' }}>
                                Explore key metrics and visualizations for your car inventory. View brand distribution, model breakdowns, and total values.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {loading ? (
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Alert variant="info" className="text-center">Loading statistics...</Alert>
                    </Col>
                </Row>
            ) : Object.keys(data.brands).length === 0 ? (
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Alert variant="warning" className="text-center">No car data available.</Alert>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row className="mb-4">
                        <Col md={12}>
                            <Card className="border-0 shadow-sm">
                                <Card.Header as="h4" style={{ background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)', color: '#fff', borderRadius: '12px 12px 0 0' }}>Cars by Brand & Model</Card.Header>
                                <Card.Body style={{ padding: '1.5rem' }}>
                                    <Table responsive striped bordered hover aria-label="Cars by Brand and Model">
                                        <thead>
                                            <tr>
                                                <th>Brand</th>
                                                <th>Model</th>
                                                <th>Count</th>
                                                <th>Value (Baht)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(data.brands).map(([brand, { count, value }]) => (
                                                <>
                                                    <tr key={brand} style={{ background: '#e9f7ef', fontWeight: 600 }}>
                                                        <td rowSpan={Object.keys(data.models[brand] || {}).length + 1}>{brand}</td>
                                                        <td>Total</td>
                                                        <td>{count}</td>
                                                        <td>{value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                    </tr>
                                                    {Object.entries(data.models[brand] || {}).map(([model, modelCount]) => (
                                                        <tr key={`${brand}-${model}`}>
                                                            <td>{model}</td>
                                                            <td>{modelCount}</td>
                                                            <td>{((modelCount * value) / count).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                        </tr>
                                                    ))}
                                                </>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col md={6} xs={12} className="mb-3 mb-md-0">
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Header as="h4" style={{ background: 'linear-gradient(135deg, #36A2EB 0%, #218838 100%)', color: '#fff', borderRadius: '12px 12px 0 0' }}>Value Distribution by Brand</Card.Header>
                                <Card.Body style={{ padding: '1.5rem' }}>
                                    <Pie
                                        data={pieData}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    display: true,
                                                    position: 'top',
                                                    labels: { font: { size: 14 } }
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function(tooltipItem) {
                                                            const label = tooltipItem.label || '';
                                                            const value = tooltipItem.raw || 0;
                                                            return `${label}: ${value.toLocaleString()} Baht`;
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                        aria-label="Pie chart showing value distribution by brand"
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} xs={12}>
                            <Card className="border-0 shadow-sm h-100">
                                <Card.Header as="h4" style={{ background: 'linear-gradient(135deg, #FFCE56 0%, #28a745 100%)', color: '#fff', borderRadius: '12px 12px 0 0' }}>Models of Each Brand</Card.Header>
                                <Card.Body style={{ padding: '1.5rem' }}>
                                    <Bar
                                        data={stackedBarData}
                                        options={{
                                            plugins: {
                                                legend: {
                                                    display: true,
                                                    position: 'top',
                                                    labels: { font: { size: 14 } }
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: function(tooltipItem) {
                                                            const label = tooltipItem.dataset.label || '';
                                                            const value = tooltipItem.raw || 0;
                                                            return `${label}: ${value}`;
                                                        }
                                                    }
                                                }
                                            },
                                            scales: {
                                                x: {
                                                    stacked: true,
                                                    title: { display: true, text: 'Brand', font: { size: 16 } }
                                                },
                                                y: {
                                                    stacked: true,
                                                    title: { display: true, text: 'Models', font: { size: 16 } },
                                                    ticks: { display: false }
                                                }
                                            }
                                        }}
                                        aria-label="Stacked bar chart showing models of each brand"
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default StatisticsPage;
