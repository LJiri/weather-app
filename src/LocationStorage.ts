import { Location } from "./types";

const LOCATIONS = "locations";

export class LocationStorage {
    private get locations(): Location[] {
        return JSON.parse(localStorage.getItem(LOCATIONS)) ?? [];
    }

    get isEmpty(): boolean {
        return !this.locations || this.locations.length == 0;
    }

    get lastLocation(): Location {
        return this.isEmpty ? null : this.locations[this.locations.length - 1];
    }

    get locationsExceptLast(): Location[] {
        const locations = this.locations.slice();
        locations.pop();
        return locations;
    }

    save({ coords, name }: Omit<Location, "id">) {
        const locations: Location[] = this.locations;
        let newId = 0;

        if (!this.isEmpty) {
            if (this.lastLocation.coords.lat == coords.lat && this.lastLocation.coords.lng == coords.lng) {
                return;
            }

            newId = Number(this.lastLocation.id) + 1;
        }

        localStorage.setItem(LOCATIONS, JSON.stringify([...locations, { id: String(newId), coords, name }]));
    }

    deleteById = (id: string): void => {
        const locations = this.locations;

        const newLocations = locations.filter(location => location.id != id);
        localStorage.setItem(LOCATIONS, JSON.stringify(newLocations));
    };

    private deleteAll() {
        localStorage.removeItem(LOCATIONS);
    }

    deleteAllExceptLast() {
        const last = this.lastLocation;
        this.deleteAll();
        this.save({ coords: last.coords, name: last.name });
    }
}
