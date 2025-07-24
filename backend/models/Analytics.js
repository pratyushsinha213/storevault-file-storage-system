import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    }, // Optional: anonymous events allowed
    event: {
        type: String,
        required: true
    },   // e.g., 'page_view', 'click', 'signup'
    page: {
        type: String,
        required: true
    },    // e.g., '/home', '/product/123'
    timestamp: {
        type: Date,
        default: Date.now
    },
    ip: {
        type: String
    },                      // For geo analytics
    geo: {
        type: Object
    },                     // { country, city, ... } (optional enrichment)
    device: {
        type: String
    },                  // e.g., 'mobile', 'desktop'
    os: {
        type: String
    },                      // e.g., 'Windows', 'iOS'
    browser: {
        type: String
    },                 // e.g., 'Chrome', 'Safari'
    meta: {
        type: Object
    },                    // Flexible: for custom event data (e.g., { productId: '123' })
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
export default Analytics;
