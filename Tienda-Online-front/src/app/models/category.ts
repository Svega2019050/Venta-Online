export class Category{
    constructor(
        public _id: string,
        public nameCategory: string,
        public description: string,
        public imageCategory: string,
        public product: []
    ){}
}