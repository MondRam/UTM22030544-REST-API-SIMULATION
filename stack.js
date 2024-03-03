 class Element {
     constructor(data){
        this.data = data
        this.next = null;
        this.prev = null;
    };
};


class Stack {
    constructor() {
        this.first = null;
        this.last = null;
    };

    push(data) {
        if (!data) return "There is no element";
        const newElement = new Element(data);
        if (!this.first) {
            this.first = newElement;
            this.last = newElement;
            return "The element was added"
        } else {
            this.last.next = newElement
            this.last = newElement
            return "The element was added"
        }
    };

    pop(){
        if(!this.first) return "there is no stack";
        
        if(this.first) {
            if (this.first === this.last){
                this.first = null;
                this.last = null;
                return "The element was the first and the last, it was removed";
            }else{
                this.last = this.last.prev
                return "The last element was removed";
            }
            
        }
    };

};