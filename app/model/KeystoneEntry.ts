import {Keystone} from "./Keystone";
import {Character} from "./Character";

export class KeystoneEntry {
    character: Character;
    keystone: Keystone;

    constructor(character: Character, keystone: Keystone) {
        this.character = character;
        this.keystone = keystone;
    }

    toString():string {
        return `**${this.character}**: ${this.keystone}`;
    }

    public static fromJSON(obj: any): KeystoneEntry {
        return new KeystoneEntry(Character.fromJSON(obj["character"]), Keystone.fromJSON(obj["keystone"]));
    }
}