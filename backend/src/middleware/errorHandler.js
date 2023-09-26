export const errorHandler = (err, req, res, next) => {
    res.status(err.status).json({message: err.message})
}

export const notFound = (req, res, next) => {
    const err = new Error("Route not found!")
    err.status = 404
    next(err)
}