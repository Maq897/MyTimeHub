function loginOrNot() {
  const userData = localStorage.getItem('user')
  if(userData === null) {
    window.location.href = 'login.html'
  } 
}
setInterval(loginOrNot(),1000)