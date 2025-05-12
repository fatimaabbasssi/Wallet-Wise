import { auth, 
onAuthStateChanged,
db,
doc,
getDoc } from './config.js';

// user state
onAuthStateChanged(auth, async (user) => {

  let profilePage = document.getElementById("profilePage")
  let dash = document.getElementById("dashboard")
  let income = document.getElementById("income")
  let security = document.getElementById("security")
  let log = document.getElementById('log')
  let sign = document.getElementById('sign')

  console.log(window.location.pathname );
  

  if (user) {
     
      // user
      let userId = user.uid;
      let currentUserRef = doc(db, "Users", userId);
      let currentUser = await getDoc(currentUserRef);
      let singedInUser = currentUser.data()
      console.log('Logged-In User : ' , singedInUser);
      
    if (window.location.pathname !== '/profilee') {
      window.location.replace('/profilee'); // Redirect to profile
    }
  }


//   esleeeeeeeeee
   else {

   if(profilePage){
    profilePage.style.display = 'none'
   }

   if(dash){
    dash.style.display = 'none'
   }

   if(security){
    security.style.display = 'none'
   }
   if(income){
    income.style.display = 'none'
   }
   if(sign){
    sign.style.display = 'block'
   }
   if(log){
    log.style.display = 'block'
   }

    // if (window.location.pathname !== '/login') {
    //   window.location.replace('/login'); // Redirect to login 
    // }
  }
});

