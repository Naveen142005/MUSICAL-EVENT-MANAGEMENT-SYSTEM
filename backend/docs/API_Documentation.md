# FastAPI API Documentation

**Version:** 0.1.0

**Generated on:** 2025-11-15 17:17:46


---
API Documentation
---


## `/users/register`

### POST: Register

**Description:** Register new user - Public

**Tags:** Users, Users


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/users/login`

### POST: Login

**Description:** Login user - Public

**Tags:** Users, Users


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/users/me`

### GET: Get Current User Profile

**Description:** Get current logged-in user profile

**Tags:** Users, Users


**Responses:**

- `200` — Successful Response


---


## `/users/me/details`

### GET: Get My Details

**Description:** Get current user's extra details

**Tags:** Users, Users


**Responses:**

- `200` — Successful Response


---


## `/users/details/update`

### PATCH: Update My Details

**Description:** 

**Tags:** Users, Users


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/users/details/upload-image`

### POST: Upload Profile Image

**Description:** 

**Tags:** Users, Users


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/users/change-password`

### POST: Change Password

**Description:** Change password for logged-in user

**Tags:** Users, Users


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/users/forgot-password`

### POST: Forgot Password

**Description:** 

**Tags:** Users, Users


**Responses:**

- `200` — Successful Response


---


## `/users/reset-password`

### GET: Reset Password Page

**Description:** Render HTML template for password reset

**Tags:** Users, Users


**Parameters:**

- `token` (query) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/users/logout`

### POST: Logout

**Description:** 

**Tags:** Users, Users


**Responses:**

- `200` — Successful Response


---


## `/`

### GET: Get All Users

**Description:** Get all users - Admin only

**Tags:** Admin action


**Responses:**

- `200` — Successful Response


---


## `/{user_id}`

### GET: Get User

**Description:** Get user by ID - Admin only

**Tags:** Admin action


**Parameters:**

- `user_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/{user_id}/deactivate`

### PATCH: Deactivate User

**Description:** Deactivate user (set status=False) - Admin only

**Tags:** Admin action


**Parameters:**

- `user_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/{user_id}/activate`

### PATCH: Activate User

**Description:** Reactivate user (set status=True) - Admin only

**Tags:** Admin action


**Parameters:**

- `user_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/get_venues`

### GET: Get All Venues

**Description:** Organizer or Audience can Access

**Tags:** View Facility


**Parameters:**

- `name` (query) — Show venues only by the Names.

- `location` (query) — Show venues only from this location (can match partly).

- `min_capacity` (query) — Show venues with at least this much capacity.

- `max_price` (query) — Show only items with price less than or equal to this value.

- `sort_by` (query) — Sort by this column name (like price, name, or capacity).

- `order` (query) — Sort order — 'asc' for ascending, 'desc' for descending.


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/get_bands`

### GET: Get All Bands

**Description:** Organizer or Audience can Access

**Tags:** View Facility


**Parameters:**

- `name` (query) — Filter bands by name.

- `genre` (query) — Filter bands by genre.

- `member_count` (query) — Filter bands by member count.

- `max_price` (query) — Show only bands with price less than or equal to this value.

- `sort_by` (query) — Sort by this column name (like price, name, or member_count).

- `order` (query) — Sort order — 'asc' or 'desc'.


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/get_decorations`

### GET: Get All Decorations

**Description:** Organizer or Audience can Access

**Tags:** View Facility


**Parameters:**

- `name` (query) — Filter decorations by name.

- `type` (query) — Filter decorations by type.

- `max_price` (query) — Show only decorations with price less than or equal to this value.

- `sort_by` (query) — Sort by this column name (like price or name).

- `order` (query) — Sort order — 'asc' or 'desc'.


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/get_snacks`

### GET: Get All Snacks

**Description:** Organizer or Audience can Access

**Tags:** View Facility


**Parameters:**

- `price` (query) — Filter snacks by price.

- `sort_by` (query) — Sort by this column name (like price or id).

- `order` (query) — Sort order — 'asc' or 'desc'.


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/facility/`

### GET: Check Facility Available

**Description:** Organizer or Audience can Access

**Tags:** View Facility


**Parameters:**

- `id` (query) — Facility ID

