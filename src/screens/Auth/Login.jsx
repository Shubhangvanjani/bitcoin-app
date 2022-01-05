import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Alertbox from "../../components/Alertbox"
import constants from "../../config/constants"
import { useAuth } from "../../context/AuthProvider"

const Login = (props) => {
    let navigate = useNavigate()
    let auth = useAuth()
    const [username, setUsername] = useState({
        value:'',
        error:false,
        msg:''
    })
    const [password, setPassword] = useState({
        value:'',
        error:false,
        msg:''
    })
    const [alertObj, setAlertObj] = useState({
        show: false,
        msg:''
    })

    const onSignUp = () => {
        navigate('/auth/signup')
    }

    const handleLogin = () => {
        let isOk = true
        if(username.value === ""){
            isOk=false
            setUsername({...username, error:true, msg: 'Please enter username'})
        }
        if(username.value !== "" && username.value !== constants.userName){
            isOk=false
            setUsername({...username, error:false, msg: ''})
            setAlertObj({show:true, msg: 'Invalid username and password.'})
        }
        if(password.value === ""){
            isOk=false
            setPassword({...password, error:true, msg: 'Please enter password'})
        }
        if(password.value !== "" && password.value !== constants.password){
            isOk=false
            setPassword({...password, error:false, msg: ''})
            setAlertObj({show:true, msg: 'Invalid username and password.'})
        }
        console.log("True .... ", username,password)
        if(isOk){
            auth.signin(username,() => {
                navigate('/',{replace:true})
            })
        }
    }

    const dismissAlert = () => {
        setAlertObj({show:false, msg:''})
    }   

    return(
        <div class="flex h-screen ">
            <div class="m-auto border-2 px-16 py-10 shadow-xl shadow-slate-300">
                
                <h1 className="block text-grey-darker text-2xl font-bold mb-5">Login</h1>
                {
                    alertObj.show?
                    <Alertbox message={alertObj.msg} dismissAlert={dismissAlert}></Alertbox>
                    :null
                }
                <div class="mb-4">
                    <label class="block text-grey-darker text-l font-bold mb-2" for="username">
                        Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 w-96" id="username" type="text" placeholder="Username" onChange={(e) => setUsername({...username, value: e.target.value})}/>
                    {
                        username.error ?
                        <p class="text-red-500 text-xs italic">{username.msg}</p>
                        :null
                    }
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-l font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="*********" onChange={(e) => setPassword({...password, value: e.target.value})}/>
                    {
                        password.error ?
                        <p class="text-red-500 text-xs italic">{password.msg}</p>
                        :null
                    }
                </div>
                <div class="flex items-center justify-between">
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleLogin()}>
                        Log In
                    </button>
                    <p class="inline-block align-baseline font-bold text-l text-indigo hover:text-indigo-darker">
                        Forgot Password?
                    </p>
                </div>
                <div class="mt-6">
                    <span class="text-l">Dont have account ?</span>
                    <span class="text-l hover:text-indigo-500 cursor-pointer hover:underline" onClick={() => onSignUp()}>  Sign Up</span>
                </div>
            </div>
        </div>
    )
}

export default Login