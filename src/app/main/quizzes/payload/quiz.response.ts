export class QuizResponse {
    constructor(
        public name: string = '',
        public description: string = '',
        public answer: string = '',
        public reward: number = 0,
        public category: string  = '',
        public hint: string = ''
    ) {
    }
}