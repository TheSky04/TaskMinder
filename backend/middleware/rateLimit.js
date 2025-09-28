const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100, // IP başına maksimum 100 istek
    message: "Çok fazla istek gönderdiniz, lütfen 15 dakika sonra tekrar deneyin."
});

module.exports = limiter;
