'use strict'
const api = require('@cocreate/api');


class CoCreateInstagram {
	constructor(wsManager) {
		this.wsManager = wsManager;
		this.name = "instagram";
		this.init();
	}

	init() {
		if (this.wsManager) {
			this.wsManager.on(this.name, (socket, data) => this.sendinstagram(socket, data));
		}
	}

	async sendinstagram(socket, data) {
		let params = data['data'];
		let environment;
		let action = data['action'];
	
		try {
			let org = await api.getOrg(data, this.name);
			if (params.environment){
				environment = params['environment'];
				delete params['environment'];  
			} else {
			  	environment = org.apis[this.name].environment;
			}
			
			let key = org.apis[this.name][environment];
			// twitter = require('stripe')(key);
		} catch (e) {
			console.log(this.name + " : Error Connect to api", e)
		}
	  
		try {
			let response
			switch (action) {
				case 'getUserProfile':
					response = this.getUserProfile(socket, action, params);
					break;
			}
			this.wsManager.send(socket, this.name, { action, response })
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

			api.send_response(this.wsManager, socket, { "action": action, "response": response }, this.name);
		} catch (error) {
			this.handleError(socket, action, error)
		}
	}

	handleError(socket, action, error) {
		const response = {
			'object': 'error',
			'data': error.message || error,
		};
		this.wsManager.send(socket, this.name, { action, response })
	}
}//end Class 

module.exports = CoCreateInstagram;