import { UpdateListener, UpdateListenerCallback } from "./UpdateListener.js";

export interface ISlot<T> {
    value: T;
}

export class Slot<T> implements ISlot<T> {
    private _internalValue: T;
    public binding: ISlot<T>;
    private _bindingCb: UpdateListenerCallback<T>;
    public readonly onUpdate = new UpdateListener<T>();

    public constructor(public readonly defaultValue: T = null) {}

    public get value() { return this.binding?.value ?? this._internalValue ?? this.defaultValue; }
    public set value(v: T) {
        if (this.binding) this.binding.value = v;
        else {
            const old = this._internalValue;
            this._internalValue = v;
            this.onUpdate.pass(v, old);
        }
    }

    public bindFrom(from: ISlot<T>): this {
        let oldV = this.value, newV: T;

        if (this.binding) {
            // unbind first
            if (this.binding instanceof Slot) {
                this._internalValue = this.value;
                this.binding.onUpdate.remove(this._bindingCb);
            }

            this.binding = undefined;
        }

        if (from) {
            if (from instanceof Slot) {
                from.onUpdate.add(this._bindingCb = (n, o) => {
                    this.onUpdate.pass(n, o);
                });
            }

            this.binding = from;
        }

        newV = this.value;
        if (oldV != newV) this.onUpdate.pass(newV, oldV);
        return this;
    }

    public bindTo(to: Slot<T>): typeof to {
        return to.bindFrom(this);
    }

    public unbind(): this {
        this.bindFrom(null);
        return this;
    }
}
