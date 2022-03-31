class Key
{
    // Definicje wybranych klawiszy
    static enter = 13;
    static space = 32;
    static esc = 27;
    static left = 37;
    static up = 38;
    static right = 39;
    static down = 40;
    static jump = 90;      // z
    static fire = 88;      // x
    static dash = 67;      // c

    static A = 65;
    static B = 66;
    static C = 67;
    static D = 68;
    static E = 69;
    static F = 70;
    static G = 71;
    static H = 72;
    static I = 73;
    static J = 74;
    static K = 75;
    static L = 76;
    static M = 77;
    static N = 78;
    static O = 79;
    static P = 80;
    static Q = 81;
    static R = 82;
    static S = 83;
    static T = 84;
    static U = 85;
    static V = 86;
    static W = 87;
    static X = 88;
    static Y = 89;
    static Z = 90;
    static Num0 = 48;
    static Num1 = 49;
    static Num2 = 50;
    static Num3 = 51;
    static Num4 = 52;
    static Num5 = 53;
    static Num6 = 54;
    static Num7 = 55;
    static Num8 = 56;
    static Num9 = 57;

    // Metoda sprawdzająca czy klawisz podany w kodzie jest wciśnięty
    static test(code)
    {
        return keyState[code];
    }

    static pressed(code)
    {
        // Zwraca się tylko w momencie kiedy stan klawisza zmienił się z true na false
        if (keyState[code] == true && lastKeyState[code] == false)
        {
            lastKeyState[code] = keyState[code];
            return true;
        }
        else
        {
            lastKeyState[code] = keyState[code];
            return false;
        }
            
    }
}

// część techniczna
let keyState = new Array(128);
let lastKeyState = new Array(128);
for (let i = 0; i < 128; i++)
{
    keyState[i] = false;
    lastKeyState[i] = false;
}

function keyDownEvent(event)
{
    event = event || window.event;
    let key = event.keyCode || event.which;
    // event.preventDefault();
    keyState[key] = true;
}

function keyUpEvent(event)
{
    event = event || window.event;
    let key = event.keyCode || event.which;
    // event.preventDefault();
    keyState[key] = false;
}