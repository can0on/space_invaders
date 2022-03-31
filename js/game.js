// -----------------------------------
// GŁOWNY MODUŁ GRY
// -----------------------------------
let back1;
let back2;
let ship;
let bolts;
let lasers;
let aliens;
let booms;
let boom;
let alienSpeed = 50;
let alienLasersTimeout = 0;

// FUNKCJA WYWOŁYWANA NA POCZĄTKU GRY
function startGame()
{
    back1 = new Sprite('back');
    back2 = new Sprite('back');
    back2.setPosition(0, -height);

    ship = new Sprite('ship');
    ship.setPosition(width / 2 - 50, 600);

    bolts = new Group(50, 'bolt1');
    lasers = new Group(50, 'bolt2');

    aliens = new Group(40, 'alien');
    for (let j = 50; j < 300; j += 80)
        for (let i = 140; i < 1100; i += 100)
            aliens.spawn().setPosition(i, j);

    booms = new Group(50, "boom", 12, 1);
    // Robimy pętle foreach i dodajemy każdemu boomowi animacje
    booms.forEach(boom => boom.addAnimation("explosion", [0, 1, 2, 3, 4, 5, 6, 7, 8 , 9, 10, 11], 10, false, true));
}

// FUNKCJA WYWOŁYWANA Z KAŻDĄ KLATKĄ ANIMACJI
function renderGame()
{
    // Tło
    back1.draw();
    back2.draw();
    back1.move(0, BACKGROUND_SPEED);
    back2.move(0, BACKGROUND_SPEED);
    if (back1.y > height)
        back1.y = -height;
    if (back2.y > height)
        back2.y = -height;

    // Gracz
    if (ship.visible)
    {
        ship.draw();
        if (Key.test(Key.right))
            ship.move(SHIP_SPEED, 0);
        if (Key.test(Key.left))
            ship.move(-SHIP_SPEED, 0);
        if (ship.x <= 0)
            ship.x = 0;
        if (ship.x >= width - 100)
            ship.x = width - 100;
        // strzelanie
        if (Key.pressed(Key.Z))
            bolts.spawn().setPosition(ship.x + 33, ship.y - 5);
    }
    // Pociski gracza
    bolts.drawAll();

    bolts.forEach(bolt => {
        if (bolt.visible)
        {
            bolt.move(0, -BOLT_SPEED)
            if (bolt.y < 0)
                bolt.hide();
        }
    });

    // Alieny
    aliens.drawAll();
    bolts.forEach(bolt => {
        aliens.forEach(alien => {
            if (bolt.isColliding(alien))
            {
                alien.hide();
                bolt.hide();
                booms.spawn().setPosition(alien.x - 30, alien.y - 15);
            }
        });
    });

    let newSpeed = alienSpeed;
    aliens.forEach(alien => {
        alien.move(alienSpeed, 0);
        if (alien.x > width - 80)
            newSpeed = -50;
        if (alien.x < 0)
            newSpeed = 50;
    });
    alienSpeed = newSpeed;

    // Wybuchy
    booms.drawAll();
    booms.forEach(boom => boom.animate("explosion"));

    // Pociski alienów
    lasers.drawAll();
    lasers.forEach(laser => {
        if (laser.visible)
        {
            laser.move(0, LASER_SPEED)
            if (laser > 1000)
                laser.hide()

            if (laser.isColliding(ship))
            {
                ship.hide();
                laser.hide();
                booms.spawn().setPosition(ship.x + 33, ship.y - 5);     
            }
        }
    });

    alienLasersTimeout += dt;

    if (alienLasersTimeout > LASERS_SPAWN_PERIOD)
    {
        alienLasersTimeout = 0;
        let randomAlien = aliens.pickRandom();
        
        lasers.spawn().setPosition(randomAlien.x + 33, randomAlien.y + 15);     
    }
        
}

function isGameover()
{
    if (!ship.visible)
        return true;

    return false;
}

function isComplete()
{
    let result = true;
    
    aliens.forEach(alien => {
        if (alien.visible)
            result = false;
    });

    return result;
}