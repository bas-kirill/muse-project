interface Instrument {
    id: number
    name: string
    type: string
    manufacturer: string
    manufacturerDate: string
    releaseDate: string
    country: string
    basicMaterials: string[]
}

export type Instruments = Instrument[];