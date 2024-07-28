export type Checkboxes = {
    KEYBOARD: boolean;
    STRINGED: boolean;
    WIND: boolean;
    audiocom: boolean;
    yamaha: boolean;
    manufactureDateFrom: string;
    manufactureDateTo: string;
    releaseDateFrom: string;
    releaseDateTo: string;
    usa: boolean;
    cyprus: boolean;
    wood: boolean;
    metall: boolean;
};

export type Filters = {
    instrumentName: string | null;
    instrumentTypes: string[];
    manufacturerNames: string[];
    manufactureDateFrom: string | null;
    manufactureDateTo: string | null;
    releaseDateFrom: string | null;
    releaseDateTo: string | null;
    countries: string[];
    materials: string[];
};