import { Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"

import Dashboard from "./Components/Dashboard/Dashboard"

const App = () => {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </Container>
  )
}

export default App
