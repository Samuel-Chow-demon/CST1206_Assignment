const API_URL = "https://reqres.in/api/users";
const USER_ID_ATTRIB_NAME = 'user_id';
const BOOTSTRAP_HIDE_CLASS_NAME = 'd-none';

let userInfoData = [];
const userContainer = document.getElementById("user-container");
const userClickedInfoContainer = document.getElementById("user-clicked-info");

async function getUserInfo() {
  // JUST TO UNDERSTAND HOW IT WORKS WITH THEN CATCH BLOCK
  // fetch(API_URL).then((data) => {
  //     return data.json();
  // }).then((dataJSON) => {
  //     createCardUI();
  // }).catch((error) => {
  //     userInfoData = dataInJson.data || [];
  // })
  try {
    const data = await fetch(API_URL);
    const dataInJson = await data.json();
    userInfoData = dataInJson.data;
    generateAllCards(userInfoData)
  } catch (error) {
    console.log("There was an error", error);
    userInfoData = [];
  }

  return new Promise((resolve, reject)=>{
    if (userInfoData.length > 0)
    {
      resolve("Success Get User Info");
    }
    else
    {
      reject("Fail Retrieve User From Server");
    }
  });
}

function createCardUI(user) {
  let cardUI = `
    <div class="card  m-4" style="width: 18rem;">
  <img src=${user.avatar} class="card-img-top" alt="...">
  <div class="card-body">
    <h1>${user.first_name} ${user.last_name}</h1>
    <p class="card-text">${user.email}</p>
  </div>
  <button class="btn btn-primary" ${USER_ID_ATTRIB_NAME}=${user.id}>Get Details</button>
</div>
    `;

  userContainer.innerHTML += cardUI;
}

function generateAllCards(userData = []) {
    for(let i = 0 ; i < userData.length; i++) {
        createCardUI(userData[i]);
    }
}

function DisplayOrHideUserInfo(bIsActionHide)
{
  const bIsClassExist = userClickedInfoContainer.classList.contains(BOOTSTRAP_HIDE_CLASS_NAME);
  if (bIsActionHide)
  {
    if (!bIsClassExist)
    {
      userClickedInfoContainer.classList.add(BOOTSTRAP_HIDE_CLASS_NAME);
    }
  }
  else
  {
    if (bIsClassExist)
    {
      userClickedInfoContainer.classList.remove(BOOTSTRAP_HIDE_CLASS_NAME);
    }
  }
}

function createSelectedInfo(clickedUserInfo) 
{
  const imgHTML = `<img src=${clickedUserInfo.avatar} class="rounded float-start m-4" width="300" height="300" alt="...">`;
  let listHTML = '<ul class="list-group list-group-flush m-4">';

  for (const [key, value] of Object.entries(clickedUserInfo))
  {
    listHTML += `<li class="list-group-item"><div class="text-success d-inline"><strong>${key} :</strong></div> ${value}</li>`;
  }
  listHTML += '</ul>';

  userClickedInfoContainer.innerHTML = imgHTML + listHTML;
}

async function getClickedUserInfo(userId)
{
  try
  {
    // call to display the container first, it would have a placeholder "Loading. . ."
    // if data not yet reply
    DisplayOrHideUserInfo(0);
    const data = await fetch(`${API_URL}/${userId}`);
    const dataInJson = await data.json();
    userInfoData = dataInJson.data;
    //console.log(userInfoData);
    createSelectedInfo(userInfoData)
  }
  catch(error)
  {
    console.log(`Click Get User Error Occurred : User ${userId}`, error);
    // Error occurred then hide the display container
    DisplayOrHideUserInfo(1);
  }
}


// Implementation //
getUserInfo().then((result_str)=>{

  // If Get User Info Success, means btn-primary class exist with the button
  // then can use it to add the event listener

  // Get All Button Object
  const arrUserInfoButtons = document.querySelectorAll('.btn-primary');

  for (let objButton of arrUserInfoButtons)
  {
    objButton.addEventListener('click', (event)=>{
      
      const userIDStr = event.target.getAttribute(USER_ID_ATTRIB_NAME);
      getClickedUserInfo(userIDStr);
    });
  }
}).catch((err_str)=>{

  console.log(err_str);
  // Error to hide the Display User Info Container
  DisplayOrHideUserInfo(1);
});



