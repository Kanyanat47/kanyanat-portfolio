# Lesson Learned: MQTT Retain as a Serverless Database

**Date**: 2026-03-01

## Context
During the "Oracle Racing Game" challenge, the requirement was to implement a "Hall of Fame" (leaderboard) without using a traditional database or a custom backend.

## The Learning
MQTT brokers support a `retain` flag on messages. When a message is published with `retain: true`, the broker stores the **last** message on that topic. Any client that subsequently subscribes to that topic receives the retained message immediately.

## Application
1. **Leaderboards**: Store a JSON array of top scores on a topic like `game/highscore`. When a new win occurs, the client fetches the current list, updates it locally, and re-publishes the whole list with `retain: true`.
2. **State Management**: For "always-on" dashboards, the last known sensor state or configuration can be stored in a retained topic, ensuring new clients see the "Current" state without waiting for the next heartbeat/event.

## Implementation Pattern
```javascript
// Saving the Leaderboard
client.publish('oracle/hof', JSON.stringify(topScores), { qos: 1, retain: true });

// Loading on Start
client.subscribe('oracle/hof');
// The 'message' callback will fire immediately with the saved data.
```

## Why it matters
This pattern reduces infrastructure costs and complexity for "Simple" IoT and real-time gaming applications by leveraging existing protocol features for persistent state.
