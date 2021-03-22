# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Julian Columbres**

Time spent: **12** hours spent in total

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

* [x] Number of buttons, length of pattern, and timer change according difficulty
* [x] Current stage and timer are displayed 
* [x] Game has space background

## Video Walkthrough

Here's a walkthrough of implemented user stories:
https://recordit.co/NxtDPv75FU.gif


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
To learn more about formatting, I used https://www.w3schools.com/css/.
I also used https://www.w3schools.com/colors/colors_picker.asp for choosing specific colors.
To create the space background, I used https://www.softaox.info/galaxy-particle-effects-using-css/.
When creating audio chords, I referenced https://developer.mozilla.org/en-US/docs/Web/API/AudioContext for better understanding.

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
The biggest challenge I encountered was the audio not playing when accessing the project outside of the Glitch IDE. Specifically I found on Chrome, the game would play without sound. Upon opening the Javascript console log, I saw a warning stating that "AudioContext was not allowed to start." To get a better understanding of AudioContext, I referred to https://www.the-art-of-web.com/javascript/creating-sounds/ and https://developer.mozilla.org/en-US/docs/Web/API/AudioContext, the API page. I then googled the specific error message, where I learned that Chrome automatically disables any AudioContext object when the page is loaded. A user gesture must occur before any one can be enabled. So, the solution would be to resume my AudioContext objects when a user clicks a button. I created a function, enableSound(), which resumed all AudioContext instances. I had it called on click of the "start" button. After refreshing the page, audio worked as intended.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
[YOUR ANSWER HERE]

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
[YOUR ANSWER HERE]



## License

    Copyright [YOUR NAME]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
