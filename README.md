## Chat appplication with Ionic 3 , Firebase realtime database, Firebase cloud functions, AngularFire v5 and RxJS 5

- Register in 2 different device and chat between them realtime
- Also multiple person can group chat creating channels

##firebase db Rules explanation

https://www.youtube.com/watch?v=PUBnlbjZFAI

###Rules used

  ```{
    "rules": {
      "last-messages": {
        ".read": "auth!==null",
        ".write": "auth!==null"
      },
      "messages": {
        ".read": "auth!==null",
        ".write": "auth!==null"
      },
      "user-messages": {
        ".read": "auth!==null",
        ".write": "auth!==null"
      },
      "online-users" : {
        ".read" : "auth !== null",
        ".write" : "auth !== null"
      },
      "channels" : {
        ".read" : "auth !== null",
        ".write" : "auth !== null"
      },
      "channel-names": {
        ".read" : "auth !== null",
        ".write" : "auth !== null"
      },
      "profiles" : {
        ".read" : "auth !== null",
        ".indexOn" : "firstName",
        "$uid" : {
          ".write" : "$uid === auth.uid",
          ".read" : "auth !== null"
        }
      }
    }
  }```


## Misc

Update: "angularfire2": "^5.0.0-rc.4",
"firebase": "^4.5.0"


https://icons8.com/

https://material.io/color/#!/?view.left=0&view.right=1&secondary.color=42a5f4&primary.color=009688

### Various regular expressions as suggested by Mitja Krepek:


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
