class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
  }
  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  at(index) {
    let i = 0;
    if (index > this.length - 1) {
      throw new Error("List is smaller than that!");
    }
    if (index === 0) {
      return this.head;
    }
    if (index === this.length - 1) {
      return this.tail;
    }

    if (index < 0) {
      throw new Error("Please provide a positive number");
    }
    let curr = this.head;
    let prev = null;
    while (i < index) {
      prev = curr;
      curr = curr.next;
      i++;
    }
    return curr;
  }
  pop() {
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return;
    }
    if (this.length === 2) {
      this.head.next = null;
      this.tail = this.head;
      this.length--;
      return;
    }
    const prev = this.at(this.length - 2);
    prev.next = null;
    this.length--;
  }

  contains(value) {
    if (this.head === null) {
      throw new Error("List is empty!");
    }
    let curr = this.head;
    let prev = null;
    while (curr != null && value != curr.value) {
      prev = curr;
      curr = curr.next;
    }
    if (curr === null) {
      return false;
    }
    return true;
  }
  find(key) {
    if (this.head === null) {
      throw new Error("List is empty!");
    }
    let i = 0;
    let curr = this.head;
    let prev = null;
    while (curr != null && key != Object.keys(curr.value)) {
      prev = curr;
      curr = curr.next;
      i++;
    }
    if (curr === null) {
      return null;
    }
    return i;
  }

  insertAt(value, index) {
    if (index < 0) {
      throw new Error("Please provide a positive number");
    }

    if (index === 0) {
      return this.prepend(value);
    }
    if (index === this.length) {
      return this.append(value);
    }
    const node = new Node(value);
    const oldNode = this.at(index);
    const prevNode = this.at(index - 1);
    prevNode.next = node;
    node.next = oldNode;
  }
  removeAt(index) {
    if (index < 0) {
      throw new Error("Please provide a positive number");
    }

    if (this.length === 1) {
      this.pop();
      return;
    }

    if (index >= this.length) {
      throw new Error("index is bigger than the list's length");
    }

    if (index === this.length - 1) {
      return this.pop();
    }

    if (index === 0){
      const nextNode = this.at(1);
      this.head = nextNode;
      this.length--;
      return;
    }
    const nextNode = this.at(index + 1);
    const prevNode = this.at(index - 1);
    prevNode.next = nextNode;
    this.length--;
  }

  getKeys () {
    if (this.head == null) {
      return;
    }
    let keys = [];
    let curr = this.head;
    let prev = null;
    while (curr != null) {
      keys.push(Object.keys(curr.value));
      prev = curr;
      curr = curr.next;
    }
    return keys.flat();
  }

  getValues () {
    if (this.head == null) {
      return;
    }
    let values = [];
    let curr = this.head;
    let prev = null;
    while (curr != null) {
      values.push(Object.values(curr.value));
      prev = curr;
      curr = curr.next;
    }
    return values.flat();
  }

  getEntries () {
    if (this.head == null) {
      return;
    }
    let entries = [];
    let curr = this.head;
    let prev = null;
    while (curr != null) {
      entries.push(Object.entries(curr.value));
      prev = curr;
      curr = curr.next;
    }
    return entries.flat();
  }

  toString(curr = this.head, string = `( ${curr.value} ) -> `) {
    if (curr.next === null) {
      return `( ${curr.value} ) -> null`;
    }
    return string + this.toString(curr.next, `( ${curr.next.value} ) -> `);
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

// const list = new LinkedList();
// list.append({"redha": "22"});
// list.append({"redha": "22"});
// list.append({"redha": "22"});
// list.append({"redha": "22"});
// list.append({"redha": "22"});
// list.append({"redha": "22"});
// console.log(list);
// console.log(list.getKeys())
// console.log(list.getEntries());

// debugger;


module.exports = {LinkedList};