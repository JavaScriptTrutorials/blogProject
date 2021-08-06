export const apiLinkRoot = process.env.REACT_APP_API_LINK


export const apiLinkPathEntrance = {
    login: "/login",
    signup: "/signup",
    category: "/category"
}

export const httpJsonHeader = () => {
    const token = localStorage.getItem('jwt') || null;
    let header = {
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
    return header;
}

export const httpRequestJson = {
    get: (body=null) => {
        if(body === null){
            return {
                method: "GET",
                headers: httpJsonHeader()
            }
        } else {
            return {
                method: "GET",
                headers: httpJsonHeader(),
                body: JSON.stringify(body)
            }
        }
    },
    post: (body=null) => {
        if(body === null){
            return {
                method: "POST",
                headers: httpJsonHeader()
            }
        } else {
            return {
                method: "POST",
                headers: httpJsonHeader(),
                body: JSON.stringify(body)
            }
        }
    },
    put: (body=null) => {
        if(body === null){
            return {
                method: "PUT",
                headers: httpJsonHeader()
            }
        } else {
            return {
                method: "PUT",
                headers: httpJsonHeader(),
                body: JSON.stringify(body)
            }
        }
    },
    patch: (body=null) => {
        if(body === null){
            return {
                method: "PATCH",
                headers: httpJsonHeader()
            }
        } else {
            return {
                method: "PATCH",
                headers: httpJsonHeader(),
                body: JSON.stringify(body)
            }
        }
    },
    delete: (body=null) => {
        if(body === null){
            return {
                method: "DELETE",
                headers: httpJsonHeader()
            }
        } else {
            return {
                method: "DELETE",
                headers: httpJsonHeader(),
                body: JSON.stringify(body)
            }
        }
    }
}