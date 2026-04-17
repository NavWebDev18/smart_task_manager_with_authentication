let registerEl = document.getElementById("registerForm");
let loginEl = document.getElementById("loginForm");

function getUserFromLocalStorage(){
    let parsedUser = localStorage.getItem("usersList");
    if(parsedUser === null) return [];
    else return JSON.parse(parsedUser);
}

function saveToLocalStorage(usersList){
    localStorage.setItem("usersList",JSON.stringify(usersList));
}
// Registration Form logic

function isValidUserName(str){

    if (str.length < 8 || str.length > 29) {
    return false;
  }

  let hasLower = false;
  let hasUpper = false;
  let hasDigit = false;

  for (let char of str) {

    if (char >= 'a' && char <= 'z') {
      hasLower = true;
    }

    else if (char >= 'A' && char <= 'Z') {
      hasUpper = true;
    }

    else if (char >= '0' && char <= '9') {
      hasDigit = true;
    }

    else if (char === '_') {
      continue;
    }

    else {
      return false;
    }
  }

  return hasLower && hasUpper && hasDigit;

}


function isValidUserPassword(str){
    
    if (str.length <= 7 || str.length >= 30) {
    return false;
    }

    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let hasSpecial = false;
    let hasSpace = false;

    for (let char of str) {

        if (char >= 'a' && char <= 'z') {
        hasLower = true;
        } 
        else if (char >= 'A' && char <= 'Z') {
        hasUpper = true;
        } 
        else if (char >= '0' && char <= '9') {
        hasDigit = true;
        } 
        else if ("@&_$%?".includes(char)) {
        hasSpecial = true;
        } 
        else if (char === ' ') {
        hasSpace = true;
        }
    }

    // Final check
    return hasLower && hasUpper && hasDigit && hasSpecial && !hasSpace;
}

function register(event){
    event.preventDefault();
    let newUserName = document.getElementById("newUserName").value;
    let newUserPassword = document.getElementById("newPassword").value;
    let validUserNam = isValidUserName(newUserName);
    let validUserPassword = isValidUserPassword(newUserPassword)

    if (!validUserPassword){
        alert("Password must be 8–30 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character (@, &, _, $, %, or ?).");
        return 
    }

    if(!validUserNam){
        alert("Password must be 8–30 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character (_) special charector is optional.");
        return 
        
    }

    let usersList = getUserFromLocalStorage();

    let isUser = usersList.find(function(eachUser){
        if(eachUser.userName === newUserName) return true;
        else return false
    });

    if (isUser){
        alert("User name is already taken choose another");
        document.getElementById("newUserName").value = "";
        document.getElementById("newPassword").value = "";

        return
    }
    else{
        let newUser = {
            userName : newUserName,
            userPassword: newUserPassword
        }
        usersList.push(newUser);
        saveToLocalStorage(usersList);
        alert("User Registered Successfully!!!");
        window.location.href = 'login.html';
    }
}
if (registerEl) registerEl.addEventListener("submit",register);

// Login Form logic 
function login(event){
    event.preventDefault();
    let userNameEl = document.getElementById("userName");
    let userPasswordEl = document.getElementById("userPassword");

    let userList = getUserFromLocalStorage()

    let isUserPresent = userList.find(function(eachUser){
        if (eachUser.userName === userNameEl.value && eachUser.userPassword === userPasswordEl.value) return true;
        else return false;
    })

    if(isUserPresent){
        alert("Login Successfully!");
        localStorage.setItem("currentUser",userNameEl.value);
        window.location.href = 'index.html';
    }
    else{
        
        alert("User Not Found!");
        userNameEl.value = '';
        userPasswordEl.value = '';
        return 
    }
}
if(loginEl) loginEl.addEventListener("submit",login);

