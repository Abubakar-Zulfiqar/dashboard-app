import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactApexChart from 'react-apexcharts'

import './chart.css'

const Chart = () => {
    const [data, setData] = useState([])


    const departmentCounts = data.reduce((acc, user) => {
        acc[user.company.department] = acc[user.company.department] + 1 || 1
        return acc
    }, {})

    const [chartData, setChartData] = useState({

        series: [{
            name: 'Users',
            data: [5, 2, 2, 5, 1, 5, 2, 3, 3, 1, 1]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Users by departments',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Marketing', 'Services', 'Business Development', 'Support', 'Accounting', 'Product Management', 'Human Resources', 'Research and Development', 'Sales', 'Legal', 'Engineering'],
            }
        },
    })

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const uniqueData = []
    // eslint-disable-next-line 
    data.map((items) => {
        if (uniqueData.indexOf(items.company.department) === -1) {
            return uniqueData.push(items.company.department)
        }
    })


    return (
        <div className='chart'>
            <ReactApexChart options={chartData.options} series={chartData.series} type='line' height={350} />
        </div>
    )
}

export default Chart