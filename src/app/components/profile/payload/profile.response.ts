export class ProfileResponse {
    constructor(
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public bornOn: Date = new Date(),
    ) {
    }
}