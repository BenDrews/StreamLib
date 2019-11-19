import { getAuthToken } from './TwitchApi'
test('api token', () => {
    expect.assertions(1);
    console.log = s => process.stdout.write(s + "\n");
    const token = getAuthToken(function (response) {
        expect(response).toBe('abc');
    });
    //expect(token).toBe(undefined);
});