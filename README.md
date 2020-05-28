# Hahn.App
First, let me thanks Hahn Software for allowing me to take part in the selection process.

This repo which I am sharing consists of both UI front end developed in Aurelia and web API developed in .net core 3.1.

I have tried to achieve all the requirement as mention in the mail Tobias. But since I am currently working for a client I didn't get much time to work in the solution. I was only able to spend about 10 to 12 hours on the problem you have shared with me.
Also, aurelia being a new front end technology for me I ended up spending more time than expected on the front end. Also, I didn't get much time for testing. So I am expecting some bugs and also I was not able to fine-tune the application. But I believe I did a good job in this short period. 

To run the solution.

1) Clone or download zip of the repo.
2)Open Hahn.ApplicatonProcess.Application in visual studio for running the web API.
3)Restore NuGet and build.
4) Run application. 

To run UI:

open the folder %repo location%\Hahn.App\Hahn.ApplicatonProcess.FrontEnd in visual studio code

run npm i
 run au run.
 
note: I am hard coding the API URL in the Aurelia front end. If you are getting not found error when running the UI please update the API URL to the proper one in the file "%repopath%\Hahn.App\Hahn.ApplicatonProcess.FrontEnd\src\services\ApplicantServices.ts"
