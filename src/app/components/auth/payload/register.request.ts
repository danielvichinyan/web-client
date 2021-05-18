export class RegisterRequest {
    constructor(
        public username: string = '',
        public password: string = '',
        public confirmPassword: string = '',
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public bornOn: Date = new Date()
    ) {
    }
}