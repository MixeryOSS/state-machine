# State Machine
_Yet another state-related package_

State machine allows you to share value across all components through the usage of ``Slot``. Each ``Slot`` can watch for any changes in value (either by changing its internal value or from binded slot). You can also apply **transformations** to a slot (see below).

## Example
```ts
import * as sm from "@mixery/state-machine";

let mySlot = new sm.Slot<string>("default value (optional)");
mySlot.onChange.add((newValue, oldValue) => {
    console.log(newValue, oldValue);
});
mySlot.value = "new value";

let anotherSlot = new sm.Slot<string>();
mySlot.bindTo(anotherSlot);
anotherSlot.value; // "new value"
```

