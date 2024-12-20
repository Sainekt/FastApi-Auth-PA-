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
                password,
            }),
        })
            .then((response) => {
                if (!response.status === 201) {
                    return response.json().then((err) => {
                        throw new Error(err.message || 'error in auth');
                    });
                }
                return response.json();
            })
            .catch((error) => {
                throw error;
            });
    }

    index(token) {
        return fetch(this._url, {
            method: 'GET',
            headers: { ...this._headers, Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.detail || 'Error try later again');
                    });
                }
                return response.json();
            })
            .catch((error) => {
                throw error;
            });
    }
}
export default new Api(process.env.API_URL || 'http://localhost:8000', {
    'content-type': 'application/json',
});
