import Axios from 'axios'

const API_PORT = process.env.VUE_APP_API_PORT;
const API_DOMAIN = process.env.VUE_APP_API_DOMAIN;
const API_URL = `http://${API_DOMAIN}:${API_PORT}/api/users/`;

var signUp = function (username, password) {
	return Axios.post(`${API_URL}`, {
		user: {
			username: username,
			password: password
		}
	});
}

var login = function (username, password) {
	return Axios.post(`${API_URL}login`, {
		user: {
			username: username,
			password: password
		}
	});
}

var changePassword = function (oldPassword, password) {
	return Axios.post(`${API_URL}changepassword`, {
		password: {
			old: oldPassword,
			new: password
		}
	}, {
		headers: {
			'Authorization': `Token ${localStorage.getItem('token')}`,
			'Content-Type': `application/json`,
		}
	});
}

var getCurrent = async function () {
	const token = localStorage.getItem('token');
	if (token !== null) {
		return Axios.get(`${API_URL}current`, {
			headers: {
				'Authorization': `Token ${token}`,
				'Content-Type': `application/json`,
			}
		});
	}
	return new Promise(() => { return null });
}


export { login, signUp, changePassword, getCurrent }
