import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword:""});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:credentials.name,email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("success","Account Created Successfully")
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
    <div className="container mt-3">
    <h2>Register to Start using iNotebook</h2>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" name="name" className="form-control" value={credentials.name} id="name" aria-describedby="emailHelp"
            onChange={handleChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" value={credentials.email} id="email" aria-describedby="emailHelp"
            onChange={handleChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-control" value={credentials.password} id="password" onChange={handleChange} minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" name="cpassword" className="form-control" value={credentials.cpassword} id="cpassword" onChange={handleChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
  )
}

export default Signup