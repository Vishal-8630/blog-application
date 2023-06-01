const currentLocation = location.href;
const navItems = document.querySelectorAll('.nav-items a');

for(let i = 0; i<navItems.length; i++) {
    if(navItems[i].href === currentLocation) {
        navItems[i].classList.toggle('active');
    }
}