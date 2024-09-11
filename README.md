# Quick Desk Client SDK

A TypeScript client for Quick Desk's APIs.

## Installation

To install the SDK, run the following command:

```bash
npm install @nexle-soft/quick-desk-client
```

or

```bash
yarn add @nexle-soft/quick-desk-client
```

## Setup Configuration

The SDK requires a host and secret key to communicate with Quick Desk's API. You must first configure the SDK before making any API calls.

```typescript
import { Configuration } from '@nexle-soft/quick-desk-client';

// Setup global configuration
const config = Configuration.getInstance({
  host: 'https://api.quickdesk.com',
  secretKey: 'your-secret-key',
});
```

- `host`: The base URL of the Quick Desk API.
- `secretKey`: Your authentication key for the Quick Desk API.

## Using the Ticket APIs

Once the configuration is set up, you can use the provided methods to interact with the Ticket APIs.

### Fetch all tickets

To fetch a list of tickets

```typescript
import { TicketApi } from '@nexle-soft/quick-desk-client';

async function fetchTickets() {
  try {
    const ticketApi = new TicketApi();
    const tickets = await ticketApi.getAllTickets();
    console.log(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
  }
}

fetchTickets();
```

### Create a New Ticket

To create a new ticket:

```typescript
import { TicketApi } from '@nexle-soft/quick-desk-client';

async function createTicket() {
    try {
        const ticketApi = new TicketApi();
        const newTicket = await ticketApi.createTicket({
            title: 'New Ticket',
            description: 'This is a new support ticket.',
        });
        console.log('Ticket created:', newTicket);
    } catch (error) {
        console.error('Error creating ticket:', error);
    }
}

createTicket();
```

### Update a Ticket

To update an existing ticket:

```typescript
import { TicketApi } from '@nexle-soft/quick-desk-client';

async function updateTicket(ticketId: string) {
    try {
        const ticketApi = new TicketApi();
        const updatedTicket = await ticketApi.updateTicket(ticketId, {
            title: 'Updated Ticket',
            description: 'This is an updated support ticket.',
        });
        console.log('Ticket updated:', updatedTicket);
    } catch (error) {
        console.error('Error updating ticket:', error);
    }
}

updateTicket('12345');
```


### Delete a Ticket

To delete a ticket:

```typescript
import { TicketApi } from '@nexle-soft/quick-desk-client';

async function deleteTicket(ticketId: string) {
    try {
        const ticketApi = new TicketApi();
        await ticketApi.deleteTicket(ticketId);
        console.log('Ticket deleted');
    } catch (error) {
        console.error('Error deleting ticket:', error);
    }
}

deleteTicket('12345');
```
