module.exports = app => {
    const renhouseRoutes = require("./renhouse.routes");
    app.use("/renhouse", renhouseRoutes)

    const authRoutes = require("./auth.routes");
    app.use("/auth", authRoutes)

    const uploadRoutes = require("./upload.routes");
    app.use("/upload", uploadRoutes)

    const bookingRoutes = require("./booking.routes");
    app.use("/booking", bookingRoutes)
}
