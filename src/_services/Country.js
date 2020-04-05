import qs from 'qs';

import AbstractService from './AbstractService'

import { ajaxRequest } from "../_helpers/ajax";

import { isEmpty } from '../_helpers/utils'

export default class Country extends AbstractService {

	static getEntities = async (filters) => {
		const queryString = isEmpty(filters) ? '' : '?' + qs.stringify(filters);
		const url = `${this.getApiDomain()}/api/v1/countries${queryString}`;

		let items = {
			counter: 0,
			entities: [],
		};

		await ajaxRequest().get(url)
			.then(res => {
				if (200 === res.status) {
					items = res.data;
				}
			})
			.catch(error => {
				console.error("getEntities > ", error.response)
			});

		return items;
	}

	static getEntity = async (id) => {
		const url = `${this.getApiDomain()}/api/v1/company/${id}`

		let item = {};

		await ajaxRequest().get(url)
			.then(res => {
				if (200 === res.status) {
					item = res.data;
				}
			})
			.catch(error => {
				console.error("getEntity > ", error.response)
			});

		return item;
	}

}
