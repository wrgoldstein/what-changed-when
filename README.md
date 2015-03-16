# what-changed-when

**under construction**

Minimal app for perusing commmit messages in a timeline.

To run, clone this repo into whatever folder contains the repo of interest, e.g.

    all-my-repos
    ├── repo-of-interest
    ├── other-repo-of-interest
    ├--> what-changed-when

install the necessary gems:

    gem install sinatra ruby-git haml activesupport
  
run the sinatra app:
    ruby main.rb
    
visit `localhost:4567/repo-of-interest`:

![](https://cloud.githubusercontent.com/assets/2084937/6668259/f24c1abe-cbc7-11e4-864b-3e64bd9f0acc.gif)
