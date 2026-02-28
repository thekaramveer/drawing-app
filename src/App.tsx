
import './App.css'
import CanvasView from './canvas/components/CanvasView'

function App() {


  return (
    <div className="w-screen h-screen bg-neutral-900 flex items-center justify-center">
      <div className="relative w-full h-full max-w-[1400px] max-h-[900px]">
        <CanvasView />
      </div>
    </div>
  )
}

export default App
