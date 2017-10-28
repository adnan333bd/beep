This is a starter template for [Ionic](http://ionicframework.com/docs/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/ionic-team/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/ionic-team/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start myBlank blank
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

Substitute ios for android if not on a Mac.

https://icons8.com/

https://material.io/color/#!/?view.left=0&view.right=1&secondary.color=42a5f4&primary.color=009688

Various regular expressions as suggested by Mitja Krepek:


1. Password must have 6 to 20 characters:
 
Expression: [a-zA-Z0-9!@#$%^&*]{6,20}$
Copy/paste: pattern="[a-zA-Z0-9!@#$%^&*]{6,20}$"
 

2. Password must have 6 to 16 characters and 1 number:
 
Expression: (?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$
Copy/paste: pattern="(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$"
 

3. Password must have 6 to 16 characters and 1 special character:
 
Expression: (?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$
Copy/paste: pattern="(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
 

4. Password must have 6 to 16 characters, 1 number, 1 uppercase letter and 1 special character:
 
Expression: (?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$
Copy/paste: pattern="(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$"
 

5. Password must have at least 6 characters and 1 uppercase letter:
Expression: (?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,}$
Copy/paste: pattern="(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,}$"
