function time24(){
   const now = new Date()
   let time = [now.getHours(), now.getMinutes(), now.getSeconds()].join(":")
   console.log(time)
}

function time12(){
   const now = new Date()
   let h = now.getHours()
   let meridian = 'AM'
   if(h>12){
      h -= 12
      meridian = 'PM'
   }
   else if(h == 12){
      meridian = 'PM'
   }
   let time = [h, now.getMinutes(), now.getSeconds()].join(":")
   let timemeridian = time + " " + meridian
   console.log(timemeridian);

}

function clock24(){
   setInterval(time24,1000)
}
function clock12(){
   setInterval(time12,1000)
}

clock12()




// SAME QUESTION USING SETTIMEOUT FUNCTION

// function time24(){
//    const now = new Date()
//    let a = [now.getHours(), now.getMinutes(), now.getSeconds()].join(":")
//    console.log(a);
//    setTimeout(time24,1000)
// }
// time24()

// function time12(){
//    const now = new Date()
//    let h = now.getHours()
//    let meridian = 'AM'
//    if(h>12){
//       h -= 12
//       meridian = 'PM'
//    }
//    else if(h == 12){
//       meridian = 'PM'
//    }
//    let time = [h, now.getMinutes(), now.getSeconds()].join(":")
//    let timemeridian = time + " " + meridian
//    console.log(timemeridian);
//    setTimeout(time12,1000)
// }
// time12()