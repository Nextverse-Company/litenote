const allowedOrigins = [
"http://localhost:3000",
"http://localhost:5173",
"http://localhost:5174",
"https://litenote.app",
"https://www.litenote.app",
"https://litenote.vercel.appa"
]
const corsOptions = {
  origin: function (origin, callback) {
        // use !origin during development and not during production
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
  "Origin",
  "Content-Type",
  "Accept",
  "Authorization",
  "X-Request-With",
  ],
  optionsSucessStatus : 200
}
module.exports = corsOptions
