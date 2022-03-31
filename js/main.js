// ------------------------------
// INICJALIZACJA SILNIKA
// ------------------------------

// Głowne zmienne silnika - globalne
let canvas;
let ctx;
let width;
let height;
let fps = 30;
let dt = 1 / fps; // dt = delta time
let scale = 1;
let smooth = true;

// Zdarzenie po załadowaniu strony
window.addEventListener("load", () => 
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    width = canvas.width / scale;
    height = canvas.height / scale;

    // Skalowanie silnika
    ctx.scale(scale, scale);

    // Antyaliasing
    ctx.imageSmoothingEnabled = smooth;
    
    // Zdarzenia klawiatury
    document.addEventListener('keydown', keyDownEvent);
    document.addEventListener('keyup', keyUpEvent);

    // start
    start();

    // Render wywoływany cyklicznie
    setInterval(() => {
        ctx.clearRect(0, 0, width, height);
        render();
    }, 1000 / fps);
});