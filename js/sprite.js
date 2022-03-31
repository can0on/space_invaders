// -----------------------------------
// KLASA: Sprite
// -----------------------------------
class Sprite
{
    constructor(imageid, cols  = 1, rows = 1)
    {
        // Pobieramy obiekt obrazka
        this.image = document.getElementById(imageid);

        // Położenie obiektu
        this.x = 0;
        this.y = 0;

        // Bezpieczne położenie obiektu
        this.saveX = 0;
        this.saveY = 0;

        // Punkt zaczepienia obiektu (origin)
        this.ox = 0;
        this.oy = 0;

        // Zapamiętujemy podział obrazka na kolumny i wiersze

        this.cols = cols;
        this.rows = rows;

        // Ustalenie wymiarów
        this.width = this.image.width / cols;
        this.height = this.image.height / rows;

        // Numer klatki do wyświetlenia
        this.frame = 0;

        // Tablica animacji
        this.animations = new Array();

        // Parametry animacji
        this.at = 0; // animation time

        // Czy widoczny
        this.visible = true;
        // Bounding box
        this.bbox = 
        {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };
    }

    // Metoda wyświetlająca obrazek
    draw()
    {
        if (this.visible)
        {
            let col = this.frame % this.cols;
            let row = Math.floor(this.frame / this.cols);
            //ctx.drawImage(this.image, this.x - this.ox, this.y - this.oy);
            ctx.drawImage(this.image, this.width * col, this.height * row, this.width, this.height, this.x - this.ox,  this.y - this.oy, this.width, this.height);
        }
    }

    // Dodanie animacji
    addAnimation(name, frames, fps = 1, loop = false, destroyWhenFinish = false)
    {
        this.animations[name] = 
        {
            frames: frames,
            fps: fps,
            loop: loop,
            destroyWhenFinish: destroyWhenFinish
        };
    }

    // Animowanie sprita
    animate(name)
    {
        if (this.visible)
        {

            let animation = this.animations[name];
            
            this.at += dt * animation.fps;
            if (this.at >= animation.frames.length)
            {
                if (animation.loop)
                    this.at = 0;
                else if (animation.destroyWhenFinish)
                {
                    this.hide();
                    this.at = 0;
                }
                else
                    this.at = animation.frames.length - 1;
            }
            
            this.frame = animation.frames[Math.floor(this.at)];
        }
    }
    // Pokazanie obiektu
    show()
    {
        this.visible = true;
    }

    // Ukrycie obiektu
    hide()
    {
        this.visible = false;
    }
    // Metoda ustawiająca pozycję
    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }

    // Metoda ustawiająca bbox
    setBbox(left, top, right, bottom)
    {
        this.bbox.left = left;
        this.bbox.top = top;
        this.bbox.right = right;
        this.bbox.bottom = bottom;
    }
    // Metoda przesuwająca obiekt
    move(vx, vy)
    {
        this.x += vx * dt;
        this.y += vy * dt;
    }

    // Czy jest kolizja
    isColliding(other)
    {
        if (this.visible && other.visible &&
            this.x - this.ox + this.bbox.left < other.x - other.ox + other.width - other.bbox.right &&
            this.x - this.ox + this.width - this.bbox.right > other.x - other.ox + other.bbox.left &&
            this.y - this.oy + this.bbox.top < other.y - other.oy + other.height - other.bbox.bottom &&
            this.y - this.oy + this.height - this.bbox.bottom > other.y - other.oy + other.bbox.top)
            return true;
        else
            return false;
    }

    // Zapisanie pozycji przed kolizją
    savePosition()
    {
        this.saveX = this.x;
        this.saveY = this.y;
    }

    // Zwrócenie ostatniej pozycji przed kolizją
    collisionResponse(other)
    {
        let bx = this.x;
        if (this.isColliding(other))
        {
            this.x = this.saveX;

            if (this.isColliding(other))
            {
                this.x = this.bx;
                this.y = this.saveY;
                
                if (this.isColliding(other))
                {
                    this.x = this.saveX;
                }
            }
        }
    }
}