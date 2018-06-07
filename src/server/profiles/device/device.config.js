const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_specific_args = require('./device.arguments');
const controller = require('./device.controller');


let write_only_scopes = write_scopes('Device');
let read_only_scopes = read_scopes('Device');

let common_args_array = Object.getOwnPropertyNames(common_args)
	.map((arg_name) => common_args[arg_name]);

let resource_args_array = Object.getOwnPropertyNames(resource_specific_args)
	.map((arg_name) => Object.assign({ versions: VERSIONS.STU3 }, resource_specific_args[arg_name]));

const resource_all_arguments = [
	route_args.VERSION,	...common_args_array, ...resource_args_array,
];

let routes = [
	{
		type: 'get',
		path: '/:version/device',
		args: resource_all_arguments,
		scopes: read_only_scopes,
		controller: controller.getDevice
	},
	{
		type: 'post',
		path: '/:version/device/_search',
		args: resource_all_arguments,
		scopes: read_only_scopes,
		controller: controller.getDevice
	},
	{
		type: 'get',
		path: '/:version/device/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getDeviceById
	},
	{
		type: 'post',
		path: '/:version/device',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createDevice
	},
	{
		type: 'put',
		path: '/:version/device/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateDevice
	},
	{
		type: 'delete',
		path: '/:version/device/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteDevice
	}
];

/**
 * @name exports
 * @summary Device config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.DEVICE
	},
	routes
};
