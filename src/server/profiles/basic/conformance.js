const { generateSearchParamsForConformance } = require('../../utils/conformance.utils');
const { resolveFromVersion } = require('../../utils/resolve.utils');
const { routes } = require('./basic.config');

/**
 * @name exports
 * @summary Conformance statement
 */
module.exports = {
	profile: 'basic',
	resource: (version, count) => {
		let searchParams = generateSearchParamsForConformance(routes, version);
		let Basic = require(resolveFromVersion(version, 'base/Basic'));
		// Return our conformance statement
		return {
			extension: [{
				url: 'https://www.hl7.org/fhir/search.html#count',
				// This will be resolved dynamically by the service methods
				valueDecimal: count
			}],
			type: Basic.__resourceType,
			profile: {
				reference: 'http://hl7.org/fhir/basic.html'
			},
			conditionalDelete: 'not-supported',
			searchParam: searchParams
		};
	}
};
