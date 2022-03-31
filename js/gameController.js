// ------------------------------------------------------------------------------------------------
// Kontroler stanów gry
// ------------------------------------------------------------------------------------------------

// Aktualny stan
let state = "intro";

// Globalny start
function start()
{
    startIntro();
}

// Globalny render
function render()
{
    // Który stan
    switch (state)
    {
        // Intro
        case "intro":
            renderIntro();

            // Zmiana stanu na start
            if (Key.pressed(Key.enter))
            {
                state = "game";
                startGame();
            }
            break;

        // Gra
        case "game":
            renderGame();

            // Zmiana stanu - powrót do intro
            if (Key.pressed(Key.esc))
            {
                state = "intro";
                startIntro();
            }

            // Zmiana stanu - wygrana
            if (isComplete())
            {
                state = "complete";
                startComplete();
            }

            // Zmiana stanu - przegrana
            if (isGameover())
            {
                state = "gameover";
                startGameover();
            }

            break;

        // Przegrana
        case "gameover":
            renderGameover();

            // Zmiana stanu - graj jeszcze raz
            if (Key.pressed(Key.enter))
            {
                state = "game";
                startGame();
            }
            break;

        // Wygrana
        case "complete":
            renderComplete();

            // Zmiana stanu - powrót do intro
            if (Key.pressed(Key.enter))
            {
                state = "intro";
                startIntro();
            }
            break;
    }
}
