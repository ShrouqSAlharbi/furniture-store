// export default function ({ app, redirect, route }) {
//     // Function to check session
//     const checkSession = () => {
//         // Check if running in client-side context and localStorage is available
//         if (process.client && window.localStorage) {
//             // Check if session key exists in localStorage
//             if (!localStorage.getItem('session')) {
//                 // Redirect to signin for all routes
//                 redirect('/signin');
//             }
//         }
//     }

//     // Check if running in client-side context
//     if (process.client) {
//         // Check if the route is resolved on the client-side
//         app.router.afterEach(() => {
//             checkSession();
//         });
//     } else {
//         // For SSR, check session immediately
//         checkSession();
//     }
// }
