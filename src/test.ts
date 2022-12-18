import { Slot } from "./Slot.js";

let slot = new Slot("default value");
slot.onUpdate.add(newValue => console.log("slot 1 update", newValue));
console.log(1, slot.value);

slot.value = "new value";

let slot2 = new Slot("slot 2");
slot2.onUpdate.add(v => console.log("slot 2 update", v));
console.log(2, slot.bindTo(slot2).value);

slot2.value = "brand new value";
console.log(3, slot.value);

slot2.unbind();
console.log(4, slot2.value);

slot2.value = "independent 2";
console.log(5, slot.value, slot2.value);

slot.value = "independent 1";
console.log(6, slot.value, slot2.value);

let slot3 = new Slot("slot 3").from(slot);
console.log(7, slot3.value, slot3.value == slot.value);
