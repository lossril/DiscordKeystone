import fs = require("fs");
import ErrnoException = NodeJS.ErrnoException;
import {IKeystoneEntryRepository} from "../IKeystoneEntryRepository";
import {KeystoneEntry} from "../../model/KeystoneEntry";
import {Keystone} from "../../model/Keystone";

export class KeystoneEntryFileRepository implements IKeystoneEntryRepository {

    private static PATH: string = "./data/keystones.json";

    Add(entry: KeystoneEntry): void {
        let entries: KeystoneEntry[] = this.List();
        entries = entries.filter(k => k.user !== entry.user);
        entries.push(entry);
        this.write(entries);
    }

    Clear(): void {
        this.write([]);
    }

    List(): KeystoneEntry[] {
        return fs.existsSync(KeystoneEntryFileRepository.PATH) ?
            JSON.parse(fs.readFileSync(KeystoneEntryFileRepository.PATH, "utf8"))
                .map((o:any) => KeystoneEntry.fromJSON(o)) :
            [];
    }

    Remove(user: string): Keystone | undefined {
        let entries: KeystoneEntry[] = this.List();
        let entry: any = entries.find(k => k.user === user);
        if (entry) {
            entries = entries.filter(k => k.user !== user);
            this.write(entries);
            return entry.keystone;
        }
        return undefined;
    }

    private write(entries:KeystoneEntry[]): void {
        const data = JSON.stringify(entries, null, 2);
        fs.writeFile(KeystoneEntryFileRepository.PATH, data, "utf8", KeystoneEntryFileRepository.writeCallback);
    }

    private static writeCallback(err: ErrnoException): void {
        if (err) {
            console.error("Failed writing Keystones", err);
        }
    }
}