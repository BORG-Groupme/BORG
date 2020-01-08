//api wrapper for groupme's bullshit
import {charSplit} from "./utils";

let request = require("request");

/**
 * Generates a fixed-length numerical GUID for things that require it
 * @param {number} chars - The number of characters in the numerical GUID
 * @returns {string} guid
 */
function generateGUID(chars) {
	return Math.floor(Math.random() * Math.pow(10, chars)) + "";
}

/**
 * Returns the group-localized member id for a certain global user id
 * @param {string} uid - The user id of the member whose id is being requested
 * @param {function} callback - The handler once the member id is fetched
 * @param {string} gid - The group from which the member id is being requested
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function getMID(uid, callback, gid, token) {
	const optns = {
		url: 'https://api.groupme.com/v3/groups/"+gid+"?token=' + token,
		method: 'GET'
	};
	request(optns, function(err, resp, body) {
		console.log(err);
		console.log(body);
		let members = JSON.parse(body).response.members;
		for(let i = 0; i < members.length; i++) {
			if(members[i].user_id === uid) {
				callback(members[i].id);
			}
		}
	});
}

/**
 * Checks the results of a poll
 * @param {string} pid - The id of the poll to check
 * @param {function} callback - The handler once the poll results are fetched
 * @param {string} gid - The group in which the poll was
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function checkPoll(pid, callback, gid, token) {
	const options = {
		url: 'https://api.groupme.com/v3/poll/' + gid + '/' + pid + '?token=' + token,
		method: 'GET'
	};
	request(options, function(err, resp, body) {
		console.log(err);
		console.log(JSON.stringify(body));
		if(JSON.parse(body).response.poll.data.status === 'past') {
			callback(JSON.parse(body).response.poll.data.options);
		}
	});
}

/**
 * Searches a group for a member or members
 * @param {RegExp} member - The search to use to find the member
 * @param {function} callback - The handler once the members are found
 * @param {string} gid - The group to search
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function getMember(member, callback, gid, token) {
	let optns = {
		url: "https://api.groupme.com/v3/groups/" + gid + "?token=" + token,
		method: "GET"
	};
	request(optns, function(err, resp, body) {
		let mem = JSON.parse(body).response.members;
		let out = [];
		for(let i = 0; i < mem.length; i++) {
			if(member.test(mem[i].nickname) || member.test(mem[i].name)) out += {
				nick: mem[i].nickname,
				name: mem[i].name,
				id: mem[i].user_id
			};
		}
		callback(out);
	});
}

/**
 * Searches one instance of BORG's groups for a specific group or groups
 * @param {RegExp} group - The search to use to find the group
 * @param {function} callback - The handler once the groups are found
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function getGroup(group, callback, token) {
	let optns = {
		url: "https://api.groupme.com/v3/groups?omit=memberships&per_page=100&token=" + token,
		method: "GET"
	};
	request(optns, function(err, resp, body) {
		let groups = JSON.parse(body).response;
		let out = [];
		for(let i = 0; i < groups.length; i++) {
			if(group.test(groups[i].name)) out += {
				name: groups[i].name,
				id: groups[i].group_id
			};
		}
		callback(out);
	});
}

/**
 * Mentions everyone in a group with the whole message
 * @param {string} message - The message to send
 * @param {string} gid - The group in which to send the message
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function mentionEveryone(message, gid, token) {
	let optns = {
		url: "https://api.groupme.com/v3/groups/" + gid + "?token=" + token,
		method: "GET"
	};
	request(optns, function(err, resp, body) {
		let mem = JSON.parse(body).response.members;
		let ids = [];
		let loci = [];
		for(let i = 0; i < mem.length; i++) {
			ids[i] = mem[i].user_id;
			loci[i] = [0, text.length];
		}
		sendMention(text, ids, loci, gid, token);
	});
}

/**
 * Sends an image to a group
 * @param {string} url - The location of the image to upload to groupme
 * @param {string} gid - The group in which to send the message
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function sendImage(url, gid, token) {
	let options = {
		url: "https://api.groupme.com/v3/groups/" + gid + "/messages?token=" + token,
		method: "POST",
		json: true,
		body: {
			message: {
				source_guid: generateGUID(16),
				attachments: [
					{
						type: "image",
						url: url
					}
				]
			}
		}
	};
	request(options, function(err, resp, body) {
		console.log(err);
		console.log(body);
	});
}

/**
 * Creates and sends a poll to a group
 * @param {string} name - The poll name
 * @param {[string]} selections - The poll options
 * @param {number} time - The time in seconds which the poll lasts
 * @param {string} gid - The group in which to send the message
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function sendPoll(name, selections, time, gid, token) {
	let poptions = [];
	for(let i = 0; i < selections.length; i++) {
		poptions[i] = {id: i + 1 + "", title: selections[i]};
	}
	let poptns = {
		url: "https://api.groupme.com/v3/poll/" + gid + "?token=" + token,
		method: "POST",
		json: true,
		body: {
			subject: name,
			options: poptions,
			expiration: Math.floor(Date.now() / 1000) + time
		}
	};
	request(poptns, function(err, resp, body) {
		console.log(err);
		console.log(body);
	});
}

/**
 * Sends a message to a group
 * @param {string} message - The message to send
 * @param {string} gid - The group in which to send the message
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function sendMessage(message, gid, token) {
	message = charSplit(message, 1000, "\n");
	for(let i = 0; i < message.length; i++) {
		setTimeout(
			function(str) {
				let options = {
					url: "https://api.groupme.com/v3/groups/" + gid + "/messages?token=" + token,
					method: "POST",
					json: true,
					body: {
						message: {
							source_guid: generateGUID(16),
							text: str
						}
					}
				};
				request(options, function(err, resp, body) {
					console.log(err);
					console.log(body);
				});
			}, i * 500, message[i]);
	}
}

/**
 * Sends a message mentioning users to a group
 * @param {string} message
 * @param {[string]} uids - The user ids of the mentions
 * @param {[[number]]} locations - The start positions and lengths of each mention
 * @param {string} gid - The group in which to send the message
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function sendMention(message, uids, locations, gid, token) {
	message = charSplit(message, 1000, "\n");
	for(let i = 0; i < message.length; i++) {
		setTimeout(
			function(str) {
				let options = {
					url: "https://api.groupme.com/v3/groups/" + gid + "/messages?token=" + token,
					method: "POST",
					json: true,
					body: {
						message: {
							source_guid: generateGUID(16),
							text: str,
							attachments: [
								{loci: locations, type: "mentions", user_ids: uids}
							]
						}
					}
				};
				request(options, function(err, resp, body) {
					console.log(err);
					console.log(body);
				});
			}, i * 500, message[i]);
	}
}

/**
 * Send a direct message to a user
 * @param {string} message - The message to send
 * @param {string} uid - The global id of the user to whom to send the message
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function sendDM(message, uid, token) {
	message = charSplit(message, 1000, "\n");
	console.log(message);
	for(let i = 0; i < message.length; i++) {
		setTimeout(
			function(str) {
				let options = {
					url: "https://api.groupme.com/v3/direct_messages?token=" + token,
					method: "POST",
					json: true,
					body: {
						direct_message: {
							source_guid: generateGUID(16),
							text: str,
							recipient_id: uid
						}
					}
				};
				request(options, function(err, resp, body) {
					console.log(err);
					console.log(body);
				});
			}, i * 500, message[i]);
	}
}

/**
 * Removes a user from a group
 * @param {string} id - The global userid of the user being removed
 * @param {function} callback - The handler once the user is removed
 * @param {string} gid - The group from which the user is to be removed
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function kick(id, callback, gid, token) {
	getMID(id, (mid) => {
		const options = {
			url: 'https://api.groupme.com/v3/groups/' + gid + '/members/' + id + '/remove?token=' + token,
			method: 'POST',
			json: true,
			body: {}
		};
		request(options, function(err, resp, body) {
			if(callback) callback(JSON.parse(body).response);
		});
	}, gid, token);
}

/**
 * Adds a user to a group
 * @param {string} uid - The global userid of the user being added
 * @param {string?} name - The name with which to add the user
 * @param {function} callback - The handler once the user is added
 * @param {string} gid - The group from which the user is to be added
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function add(uid, name, callback, gid, token) {
	const options = {
		url: 'https://api.groupme.com/v3/groups/' + gid + '/members/' + members[i].id + '/remove?token=' + token,
		method: 'POST'
	};
	request(options, function(err, resp, body) {
		console.log(err);
		console.log(body);
		let b;
		if(name === "") b = {
			members: [{
				user_id: uid
			}]
		};
		else b = {
			members: [{
				nickname: name,
				user_id: uid
			}]
		};
		const options = {
			url: 'https://api.groupme.com/v3/groups/' + gid + '/members/add?token=' + token,
			method: 'POST',
			json: true,
			body: b
		};
		request(options, function(err, resp, body) {
			if(callback) callback(JSON.parse(body).response);
		});
	});
}

/**
 * Forcefully rename a user
 * @param {string} uid - The global userid of the user being renamed
 * @param {string} name - The name to apply to the user
 * @param {string} gid - The group in which the user is to be renamed
 * @param {string} token - The token of the specific instance of BORG used to generate the request
 */
function nick(uid, name, gid, token) {
	kick(uid, () => {
		add(uid, name, null, gid, token);
	}, gid, token);
}