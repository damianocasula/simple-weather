import logo from "./assets/undraw_weather_app_re_kcb1-2.svg"
import "./App.css"

function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <main className="main">
          <img src={logo} className="logo" alt="logo" />
          <p>Just Another Simple Weather App</p>
        </main>
      </div>
    </div>
  )
}

export default App
