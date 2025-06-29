function loginOrNot() {
  const userData = localStorage.getItem('user')
  const id = localStorage.getItem('UserId')
  if(!userData && !id) {
    window.location.href = 'login.html'
  } 
}
setInterval(loginOrNot(),1000)