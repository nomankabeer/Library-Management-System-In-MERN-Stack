import React, {Component} from 'react';
import { Link , Redirect } from "react-router-dom";

import { getCurrentUser } from "../../../api/Auth";

import UserModel from "../../../models/User"
import cookie from "js-cookie";


class CurrentUser extends Component {

     getUser = async () => {
		return await localStorage.getItem('user'); 
	}

	state  = {
		email: '',
		username: '',
		loading: false,
		done: false,
		error: undefined,
	  };
	  
	  componentDidMount() {
		this.getUser().then(response => {
			var data = JSON.parse(response);
			if(data == null){
				window.location.href = "/logout";
			}
		  this.setState({email: data.email , username: data.username  });
		});
	}

	  handleChange = event => {

	  const target = event.target;
	  const value = target.value;
	  const name = target.name;
	//   console.log(event.target.name , " => " , event.target.value)
	  this.setState({ [name]: value });
		
	//   this.setState({ email: event.target.value });
	  }

	  handleSubmit = async (e) => {
		e.preventDefault();
		this.setState({ loading: true });;
		const user = await getCurrentUser();	
		// console.log(user.data.getData().authToken , 'sssssssssssssss');
		if (user.success) {
		  this.setState({ done: true });
		  localStorage.setItem('user' , user.data.getData());
		  cookie.set('authToken' ,  user.data.getData().authToken)
		} else {
		  this.setState({error: user.message });
		}
		this.setState({ loading: false });
	  };




  render() {

    return(

<>

<section id="mdain-content" className="container">
	<section class="dwrapper">
	<div class="form-w3layouts">
   
        <div class="row">
            <div class="col-lg-12">
                    <section class="panel">
                        <header class="panel-heading">
                            Profile
                        </header>
                        <div class="panel-body">
                            <div class="position-center">
                                <form role="form">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" value={this.state.email} class="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">User Name</label>
                                    <input type="text" value={this.state.username} class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputFile">File input</label>
                                    <input type="file" id="exampleInputFile" />
                                    <p class="help-block">Example block-level help text here.</p>
                                </div>
                                <button type="submit" class="btn btn-info">Update</button>
                            </form>
                            </div>

                        </div>
                    </section>

            </div>

			</div></div></section></section>
      </>
    )
  }
}
export default CurrentUser;