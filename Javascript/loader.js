window.addEventListener('load', function() {
  // Wait until the page is fully loaded
  const loadingScreen = document.getElementById('loading-screen');
  
  // Hide the loading screen and show the content
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    this.setTimeout(() => {
      loadingScreen.style.display = 'none';
    },500)
    console.log('%c-Page Loaded Successfully-', 'background: green; color: white; font-size: 20px; font-weight: bold; border-radius: 5px;')
  },400)
  
});
