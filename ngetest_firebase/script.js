const firebaseConfig = {

  apiKey: "AIzaSyCeEh8kCrg9R619c5JsFUtlYsp-gPGztac",
  authDomain: "logbook-26d88.firebaseapp.com",
  projectId: "logbook-26d88",
  storageBucket: "logbook-26d88.firebasestorage.app",
  messagingSenderId: "939834833235",
  appId: "1:939834833235:web:39679b9d3687d00b3049a6"

};


// INISIALISASI FIREBASE

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const database = firebase.database();


// REGISTER USER

function registerUser(){

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;


  auth.createUserWithEmailAndPassword(email, password)

    .then(()=>{

      alert("Register berhasil");

    })

    .catch((error)=>{

      alert(error.message);

    });

}


// LOGIN USER

function loginUser(){

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;


  auth.signInWithEmailAndPassword(email, password)

    .then(()=>{

      alert("Login berhasil");

    })

    .catch((error)=>{

      alert(error.message);

    });

}


// LOGOUT USER

function logoutUser(){

  auth.signOut();

}


// CEK STATUS LOGIN

auth.onAuthStateChanged((user)=>{

  if(user){

    document.getElementById("auth-container")
      .style.display = "none";

    document.getElementById("dashboard")
      .style.display = "block";

    tampilkanLogbook(user.uid);
    tampilkanSemuaLogbook();

  }

  else{

    document.getElementById("auth-container")
      .style.display = "flex";

    document.getElementById("dashboard")
      .style.display = "none";

  }

});


// TAMBAH LOGBOOK

function tambahLogbook(){

  const user = auth.currentUser;

  const tanggal =
    document.getElementById("tanggal").value;

  const kegiatan =
    document.getElementById("kegiatan").value;


  if(tanggal === "" || kegiatan === ""){

    alert("Semua input harus diisi");

    return;

  }


  database.ref("logbook/" + user.uid).push({

  email: user.email,

  tanggal: tanggal,

  kegiatan: kegiatan

  });


  document.getElementById("tanggal").value = "";

  document.getElementById("kegiatan").value = "";

}


// TAMPILKAN LOGBOOK

function tampilkanLogbook(uid){

  database.ref("logbook/" + uid)

    .on("value", (snapshot)=>{

      const data = snapshot.val();

      let html = "";


      for(let id in data){

        html += `

          <div class="logbook-card">

            <h3>${data[id].tanggal}</h3>

            <p>${data[id].kegiatan}</p>

          </div>

        `;

      }


      document.getElementById("list-logbook")
        .innerHTML = html;

    });

}

function tampilkanSemuaLogbook(){

  database.ref("logbook")

    .on("value", (snapshot)=>{

      const data = snapshot.val();

      let html = "";


      for(let uid in data){

        for(let id in data[uid]){

          html += `

            <div class="logbook-card">

              <h3>${data[uid][id].tanggal}</h3>

              <p>
                <b>User:</b>
                ${data[uid][id].email}
              </p>

              <p>
                ${data[uid][id].kegiatan}
              </p>

            </div>

          `;

        }

      }


      document.getElementById("all-logbook")
        .innerHTML = html;

    });

}