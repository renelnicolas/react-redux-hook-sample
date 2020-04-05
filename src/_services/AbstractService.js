
export default class AbstractService {

	static getConfig = () => {
		let config = {
			env: process.env.REACT_APP_CUSTOM_NODE_ENV,
			scheme: process.env.REACT_APP_SCHEMME,
			domain: process.env.REACT_APP_DOMAIN,
		}

		return config;
	}

	static getApiDomain = () => {
		const config = this.getConfig();

		return `${config.scheme}://${config.domain}`
	}

}
