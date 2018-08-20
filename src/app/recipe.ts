export interface recipe {
    _id: any;
    title: string;
    ingredients: Array<string>;
    steps: string;
    user: string;
    imagesData: Array<string>;
}