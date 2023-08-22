import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { CalendarioRoutes } from "./routes"
import { store } from "./store"

export const CalendarioApp = () => {
  return (
    <>
      <Provider store={store} >
        <BrowserRouter>
        <CalendarioRoutes/>
        </BrowserRouter>
      </Provider>
    </>
  )
}