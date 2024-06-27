

function Jobapply(){
    return(
<>
<div className="w-screen h-auto overflow-scroll fixed inset-0 bg-gray-800 bg-opacity-60 z-50 flex justify-center  ">

<div className="bg-white border border-black  p-2 px-2 rounded-xl w-2/5 overflow-scroll h-screen my-2 shadow-md  flex flex-col  ">
<h1 className=" text-center flex  w-2/4 text-xl border-b-2 border-gradient-to-r from-transparent via-black to-transparent  font-semibold text-gray-600 ">Apply Job</h1>
<div className="p-2  ">
    <div className=" flex items-center border border-black   h-8  rounded-lg px-1 text-gray-700">
    <label className="text-gray-700 " htmlFor="firstName"></label>
    <input type="text"  id="firstName" placeholder="First name" className=" h-7  outline-none rounded-l-lg px-1 text-gray-700" /><span className="bi bi-person-fill text-xl "></span>
    </div>
</div>
</div>

</div>

</>
    )
}

export default Jobapply