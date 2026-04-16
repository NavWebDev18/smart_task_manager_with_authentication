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
function register(event){
    event.preventDefault();
    let newUserName = document.getElementById("newUserName").value;
    let newUserPassword = document.getElementById("newPassword").value;

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

