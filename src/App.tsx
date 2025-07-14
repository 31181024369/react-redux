
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { decrement, increment } from './redux/counter/counter.slice'
import { useAppDispatch, useAppSelector } from './redux/hook'

function App() {
  const count=useAppSelector(state=>state.count);
  const dispatch=useAppDispatch();
  console.log(">>> check count=",count);


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    <div>
      <h1>My current count={count.value}</h1>
      <div>
        <button 
        onClick={()=>dispatch(
          increment()
        )}
        >Increase+1</button>
      </div>
      <div>
         <button 
        onClick={()=>dispatch(
          decrement()
        )}
        >decrement-1</button>
      </div>

    </div>
    </>
  )
}

export default App
