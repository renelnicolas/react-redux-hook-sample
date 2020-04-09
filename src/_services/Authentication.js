import AbstractService from './AbstractService'

import { ajaxRequest } from "../_helpers/ajax";
import { setItem as storageSetItem, clearItems as storageClearItems } from "../_helpers/storage";

import EntityUserSignIn from '../_models/UserSignIn'

export default class Authentication extends AbstractService {

	static signIn = async (credentials) => {
		const url = `${this.getApiDomain()}/signin`

		let user = false;

		await ajaxRequest().post(url, credentials)
			.then(res => {
				if (200 === res.status) {
					user = new EntityUserSignIn(res.data)
					storageSetItem('user', user);
				}
			})
			.catch(error => {
				console.error("signIn > ", error.response)
			});

		return user;
	}

	static loginCheck = async (user) => {
		const url = `${this.getApiDomain()}/login_check`

		let ok = false;

		await ajaxRequest().post(url, user)
			.then(res => {
				if (200 === res.status) {
					ok = true;
				}
			})
			.catch(error => {
				console.error("loginCheck > ", error.response)
			});

		return ok;
	}

	static forgotPassword = async (email) => {
		const url = `${this.getApiDomain()}/forgot_password`

		let ok = false;

		await ajaxRequest().post(url, email)
			.then(res => {
				if (200 === res.status) {
					ok = true;
				}
			})
			.catch(error => {
				console.error("forgotPassword > ", error.response)
			});

		return ok;
	}

	static signUp = async (user) => {
		const url = `${this.getApiDomain()}/signup`

		let ok = false;

		await ajaxRequest().post(url, user)
			.then(res => {
				if (200 === res.status) {
					ok = true;
				}
			})
			.catch(error => {
				console.error("signUp > ", error.response)
			});

		return ok;
	}

	static logout = (user) => {
		storageClearItems();
		return true;
	}

}
