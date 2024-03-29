import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {loading, login} = useLogin()

  const handleUsername = (e) => {
    e.preventDefault()
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
  <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
    <h1 className="text-3xl font-semibold text-center text-white">
      Login 
      <span className="text-blue-800"> Conversa</span>
    </h1>
    <form action="" className="text-left" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username" className="label p-2">
          <span className="text-base label-text">Username</span>
        </label>
        <input type="text" id="username" placeholder="Enter Username" className="w-full p-2 my-2 input-bordered h-10 rounded-md" value={username} onChange={handleUsername} />
      </div>
      <div>
        <label htmlFor="password" className="label p-2">
          <span className="text-base label-text">Password</span>
        </label>
        <input type="password" id="password" placeholder="Enter Password" className="w-full p-2 my-2 input-bordered h-10 rounded-md" value={password} onChange={handlePassword}/>
      </div>
      <div className="mt-2">
        <Link to="/signup" className="text-sm text-white hover:underline hover:text-blue-300 inline-block">{`Don't`} have an account?</Link>
      </div>
      <div className="mt-4">
        <button className="btn btn-active btn-sm mt-2">LogIn</button>
      </div>
    </form>
  </div>
</div>

  );
};
export default Login;
