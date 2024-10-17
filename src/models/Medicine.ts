export interface IMedicine{
    id: number,
    name: string,
    leaflet?:string,
    description?: string,
    dosage?: string,
    methodOfAdministraion?: string,
    contraindications?: string,
    warning?: string,
    sideEffects?: string,
    interactions?: string,
    storage?: string
}