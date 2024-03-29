const usersName = ["Mont", "Sofi", "Max", "Victor", "Carlos", "Erasmo", "Jacob"];

function sendReponse(code, body = null) {
    const response = {
      code,
      body,
    };
  
    switch (code) {
      case 200:
        response.msg = "Ok";
        break;
      case 201:
        response.msg = "Done";
        break;
      case 301:
        response.msg = "Moved";
        break;
      case 400:
        response.msg = "Endpoint not valid";
        break;
      case 404:
        response.msg = "Not found";
        break;
      case 500:
        response.msg = "Internal Server Error";
        break;
      default:
        response.msg = "Unknown status code";
    }
  
    return response;
  };
  

 // takes one username and return it if exists.
function getUser (userName) {
  try {
    if (!userName) {
      return sendReponse(400);
    }

    const userIndex = usersName.indexOf(userName);

    if (userIndex >= 0) {
      const user = usersName.at(userIndex);

      return sendReponse(200, user);
    }

    return sendReponse(404);
  } catch (error) {
    return sendReponse(500, error);
  }
};
console.log(getUser("Mont"));


//return all existing users
function getUsers(array) {
  try{
    if (array == "usersName"){
    return sendReponse(200, "All users: " + usersName);
    }
    return sendReponse(400);

  }catch(error){
    return sendReponse(500, error);
  }
};
console.log(getUsers("usersName"));


//adds a new user to the users array and return the user created, all users in new array and the user created
function addUser(newUser) {
  try {
    usersName.push(newUser);
    const userIndex = usersName.indexOf(newUser);
    const user = usersName.at(userIndex);
   return sendReponse(201, "New User: " + user + " New array: " + usersName );
  
  }catch(error){
    return sendReponse(500, error);
  }

};
console.log(addUser("Mafer "));


//takes an index and, if found, removes the element from the array, it returns the deleted element and the new array.
function removeUserByIndex(index){
  try{
    let length = usersName.length
    if (index >=0 && index < length){
      const user = usersName.at(index);
      usersName.splice(index, 1 );
      return sendReponse(201,"User Deleted: " + user + "  New array: " + usersName );
    }
    
    return sendReponse(404);
    }catch(error){
    return sendReponse(500, error);
  }
};
console.log(removeUserByIndex(10));

//removes the last element from the array, it returns the deleted element and the new array.
function removeLastUser() {
  try{
    user = usersName.at(-1);
    usersName.pop();
    return sendReponse(201, "User deleted: " + user + "  New array: " + usersName );
  }catch(error){
    return sendReponse(500, error);
  }
};
console.log(removeLastUser());

//removes the first element from the array, it returns the deleted element and the new array.
function removeFirstUser() {
  try{  
    user = usersName.at(0);
    usersName.shift();
    return sendReponse(201, "User deleted: " + user + "  New array: " + usersName );
  }catch(error){
    return sendReponse(500, error);
  }

};
console.log(removeFirstUser());


//takes the index and the new value, if index exists then replace the element with the new value.
function updateUserByIndex(index, newValue) {
  try{
    let length = usersName.length;
    if (index >=0 && index < length) {
      usersName[index] = newValue;
      return sendReponse(201, "New array: " + usersName );
    }
  return sendReponse(400);
  }catch(error){
    return sendReponse(500, error);
  }
};
console.log(updateUserByIndex(5, "Maricruz"));


//return the number of users in the array.
function getUsersSize() {
  try{
    length = usersName.length;
    return sendReponse(200, "The number of users is " + length);
  }catch(error){
    return sendReponse(500, error);
  }
};
console.log(getUsersSize());
