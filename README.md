# BORG
Better Overwatch Robot for Groupme, a drop-in FLOSS alternative to [GORT](https://botsol.net/gort/), which overcomes its limited featureset and closed-source freemium model

# GORT Features Reimplemented

* [ ] User permissions/roles
  * Allows users to have different access levels.
  * GORT only has regular user, trusted user, admin, and co-owner
* [ ] Remote console
  * Allows management without flooding the chatroom with commands
* [ ] Security levels
  * 0: sleeping, doesn't respond to any restricted actions
  * 1: undo unauthorized changes
  * 2: same as 1 *AND* warn offender
  * 3: same as 1 *AND* kick offender without warning
* [ ] Group settings management
  * Manages these settings (in addition to the ones listed under restricted actions):
    * toggle share link
    * toggle closed status
* [ ] Group settings protection
  * Prevents users from editing things like name, topic, and avatar by automatically reverting any changes
  * Optionally may issue warnings or kick offenders
* [ ] Restrict user actions
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
* [ ] Auto-kick
  * Users who repeatedly break rules will be kicked
* [ ] Mass kick/re-add
  * Allows kicking and re-adding in batches based on
    * is kicked by user (re-add)
    * is a regular user (kick)
    * is added by user (kick)
    * is inactive (kick)
    * is new (kick)
* [ ] Reputation
  * Keeps track of a user's reputation to help tag spammers
  * Allows for setting a minimum reputation limit to join
* [ ] Ban users
  * Prevents a user from being added, joining with share link, and joining with the built-in rejoin feature
  * Lifting a band lifts the above restrictions
  * Banning a user in one chatroom bans them from all that are under the same ownership (optional)
* [ ] Anti-bot
  * Kick and ban user who attempted to install a bot
    * GroupMe automatically disables bots whose owner is kicked
* [ ] Room migration
  * Attempt to add all users from one chatroom into another
* [ ] Migration protection
  * Prevents the users from a chatroom from being migrated
<!-- NOTE: This may just be a GORT thing, not a GroupMe thing
* [ ] Anti-ghost
  * Prevents users from exploiting the GroupMe Ghost Rejoin vulnerability
-->
* [ ] Room full alert
  * Notifies admins when the chatroom is at max capacity
* [ ] Mass alert
  * Alert everyone using a single message
  * Alert everyone in a specific role using a single message
  * Alert for calendar events
* [ ] Profanity filter
  * Warn users for detected swears (in English)
* [ ] Content filter
  * Restricts posting:
    * images
    * videos
    * links
    * events
    * polls
    * uploaded files
    * emojis
* [ ] Greeting
  * Greets incoming users with a custom message
  * Variables:
    * $U - replaced with username
    * $G - replaced with group name
* [ ] Activity tracking
  * Keeps track of things such as when user first joined, when user last joined, and when user was last seen
* [ ] User queries
  * List users who fall under a specific role
  * List list departed, kicked, banned, and inactive users
  * List users added by a specific user
  * Whois
* [ ] Custom commands
  * Custom replies for a certain trigger
* [ ] Task scheduler
  * Sends messages and alerts triggered by a time event (timer or date)
