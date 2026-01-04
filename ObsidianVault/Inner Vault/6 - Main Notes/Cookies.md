A small piece of data stored by a website on a user's browser. It helps websites remember information about users, such as login sessions, preferences, or tracking data. Cookies are primarily used to enhance user experience and manage web sessions.

Cookies are stored in HTTP [[Headers]] and are encrypted. There are many ways of dealing with cookies on many different languages:

### JavaScript/TypeScript

#### Cookie-Session

 A lib that looks at the Cookie header, decodes the string resulting in an object and allow for changes on the properties. Cookie-Session sees the updated session and turns into an encrypted string once more, to be sent back in the 'Set-Cookie' header on the response.

If a cookie is set to 'Http-Only', it won't be able to be accessed through dom api. Also, extensions won't be able to see this cookie, turning it into a more secure cookie.