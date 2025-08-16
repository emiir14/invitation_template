# Wedding Invitation API Contracts

## Overview
This document defines the API contracts for the wedding invitation website backend integration.

## Mock Data to Replace
The following mock data in `/frontend/src/mock.js` will be replaced with actual API calls:

### 1. RSVP Form Data (`rsvpResponses`)
- **Current**: Stored in mock.js as static array
- **Backend**: Will be stored in MongoDB `rsvp_responses` collection
- **Integration**: Form submission will POST to `/api/rsvp` endpoint

## API Endpoints

### 1. RSVP Submission
```
POST /api/rsvp
Content-Type: application/json

Request Body:
{
  "name": "string (required)",
  "attending": "boolean (required)",
  "comment": "string (optional)"
}

Response (Success):
Status: 201 Created
{
  "id": "string",
  "name": "string",
  "attending": "boolean",
  "comment": "string",
  "timestamp": "ISO date string",
  "message": "RSVP submitted successfully"
}

Response (Error):
Status: 400 Bad Request
{
  "error": "Validation error message"
}
```

### 2. Get All RSVPs (Admin/Display)
```
GET /api/rsvp

Response (Success):
Status: 200 OK
{
  "rsvps": [
    {
      "id": "string",
      "name": "string",
      "attending": "boolean",
      "comment": "string",
      "timestamp": "ISO date string"
    }
  ],
  "total": "number",
  "attending_count": "number",
  "not_attending_count": "number"
}
```

## Database Schema

### RSVP Collection (`rsvp_responses`)
```javascript
{
  _id: ObjectId,
  name: String (required, trimmed),
  attending: Boolean (required),
  comment: String (optional, trimmed),
  timestamp: Date (default: now),
  ip_address: String (for analytics),
  user_agent: String (for analytics)
}
```

## Frontend Integration Changes

### 1. RSVP Form Component (`/frontend/src/components/RSVPForm.jsx`)
**Current Mock Behavior:**
- Form shows success toast after 1 second delay
- No actual data persistence

**Backend Integration:**
- Replace mock setTimeout with actual API call to `POST /api/rsvp`
- Handle real error responses from backend
- Show success/error messages based on API response
- Add loading state during API call

**Code Changes Needed:**
```javascript
// Replace this mock API call:
setTimeout(() => {
  toast({ title: "RSVP Submitted!", ... });
}, 1000);

// With actual API call:
const response = await axios.post(`${API}/rsvp`, formData);
if (response.status === 201) {
  toast({ title: "RSVP Submitted!", ... });
}
```

### 2. Remove Mock Data
- Remove `rsvpResponses` array from `/frontend/src/mock.js` (not currently used in UI)
- Keep `weddingData` and `galleryImages` as they are static content

## Backend Implementation Requirements

### 1. Data Validation
- Name: Required, min 2 characters, max 100 characters
- Attending: Required boolean
- Comment: Optional, max 500 characters
- Trim all string inputs
- Sanitize HTML content

### 2. Error Handling
- Duplicate RSVP prevention (by name or email if added later)
- Rate limiting to prevent spam
- Input validation with clear error messages
- Database connection error handling

### 3. Security
- CORS configured for frontend domain
- Input sanitization
- Rate limiting
- Request size limits

## Testing Strategy

### Backend Testing
1. Test RSVP creation with valid data
2. Test validation errors for invalid data
3. Test duplicate prevention
4. Test GET endpoint with various data scenarios

### Integration Testing
1. Test form submission from frontend to backend
2. Test error handling and display
3. Test success flow and form reset
4. Test loading states and user feedback

## Deployment Notes
- Ensure MongoDB connection is configured
- Environment variables for database URL
- CORS settings for production domain
- Error logging for monitoring

## Future Enhancements
- Email notifications to couple when RSVP is submitted
- Admin dashboard to view all RSVPs
- Export functionality for guest list management
- Photo upload capability for guests