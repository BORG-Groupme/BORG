# BORG
Better Overwatch Robot for Groupme, a drop-in FLOSS alternative to [GORT](https://botsol.net/gort/), which overcomes its limited featureset and closed-source freemium model

# GORT Features Reimplemented

* [ ] User permissions/roles ([2] #18)
  * Allows users to have different permission levels.
  * GORT only has regular user, trusted user, admin, and co-owner with preset permissions
  * BORG allows for a fully modular permission system and custom roles
* [ ] Remote console (#2 #16)
  * Allows management without flooding the chatroom with commands
* [ ] Security levels (#17)
  * 0: sleeping, doesn't respond to any restricted actions
  * 1: undo unauthorized changes
  * 2: same as 1 *AND* warn offender
  * 3: same as 1 *AND* kick offender without warning
* [ ] Group settings management (#2 #16)
  * Manages these settings (in addition to the ones listed under restricted actions):
    * toggle share link
    * toggle closed status
* [ ] Group settings protection (#20)
  * Prevents users from editing things like name, topic, and avatar by automatically reverting any changes
  * Optionally may issue warnings or kick offenders
* [ ] Restrict user actions (#2 #20)
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
* [ ] Auto-kick (#21)
  * Users who repeatedly break rules will be kicked
* [ ] Mass kick/re-add (#3)
  * Allows kicking and re-adding in batches based on
    * is kicked by user (re-add)
    * is a regular user (kick)
    * is added by user (kick)
    * is inactive (kick)
    * is new (kick)
* [ ] Reputation (#7 #21)
  * Keeps track of a user's reputation to help tag spammers
  * Allows for setting a minimum reputation limit to join
* [ ] Ban users (#4)
  * Prevents a user from being added, joining with share link, and joining with the built-in rejoin feature
  * Lifting a band lifts the above restrictions
  * Banning a user in one chatroom bans them from all that are under the same ownership (optional)
* [ ] Anti-bot (#6)
  * Kick and ban user who attempted to install a bot
    * GroupMe automatically disables bots whose owner is kicked
* [ ] Room migration (#22)
  * Attempt to add all users from one chatroom into another
* [ ] Migration protection (#57)
  * Prevents the users from a chatroom from being migrated
<!-- NOTE: This may just be a GORT thing, not a GroupMe thing
* [ ] Anti-ghost
  * Prevents users from exploiting the GroupMe Ghost Rejoin vulnerability
-->
* [ ] Room full alert (#9)
  * Notifies admins when the chatroom is at max capacity
* [ ] Mass alert (#9 #10)
  * Alert everyone using a single message
  * Alert everyone in a specific role using a single message
  * Alert for calendar events
* [ ] Profanity filter (#11)
  * Warn users for detected swears (in English)
* [ ] Content filter (#12)
  * Restricts posting:
    * images
    * videos
    * links
    * events
    * polls
    * uploaded files
    * emojis
* [ ] Greeting (#5)
  * Greets incoming users with a custom message
  * Variables:
    * $U - replaced with username
    * $G - replaced with group name
* [ ] Activity tracking (#23)
  * Keeps track of things such as when user first joined, when user last joined, and when user was last seen
* [ ] User queries (#8)
  * List users who fall under a specific role
  * List list departed, kicked, banned, and inactive users
  * List users added by a specific user
  * Whois
* [ ] Custom commands (#14 #15)
  * Custom replies for a certain trigger
* [ ] Task scheduler (#13 #14)
  * Sends messages and alerts triggered by a time event (timer or date)

[2]: /issues/23 "#2"
