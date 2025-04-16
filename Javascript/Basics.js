function updateTime() {
  const timeElement = document.getElementById('time');
  let now = new Date();
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');

  if(hours > 12) {
    hours -= 12
    timeElement.textContent = `${hours}:${minutes} PM`
  } else {
    timeElement.textContent = `${hours}:${minutes} AM`
  }

}

setInterval(updateTime, 1000);
updateTime()
// if you are recieving errors for the above piece of code, note that i dont want to make another file for this one sso deal with jit

function closesidebarbtn() {
  let main = document.getElementById('main')
  main.style.height = '200px'
  let openCloseDiv = document.getElementById('openCloseDiv')
  .innerHTML = `<button id="Minimize" onclick="opensidebarbtn()">Maximize</button>`
}

function opensidebarbtn() {
let main = document.getElementById('main')
  main.style.height = '500px'
  let openCloseDiv = document.getElementById('openCloseDiv')
  .innerHTML = `<button id="Minimize" onclick="closesidebarbtn()">Minimize</button>`
}