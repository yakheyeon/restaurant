const CORRECT_PIN = "7564"

let pin = ""
let history = []

function show(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"))
document.getElementById(id).classList.add("active")
}

function move(id){
const cur=document.querySelector(".screen.active")?.id
if(cur) history.push(cur)
show(id)
}

function goBack(){
show(history.pop())
}

/* 메뉴 */

function selectMenu1(v){
v==="set"?move("menu2"):move("error")
}

function selectMenu2(v){
v==="birthday"?move("pin"):move("error")
}

/* PIN */

function pressKey(n){

if(pin.length>=4) return

navigator.vibrate?.(30)

pin+=n
updateDots()

}

function deleteKey(){

pin=pin.slice(0,-1)
updateDots()

}

function updateDots(){

const dots=document.querySelectorAll(".pin-dots span")

dots.forEach((d,i)=>{
d.classList.toggle("filled",i<pin.length)
})

document.getElementById("submitBtn").disabled=pin.length!==4

}

function submitPin(){

if(pin===CORRECT_PIN){

pin=""
updateDots()

navigator.vibrate?.([40,30,40])

move("success")

}else{

pin=""
updateDots()
move("pinError")

}

}

