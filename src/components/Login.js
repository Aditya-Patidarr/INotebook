import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("success","Logged In Successfully")
            navigate("/");
        }
        else{
            props.showAlert("danger","Invalid Credentials")
        }
    }
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='mt-3'>
            <h2>Login to Continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" value={credentials.email} id="email" aria-describedby="emailHelp"
                    onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" value={credentials.password} id="password" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login