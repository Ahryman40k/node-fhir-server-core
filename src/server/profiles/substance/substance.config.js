const { route_args, common_args, write_args } = require('../common.arguments');
const { read_scopes, write_scopes } = require('../common.scopes');
const { CONFIG_KEYS, VERSIONS } = require('../../../constants');
const resource_specific_args = require('./substance.arguments');
const controller = require('./substance.controller');

let write_only_scopes = write_scopes('Substance');
let read_only_scopes = read_scopes('Substance');

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
		path: '/:version/substance',
		args: resource_all_arguments,
		scopes: read_only_scopes,
		controller: controller.getSubstance
	},
	{
		type: 'post',
		path: '/:version/substance/_search',
		args: resource_all_arguments,
		scopes: read_only_scopes,
		controller: controller.getSubstance
	},
	{
		type: 'get',
		path: '/:version/substance/:id',
		args: [
			route_args.VERSION,
			route_args.ID
		],
		scopes: read_only_scopes,
		controller: controller.getSubstanceById
	},
	{
		type: 'post',
		path: '/:version/substance',
		args: [
			route_args.VERSION,
			write_args.RESOURCE_ID,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.createSubstance
	},
	{
		type: 'put',
		path: '/:version/substance/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.updateSubstance
	},
	{
		type: 'delete',
		path: '/:version/substance/:id',
		args: [
			route_args.ID,
			route_args.VERSION,
			write_args.RESOURCE_BODY
		],
		scopes: write_only_scopes,
		controller: controller.deleteSubstance
	}
];

/**
 * @name exports
 * @summary Substance config
 */
module.exports = {
	routeOptions: {
		profileKey: CONFIG_KEYS.SUBSTANCE
	},
	routes
};
