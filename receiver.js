import {app} from "./index.js"
import {commandsLookup} from "./commands";

export function receiver(token) {
	app.post("/" + token, function(req, resp) {
		let command = req.body.text.split(" ");
		if(command[0] === "BORG" && command[1] in commandsLookup) {
			commandsLookup[command[1]].call(command.slice(0, 1).join(" "), {
				token: token,
				gid: req.body.group_id
			});
		}
	});
}