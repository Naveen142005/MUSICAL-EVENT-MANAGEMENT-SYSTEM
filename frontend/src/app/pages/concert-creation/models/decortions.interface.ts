export interface Decoration {
    type: string;
    price: number;
    package_includes?: any
    rating?: any
    description?:any
    image_path: string | null;
    name: string;
    status: string | null;
    id: number;
    package_type?: any
}


export interface Snack {
    id: number;
    price: number;
    snacks: string[];
    image_path: string | null;
}
