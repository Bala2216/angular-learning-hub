export const AdvancedUserFormJsonSchema = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            title: 'First Name'
        },
        lastName: {
            type: 'string',
            title: 'Last Name'
        },
        age: {
            type: 'number',
            title: 'Age'
        },
        gender: {
            type: 'string',
            title: 'Gender',
            enum: ['Male', 'Female', 'Other']
        },
        email: {
            type: 'string',
            title: 'E-mail'
        },
        phone: {
            type: 'string',
            title: 'Phone'
        },
        birthDate: {
            type: 'string',
            format: 'date',
            title: 'Birth Date'
        },
        address: {
            type: 'object',
            title: 'Address',
            properties: {
                address: {
                    type: 'string',
                    title: 'Street Address'
                },
                city: {
                    type: 'string',
                    title: 'City'
                },
                state: {
                    type: 'string',
                    title: 'State'
                },
                stateCode: {
                    type: 'string',
                    title: 'State Code'
                },
                postalCode: {
                    type: 'string',
                    title: 'Postal Code'
                },
                country: {
                    type: 'string',
                    title: 'Country Code'
                },
            }
        }
    },
    required: ['firstName', 'lastName', 'email', 'phone']
}

export const AdvancedUserFormUISchema = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'HorizontalLayout',
            elements: [
                { type: 'Control', scope: '#/properties/firstName' },
                { type: 'Control', scope: '#/properties/lastName' }
            ]
        },
        {
            type: 'HorizontalLayout',
            elements: [
                { type: 'Control', scope: '#/properties/age' },
                { type: 'Control', scope: '#/properties/gender' }
            ]
        },
        {
            type: 'HorizontalLayout',
            elements: [
                { type: 'Control', scope: '#/properties/email' },
                { type: 'Control', scope: '#/properties/phone' }
            ]
        },
        {
            type: 'Control',
            scope: '#/properties/birthDate'
        },
        {
            type: 'Group',
            label: 'Address',
            elements: [
                {
                    type: 'HorizontalLayout',
                    elements: [
                        { type: 'Control', scope: '#/properties/address/properties/address' },
                        { type: 'Control', scope: '#/properties/address/properties/city' }
                    ]
                },
                {
                    type: 'HorizontalLayout',
                    elements: [
                        { type: 'Control', scope: '#/properties/address/properties/state' },
                        { type: 'Control', scope: '#/properties/address/properties/stateCode' }
                    ]
                },
                {
                    type: 'HorizontalLayout',
                    elements: [
                        { type: 'Control', scope: '#/properties/address/properties/postalCode' },
                        { type: 'Control', scope: '#/properties/address/properties/country' }
                    ]
                },
            ]
        }
    ]
}