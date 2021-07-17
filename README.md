# HackVDay

**This project has been archived and is no longer under active development.**

HackVDay is a website and delivery management service for sending Valentine's
Day roses to your friends and loved ones. This was successfully deployed for
Valentine's Day 2014 and it was used to deliver about a dozen cards and roses to
NYU students. The best part of the project was still seeing Valentine's Day
cards on classmates' refrigerators months later.

The frontend is an [Angular](https://angular.io/) app and is a simple form to
collect order info and store it in [Firebase](https://firebase.google.com/). The
backend is an [Express](https://expressjs.com/) app that tries to find the most
efficient routes to deliver the gifts and then uses
[Twilio](https://www.twilio.com/) to text the courier with their next
destination.

This was a hackathon project for [HackCooper 2014](https://hackcooper.org/).
