import { CorsOptions } from 'cors';


// export const corsConfig: CorsOptions = {
//     origin: (origin, callback) => {

//         const wihiteList = [process.env.FRONTEND_URL]

//         if (process.argv[2] === "--api") {
//             wihiteList.push(undefined)
//         }

//         if (wihiteList.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Error de CORS'));
//         }
//     },
// };

export const corsConfig: CorsOptions = {
    origin: '*', // Acepta todas las solicitudes de origen
    credentials: true,
};