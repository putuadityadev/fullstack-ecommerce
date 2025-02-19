import { useState } from "react"
import { createUser, verifyUser } from "../../data/api";
import { useNavigate } from "react-router-dom";

const AuthCard = ({isLogin, onClick}) => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    role: "Customer",
  })

  const handleChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setUserData({
      ...userData,
      [e.target.name] : value
    })
  }

  console.log(userData)

  const handleUserSubmit = async () => {
    try {
      const user = {
        email: userData.email,
        name: userData.name,
        password: userData.password,
        role: "Customer",
      }

      const result = await createUser(user)
      if(result) {
        console.log(result)
        alert(result.message)
      } else {
        alert("error create user")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = {
        email: userData.email,
        password: userData.password
      }

      const token = await verifyUser(user)
      
      if(token) {
        sessionStorage.setItem('token', token)
        alert('Login success')
        navigate('/')
      } else {
        alert('Invalid email or password')
      }
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Login failed')
    }
  } 

  
  return (
    <div className="w-fit p-8 rounded-xl bg-primary/4 border border-primary/20">
        <h1 className="font-integralcf text-xl mb-5 md:text-2xl text-center">
          {!isLogin ? 'Create new account' : 'login to account'}
        </h1>
        <form className="flex flex-col font-satoshi" onSubmit={!isLogin ? handleUserSubmit : handleLogin}>
          <label className="text-md font-bold md:text-lg">Email</label>
          <input
            type="email"
            placeholder={!isLogin ? "Add your email" : "Enter your email"}
            className="border py-2 px-4 rounded-xl mb-4 md:py-3"
            name="email"
            required
            maxLength={50}
            onChange={handleChange}
          />
          <label className={`${isLogin ? 'hidden' : ''} text-md font-bold md:text-lg`}>Name</label>
          <input
            type="text"
            placeholder="Input your name"
            className={`${isLogin ? 'hidden' : ''} border py-2 px-4 rounded-xl mb-4 md:py-3`}
            name="name"
            required
            maxLength={50}
            onChange={handleChange}
            disabled={!isLogin ? false : true}
          />
          <label className="text-md font-bold md:text-lg">Password</label>
          <input
            type="password"
            placeholder={!isLogin ? "Choose strong password" : "Enter your password"}
            className="border py-2 px-4 rounded-xl mb-4 md:py-3"
            name="password"
            required
            maxLength={50}
            onChange={handleChange}
          />
          <button type="submit" className="py-2 px-4 bg-primary text-white font-bold rounded-xl mt-2 hover:cursor-pointer md:text-lg md:py-3">{!isLogin ? "Sign Up" : "Sign In"}</button>
          <h3 className="text-xs text-center mt-4 md:text-sm">{!isLogin ? "Already have an account?" : "Not have an account?"} <a onClick={onClick} className="font-bold underline hover:cursor-pointer">{!isLogin ? "Login" : "SignUp"}</a></h3>
        </form>
      </div>
  )
}

export default AuthCard