import {useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import rates from '../../api/rates';
import Alertbox from '../../components/Alertbox';

const data = [
    {
      name: 'Jan',
      holding: 240,
      amt: 240,
    },
    {
      name: 'Feb',
      holding: 139,
      amt: 221,
    },
    {
      name: 'Mar',
      holding: 980,
      amt: 229,
    },
    {
      name: 'Apr',
      holding: 390,
      amt: 200,
    },
    {
      name: 'May',
      holding: 480,
      amt: 218,
    },
    {
      name: 'Jun',
      holding: 380,
      amt: 250,
    },
    {
      name: 'Jul',
      holding: 430,
      amt: 210,
    },
  ];

const Home = () => {

    const [bitValue, setBitValue] = useState(0)
    const [bit, setBit] = useState("")
    const [bitObj, setBitObj] =useState({
        obj: null,
        error: false,
        msg: ""
    })
    const [price, setPrice] = useState("")
    const [balance, setBalance] = useState(100000)
    const [holdings, setHoldings] = useState({amount:0, bit:0})
    const [errorObj, setErrorObj] = useState({show:false, msg:''})

    useEffect(() => {
        rates.getRatesById('bitcoin').then((res) => {
            if(res.status === 200){
                console.log("Response .... ", res.data.data.symbol)
                setBitObj((prev) => {
                    return {...prev,error:false, obj: res.data.data}
                })
                setErrorObj({show:false,msg:''})
                setBitValue(parseFloat(res.data.data.rateUsd).toFixed(2))
            }

        }).catch((err) => {
            console.log("Error .... ", err.status)
            // if(err.response.status === 429){
            //     setErrorObj({show:true,msg:'You exceeded your 200 request(s) rate limit of your FREE plan.'})
            // }else{
                console.log("Here .....  IN Error")
                setErrorObj({show:true,msg:'Something went wrong fetching bitcoin rates.'})
                // setBitObj({...bitObj, error:true, msg: ""})
            // }
        })
    },[])
    
    const handleBitChange = (e) => {
        setBit(parseFloat(e.target.value))
        let price = parseFloat(e.target.value) * bitValue
        // setTempBalance((prev) => prev-price)
        setPrice(price)
    }

    const handleBitBuy = () => {
        let isOk=true
        let errMessage = ""
        if(bit === ""){
            isOk=false
            errMessage="Bit value cannot be empty."
        }
        if(bit<=0){
            isOk=false
            errMessage="Bit value cannot be less than 0."
        }
        if(price > balance){
            isOk=false
            errMessage="Not enough balance in the wallet."
        }
        if(!isOk){
            // alert(errMessage)
            setErrorObj({
                show:true,
                msg: errMessage
            })
        }else{
            setBalance((prev) => prev-price)
            setBit("")
            setPrice("")
            if(holdings.amount === 0){
                setHoldings({amount:price, bit: bit})
            }else{
                setHoldings((prev) => {
                    return {...prev, amount: prev.amount + price, bit: prev.bit + bit}
                })
            }
            setErrorObj({
                show:false,
                msg: ''
            })
        }
    }
    const handleBitSell = () => {
        let isOk=true
        let errMessage = ""
        if(price > holdings.amount){
            isOk=false
            errMessage="Total bits available to sell are: " + holdings.bit
        }
        if(holdings.amount <= 0){
            isOk=false
            errMessage="Currently No holdings."
        }
        
        if(bit<=0){
            isOk=false
            errMessage="Bit value cannot be less than 0."
        }
        if(bit === ""){
            isOk=false
            errMessage="Bit value cannot be empty."
        }
        if(isOk){
            console.log("Holdings ... ",holdings)
            setBalance((prev) => prev + price)
            setHoldings((prev) => {
                return {...prev, amount: prev.amount - price, bit: (prev.bit - bit).toFixed(2)}
            })
            setPrice("")
            setBit("")
            setErrorObj({
                show:false,
                msg: ''
            })
        }else{
            // alert(errMessage)
            setErrorObj({
                show:true,
                msg: errMessage
            })
        }
    }

    const dismissAlert = () => {
        console.log("Called.... ")
        setErrorObj({show:false,msg:''})
    }

    return(
        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-2">
            {
                errorObj.show ? 
                <Alertbox message={errorObj.msg} dismissAlert={dismissAlert}></Alertbox>
                :null
            }
            <div className="flex py-6 md:justify-start md:space-x-10">
                <div className="flex lg:w-0 lg:flex-1">
                    <div class="grid grid-flow-col gap-4 w-full">
                        {/* Details container */}
                        <div class="col-span-2">
                            <div class="rounded shadow-lg h-full border-1">
                                <div class="px-6 py-4 text-center">
                                    <div class="font-bold text-xl mb-2">Available Balance</div>
                                    <span className='flex justify-center items-center'>
                                        {/* <CurrencyDollarIcon className='h-20 w-20 text-indigo-600'></CurrencyDollarIcon> */}
                                        <p className='text-indigo-600 text-3xl'>$ {balance.toFixed(2)}</p>
                                    </span>
                                    <div className='mt-3'>Transaction History</div>
                                </div>
                            </div>
                        </div> 

                        {/* Graph container */}
                        <div class="col-span-2">
                            {/* <div class="row-span-3"> */}
                                <div class="w-auto  rounded overflow-hidden shadow-lg py-2">
                                    {/* <ResponsiveContainer className='col-span-2 row-span-3'> */}
                                        <LineChart
                                        width={800}
                                        height={300}
                                        data={data}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: 10,
                                            bottom: 5,
                                        }}
                                        >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="holding" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                                        </LineChart>
                                    {/* </ResponsiveContainer> */}
                                </div>
                            {/* </div> */}
                        </div>

                        {/* Right side  */}
                        <div class="row-span-2">
                            <div class="max-w-sm rounded overflow-hidden shadow-lg h-full">
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-1">Bitcoin {bitObj.obj !== null ? '(' + bitObj.obj.symbol + ') (' + bitObj.obj.currencySymbol + ')' : '' }</div>
                                    <div className='flex items-center' >
                                        <div class="text-2xl mb-1 text-green-400">$ {bitValue}  </div>
                                        {/* <div className="text-l mb-1 text-green-400"> (+1.21)</div> */}
                                    </div>
                                    <div className='flex justify-between m-2 mt-5'>
                                        <p className='basis-1'>Bitcoins:</p>
                                        <input type='number' className='w-32 border rounded ml-5' value={bit} onChange={(e) => handleBitChange(e)}></input>
                                    </div>
                                    <div className='flex justify-between m-2 mt-5 '>
                                        <p className='basis-1'>Price:</p>
                                        <input type='number' disabled value={price} className='w-32 border rounded ml-5'></input>
                                    </div>
                                    <hr className='mt-5'></hr>
                                    <div className='flex justify-between m-2 mt-5 '>
                                        <p className='basis-1'>Options:</p>
                                        <div className='text-slate-500 text-sm'>
                                            Balance: $ {balance.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className='flex justify-between m-2 mt-5 '>
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full m-2" onClick={() => handleBitBuy()}>
                                            {/* <span class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                            </span> */}
                                            Buy
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full m-2" onClick={() => handleBitSell()}>
                                            Sell
                                        </button>
                                    </div>
                                    <div className='mt-5 text-xl font-bold'>Holdings</div>
                                    <div className='flex justify-between m-2 mt-3 '>
                                        <p className='basis-1'>Bitcoins:</p>
                                        <div>{holdings !== null ? holdings.bit : 0}</div>
                                        {/* <input type='number' disabled value={price} className='w-32 border rounded ml-5'></input> */}
                                    </div>
                                    <div className='flex justify-between m-2 mt-3 '>
                                        <p className='basis-1'>Amount:</p>
                                        <div>{holdings !== null ? holdings.amount.toFixed(2) : 0}</div>
                                        {/* <input type='number' disabled value={price} className='w-32 border rounded ml-5'></input> */}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home