- `facility_name` (query) — Name of the facility (venue/band/decoration)

- `date` (query) — Expected date of the facility (YYYY-MM-DD)

- `slot` (query) — Slot of the facility (Morning/Afternoon/Night)


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/booked-events`

### GET: Get Booked Facility Events

**Description:** Admin  Only  Access

**Tags:** View Facility


**Parameters:**

- `facility_type_id` (query) — Valid facility type ID

- `facility_id` (query) — Valid facility ID

- `start_date` (query) — Start date for filtering bookings

- `end_date` (query) — End date for filtering bookings


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/venues`

### POST: Create Venue

**Description:** Admin only

**Tags:** Venues


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/venues/{venue_id}`

### GET: Get Venue

**Description:** Admin only

**Tags:** Venues


**Parameters:**

- `venue_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### PUT: Update Venue

**Description:** Admin only

**Tags:** Venues


**Parameters:**

- `venue_id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Venue

**Description:** Admin only

**Tags:** Venues


**Parameters:**

- `venue_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/venues/{venue_id}/image`

### PUT: Update Venue Image

**Description:** Update venue image

**Tags:** Venues


**Parameters:**

- `venue_id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/bands`

### POST: Create Band

**Description:** Admin only

**Tags:** Bands


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/bands/{band_id}`

### GET: Get Band

**Description:** Admin only

**Tags:** Bands


**Parameters:**

- `band_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### PUT: Update Band

**Description:** Admin only

**Tags:** Bands


**Parameters:**

- `band_id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Band

**Description:** Admin only

**Tags:** Bands


**Parameters:**

- `band_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/bands/{band_id}/image`

### PUT: Update Band Image

**Description:** Update band image

**Tags:** Bands


**Parameters:**

- `band_id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/decorations`

### POST: Create Decoration

**Description:** Admin only

**Tags:** Decorations


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/decorations/{decoration_id}`

### GET: Get Decoration

**Description:** Admin only

**Tags:** Decorations


**Parameters:**

- `decoration_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### PUT: Update Decoration

**Description:** Admin only

**Tags:** Decorations


**Parameters:**

- `decoration_id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Decoration

**Description:** Admin only

**Tags:** Decorations


**Parameters:**

- `decoration_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/decorations/{decoration_id}/image`

### PUT: Update Decoration Image

**Description:** Admin only

**Tags:** Decorations


**Parameters:**

- `decoration_id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/snacks`

### POST: Create Snack

**Description:** Admin only

**Tags:** Scnaks


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/snacks/{snack_id}`

### GET: Get Snack

**Description:** Admin only

**Tags:** Scnaks


**Parameters:**

- `snack_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### PUT: Update Snack

**Description:** Admin only

**Tags:** Scnaks


**Parameters:**

- `snack_id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Snack

**Description:** Admin only

**Tags:** Scnaks


**Parameters:**

- `snack_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/facilities/snacks/{snack_id}/image`

### PUT: Update Snack Image

**Description:** Update snack image

**Tags:** Scnaks


**Parameters:**

- `snack_id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/events/create_new_event`

### POST: Create New Event

**Description:** Organizer Only

**Tags:** Events


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/events/update_banner`

### PATCH: Update Banner

**Description:** Organizer Only

**Tags:** Events


**Parameters:**

- `eventId` (query) — Event Id


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/events/show_banner`

### GET: Get Banner

**Description:** Organizer Only

**Tags:** Events


**Parameters:**

- `event_id` (query) — Event_id


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/events/events/{event_id}`

### GET: Get Event By Id

**Description:** Organizer or Admin Only

**Tags:** Events


**Parameters:**

- `event_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/events/event_cancel/{event_id}`

### POST: Cancel Event

**Description:** Organizer Only

**Tags:** Events


**Parameters:**

- `event_id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/my_bookings/upcoming`

### GET: Get My Upcoming Bookings

**Description:** Organizer Only

**Tags:** Organizer_Bookings


**Responses:**

- `200` — Successful Response


---


## `/my_bookings/past`

### GET: Get My Past Bookings

**Description:** Organizer Only

**Tags:** Organizer_Bookings


**Responses:**

- `200` — Successful Response


---


## `/my_bookings/pending`

### GET: Get My Pending Bookings

**Description:** Organizer Only

**Tags:** Organizer_Bookings


**Responses:**

- `200` — Successful Response


---


## `/my_bookings/ongoing`

### GET: Get My Bookings

**Description:** Organizer Only

**Tags:** Organizer_Bookings


**Responses:**

- `200` — Successful Response


---


## `/pay_pending_amount/{event_id}`

### POST: Pay Pending Amount

**Description:** Organizer Only

**Tags:** Organizer_Bookings


**Parameters:**

- `event_id` (path) — 

- `payment_mode` (query) — Payment mode


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/view_ticket_details/{event_id}`

