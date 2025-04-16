window.addEventListener('load', function() {
  // Wait until the page is fully loaded
  const loadingScreen = document.getElementById('loading-screen');
  
  // Hide the loading screen and show the content
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    console.log('%c -Page Loaded Successfully-', 'background: green; color: white; font-size: 20px; font-weight: bold;')
  },400)
  
});
