export interface Race {
    id: string;
    name: string;
    description: string;
    traitsId: string[]; // IDs des traits raciaux
    subrace_of?: string; // ID de la race parente pour les sous-races
}