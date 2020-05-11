import React, { Component } from 'react';
import { logout as LogoutUser } from "../../../api/Auth";
function logout() {
	localStorage.setItem('notification', JSON.stringify({ type: 'danger', message: 'Logout' }))
	LogoutUser();
	return (
		window.location.href = "/"
	);
}
export default logout;