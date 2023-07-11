import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
/* import { Link } from "react-router-dom"; */
import { toast } from "react-toastify";

const Register = () => {
  const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [password, passwordChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [country, countryChange] = useState("");
  const [address, addressChange] = useState("");
  const [skills, skillsChange] = useState([]);
  const [skillsUser, skillsUserChange] = useState("");
  const [role, roleChange] = useState("");
  const [gender, genderChange] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://backend-bancolombia.onrender.com/skills")
    .then((res) => res.json())
    .then((resp) => {
        skillsChange(resp);
    })
    .catch((err)=> {
      toast.error('Failed service: '+err.message);
    });
  }, []);
  
  const isValidate=()=>{
    let isProceed = true;
    let errorMessage = 'Please enter the value in ';
    if(id === null || id === ''){
      isProceed = false;
      toast.warning("Please enter the value in username");
    }
    if(name === null || name === ''){
      isProceed = false;
      errorMessage += 'Fullname ';
    }
    if(phone === null || phone === ''){
      isProceed = false;
      errorMessage += 'Phone ';
    }
    if(password === null || password === ''){
      isProceed = false;
      errorMessage += 'Password ';
    }
    if(email === null || email === ''){
      isProceed = false;
      errorMessage += 'Email ';
    }
    if(country === null || country === ''){
      isProceed = false;
      errorMessage += 'Country ';
    }
    if(role === null || role === ''){
      isProceed = false;
      errorMessage += 'Role ';
    }
    if(!isProceed){
      toast.warning(errorMessage);
    } else {
      if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
        isProceed = false;
        toast.warning('Please enter the valid email')
      }
    }
    return isProceed;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let regobj={
      id,
      name,
      password,
      email,
      phone,
      skills,
      country,
      role,
      address,
      gender
    }
    if(isValidate()) {
      fetch("https://backend-bancolombia.onrender.com/users", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(regobj)
      }).then(() => {
        toast.success('Registered successfully.')
        navigate('/login');
      }).catch((err) => {
          toast.error('Failed :' + err.message);
      });
    }
  }
  return (
    <div>
      <section className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>Register</h1>
            </div>
            <div className="card-body text-left">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>User name <span className="errmsg">*</span></label>
                    <input value={id} onChange={e=>idChange(e.target.value)} className="form-control"/>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password <span className="errmsg">*</span></label>
                    <input value={password} onChange={e=>passwordChange(e.target.value)} type="password" className="form-control"/>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Full Name <span className="errmsg">*</span></label>
                    <input value={name} onChange={e=>nameChange(e.target.value)} className="form-control"/>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email<span className="errmsg">*</span></label>
                    <input value={email} onChange={e=>emailChange(e.target.value)} className="form-control"/>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phone number<span className="errmsg">*</span></label>
                    <input value={phone} onChange={e=>phoneChange(e.target.value)} className="form-control"/>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Country<span className="errmsg">*</span></label>
                    <select value={country} onChange={e=>countryChange(e.target.value)} className="form-control">
                      <option value="">Select country</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Adress</label>
                    <input value={address} onChange={e=>addressChange(e.target.value)} className="form-control"></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Role <span className="errmsg">*</span></label>
                    <select value={role} onChange={e=>roleChange(e.target.value)} className="form-control">
                      <option value="">Select role</option>
                      <option value="client">Client</option>
                      <option value="doer">Doer</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Skills</label>
                    <select value={skillsUser} onChange={e=>skillsUserChange(e.target.value)} className="form-control">
                      <option value="">Select skills</option>
                      {skills.map((skill) => {
                        return (
                          <option key={skill.id} value={skill.skill}>{skill.skill}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <br></br>
                    <input checked={gender === 'male'} onChange={e=>genderChange(e.target.value)} type="radio" name="gender" value="male" className="app-check"/>
                    <label>Male</label>
                    <input checked={gender === 'female'} onChange={e=>genderChange(e.target.value)} type="radio" name="gender" value="female" className="app-check"/>
                    <label>Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Registrarme</button>
              <Link to={'/login'} className="btn btn-danger">Close</Link>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
