# GoodTimes

## Mern Stack Social Media App to share good moments in life


@Brendan Frisby2022

[![wakatime](https://wakatime.com/badge/github/bfrisbyh92/GoodTimes.svg)](https://wakatime.com/badge/github/bfrisbyh92/GoodTimes)

### Tech Used in this build

- MongoDB
- Jsonwebtokens
- Bcryptjs
- Pagination
- Express.js
- Google Login Authentication
- Traditional email/hashed password authentication
- Material-UI for CSS
- SVG background image

##### This is a full-stack app I decided to make to push myself. I want increasingly complex builds. I knew this project would take a large amount of time to accomplish. I've also added the time I've spent in VScode working on this project tracked by wakatime.

![logo](/mern-social/images/logo.png)

![app3](/mern-social//images/UIphaseOne.png)
![app](/mern-social/images/SignupForm.png)
![app2](/mern-social/images/signinForm.png)

[![wakatime](https://wakatime.com/badge/github/bfrisbyh92/GoodTimes.svg)](https://wakatime.com/badge/github/bfrisbyh92/GoodTimes)


mern-social/images/logo.png
### Still needs to be done -- Personal Notes

- Right now Likes are not updated on the card that displays the post. They are updated inside the database. It currently will only allow you to like your own, or another users post one time. If you have already liked it, it will remove that like and vice versa. 

- Move any photos that may now be in the form of a link to a saved image within my images directory.

- Update all other routes and features to also accept my Redux and full stack setup. So far only createPost and likePost have been implemented and createPost has the issue I mentioned above. The other routes need to be changed over and the UI needs to be updated to reflect the changes in data.

- Google OAuth recently changed to I removed it from this build. I can get it working but pulling the profile information has gotten more difficult as npm react-google-login is deprecated.  The new Google Identity Services and Chrome updated have made implementing Google Login more time consuming than I expected so I removed it. They no longer return basic profile information you have to verify the initial data it gives back to get access to the profile information. Which is not a big deal to learn but this project is already almost at 40 hours. It's getting increasingly more complex and I'd like to finish it the best I can with everything functional. I can add those types of features later if I choose. I've done Google Login on multiple projects thus far and I have no reason to keep it in this build. JWT tokens and CRUD practice are my primary reason for this project.  