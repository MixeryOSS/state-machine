export type UpdateListenerCallback<T> = (newVal: T, oldVal: T) => any;

export class UpdateListener<T> {
    public readonly callbacks: UpdateListenerCallback<T>[] = [];

    public add(cb: UpdateListenerCallback<T>): this {
        if (!this.callbacks.includes(cb)) this.callbacks.push(cb);
        return this;
    }

    public remove(cb: UpdateListenerCallback<T>): this {
        const idx = this.callbacks.indexOf(cb);
        if (idx != -1) this.callbacks.splice(idx, 1);
        return this;
    }

    public pass(newVal: T, oldVal: T): this {
        // TODO: Properly handle remove on update
        this.callbacks.forEach(cb => cb(newVal, oldVal));
        return this;
    }
}
