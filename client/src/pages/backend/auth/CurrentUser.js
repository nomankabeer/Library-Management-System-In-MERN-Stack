import React, { Component } from 'react';
import { updateUserProfile } from "../../../api/Auth";
import { store } from 'react-notifications-component';
class CurrentUser extends Component {

	getUser = async () => {
		return await localStorage.getItem('user');
	}

	state = {
		email: '',
		username: '',
		loading: false,
		done: false,
		error: undefined,
	};

	componentDidMount() {
		this.getUser().then(response => {
			var data = JSON.parse(response);
			if (data == null) {
				window.location.href = "/logout";
			}
			this.setState({ email: data.email, username: data.username });
		});
	}

	handleChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	sendUpdateRequest = async (e) => {
		return await updateUserProfile(this.state.email, this.state.username);
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		this.setState({ loading: true });;
		this.sendUpdateRequest().then(response => {
			if (response.success === false) {
				window.location.href = '/logout';
			}
			else if (response.success === true) {
				this.setState({ done: true });
				localStorage.setItem('user', JSON.stringify(response.data.getData()));
				this.notification({ type: "success", message: "Profile updated" });
			}
		});
		this.setState({ loading: false });
	};

	notification(status) {
		store.addNotification({
			title: "Success",
			message: `${status.message}`,
			type: `${status.type}`,
			insert: "top",
			container: "top-right",
			animationIn: ["animated", "fadeIn"],
			animationOut: ["animated", "fadeOut"],
			dismiss: {
				duration: 5000,
				onScreen: true
			}
		});
	}


	render() {
		return (
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
										<form onSubmit={this.handleSubmit}>
											<div class="panel-body">
												<div class="position-center">
													<form role="form">
														<div class="form-group">
															<label for="exampleInputEmail1">Email address</label>
															<input type="email" name="email" onChange={this.handleChange} value={this.state.email} class="form-control" id="exampleInputEmail1" placeholder="Enter emai" />
															{/* <input type="email" onChange={this.handleChange} name="email"  class="form-control" id="exampleInputEmail1" placeholder="Enter emai" /> */}
														</div>
														<div class="form-group">
															<label for="exampleInputPassword1">User Name</label>
															<input type="text" onChange={this.handleChange} name="username" value={this.state.username} class="form-control" id="exampleInputPassword1" placeholder="User Name" />
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
										</form>
									</section>
								</div>
							</div>
						</div>
					</section>
				</section>
			</>
		)
	}
}
export default CurrentUser;