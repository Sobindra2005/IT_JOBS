import React from 'react';
import '../css/register.css'

function Register() {
    return (
        <>
            <main className="mt-20 z-8">
                <section className="register-form">
                    <h2 className="text-lg font-bold text-center">------- Create An Account --------</h2>
                    <form action="/register" method="post">

                        <label htmlFor="firstName">First name:</label>
                        <input type="text" id="firstName" name="firstName" placeholder="john" required />

                        <label htmlFor="lastName">Last name:</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Doe" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="example@gmail.com" required />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="example123" required />

                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" name="gender" className="form-select" required defaultValue="">
                            <option value="" disabled>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>

                        <label htmlFor="roles">Role:</label>
                        <select id="roles" name="roles" className="form-select" required defaultValue="">
                            <option value="" disabled>Select Role</option>
                            <option value="job-seeker">Job Seeker</option>
                            <option value="job-creator">Job Creator</option>
                        </select>

                        <button type="submit">Register</button>
                    </form>
                </section>
            </main>
        </>
    );
}

export default Register;