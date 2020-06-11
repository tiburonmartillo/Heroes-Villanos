export interface Powerstats {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
}

export interface Biography {
    fullname: string;
    alteregos: string;
    aliases: string[];
    placeofbirth: string;
    firstappearance: string;
    publisher: string;
    alignment: string;
}

export interface Appearance {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyecolor: string;
    haircolor: string;
}

export interface Work {
    occupation: string;
    base: string;
}

export interface Connections {
    groupaffiliation: string;
    relatives: string;
}

export interface Image {
    url: string;
}

export interface RootObject {
    response: string;
    id: string;
    name: string;
    powerstats: Powerstats;
    biography: Biography;
    appearance: Appearance;
    work: Work;
    connections: Connections;
    image: Image;
}
