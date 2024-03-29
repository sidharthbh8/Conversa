import { useState } from "react"
import useSignup from "../../hooks/useSignup"

const SignUp = () => {

  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  })

  const {loading, signup} = useSignup()

  const updateForm = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(inputs)
  }

  const { fullName, username, password, confirmPassword, email } = inputs
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
  <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
    <h1 className="text-3xl font-semibold text-center text-white">
      Sign Up 
      <span className="text-blue-500"> Conversa</span>
    </h1>
    <form action="" className="text-left" onSubmit={handleSubmit}>
    <div>
        <label htmlFor="fullName" className="label p-2">
          <span className="text-base label-text">FullName</span>
        </label>
        <input type="text" id="fullName" placeholder="Enter FullName" className="w-full p-2 my-2 input-bordered h-10 rounded-md"  value={fullName} onChange={updateForm} />
      </div>
      <div>
        <label htmlFor="username" className="label p-2">
          <span className="text-base label-text">Username</span>
        </label>
        <input type="text" id="username" placeholder="Enter Username" className="w-full p-2 my-2 input-bordered h-10 rounded-md" value={username} onChange={updateForm} />
      </div>
      <div>
        <label htmlFor="email" className="label p-2">
          <span className="text-base label-text">Email</span>
        </label>
        <input type="email" id="email" placeholder="Enter Email" className="w-full p-2 my-2 input-bordered h-10 rounded-md" value={email} onChange={updateForm} />
      </div>
      <div>
        <label htmlFor="password" className="label p-2">
          <span className="text-base label-text">Password</span>
        </label>
        <input type="password" id="password" placeholder="Enter Password" className="w-full p-2 my-2 input-bordered h-10 rounded-md" value={password} onChange={updateForm} />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="label p-2">
          <span className="text-base label-text">Confirm Password</span>
        </label>
        <input type="password" id="confirmPassword" placeholder="Confirm Password" className="w-full p-2 my-2 input-bordered h-10 rounded-md" value={confirmPassword} onChange={updateForm} />
      </div>
      <div className="mt-4">
        <button className="btn btn-active btn-secondary" >Sign Up</button>
      </div>
    </form>
  </div>
</div>
  )
}
export default SignUp