import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { FaRegUserCircle } from 'react-icons/fa'
import { FcDepartment } from 'react-icons/fc'

import Chart from '../Chart/Chart'
import Chart2 from '../Chart/Chart2'

import './dashboard.css'

const Dashboard = () => {
    const [userData, setUserData] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)

    useEffect(() => {
        axios
            .get(`http://localhost:3000/users`)
            .then((res) => {
                setUserData(res.data)
                setTotalUsers(res.data.length)
            })
            .catch((err) => {
                alert('something wrong in get method', err)
            })
    }, [])

    const uniqueData = []
    // eslint-disable-next-line 
    userData.map((items) => {
        if (uniqueData.indexOf(items.company.department) === -1) {
            return uniqueData.push(items.company.department)
        }
    })
    console.log(uniqueData)

    const departmentCounts = userData.reduce((acc, user) => {
        acc[user.company.department] = acc[user.company.department] + 1 || 1
        return acc
    }, {})

    return (
        <>
            <Row>
                <Col className='col'>
                    <Card className='card'>
                        <Card.Body>
                            <Card.Title>
                                <FaRegUserCircle
                                    style={{ fontSize: '2rem', marginRight: '0.5rem' }}
                                />
                            </Card.Title>
                            <Card.Text>
                                {totalUsers}
                            </Card.Text>
                            <Card.Text>Total Users</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                {uniqueData.map((value, i) => (
                    <Col className='col' key={i}>
                        <Card className='card'>
                            <Card.Body>
                                <Card.Title>
                                    <FcDepartment
                                        style={{ fontSize: '2rem', marginRight: '0.5rem' }}
                                    />
                                </Card.Title>

                                <div>
                                    {Object.entries(departmentCounts).map(([department, count]) =>
                                        department === value ?
                                            (
                                                <Card.Text key={department}>
                                                    {count} users
                                                </Card.Text>
                                            ) : null
                                    )}
                                </div>

                                <Card.Text>{value}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Chart />
            <Chart2 />
        </>
    )
}

export default Dashboard