
Uses [[Cookies]] to identify the user.

Cookies stores a very small amount of info. For example an user ID.

Every single request has attached a cookie that is stored on the browser, generated on the auth flow. Of course authentication.


For small applications, putting auth-related methods on service is completely fine (I don't like this approach, personally, tho).

Another method is to create a separate Auth Service (my preference) to handle signup and signin.