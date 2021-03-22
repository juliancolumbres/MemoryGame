# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Julian Columbres**

Time spent: **13** hours spent in total

Link to project: https://glitch.com/edit/#!/verdant-skitter-cymbal?path=index.html%3A1%3A0

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [x] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

* [x] Number of buttons, length of pattern, and timer change according to difficulty
* [x] Current stage and timer are displayed 
* [x] Game has space background

## Video Walkthrough

Here's a walkthrough of implemented user stories:
https://recordit.co/t3swOo9v8f
<img src= 'https://user-images.githubusercontent.com/75638994/112023379-6b2fa200-8af0-11eb-9bef-813c24620865.png'>



## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. <br><br>
To learn more about formatting, I used https://www.w3schools.com/css/. <br>
For choosing specific colors I used https://www.w3schools.com/colors/colors_picker.asp. <br>
To create the space background, I imported CSS code from https://www.softaox.info/galaxy-particle-effects-using-css/. <br>
When learning to create audio chords, I referenced https://developer.mozilla.org/en-US/docs/Web/API/AudioContext. <br>

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) <br> <br>
One challenge I encountered was the audio not playing when accessing the project outside of the Glitch IDE. In a Chrome browser, no sound played when the buttons were lit. Upon opening the Javascript console log, a message displayed "AudioContext was not allowed to start." To get a better understanding of AudioContext, I referred to https://www.the-art-of-web.com/javascript/creating-sounds/ and https://developer.mozilla.org/en-US/docs/Web/API/AudioContext, the API page. I then googled the specific error message, where I learned that Chrome automatically disables any AudioContext object when a page is loaded. A user gesture must occur before any instance can be enabled. My solution was to have my AudioContext objects call resume() when a user clicks a button. I created a function, enableSound(), which resumed all AudioContext objects. I called the function on click of the "start" button. By doing so, audio could work as intended. <br>
Another challenge was incorporating a timer in order to time the user’s guess. My goal was to start a timer at a set number (2, 3, or 4 seconds depending on the selected difficulty), and decrement the timer, ending the game upon reaching 0. To accomplish this, I created seperate methods for starting, stopping and decreasing a timer. I created a count variable to represent a timer. To start the timer, I call startTimer(), which sets count to the correct time per guess (2, 3, or 4 seconds) and next calls timedCount(). timedCount() decreases count, then calls itself recursively after waiting 1 second (using the setTimeout() method). The timedCount() method also checks if count has reached 0, in which case stopCount() will be called and the game ends. I found incorporating this feature to require many tests to make sure that each method was placed in the correct place. <br>


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) <br> <br>
What is the most difficult aspect of web development? How applicable are skills in java to front end development? When working in a team, what are common stages to create a web application? What does a good testing strategy for a website look like? Do most developers have freedom when creating an interface, or is design typically strict and determined by someone else? Are there specific mistakes to avoid in front end development that slow down webpages? <br>


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) <br> <br>
First, I would like to give the user more control of the game settings by giving the option to set each of the number of buttons, timer, sequence speed, and number of strikes. Another feature I would like to add is turning the buttons into clickable images of planets in order to add to the space theme. I would also like to prevent the user from clicking a button when a sequence is playing. Additionally, I would like to refractor the sound functions/variables. For example, in order to play a chord with three differenet frequencies, I created two more instances of audioContext and played their sound whenever the initial instance played its sound. I believe there would be a more efficient way to play multiple sounds with only one audioContext object. <br>



## License

    Copyright [Julian Columbres]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
