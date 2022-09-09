export interface NodeType {
    ID: string;
    type: string;
    title: string;
    created: Date;
    updated: Date;
    status: string;
    content?: string;
    uid: string;
    parent?: string;
    metadata?: {
        cost: number;
        composition: string;
        supplement: string;
        season: string;
        media?: string;
        type: string;
    };
}
