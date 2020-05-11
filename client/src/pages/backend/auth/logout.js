import React, {Component} from 'react';
import { Redirect } from "react-router-dom";

import { logout as LogoutUser } from "../../../api/Auth";

// class Logout extends Component {

// 	state  = {
// 		message: '',
// 		loading: false
// 	  };
	  
// 	  componentDidMount () {
// 		  const logout = LogoutUser();
// 		  this.setState({ message: logout.message });
// 		  this.props.history.push(`/`);
// 	  }


	
// 	render() {
// 		// return ('logout page');
// 		// React.lazy(() => delay(8000).then(() => import("./create")));
// 		// const delay = duration => new Promise(resolve => setTimeout(resolve, duration));
// 		// React.lazy(() => delay(5000).then(() => remove('user')));
// 		// return history.push('/login')
// 		return 
// 		// return <Redirect message={this.state.message} to="/" />
// 	}
// }

// function refreshPage() {
//     window.location.reload('/');
//   }

// const logout = function Welcome() {
// 	const logout = LogoutUser();
// 	<button onClick={refreshPage}>refresh</button>
// 	return <Redirect to="/" />
//   }
  
  function logout() {
	localStorage.setItem('notification' , JSON.stringify({type: 'success' , message: 'Logout'}))
	function refreshPage() {
	  window.location.reload(false);
	}
	const logout = LogoutUser();
	// refreshPage()
	return (
		window.location.href = "/"
	//  <Redirect to="/" refresh={true} />
	  
	);
  }

export default logout;