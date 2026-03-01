const mqtt = require('mqtt');
const client = mqtt.connect('wss://dustboy-wss-bridge.laris.workers.dev/mqtt');

client.on('connect', () => {
    console.log('Connected!');
    client.subscribe('DUSTBOY/+/+/+/status', (err) => {
        if (!err) {
            console.log('Subscribed to DUSTBOY/+/+/+/status');
        } else {
            console.error('Subscription error:', err);
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Received message on ${topic}:`, message.toString());
    process.exit(0);
});

client.on('error', (err) => {
    console.error('Connection error:', err);
    process.exit(1);
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('offline', () => {
    console.log('Client offline');
});

setTimeout(() => {
    console.log('Timeout waiting for message');
    process.exit(1);
}, 10000);
