export class ProfileRequest {
    constructor(
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public bornOn: Date = new Date(),
        // public quizPoints: number = 0
    ) {
    }
}