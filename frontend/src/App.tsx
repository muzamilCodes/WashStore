import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "./redux/Actions/UserActions"
import type { AppDispatch, RootState } from "./redux/Store"
import Login from "./pages/Login"
import type { User } from "./types/Types"
import Navbar from "./shared/Navbar"
import avatar from "./assets/avatar.png"
import Home from "./pages/Home"



function App() {
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    if(document.cookie.includes("P7WebApi_Auth_Token")){

      dispatch(fetchUser())
    }

  }, [dispatch])


  const user: User = useSelector((store: RootState) => store.loggedInUser)   // user ko redux store se fetch kiya 
  return (
    <>
      <BrowserRouter>
        <Navbar username={user.username} profilePic={user.profilePicUrl ?? avatar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App