const navbar = document.getElementById('navbar')

const media = window.matchMedia('(max-width > 700px)')

function updateNavbar(e) {
  const isMobile = e.matches
  if(isMobile) {
    navbar.setAttribute('inert', '')
  } else {
    navbar.removeAttribute('inert', '')
  }
}

function closeSidebar() {
  document.getElementById("navbar").classList.remove('show')
  navbar.setAttribute('inert', '')
}

function openSidebar() {
  document.getElementById("navbar").classList.add('show')
  navbar.removeAttribute('inert', '')
}

document.getElementById('overlay').addEventListener('click', closeSidebar)