import React, { useEffect,  useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [userName, userNameUpdate] = useState("");
  const [password, passwordUpdate] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear();
  }, [])
  
  const proceedLogin = (e) => {
    e.preventDefault();
    if(validate()) {
      fetch("https://backend-bancolombia.onrender.com/users/"+userName)
        .then((res) => res.json())
        .then((resp) => {
          if(Object.keys(resp).length === 0) {
            toast.error('Please enter valid credentials');
          } else {
            if(resp.password === password) {
              toast.success('Success')
              sessionStorage.setItem('userName', userName);
              sessionStorage.setItem('userRole', resp.role);
              navigate('/');
            } else {
              toast.error('Please enter valid credentials');
            }
          }
        })
        .catch((err)=> {
          toast.error('Login failed due to: '+err.message);
        })
    }
  };
  const validate = () => {
    let result = true;
    if(userName === '' || userName === null) {
      result = false;
      toast.warning("Please enter username ");
    }
    if(password === '' || password === null) {
      result = false;
      toast.warning("Please enter password");
    }
    return result;
  }
  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form onSubmit={proceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User login</h2>
            </div>
            <div className="card-body text-left">
              <div className="form-group">
                <label htmlFor='userName'>User Name <span className="errmsg">*</span></label>
                <input id='userName' data-testid="userName" value={userName} onChange={(e)=>userNameUpdate(e.target.value)} className="form-control"/>
              </div>
              <div className="form-group">
                <label>Password <span className="errmsg">*</span></label>
                <input type="password" value={password} data-testid="password" onChange={(e)=>passwordUpdate(e.target.value)} className="form-control"/>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link className="btn btn-success" to={'/register'}>New User</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
