export interface NodeType {
    ID: string;
    type: string;
    name: string;
    created: Date;
    updated: Date;
    status: string;
    content: string;
    metadata: {
        cost: number;
        composition: string;
        supplement: string;
        season: string;
    };
}
