class Group
{
    constructor(count, imageId, cols = 1, rows = 1)
    {
        this.sprites = new Array(count);
        for (let i = 0; i < this.sprites.length; i++)
        {
            this.sprites[i] = new Sprite(imageId, cols, rows);
            this.sprites[i].hide();
        }
    }
    drawAll()
    {
        this.sprites.forEach(sprite => sprite.draw());
    }
    forEach(callback)
    {
        this.sprites.forEach(callback);
    }

    spawn()
    {
        for (let i = 0; i < this.sprites.length; i++) 
        {
            if(!this.sprites[i].visible)
            {
                this.sprites[i].show();
                return this.sprites[i];
            }
        }
        return this.sprites[i]
    }

    pickRandom()
    {
        let visibleSprites = this.sprites.filter(sprite => sprite.visible);
        let index = Math.floor(Math.random() * visibleSprites.length);

        return visibleSprites[index];
    }
}