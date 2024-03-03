// class Element {
//     constructor(data){

//     };
// };


class Stack {
    constructor() {
        this.first = null;
        this.last = null;
    };

    push(newElement) {
        if (!newElement) return "There is no element";
        if (!this.first) {
            this.first = newElement;
            this.last = newElement;
            return "The element was added"
        } else {
            this.last = newElement
            return "The element was added"
        }
    };

};