### GET: Get Ticket Details For Event

**Description:** Organizer Only

**Tags:** Tickets & Invoice


**Parameters:**

- `event_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/download/{event_id}`

### GET: Download Invoice

**Description:** Organizer Only

**Tags:** Tickets & Invoice


**Parameters:**

- `event_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/events/facilities`

### GET: Check Facilities Available

**Description:** Organizer Only

**Tags:** Event Rescedule


**Parameters:**

- `slot` (query) — Slot of the facility (Morning/Afternoon/Night)

- `venue_id` (query) — venue ID

- `band_id` (query) — Band ID

- `decoration_id` (query) — Decoration ID

- `no_days` (query) — upto, how many days


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/events/get_reschedule_dates`

### GET: Get Possible Reschedule Dates

**Description:** Organizer Only

**Tags:** Event Rescedule


**Parameters:**

- `eventId` (query) — Event Id

- `start_date` (query) — Start date in YYYY-MM-DD 

- `end_date` (query) — End date in YYYY-MM-DD 

- `slot` (query) — Slot of the facility (Morning/Afternoon/Night)


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/events/reschedule_event`

### PATCH: Reschedule Event

**Description:** Organizer Only

**Tags:** Event Rescedule


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/audience/search`

### GET: Search Events

**Description:** Audience Only

**Tags:** Event Details


**Parameters:**

- `event_name` (query) — 

- `facility_name` (query) — 

- `start_date` (query) — 

- `end_date` (query) — 

- `min_price` (query) — 

- `max_price` (query) — 

- `slot` (query) — Slot of the facility (Morning/Afternoon/Night)


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/admin/booked-events`

### GET: Get Booked Events

**Description:** Admin Only

**Tags:** Event Details


**Parameters:**

- `start_date` (query) — Filter from this date

- `end_date` (query) — Filter until this date

- `search` (query) — Global search across event fields

- `status` (query) — Filter by status: upcoming, past, ongoing, rescheduled, cancelled

- `slot` (query) — Slot of the facility (Morning/Afternoon/Night)

- `date_type` (query) — Filter by: booked_date or event_date


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/bookings/all-bookings`

### GET: Get All Bookings

**Description:** Fetch all bookings with:
- Date filter (booked_date or event_date)
- Status filter (Booked/Cancelled)
- Sorting (total_amount/total_tickets)
- Search by event name

- Admin Only

**Tags:** Bookings


**Parameters:**

- `start_date` (query) — Start date (YYYY-MM-DD)

- `end_date` (query) — End date (YYYY-MM-DD)

- `search` (query) — Search by event name

- `date_type` (query) — Dropdown option: booked_date or event_date

- `status` (query) — Filter by booking status

- `sort_by` (query) — Sort dropdown: total_amount or total_tickets


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/bookings/get_events`

### GET: Get Public Events

**Description:** "Audience Only

**Tags:** Bookings


**Responses:**

- `200` — Successful Response


---


## `/bookings/available/{event_id}`

### GET: Get Available Tickets

**Description:** "Audience Only

**Tags:** Bookings


**Parameters:**

- `event_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/bookings/book_event/`

### POST: Book Event

**Description:** "Audience Only

**Tags:** Bookings


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/bookings/upcoming_bookings`

### GET: Get Upcoming Bookings

**Description:** "Audience Only

**Tags:** Bookings


**Responses:**

- `200` — Successful Response


---


## `/bookings/past_bookings`

### GET: Get Upcoming Bookings

**Description:** "Audience Only

**Tags:** Bookings


**Responses:**

- `200` — Successful Response


---


## `/bookings/booking_cancel/{Booking_id}`

### POST: Cancel Booking

**Description:** 

**Tags:** Bookings


**Parameters:**

- `booking_id` (query) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/bookings/refund_status/{refund_id}`

