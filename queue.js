class Element {
    constructor(data){
       this.data = data
       this.next = null;
       this.prev = null;
   };
};

class Queue {
    constructor(){
        this.first = null;
        this.last = null;
    };

    enqueue(data) {
        if(!data) return "There is no element"
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

};