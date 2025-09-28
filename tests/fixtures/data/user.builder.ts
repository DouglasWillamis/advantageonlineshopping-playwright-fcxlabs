import { User } from '../types/user.type';
import { faker as faker } from '@faker-js/faker';

export class UserBuilder {
    private user: User

    constructor() {
        this.user = {
            username: faker.string.alphanumeric({ length: { min: 5, max: 15 } }),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 9, prefix: '1Qa', pattern: /[A-Za-z0-9]/ }),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phoneNumber: faker.phone.number({ style: 'international' }),
            country: faker.location.country(),
            city: faker.location.city(),
            address: faker.location.streetAddress({ useFullAddress: false }),
            state: faker.location.state({ abbreviated: true }),
            postalCode: faker.location.zipCode(),
            creditCardHolderName: `${faker.person.firstName()} ${faker.person.lastName()}`,
            creditCardNumber: faker.finance.creditCardNumber('############'),
            creditCardSecurityCode: faker.finance.creditCardCVV()
        }
    }

    withUsername(username: string): UserBuilder {
        this.user.username = username
        return this
    }

    withEmail(email: string): UserBuilder {
        this.user.email = email
        return this
    }

    withPassword(password: string): UserBuilder {
        this.user.password = password
        return this
    }

    withFirstName(firstName: string): UserBuilder {
        this.user.firstName = firstName
        return this
    }

    withLastName(lastName: string): UserBuilder {
        this.user.lastName = lastName
        return this
    }

    withPhoneNumber(phoneNumber: string): UserBuilder {
        this.user.phoneNumber = phoneNumber
        return this
    }

    withCountry(country: string): UserBuilder {
        this.user.country = country
        return this
    }

    withCity(city: string): UserBuilder {
        this.user.city = city
        return this
    }

    withAddress(address: string): UserBuilder {
        this.user.address = address
        return this
    }

    withState(state: string): UserBuilder {
        this.user.state = state
        return this
    }

    withPostalCode(postalCode: string): UserBuilder {
        this.user.postalCode = postalCode
        return this
    }

    withCreditCardHolderName(creditCardHolderName: string): UserBuilder {
        this.user.creditCardHolderName = creditCardHolderName
        return this
    }

    withCreditCardNumber(creditCardNumber: string): UserBuilder {
        this.user.creditCardNumber = creditCardNumber
        return this
    }

    withCreditCardSecurityCode(creditCardSecurityCode: string): UserBuilder {
        this.user.creditCardSecurityCode = creditCardSecurityCode
        return this
    }

    build(): User {
        return this.user
    }
}