### GET: Check Refund

**Description:** 

**Tags:** Bookings


**Parameters:**

- `refund_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/bookings/download/{booking_id}`

### GET: Download Ticket

**Description:** "Audience Only

**Tags:** Bookings


**Parameters:**

- `booking_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/payments/all`

### GET: Get All Payments

**Description:** 

**Tags:** Payments, Payments


**Parameters:**

- `start_date` (query) — Filter from this payment date

- `end_date` (query) — Filter until this payment date

- `search` (query) — Search by event or user name

- `status` (query) — Payment status filter

- `role` (query) — User role filter


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/payments/escrows`

### GET: Get Escrows

**Description:** 

**Tags:** Payments, Payments


**Parameters:**

- `min_amount` (query) — Minimum total amount

- `max_amount` (query) — Maximum total amount

- `sort_by` (query) — Field to sort by: total_amount or created_at

- `sort_order` (query) — Sort order: asc or desc


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/feedback/send-feedback`

### POST: Send Feedback Test

**Description:** Id can be either Event id or Booking Id

Event id -> To send feedback link to organizer

Booking id -> To send feedback link to audience

**Tags:** Feedback


**Parameters:**

- `id` (query) — 

- `user_id` (query) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/feedback/form`

### GET: Feedback Form

**Description:** 

**Tags:** Feedback


**Parameters:**

- `token` (query) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/feedback/submit`

### POST: Submit Feedback

**Description:** 

**Tags:** Feedback


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/feedback/`

### GET: Get All Feedback

**Description:** 

**Tags:** Feedback


**Parameters:**

- `rating` (query) — Filter by feedback rating

- `status` (query) — Filter by feedback status ('submitted', 'read')


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/feedback/{feedback_id}/read`

### PUT: Mark Feedback Read

**Description:** 

**Tags:** Feedback


**Parameters:**

- `feedback_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/feedback/{feedback_id}`

### DELETE: Delete Feedback

**Description:** 

**Tags:** Feedback


**Parameters:**

- `feedback_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/feedback/get_feedback/{event_id}`

### GET: Get My Event Feedback

**Description:** 

**Tags:** Feedback


**Parameters:**

- `event_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/queries/`

### POST: Post Query

**Description:** 

**Tags:** User Queries


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/queries/{query_id}`

### GET: Get Query Response

**Description:** 

**Tags:** User Queries


**Parameters:**

- `query_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/admin/queries/`

### GET: Get Queries

**Description:** 

**Tags:** Admin Queries


**Parameters:**

- `status` (query) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/admin/queries/{query_id}/respond`

### POST: Respond Query

**Description:** 

**Tags:** Admin Queries


**Parameters:**

- `query_id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/admin/queries/{query_id}/close`

### POST: Close Query

**Description:** 

**Tags:** Admin Queries


**Parameters:**

- `query_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/admin/queries/{query_id}`

### GET: View Query

**Description:** 

**Tags:** Admin Queries


**Parameters:**

- `query_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/test/create_event`

### GET: Test Create Event

**Description:** 

**Tags:** Testing


**Responses:**

- `200` — Successful Response


---


## `/test/cancel_event`

### GET: Test Cancel Event

**Description:** 

**Tags:** Testing


**Responses:**

- `200` — Successful Response


---


## `/test/reschedule_event`

### GET: Test Reschedule Event

**Description:** 

**Tags:** Testing


**Responses:**

- `200` — Successful Response


---


## `/test/pending_payment`

### GET: Test Pending Payment

**Description:** 

**Tags:** Testing


**Responses:**

- `200` — Successful Response


---


## `/contents/hero`

### GET: Get Hero Content

**Description:** Public endpoint to fetch current hero section content

**Tags:** Content Management


**Responses:**

- `200` — Successful Response


---

### PUT: Update Hero Content

