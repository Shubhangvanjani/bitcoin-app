import { useNavigate } from "react-router-dom"

const SignUp = () => {
    let navigate = useNavigate()
    const onSignUp = () => {
        navigate('/auth/login')
    }
    return(
        <div class="flex h-screen ">
            <div class="m-auto border-2 px-16 py-10 shadow-xl shadow-slate-300">
                <h1 className="block text-grey-darker text-2xl font-bold mb-5">Sign Up</h1>
                <div class="mb-4">
                    <label class="block text-grey-darker text-l font-bold mb-2" for="username">
                        Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 w-96" id="username" type="text" placeholder="Username"/>
                    {/* <p class="text-red-500 text-xs italic">Please enter username.</p> */}
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-l font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="***********"/>
                    {/* <p class="text-red-500 text-xs italic">Please enter a password.</p> */}
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-l font-bold mb-2" for="password">
                        Confirm Password
                    </label>
                    <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="***********"/>
                    {/* <p class="text-red-500 text-xs italic">Please enter a password.</p> */}
                </div>
                <div class="flex items-center justify-between">
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" >
                        Sign Up
                    </button>
                </div>
                <div class="mt-6">
                    <span class="text-l">Already have an account ?</span>
                    <span class="text-l hover:text-indigo-500 cursor-pointer hover:underline" onClick={() => onSignUp()}>  Sign In</span>
                </div>
            </div>
        </div>
    )
}

export default SignUp