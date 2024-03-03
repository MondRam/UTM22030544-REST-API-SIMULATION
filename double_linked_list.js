class Node {
    constructor(data){
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}; 
class DoubleLinkedList {

    constructor() {
        //this inicializa los valores que va a tener 
        this.head = null;
        this.tail = null;
    }


    //añade los elementos al final
    apend(data){
        if(!data) return "There is no data";
        const newNode = new Node(data)

        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return "The element is the head and the tail";
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
            return "the element was added";
        }
    };
    //añade los elementos al inicio
    prepend(data){
        if(!data) return "There is no data";
        const newNode = new Node(data)

        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
    };

    //recorre e imprime los elementos
    traverse(){
        if (!head) return "There is no elements";
        const currentValue = this.head
        while (currentValue){
            console.log(actualValue);
            const currentValue = currentValue.next;
        };
        
    };

    traverseBackwards() {
        if (!head) return "There is no elements";
        const currentValue = this.tail

        while (currentValue){
            console.log(actualValue);
            const currentValue = currentValue.prev;
        };
    };


    //elimina nodo
    deleteNode(element) {
        if (!element || !this.head) {
            return "There is no parameter or list";
        }
        if (this.head.data === element) {
            this.head = this.head.next;

            if (this.head === null) {
                this.tail = null;
            }
            return "The indicated element was the head";
        }
        let current = this.head;
        while (current.next) {
            if (current.next.data === element) {
                if (current.next === this.tail) {
                    this.tail = current;
                    return "The element was the tail and it was deleted";
                }
                current.next = current.next.next;
                current.next.prev = current;
                return "Element deleted";
            }
            current = current.next;
        }
        return "Element not found";
    };

    //elimina la cabeza
    deleteHead(){
        if(!this.head){
            return "There is no list"
        }
        this.head = this.head.next 

        if(this.head === null){
            this.tail = null
        } else {
            this.head.prev = null;
        }
        return "head deleted";
    };

    //elimina la cola
    deleteTail(){
        if(!this.head) return "There is no list";

        if(this.head=== this.tail){
            this.head= null;
            this.tail = null;
            return "The tail and the head where removed";
        } else{
            this.tail = this.tail.prev;
            return "the tail was removed";
        }

    }

    //inserta elemento despues de un nodo
    insertAfterNode(node, element) {
        if (!node || !element) {
            return "Node and element are mandatory";
        }

        const newNode = new Node(element);

        let current = this.head;
        while (current) {
            if (current.data === node) {
                newNode.next = current.next;
                newNode.prev = current;
                current.next = newNode;
                if (current === this.tail) {
                    this.tail = newNode;
                    return 'The element was appended and it is the tail';
                };
                return 'The element was appended';
            }
            if (node.next) {
                node.next.prev = newNode;
            }
            
            current = current.next;
        }
        return 'The node doesnt exist'
    }
};