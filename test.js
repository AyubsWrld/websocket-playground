function sleepRecursive(){
  if(true){
    setTimeout(() => {
      sleepRecursive()
    }, 1000);
    console.log("Still polling") ; 
  }else{
    console.log("Polling Complete")
  }
}

sleepRecursive() ; 
