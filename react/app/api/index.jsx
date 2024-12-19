class Api {
    constructor(url, headers) {
        this._url = url;
        this._headers = headers;
    }

    signin({ username, password }) {
        return fetch(`${this._url}/login`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                username,
                password
            }),
        }).then(response => response.json());
    }
}

export default new Api(process.env.API_URL || 'http://localhost:8000', {
    'content-type': 'application/json',
});