**Description:** 

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/hero/initialize`

### POST: Initialize Hero Section

**Description:** Admin endpoint to initialize hero section with default content

**Tags:** Content Management


**Responses:**

- `201` — Successful Response


---


## `/contents/venue-carousel`

### GET: Get Venue Carousel

**Description:** Public endpoint to fetch venue carousel slides

**Tags:** Content Management


**Responses:**

- `200` — Successful Response


---


## `/contents/venue-carousel/slide`

### POST: Add Venue Slide

**Description:** Admin endpoint to add a new venue slide

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `201` — Successful Response

- `422` — Validation Error


---


## `/contents/venue-carousel/slide/{slide_index}`

### PUT: Update Venue Slide

**Description:** Admin endpoint to update a venue slide

**Tags:** Content Management


**Parameters:**

- `slide_index` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Venue Slide

**Description:** Admin endpoint to delete a venue slide

**Tags:** Content Management


**Parameters:**

- `slide_index` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/venue-carousel/initialize`

### POST: Initialize Venue Carousel

**Description:** Admin endpoint to initialize venue carousel with default slides

**Tags:** Content Management


**Responses:**

- `201` — Successful Response


---


## `/contents/bands`

### GET: Get Bands Section

**Description:** Public endpoint to fetch bands section

**Tags:** Content Management


**Responses:**

- `200` — Successful Response


---


## `/contents/bands/header`

### PUT: Update Bands Header

**Description:** Admin endpoint to update bands section heading and subheading

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/bands/band`

### POST: Add Band

**Description:** Admin endpoint to add a new band

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `201` — Successful Response

- `422` — Validation Error


---


## `/contents/bands/band/{band_index}`

### PUT: Update Band

**Description:** Admin endpoint to update a band

**Tags:** Content Management


**Parameters:**

- `band_index` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Band

**Description:** Admin endpoint to delete a band

**Tags:** Content Management


**Parameters:**

- `band_index` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/bands/initialize`

### POST: Initialize Bands Section

**Description:** Admin endpoint to initialize bands section with default content

**Tags:** Content Management


**Responses:**

- `201` — Successful Response


---


## `/contents/faq`

### GET: Get Faq Section

**Description:** Public endpoint to fetch FAQ section

**Tags:** Content Management


**Responses:**

- `200` — Successful Response


---


## `/contents/faq/header`

### PUT: Update Faq Header

**Description:** Admin endpoint to update FAQ section header

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/faq/item`

### POST: Add Faq

**Description:** Admin endpoint to add new FAQ

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `201` — Successful Response

- `422` — Validation Error


---


## `/contents/faq/item/{faq_index}`

### PUT: Update Faq

**Description:** Admin endpoint to update FAQ

**Tags:** Content Management


**Parameters:**

- `faq_index` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Faq

**Description:** Admin endpoint to delete FAQ

**Tags:** Content Management


**Parameters:**

- `faq_index` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/faq/initialize`

### POST: Initialize Faq Section

**Description:** Admin endpoint to initialize FAQ section

**Tags:** Content Management


**Responses:**

- `201` — Successful Response


---


## `/contents/about-us`

### GET: Get About Us Section

**Description:** Public endpoint to fetch About Us section

**Tags:** Content Management


**Responses:**

- `200` — Successful Response


---


## `/contents/about-us/header`

### PUT: Update About Us Header

**Description:** Admin endpoint to update About Us header

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/about-us/gallery`

### POST: Add Gallery Image

**Description:** Admin endpoint to add gallery image

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `201` — Successful Response

- `422` — Validation Error


---


## `/contents/about-us/gallery/{image_index}`

### DELETE: Delete Gallery Image

**Description:** Admin endpoint to delete gallery image

**Tags:** Content Management


**Parameters:**

- `image_index` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/about-us/info-card`

### POST: Add Info Card

**Description:** Admin endpoint to add info card

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `201` — Successful Response

- `422` — Validation Error


---


## `/contents/about-us/info-card/{card_index}`

### PUT: Update Info Card

**Description:** Admin endpoint to update info card

**Tags:** Content Management


**Parameters:**

- `card_index` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Info Card

**Description:** Admin endpoint to delete info card

**Tags:** Content Management


**Parameters:**

