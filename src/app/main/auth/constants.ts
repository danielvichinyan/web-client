/**
 * This class contains different constants used in validations.
 */
 export const NAME_PATTERN = '[A-Z][a-z][^1-9]{1,10}'; // firstName and lastName validations
 export const PASSWORD_PATTERN = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&-]{8,}$'; // password validations
 export const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'; // email validations