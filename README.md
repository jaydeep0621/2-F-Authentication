# ShiftBits
To create a user-management module that will perform authentication, authorization, communication, payments, and other functions for ShiftBits core, and through that, the ShiftBits Mobile App (being developed in React Native).  Some of the aspects to focus on are extensibility, security, and scalability (including performance)

High-level Design & Arch of SuD:
Assuming that the rest of the application is built on full-stack JS, I’ll choose ExpressJS + NodeJS + additional libraries/dependencies for developing this module.

Authentication/Authorization
Authentication and authorization are the first aspects of the SuD. Let’s call this the ShiftBits UM (User Management) module. For this, we have two options. We may handle auth/auth on our own, and develop that using a library like PassportJS, or we may use cloud services like AWS Cognito or Firebase Authentication to act as an ID store to perform auth/auth for the user-management module, which extends to the rest of the app.

We may also consider the idea of using SSO via OAuth2 so users may sign up/in via Google/Outlook/etc.

The idea is to be able to allow end-users (customers) to interact with ShiftBits Core after authenticating to the ShiftBits UM module, while at the same time, enumerating all the data for ShiftBits staff to moderate, visualize, report, and modify aspects of a user via the ShiftBits UM module. So we expect it to do:
Allow login and registration of users
During registration, verify user KYC information using the Onfido KYC provider APIs. (Using a KYC verification adapter will allow us to plug-in other KYC verification providers down the line)
During registration, verify email via link or email code
During registration, verify phone number via OTP (One Time Password)
Allow MFA (Multi Factor Authentication) based login
Allow users to reset their password
Allow users to modify all or parts of their profile, preferences, settings, etc
Use a subset of ABAC (Attribute-Based Access Control), i.e. RBAC (Role-Based Access Control) to segregate users by role.
Roles help identify what a logged-in-user can and cannot do
We may have a role of superadmin - for the upper-management or administrators at ShiftBits
We may have a role of supportadmin - for the support staff at ShiftBits
We may have a role of customer - for end users/customers
Allow users to enable/disable MFA
Allow users to check ongoing and past sessions, with IP, location, and device info
Allow ShiftBits staff to monitor, and manually edit user data. Store all these updates to an audit log/table. Or, design a method to avoid updation/deletion of datastore rows altogether, and to only use creation to generate new rows - and use the latest data (by created_at/updated_at).

Communication:
The next aspect of the SuD is communication. Here, we will consider all kinds of communication that need to occur between ShiftBits and the end user (irrelevant of role the end user may have). This includes one-directional communication between ShiftBits and the customer, or the other way around, as well as bi-directional communication between ShiftBits and the customer.

Some of the one-directional communication methods from ShiftBits to the user that are being considered initially are SMS and Email.

Communication need not only be related to ShiftBits UM. Ideally, all ShiftBits communication will occur using the latest user communication data saved within the ShiftBits UM module.

The communication submodule will interact with multiple adapters for different modes of communication.

Each adapter will interact with one or more services via APIs. For SMS, we may use Twilio service provider for now, and later extend to other ones as necessary.

For email, we may choose to use a service or MTA, but alternatively, we may use SMTP using a library like Nodemailer.

There may also be communication between a ShiftBits customer and ShiftBits. For example, in the case of support. 

We may also have internal data-duplication for separating business functions. For example, to maintain all users in a CRM as well.

For the two cases above, we will integrate ZOHO into the communication methods.

Payments
The next aspect of the ShiftBits UM SuD is payments. This includes facilitating payment processing, confirming payment status, and more.

It would make sense to develop the Payments submodule in a way that it functions as an adapter that is able to interact with multiple payment gateways/providers.

Right now, the only payment gateway/service that we will interact with is MobiKwik.

The Payments submodule should be able to, at a high level, achieve these:
Initiate payment from end-user to buy cryptocurrency
Settle payment to end-user to sell cryptocurrency
Interact with ShiftBits core to actually make buy and sell requests to exchanges/other crypto providers.
Additionally:
Get and store all payment transaction statuses
Allow traceability of any specific transaction, issues, etc
Etc

Interactions with ShiftBits Core
We may expose all ShiftBits UM module functionality as API endpoints that need to have authenticated and authorized callers.

Essentially, the endpoints will have auth middleware. It is possible to authorize actions before they even reach the route.

Security
Keeping security in mind while developing this module, we should ensure that:
OWASP top 10 vulnerabilities are prevented
Strong CSP (Content Security Policy) is set across the entire application
Unnecessary headers that identify services are removed
Force the use of TLS across the application
Reduce attack window (both time and area)
Maintain logs of all interactions with any publicly exposed parts of the application
Down the line, implement strong firewall rules, cloud security rules, IPS (Intrusion Prevention System), etc.
And many more

Performance
Apart from security, we must also think about performance. For this, it boils down to two main things:
Writing clean code that doesn’t have intrinsic logical flaws that “waste” compute/memory
Maintaining in-depth logs, and even session recordings (with tools like Sentry/Logrocket) if possible
Working with the language/framework paradigms and not using any antipatterns
Architecting a scaling mechanism


Code Extensibility & Maintenance
Again, this is also an architecture related idea. It has mostly to do with:
Breaking functionality out of monolithic pieces, into smaller components
Using the right design patterns wherever possible while also maintaining readability of code
Sometimes readability is as or more important than performance
Documenting code, preferably with in-line annotations, else, in the worst case with in-line comments in the code.
Annotation based documentation like with JSDoc can generate a web-based navigable document from the annotations that are made.
Planning ahead, never hardcoding values or ideas (I believe strongly in avoiding late breakage)
