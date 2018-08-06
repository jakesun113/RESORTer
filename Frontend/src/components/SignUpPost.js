export function PostData(type, userData) {
    let BaseURL = 'http://127.0.0.1:3333/api/login/';

    return new Promise((resolve, reject) => {
        fetch(BaseURL + type, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        //return a promise, not json
            .then(result => result.text())
            .then(data => resolve(data))
            .catch((error) => {
                reject(error);
            });

    });
}