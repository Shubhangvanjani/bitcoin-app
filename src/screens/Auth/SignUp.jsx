import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
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
    const [confirmPassword, setConfirmPassword] = useState({
        value:'',
        error:false,
        msg:'',
        msgVariant:''
    })
    const [alertObj, setAlertObj] = useState({
        show: false,
        msg:''
    })
    let navigate = useNavigate()
    const onSignUp = () => {
        navigate('/auth/login')
    }
    const handleSignUp = () => {
        let isOk = true
        if(username.value === ""){
            isOk=false
            setUsername({...username, error:true, msg: 'Please enter username'})
        }
        if(password.value === ""){
            isOk=false
            setPassword({...password, error:true, msg: 'Please enter password'})
        }
        if(confirmPassword.value === ""){
            isOk=false
            setConfirmPassword({...confirmPassword, error:true, msg: 'Please enter confirm password'})
        }
        if(password.value === confirmPassword.value){
            isOk=false
            setAlertObj({show:true, msg: 'Passwords did not match'})
        }
        if(isOk){
            console.log("True .... ", username,password)
            setUsername({...username, error:false, msg: ''})
            setPassword({...password, error:false, msg: ''})
            setConfirmPassword({...confirmPassword, error:false, msg: ''})
        }
    }

    const handleConfirmPassword = (e) => {
        // setConfirmPassword({...confirmPassword, value: e.target.value})
        console.log("??????????>>>>>>>>>>", password.value, e.target.value)
        if(e.target.value != password.value){
            setConfirmPassword({...confirmPassword,value:e.target.value, error: true, msg:'Passwords did not matched.', msgVariant:'error'})
        }else{
            setConfirmPassword({...confirmPassword,value:e.target.value, error: true, msg:'Passwords matched.', msgVariant:'success'})
        }
    }
 
    return(
        <div class="flex h-screen ">
            <div class="m-auto border-2 px-16 py-10 shadow-xl shadow-slate-300">
                <h1 className="block text-grey-darker text-2xl font-bold mb-5">Sign Up</h1>
                <div class="mb-4">
                    <label class="block text-grey-darker text-l font-bold mb-2" for="username">
                        Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 w-96" id="username" type="text" placeholder="Username" onChange={(e) => setUsername({...username, value: e.target.value})}/>
                    {
                        username.error ?
                        <p class="text-red-500 text-xs italic">{password.msg}</p>
                        :null
                    }
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-l font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="***********" onChange={(e) => setPassword({...password, value: e.target.value})}/>
                    {
                        password.error ?
                        <p class="text-red-500 text-xs italic">{password.msg}</p>
                        :null
                    }
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-l font-bold mb-2" for="password">
                        Confirm Password
                    </label>
                    <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="***********" onChange={(e) => handleConfirmPassword(e)}/>
                    {
                        confirmPassword.error ?
                        <p class={"text-red-500 text-xs italic"}>{confirmPassword.msg}</p>
                        :null
                    }
                </div>
                <div class="flex items-center justify-between">
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleSignUp()}>
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