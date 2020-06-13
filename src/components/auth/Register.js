import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../store';


class Register extends Component {
  constructor() {
    super()
    this.state = { 
      name: '',
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password;
    this.props.auth(name, email, password, 'signup');
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }


  render() {
    const { name, email, password } = this.state;
    const { error } = this.props;
    return ( 
      <div className="container">   
        <section className="section">
          <div className="box">
            <h1 className='title has-text-centered'>Register</h1>
            <form onSubmit={ this.handleSubmit }>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Name" name='name' onChange={this.handleChange} value={name} />
                </div>
              </div>
  
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input is-success" type="email" placeholder="Email" name='email' onChange={this.handleChange} value={email} />
                </div>
              </div>
  
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input is-success" type="password" placeholder="Password" name='password'  onChange={this.handleChange} value={password} />
                </div>
              </div>
              
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Send</button>
                  <div>
                    <br/>
                    <Link to='/signin'>
                      <h2 className='has-text-centered'><u>Sign In here</u></h2>
                    </Link>
                    <br/>
                    {error && error.response && <div> {error.response.data}</div>}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div> 
    );
  }
};

const mapStateToProps = state => {
  return {
    error: state.user.error,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (name, email, password,method) => dispatch(auth(name, email, password, method)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);
