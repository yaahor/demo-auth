# Demo auth
This implementation of the demo authentication system focuses on core functionality due to limited time. Some features were not included but can be implemented if required.

## Frontend
- **Application Styling** – The app is currently unstyled. Styling can be improved if needed.
- **Form Validation** – Input validation was not implemented. This can be added to improve user experience and prevent invalid data submission.
- **Tests** – No unit or end-to-end tests were written. Testing can be added if necessary.
- **Request Status Handling** – Loading and error states are not managed. This can be implemented for better user feedback.
- **Auth Token Storage** – The authentication token is stored in `localStorage` for demonstration purposes. In a real application, a more secure approach (e.g., HttpOnly cookies) should be used.

## Backend
- **Refresh Token** – Only access token-based authentication is implemented. A refresh token mechanism can be added for better security and session management.
- **Request Validation** – No validation is performed on request parameters and bodies. Validation should be added to prevent invalid or malicious data.
- **Role-Based Access Control** – The user role is extracted from the access token but is not verified against the database. A database check would be a more secure approach.

These limitations are due to time constraints, but all mentioned features can be implemented if required.
