export class LWWMap {
    constructor(id, state) {
        this._id = id;
        // Map holds key (string) and value (LWWRegister)
        this._data = new Map();
        for(const [key, registerState] of Object.entries(state)) {
            this._data.set(key, new LWWRegister(this._id, registerState));
        }
    }

    get id() {
        return this._id;
    }

    get data () {
        return this._data;
    }
    get value() {
        const value = {};
        for(const [key, register] of this.data.entries()) {
            if(register && register.value !== null ) value[key] = register.value;
        }

        return value;
    }

    get state() {
        const state = {};
        for(const [key, register] of this.data.entries()) {
            if(register) state[key] = register.state;
        }
        return state;
    }

    has(key) {
        return this.data.has(key) && this.data.get(key) !== null;
    }

    merge(state) {
        for (const [key, remoteRegState] of Object.entries(state)) {
            const local = this.data.get(key);
            if (local) local.merge(remoteRegState);
            else this.data.set(key, new LWWRegister(this.id, remoteRegState));
        }
    }

    set(key, value) {
        const register = this.data.get(key);

        if (register) register.set(value);

        else this.data.set(key, new LWWRegister(this.id, new State(this.id, 1, value));
    }

    get(key) {
        return this.data.has(key) ? this.get.state(key).value : undefined;
    }
    delete(key)
    {
        if (this.data.has(key)) {
            this.data.set(key, null);
        }
    }


}
class LWWRegister {
    constructor(id, state) {
        this._id = id;
        this._state = state;
    }

    get id() {
        return this._id;
    }

    get state() {
        return this._state;
    }

    get value() {
        return this.state.value;
    }
    set(value) {
        this._state = new State(this.id, this.state.timestamp + 1, value);
    }
    merge(state) {
        const remoteTimestamp = state.timestamp;
        const remotePeer = state.peer;

        const localTimestamp = this.state.timestamp;
        const localPeer = this.state.peer;

        if(remoteTimestamp > localTimestamp) return;

        if(remoteTimestamp === localTimestamp && localPeer > remotePeer) return;

        this._state = state;
    }
}

class State {
    constructor(peer, timestamp, value) {
        this._peer = peer;
        this._timestamp = timestamp;
        this._value = value;
    }

    get peer() {
        return this._peer;
    }

    get timestamp() {
        return this._timestamp;
    }

    get value() {
        return this._value;
    }
}