- `card_index` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/about-us/initialize`

### POST: Initialize About Us Section

**Description:** Admin endpoint to initialize About Us section

**Tags:** Content Management


**Responses:**

- `201` — Successful Response


---


## `/contents/footer`

### GET: Get Footer Section

**Description:** Public endpoint to fetch footer section

**Tags:** Content Management


**Responses:**

- `200` — Successful Response


---


## `/contents/footer/header`

### PUT: Update Footer Header

**Description:** Admin endpoint to update footer header and background image

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/footer/contact`

### PUT: Update Contact Info

**Description:** Admin endpoint to update contact information

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/footer/quick-link`

### POST: Add Quick Link

**Description:** Admin endpoint to add quick link

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `201` — Successful Response

- `422` — Validation Error


---


## `/contents/footer/quick-link/{link_index}`

### PUT: Update Quick Link

**Description:** Admin endpoint to update quick link

**Tags:** Content Management


**Parameters:**

- `link_index` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Quick Link

**Description:** Admin endpoint to delete quick link

**Tags:** Content Management


**Parameters:**

- `link_index` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/footer/social-link`

### POST: Add Social Link

**Description:** Admin endpoint to add social link

**Tags:** Content Management


**Request Body Example:**


**Responses:**

- `201` — Successful Response

- `422` — Validation Error


---


## `/contents/footer/social-link/{link_index}`

### PUT: Update Social Link

**Description:** Admin endpoint to update social link

**Tags:** Content Management


**Parameters:**

- `link_index` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Social Link

**Description:** Admin endpoint to delete social link

**Tags:** Content Management


**Parameters:**

- `link_index` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/contents/footer/initialize`

### POST: Initialize Footer Section

**Description:** Admin endpoint to initialize footer section

**Tags:** Content Management


**Responses:**

- `201` — Successful Response


---


## `/TNC/`

### GET: Get All Content

**Description:** 

**Tags:** TNC


**Responses:**

- `200` — Successful Response


---

### POST: Create Content

**Description:** 

**Tags:** TNC


**Request Body Example:**


**Responses:**

- `201` — Successful Response

- `422` — Validation Error


---


## `/TNC/{id}`

### GET: Get Content By Id

**Description:** 

**Tags:** TNC


**Parameters:**

- `id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### PUT: Update Content

**Description:** 

**Tags:** TNC


**Parameters:**

- `id` (path) — 


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---

### DELETE: Delete Content

**Description:** 

**Tags:** TNC


**Parameters:**

- `id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/dashboard/overview`

### GET: Get Dashboard Overview

**Description:** Get dashboard overview statistics

**Tags:** Dashboard, Dashboard


**Responses:**

- `200` — Successful Response


---


## `/dashboard/recent-activities`

### GET: Get Recent Activities

**Description:** Get recent activities

**Tags:** Dashboard, Dashboard


**Parameters:**

- `limit` (query) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/dashboard/dashboard`

### GET: Dashboard

**Description:** 

**Tags:** Dashboard, Dashboard


**Responses:**

- `200` — Successful Response


---


## `/reports/event/{event_id}`

### GET: Event Report

**Description:** 

**Tags:** Reports


**Parameters:**

- `event_id` (path) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/reports/events`

### GET: All Events Report

**Description:** 

**Tags:** Reports


**Parameters:**

- `start_date` (query) — 

- `end_date` (query) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/reports/tickets`

### GET: Ticket Report

**Description:** 

**Tags:** Reports


**Parameters:**

- `start_date` (query) — 

- `end_date` (query) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/backup/create`

### POST: Create Backup

**Description:** Create backup and upload to Google Drive - Admin Only

**Tags:** Backup


**Responses:**

- `200` — Successful Response


---


## `/backup/list`

### GET: List Backups

**Description:** List all backups from Google Drive - Admin Only

**Tags:** Backup


**Responses:**

- `200` — Successful Response


---


## `/backup/restore`

### POST: Restore Backup

**Description:** Download from Google Drive and restore database - Admin Only

**Tags:** Backup


**Parameters:**

- `file_id` (query) — 


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/send-otp`

### POST: Send Otp

**Description:** 

**Tags:** Auth - Password Reset


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---


## `/reset-password-confirm`

### POST: Reset Password Confirm

**Description:** 

**Tags:** Auth - Password Reset


**Request Body Example:**


**Responses:**

- `200` — Successful Response

- `422` — Validation Error


---
