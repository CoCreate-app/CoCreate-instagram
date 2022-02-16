import api from '@cocreate/api'

const CoCreateInstagram = {
	name: 'instagram',
	actions: {
		getUserProfile: {}
	},
};

api.init({
	name: CoCreateInstagram.name, 
	module:	CoCreateInstagram,
});