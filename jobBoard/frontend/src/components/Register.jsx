

function Register(){


    return(
<>
   <main>
        <section className="register-form">
            <h2>Create an Account</h2>
            <form action="/register" method="post">

                <label htmlFor="firstName">First name:</label>
                <input type="text" id="firstName" name="firstName" required/>

                <label htmlFor="lastName">Last name:</label>
                <input type="text" id="lastName" name="lastName" required/>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required/>
              
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" className="form-select" required>
                    <option value="" disabled selected>Select gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="prefer-not-to-say">prefer not to say</option>
                   
                </select>

                <label htmlFor="roles">Role:</label>
                <select id="roles" name="roles" className="form-select" required>
                    <option value="" disabled selected>Select Role</option>
                    <option value="job-seeker">Job Seeker</option>
                    <option value="job-creator">Job Creator</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </section>
    </main>

</>

    )


}

export default Register