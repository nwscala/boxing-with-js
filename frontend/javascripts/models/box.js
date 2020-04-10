class Box {
    static all = []
    
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.color = data.color;
        this.size = data.size;
        this.items = data.items;
        this.save()
    }

    save() {
        Box.all.push(this);
    }
}