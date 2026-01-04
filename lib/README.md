# Database Services

This directory contains Supabase integration files.

## Files

- `supabase.ts` - Supabase client configuration
- `database.ts` - Database service functions for all entities

## Usage in Components

### Example: Creating a Member

```typescript
import { membersService } from '../lib/database';

// Create a new member
const newMember = await membersService.create({
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '0244123456',
  plan: SubscriptionPlan.PREMIUM,
  startDate: '2024-01-01',
  expiryDate: '2024-12-31',
  status: 'active'
});
```

### Example: Updating a Payment

```typescript
import { paymentsService } from '../lib/database';

// Update payment status
const updatedPayment = await paymentsService.update(paymentId, {
  status: PaymentStatus.CONFIRMED,
  confirmedBy: userEmail
});
```

### Example: Fetching Data

```typescript
import { membersService, paymentsService } from '../lib/database';

// Get all members
const members = await membersService.getAll();

// Get all payments
const payments = await paymentsService.getAll();
```

## Available Services

- `membersService` - CRUD operations for members
- `staffService` - Read operations for staff
- `paymentsService` - CRUD operations for payments
- `announcementsService` - CRUD operations for announcements
- `galleryService` - CRUD operations for gallery images
- `activityLogsService` - Create and read activity logs
- `attendanceService` - CRUD operations for attendance records

## Error Handling

All service functions throw errors that should be caught:

```typescript
try {
  const member = await membersService.create(newMember);
} catch (error) {
  console.error('Failed to create member:', error);
  // Show user-friendly error message
}
```

