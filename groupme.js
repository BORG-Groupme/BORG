//api wrapper for groupme's bullshit
var request = require("request");
var utils = require("./utils.js");

function generateGUID(chars) {
  return Math.floor(Math.random() * Math.pow(10, chars)) + "";
}

function getMember(group, member, token) {
  var optns = {
    url:
      "https://api.groupme.com/v3/groups/" +
      group +
      "?token=" +
      token,
    method: "GET"
  };
  request(optns, function(err, resp, body) {
    let mem = JSON.parse(body).response.members;
    let out = "";
    for (let i = 0; i < mem.length; i++) {
      if(member.test(mem[i].nickname) || member.test(mem[i].name)) out += mem[i].nickname + "=" + mem[i].name + ": " + mem[i].user_id + "\n";
    }
    //return "out" when i get around to making these promises
  });
}
function getGroup(group, token) {
  var optns = {
    url:
      "https://api.groupme.com/v3/groups?omit=memberships&per_page=100&token=" +
      token,
    method: "GET"
  };
  request(optns, function(err, resp, body) {
    let groups = JSON.parse(body).response;
    let out = "";
    for (let i = 0; i < groups.length; i++) {
      if(group.test(groups[i].name)) out += groups[i].name + ": " + groups[i].group_id + "\n";
    }
    sendMessage(out);
  });
}
function mentionEveryone(message, gid, token) {
  var optns = {
    url:
      "https://api.groupme.com/v3/groups/" +
      gid +
      "?token=" +
      token,
    method: "GET"
  };
  request(optns, function(err, resp, body) {
    let mem = JSON.parse(body).response.members;
    let ids = [];
    let loci = [];
    for (let i = 0; i < mem.length; i++) {
      ids[i] = mem[i].user_id;
      loci[i] = [0, text.length];
    }
    sendMention(text, ids, loci);
  });
}
function sendImage(url, gid, token) {
  var options = {
    url:
      "https://api.groupme.com/v3/groups/" +
      gid +
      "/messages?token=" +
      token,
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
function sendPoll(name, selections, time, gid, token) {
  var poptions = [];
  for (var i = 0; i < selections.length; i++) {
    poptions[i] = { id: i + 1 + "", title: selections[i] };
  }
  var poptns = {
    url:
      "https://api.groupme.com/v3/poll/" + gid + "?token=" + token,
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
function sendMessage(message, gid, token) {
  if (message.length > 1000) {
    message = utils.charSplit(message, 1000, "\n");
    for (var i = 0; i < message.length; i++) {
      setTimeout(
        function(str) {
          var options = {
            url:
              "https://api.groupme.com/v3/groups/" +
              gid +
              "/messages?token=" +
              token,
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
        },
        i * 500,
        message[i]
      );
    }
  } else {
    var options = {
      url:
        "https://api.groupme.com/v3/groups/" +
        gid +
        "/messages?token=" +
        process.env.TOKEN,
      method: "POST",
      json: true,
      body: {
        message: {
          source_guid: generateGUID(16),
          text: message
        }
      }
    };
    request(options, function(err, resp, body) {
      console.log(err);
      console.log(body);
    });
  }
}
function sendMention(message, uids, locations, gid, token) {
  if (message.length > 1000) {
    message = utils.charSplit(message, 1000, "\n");
    for (var i = 0; i < message.length; i++) {
      setTimeout(
        function(str) {
          var options = {
            url:
              "https://api.groupme.com/v3/groups/" +
              gid +
              "/messages?token=" +
              token,
            method: "POST",
            json: true,
            body: {
              message: {
                source_guid: generateGUID(16),
                text: str,
                attachments: [
                  { loci: locations, type: "mentions", user_ids: uids }
                ]
              }
            }
          };
          request(options, function(err, resp, body) {
            console.log(err);
            console.log(body);
          });
        },
        i * 500,
        message[i]
      );
    }
  } else {
    var options = {
      url:
        "https://api.groupme.com/v3/groups/" +
        gid +
        "/messages?token=" +
        process.env.TOKEN,
      method: "POST",
      json: true,
      body: {
        message: {
          source_guid: generateGUID(16),
          text: message,
          attachments: [{ loci: locations, type: "mentions", user_ids: uids }]
        }
      }
    };
    request(options, function(err, resp, body) {
      console.log(err);
      console.log(body);
    });
  }
}
function sendDM(message, uid, token) {
  if (message.length > 1000) {
    message = utils.charSplit(message, 1000, "\n");
    console.log(message);
    for (var i = 0; i < message.length; i++) {
      setTimeout(
        function(str) {
          var options = {
            url:
              "https://api.groupme.com/v3/direct_messages?token=" +
              token,
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
        },
        i * 500,
        message[i]
      );
    }
  } else {
    var options = {
      url:
        "https://api.groupme.com/v3/direct_messages?token=" + process.env.TOKEN,
      method: "POST",
      json: true,
      body: {
        direct_message: {
          source_guid: generateGUID(16),
          text: message,
          recipient_id: uid
        }
      }
    };
    request(options, function(err, resp, body) {
      console.log(err);
      console.log(body);
    });
  }
}

module.exports = {
  getMember: getMember,
  getGroup: getGroup,
  sendMessage: sendMessage,
  sendImage: sendImage,
  sendDM: sendDM,
  sendPoll: sendPoll,
  sendMention: sendMention,
  mentionEveryone: mentionEveryone,
};
