const Node = require('./node');

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this.length = 0;
  }

  append(data) {
    if (this.length === 0) {
      let node = new Node(data);

      this._head = node;
      this._tail = node;
      this.length++;
    } else if (this.length > 0) {
      let nextNode = new Node(data, this._tail);

      for(let key in this._tail) {
        if (key === 'next') {
          this._tail[key] = nextNode;
        }
      }

      this._tail = nextNode;
      this.length++;
    }
    return this;
  }

  head() {
    return this._head ? this._head.data : null;
  }

  tail() {
    return this._tail ? this._tail.data : null;
  }

  at(index) {
    const getData = (index, head) => {
      return index === 0
        ? head.data
        : getData(index - 1, head.next);
    }

    return getData(index, this._head);
  }

  insertAt(index, data) {
    let item = 0;
    let node = null;
    let prevNode = null;
    let nextNode = null;
    let head = this._head;

    for (let i in head) {
      if (item < index) {
        prevNode = head;
      }

      if (index === item) {
        node = new Node(data, prevNode, head);
        head.prev = node;
        prevNode.next = node;
      }

      if (head.next) {
        item++;
        head = head.next;
      }
    }

    return this;
  }

  isEmpty() {
    return this.length === 0 
      ? true
      : false;
  }

  clear() {
    this._head = null;
    this._tail = null;
    this.length = 0;

    return this;
  }

  deleteAt(index) {
    let prevNode = null;
    let nextNode = null;

    const delAt = (item, list) => {
      if (item < index) {
        prevNode = list;
      } else if (item > index) {
        nextNode = list;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        return;
      }

      if (list.next) {
        return delAt(item + 1, list.next);
      }
    }
    
    delAt(0, this._head);
    return this;
  }

  reverse() {
    let repl = Object.assign(this._head);
    this._head = this._tail;
    this._tail = repl;

    let list = this._head;

    const getReversedList = (list) => {
      if (list === null) {
        return list; 
      } else {
        if (list.next === null) {
          repl = null;
        } else {
          repl = Object.assign(list.next);
        }
        
        list.next = list.prev;
        list.prev = repl; 
        
        return getReversedList(list.next);
      }
    }

    getReversedList(list);
    return this;
  }

  indexOf(data) {
    let index = -1;
    let item = 0;
    let head = this._head;
  
    for (let i in head) {
      if (head.data === data) {
        index = item;
        break;
      }
      if (head.next) {
        head = head.next;
        item++;
      }
    }

    return index;
  }
}

module.exports = LinkedList;
