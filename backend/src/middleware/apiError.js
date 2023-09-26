class APIError extends Error {
    constructor(status, message){
        super(message)
        this.status = status
        this.message = message
    }

    static notFound(message){
        return new this(404, message || "Not found")
    }
    static invalidRequest(message) {
        return new this(400, message || "You have entered invalid credential!")
    }
    static unAuthorized(message){
        return new this(401, message || "You are not allowed to access this route!")
    }
    static unAuthenticated(message) {
        return new this(403, message || "You are not a valid user!")
    }
    static customeError(message) {
        return new this(500, message || "Unknown error")
    }
}

export default APIError