import '../css/login.css'

function Login() {
   return(
<>
<div class="login-section z-8 m-auto mt-28">
            <h2 className="text-black text-lg pb-2 font-semibold text-center">------- Login --------</h2>
            <form action="/login" method="post" className="login-form">
                <div class="form-group">
                    <label htmlFor="email" className=' font-semibold '>Email:</label>
                    <input type="email" id="email" name="email" placeholder="example@gmail.com" required/>
                </div>
                <div class="form-group">
                    <label htmlFor="password" className=' font-semibold '>Password:</label>
                    <input type="password" id="password" name="password" placeholder="example123" required/>
                </div>
                <button type="submit">Submit</button>
            </form>
            <div class="forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
            </div>
        </div>
</>

   ) 
}

export default Login