function loginOrNot() {
  const userData = localStorage.getItem('user')
  const actualData = JSON.parse(userData)
  if(userData === null) {
    window.location.href = 'login.html'
  } 
}
setInterval(loginOrNot(),1000)