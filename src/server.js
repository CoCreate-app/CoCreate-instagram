'use strict'
const api = require('@cocreate/api');


class CoCreateInstagram {
	constructor(wsManager) {
		this.wsManager = wsManager;
		this.moduleName = "instagram";
		this.init();
	}

	init() {
		if (this.wsManager) {
			this.wsManager.on(this.moduleName, (socket, data) => this.sendinstagram(socket, data));
		}
	}

	async sendinstagram(socket, data) {
		let params = data['data'];
		let environment;
		let action = data['action'];
	
		try {
			let org = await api.getOrg(data, this.moduleName);
			if (params.environment){
				environment = params['environment'];
				delete params['environment'];  
			} else {
			  	environment = org.apis[this.moduleName].environment;
			}
			
			let key = org.apis[this.moduleName][environment];
			// twitter = require('stripe')(key);
		} catch (e) {
			console.log(this.moduleName + " : Error Connect to api", e)
		}
	  
		try {
			let response
			switch (action) {
				case 'getUserProfile':
					response = this.getUserProfile(socket, action, params);
					break;
			}
			this.wsManager.send(socket, this.moduleName, { action, response })
		} catch (error) {
			this.handleError(socket, action, error)
		}
	}


	async getUserProfile(socket, action, params) {
		try {

			const response = {
				'object': 'list',
				'data': 'testing success',
			};

			api.send_response(this.wsManager, socket, { "action": action, "response": response }, this.moduleName);
		} catch (error) {
			this.handleError(socket, action, error)
		}
	}

	handleError(socket, action, error) {
		const response = {
			'object': 'error',
			'data': error.message || error,
		};
		this.wsManager.send(socket, this.moduleName, { action, response })
	}
}//end Class 

module.exports = CoCreateInstagram;