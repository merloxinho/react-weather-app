import './index.css';
import Weatherapp from './components/Weatherapp';
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <>
      <Weatherapp />
      <Analytics />
    </>
  )
}

export default App
