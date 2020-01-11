# BORG
Better Overwatch Robot for Groupme, a drop-in FLOSS alternative to [GORT](https://botsol.net/gort/), which overcomes its limited featureset and closed-source freemium model

# GORT Features Reimplemented

* [ ] User permissions/roles ([#2] [#18])
  * Allows users to have different permission levels.
  * GORT only has regular user, trusted user, admin, and co-owner with preset permissions
  * BORG allows for a fully modular permission system and custom roles
* [ ] Remote console ([#2] [#16])
  * Allows management without flooding the chatroom with commands
* [ ] Security levels ([#2])
  * 0: sleeping, doesn't respond to any restricted actions
  * 1: undo unauthorized changes
  * 2: same as 1 *AND* warn offender
  * 3: same as 1 *AND* kick offender without warning
  * BORG allows these to be assigned per-offense and per-role, and to set a default
* [ ] Group settings management ([#2] [#16])
  * Manages these settings (in addition to the ones listed under restricted actions):
    * toggle share link
    * toggle closed status
* [ ] Group settings protection ([#20])
  * Prevents users from editing things like name, topic, and avatar by automatically reverting any changes
  * Optionally may issue warnings or kick offenders
* [ ] Restrict user actions ([#2] [#20])
  * The following actions are able to be restricted/allowed:
    * change group name
    * change group topic
    * change group avatar
    * toggle office mode
    * add users
    * add multiple users at once
    * remove users
    * join group through share link
    * rejoin through built-in GroupMe feature
    * chat
* [ ] Auto-kick ([#21])
  * Users who repeatedly break rules will be kicked
* [ ] Mass kick/re-add ([#3])
  * Allows kicking and re-adding in batches based on
    * is kicked by user (re-add)
    * is a regular user (kick)
    * is added by user (kick)
    * is inactive (kick)
    * is new (kick)
* [ ] Reputation ([#7] [#21])
  * Keeps track of a user's reputation to help tag spammers
  * Allows for setting a minimum reputation limit to join
* [ ] Ban users ([#4])
  * Prevents a user from being added, joining with share link, and joining with the built-in rejoin feature
  * Lifting a band lifts the above restrictions
  * Banning a user in one chatroom bans them from all that are under the same ownership (optional)
* [ ] Anti-bot ([#6])
  * Kick and ban user who attempted to install a bot
    * GroupMe automatically disables bots whose owner is kicked
* [ ] Room migration ([#22])
  * Attempt to add all users from one chatroom into another
* [ ] Migration protection ([#22])
  * Prevents the users from a chatroom from being migrated
<!-- NOTE: This may just be a GORT thing, not a GroupMe thing
         it is, and implementing it is far too much of a bother
* [ ] Anti-ghost
  * Prevents users from exploiting the GroupMe Ghost Rejoin vulnerability
-->
* [ ] Room full alert ([#9])
  * Notifies admins when the chatroom is at max capacity
* [ ] Mass alert ([#9] [#10])
  * Alert everyone using a single message
  * Alert everyone in a specific role using a single message
  * Alert for calendar events
* [ ] Profanity filter ([#11])
  * Warn users for detected swears (in English)
* [ ] Content filter ([#12])
  * Restricts posting:
    * images
    * videos
    * links
    * events
    * polls
    * uploaded files
    * emojis
* [ ] Greeting ([#5])
  * Greets incoming users with a custom message
  * Variables:
    * $U - replaced with username
    * $G - replaced with group name
* [ ] Activity tracking ([#23])
  * Keeps track of things such as when user first joined, when user last joined, and when user was last seen
* [ ] User queries ([#8])
  * List users who fall under a specific role
  * List list departed, kicked, banned, and inactive users
  * List users added by a specific user
  * Whois
* [ ] Custom commands ([#14] [#15])
  * Custom replies for a certain trigger
* [ ] Task scheduler ([#13] [#14])
  * Sends messages and alerts triggered by a time event (timer or date)
* [ ] Messaging Level settings ([#17])
  * Controls "chattiness" in response to certain events 
    * high: all responses are enabled
    * med: all messages except join events are enabled
    * low: warnings for restricted actions/bot actions such as kick are disabled
    * none: no messages will be sent
  * BORG will allow all messages to be individually enabled/disabled, as well as presets which mass-set message levels

gort msglevel high: All messages are enabled (default)
gort msglevel med: Disables all messages related to join events ("bad rep", "banned user", "joining is not allowed", etc.
gort msglevel low: Additionally, disables warnings on restricted user actions (changing group settings, kicking users, etc.)
gort msglevel none: Disables ALL messages including profanity filter and content filter warnings (not recommended).
[#2]:  https://github.com/BORG-Groupme/BORG/issues/2  "Issue #2"
[#3]:  https://github.com/BORG-Groupme/BORG/issues/3  "Issue #3"
[#4]:  https://github.com/BORG-Groupme/BORG/issues/4  "Issue #4"
[#5]:  https://github.com/BORG-Groupme/BORG/issues/5  "Issue #5"
[#6]:  https://github.com/BORG-Groupme/BORG/issues/6  "Issue #6"
[#7]:  https://github.com/BORG-Groupme/BORG/issues/7  "Issue #7"
[#8]:  https://github.com/BORG-Groupme/BORG/issues/8  "Issue #8"
[#9]:  https://github.com/BORG-Groupme/BORG/issues/9  "Issue #9"
[#10]: https://github.com/BORG-Groupme/BORG/issues/10 "Issue #10"
[#11]: https://github.com/BORG-Groupme/BORG/issues/11 "Issue #11"
[#12]: https://github.com/BORG-Groupme/BORG/issues/12 "Issue #12"
[#13]: https://github.com/BORG-Groupme/BORG/issues/13 "Issue #13"
[#14]: https://github.com/BORG-Groupme/BORG/issues/14 "Issue #14"
[#15]: https://github.com/BORG-Groupme/BORG/issues/15 "Issue #15"
[#16]: https://github.com/BORG-Groupme/BORG/issues/16 "Issue #16"
[#17]: https://github.com/BORG-Groupme/BORG/issues/17 "Issue #17"
[#18]: https://github.com/BORG-Groupme/BORG/issues/18 "Issue #18"
[#20]: https://github.com/BORG-Groupme/BORG/issues/20 "Issue #20"
[#21]: https://github.com/BORG-Groupme/BORG/issues/21 "Issue #21"
[#22]: https://github.com/BORG-Groupme/BORG/issues/22 "Issue #22"
[#23]: https://github.com/BORG-Groupme/BORG/issues/23 "Issue #23"
