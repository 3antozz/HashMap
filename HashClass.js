const { LinkedList } = require("./LinkedListClass.js");

class HashMap {
  constructor(capacity = 16) {
    this.size = 0;
    this.buckets = [];
    this.capacity = capacity;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  isFull () {
    const loadFactor = 0.75;
    const limit = Math.round(this.capacity * loadFactor);
    if (this.size >= limit ) {
        return true;
    } else {
        return false;
    }
  }

  set(key, value) {
    if (!this.isFull()) {
        const hashCode = this.hash(key);
        if (!this.buckets[hashCode]) {
          const list = new LinkedList();
          const pair = { [key]: value };
          list.append(pair);
          this.buckets[hashCode] = list;
          this.size++;
          return;
        }
        const bucket = this.buckets[hashCode];
        const pair = { [key]: value };
        const index = bucket.find(key);
        if (index != null) {
          bucket.removeAt(index);
          bucket.insertAt(pair, index);
        } else {
          bucket.append(pair);
        }
    } else {
        this.increaseCapacity();
        this.set(key, value);
    }
  }

  increaseCapacity () {
    this.capacity = this.capacity * 2;
    this.size = 0;
    const entries = this.entries();
    this.clear();
    entries.forEach((entry) => {
        const [key, value] = entry;
        this.set(key, value);
    })
  }

  get(key) {
    if (!this.has(key)) {
      return null;
    }
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];
    const index = bucket.find(key);
    return bucket.at(index).value[key];
  }
  has(key) {
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];
    if (!bucket) {
      return false;
    }
    const index = bucket.find(key);
    if (index == null) {
      return false;
    } else {
      return true;
    }
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    }
    const hashCode = this.hash(key);
    const bucket = this.buckets[hashCode];
    const index = bucket.find(key);
    bucket.removeAt(index);
    if (bucket.size() === 0) {
      this.buckets.splice(hashCode, 1);
      this.size--;
    }
    return true;
  }

  length() {
    let total = 0;
    this.buckets.forEach((bucket) => {
      total += bucket.size();
    });
    return total;
  }

  clear() {
    this.buckets.length = 0;
    this.size = 0;
  }

  keys () {
    const keys = [];
    this.buckets.forEach((bucket) => {
        keys.push(bucket.getKeys());
    })
    return keys.flat();
  }

  values() {
    const values = [];
    this.buckets.forEach((bucket) => {
        values.push(bucket.getValues());
    })
    return values.flat();
  }
  entries() {
    const entries = [];
    this.buckets.forEach((bucket) => {
        entries.push(bucket.getEntries());
    })
    return entries.flat();
  }
}

module.exports = {HashMap};


// const hashmap = new HashMap(16);
// hashmap.set("abcd", "hh");
// hashmap.set("efgh", "huh");
// hashmap.set("abcd", "CHANGED");
// hashmap.set("koko", "test");
// hashmap.set("kmiio", "blyat");
// console.log(hashmap);
// console.log(hashmap.length());
// console.log(hashmap.keys());
// console.log(hashmap.values());
// console.log(hashmap.entries());
// console.log(hashmap.buckets);
// debugger;
