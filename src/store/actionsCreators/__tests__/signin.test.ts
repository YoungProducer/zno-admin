
// External imports
import MockAdapter from 'axios-mock-adapter';

// Application's imports
import api from 'api/index';

const mock = new MockAdapter(api.axiosInstance);

mock.onPost('/auth/signin').reply(200, {
    email: 'sasha@gmail.com',
});

describe('Singin', () => {
    test('Signin request', async () => {
        const response = await api.signIn({
            email: 'sasha@gmail.com',
            password: 'foo',
        });

        const expected = {
            email: 'sasha@gmail.com',
        };

        expect(response.data).toEqual(expected);
    });
});
