export let commandsLookup = {};

/** The template for BORG commands */
export class Command {

	/**
	 *
	 * @param {[string]} aliases - The names of the command
	 * @param {RegExp} parameters - A regular expression with groups around each parameter to match the parameters of the command
	 * @param {function} callback - The function that is run on the result of executing the parameter expression on the parameterstring.  Must include receiver passthrough, incl token and group id
	 */
	constructor(aliases, parameters, callback) {
		this.parameters = parameters;
		this.callback = callback;
		for(let i in aliases) commandsLookup[aliases[i]] = this;
	}

	call(parameterstring, receiver) {
		if(this.parameters.test(parameterstring)) this.callback(this.parameters.exec(parameterstring), receiver);
	}
}