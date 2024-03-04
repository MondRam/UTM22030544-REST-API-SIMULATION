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
    
    dequeue(){
        if(!this.first) return "there is no stack";
        
        if(this.first) {
            if (this.first === this.last){
                this.first = null;
                this.last = null;
                return "The element was the first and the last, it was removed";
            }else{
                this.first = this.first.next;
                return "The first element was removed";
            }
            
        }
    };

};