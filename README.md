All of my logic is under the server-app/ directory. This was a fun exercise!

My approach:

I opted to use TypeScript because it's a language that I enjoy + it would be simpler to catch any trivial mistakes during compilation and enforce better coding/readability practices.

I began by creating constants for all of the enums I knew I would eventually need that I wanted to leverage outside of just using in-place strings. Then, I fleshed out all of the methods (which corresponding to actions on the canvas), beginning with the simpler ones of setting brush mode and changing direction, and then rendering (which was simplified since I just used the exact frame from the challenge) and then finally the steps method. I wrote the barebones functionality and then wrote several edge tests cases (which I haven't included as I wasn't sure I could modify test.js) for instances where the server was drawing outside of the frame's borders + for erasing the canvas. I flowed all of this on a whiteboard to make sure I was thinking through each method carefully rather than just typing what immediately came to mind.

After this, I wrote the helper method to execute commands——I initially wanted to use regex to filter the data string for this, but after spending some time unsuccessfully debugging an issue, I opted for a switch statement (which I also believe is much more readable).

Finally, I wrote the server code. The process wasn't entirely linear, as there was some iteration in testing, which required tweaks to some of the methods. 

(1) Navigate to the root of the FRONT_START_CODE directory directory.

(2) Have Node installed—I used:
    Node v15.9.0
    npm 7.5.3

(3) Run npm install to download all relevant dependencies.

(4) Run npm start to start the TCP server.

(5) Run npm test to run the test suite.
