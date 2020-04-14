class API {
    static baseURL = "http://localhost:3000"

    static get(url) {
        return fetch(this.baseURL + url)
            .then(function(response) {
                if (response.status !== 200) {
                    throw new Error(response.statusText)
                }

                return response.json()
            })
    }

    static post(url, data) {
        return fetch(this.baseURL + url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
    }

    static delete(url) {
        return fetch(this.baseURL + url, {
            method: "DELETE"
        })
            .then(resp => resp.json())
    }
}