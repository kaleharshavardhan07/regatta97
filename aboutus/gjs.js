// script.js
const panels = document.querySelectorAll('.panel');

function checkScroll() {
    panels.forEach(panel => {
        const panelTop = panel.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8; // Adjust trigger point as needed

        if (panelTop < triggerPoint) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', checkScroll);


let currentPanel = 0;
        let isZooming = false; // Flag to prevent rapid zoom triggering

        window.addEventListener('wheel', (event) => {
            if (event.ctrlKey) { // Check if Ctrl key (or Cmd on Mac) is pressed for zoom
                event.preventDefault(); // Prevent default zoom behavior
                isZooming = true;  // Set the zooming flag

                if (event.deltaY < 0) { // Zoom in
                    currentPanel = Math.max(0, currentPanel - 1); // Go to previous panel
                } else { // Zoom out
                    currentPanel = Math.min(panels.length - 1, currentPanel + 1); // Go to next panel
                }

                slidePanels();

                setTimeout(() => {
                    isZooming = false; // Reset the zooming flag after a delay
                }, 200); // Adjust the delay as needed

            } else if (!isZooming) { // Only handle regular scrolling if not zooming
                checkScroll();
            }
        });


        function slidePanels() {
            container.style.transform = `translateX(-${currentPanel * 100}vw)`;
        }

        const container = document.querySelector('.container');
        slidePanels(); // Initial slide on load
        
// Initial check on page load
checkScroll();