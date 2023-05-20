import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ApexChart from 'react-apexcharts'

const Chart2 = () => {
    const [departmentsData, setDepartmentsData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                const data = response.data
                const departmentData = data.map(item => ({
                    department: item.comapny.department,
                    dataLength: item.data.length,
                }))
                setDepartmentsData(departmentData)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const chartData = {
        series: departmentsData,
        options: {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: departmentsData.map(item => item.department),
            },
        },
    }

    return (
        <div className='mb-5'>
            <ApexChart options={chartData.options} series={chartData.series} type='bar' height={350} />
        </div>
    )
}

export default Chart2
