# Kite Surfing Weather App

A web application which dynamically displays 3-days of weather data (via openweather.org) from user selection of 8 kite surfing hot spots around Auckland, NZ. Features a a results filter that enables users to select the wind conditions they desire. 

## Deployment 

Deployed with Heroku at https://mrm-weather-app.herokuapp.com/

## Areas of Development

- Calling an API requiring a key and hiding it in an env file. 
- Implementing custom handlebar helpers.
- Bootstrap
- Navigating Heroki CLI


## Potential Future Features 

- Feature that allows users to add other popular locations (includes addition of database and google maps).
- Addition of suggested conditions that are optimal for kite surfing specific to each location.
- Addition of map card for each location. 


## Get Started

From your command line, first clone this repo:

```
### Clone this repository
$ git clone https://github.com/m-rmac/Weather-App

### Go into the repository
$ cd weather-app

### Remove current origin repository
$ git remote remove origin
```

To generate a unique API key for use, users should go to https://openweathermap.org/ and login/create a new account. The key can then be pasted directly into API call in data.js or in an env file to be called as is currently. 

Then you can install the dependencies using NPM:

Using NPM:
```
### Install dependencies
$ npm install

### Start development server
$ npm start
You should now have a development server running in your default browser.
```
