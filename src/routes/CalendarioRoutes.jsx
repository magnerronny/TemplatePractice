import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarioPage } from "../calendario";

export const CalendarioRoutes = () => {
  const auth = 'authenticated';  // 'not-authenticated'
  // const auth = 'not-authenticated';  // 'not-authenticated'

  return (
    <>
      <Routes>
      {
        (auth === 'not-authenticated')
        ?
          <Route path="/auth/*" element = {<LoginPage/>} />
        :
          <Route path="/" element = {<CalendarioPage/>} />
      }

      <Route path="/*" element = { <Navigate to= "/auth/login" /> }/>
      </Routes>
    </>
  )
}
