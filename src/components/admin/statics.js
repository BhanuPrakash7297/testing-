


import React, { useEffect, useRef, useState } from 'react'
import Layout from '../Layout/Layout'
import AdminMenu from '../Layout/AdminMenu'
import { StaticCard } from '../staticCard.js'
import Chart from 'chart.js/auto';



const Statics = () => {

    const chartRef = useRef(null);
    // const [, set] = useState(new Date().getFullYear());
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            const data = {
                labels: ['January', 'February', 'March', 'April', 'May'],
                datasets: [
                    {
                        label: `${2023}`,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        data: [12, 19, 3, 5, 2] // Replace this with your data for the selected year
                    }
                ]
            };

            if (chartInstance) {
                chartInstance.destroy(); // Destroy the previous chart instance
            }

            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

            setChartInstance(newChartInstance);

            return () => {
                if (newChartInstance) {
                    newChartInstance.destroy(); // Destroy the chart instance when the component unmounts
                }
            };
        }
    }, []);

    useEffect(() => {
        const resizeHandler = () => {
            if (chartInstance) {
                chartInstance.resize(); // Resize the chart when the window size changes
            }
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler); // Cleanup function
        };
    }, [chartInstance]);



    return (
        <><Layout title={'Dashboard create-product'}>
            <div className='container-fluid m-3 p-3 dashboard'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    {/* <div className='col-md-9' style={{ display: 'flex', gap: '1rem', padding: '12px' }}> */}
                    <div className='col-md-9' style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2rem' }}>
                            <StaticCard />
                            <StaticCard />
                            <StaticCard />
                            <StaticCard />
                        </div>

                        <div style={{ width: '100%' }}>

                            <canvas ref={chartRef} id="myChart" />

                        </div>
                    </div>

                </div>
            </div>
        </Layout >
        </>
    )
}

export default Statics


