export class FileResponse {
    constructor(
        public name: string = '',
        public uri: string = '',
        public type: string = '',
        public size: number = 0
    ) {
    }
}