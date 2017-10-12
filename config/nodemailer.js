// var nodemailer = require('nodemailer'),
//   SENDER_EMAIL = 'noReply12qwe@gmail.com',
//   SENDER_PASSWORD = 'karko1@#$';
//
//
// module.exports.mailer = {
//
//   hostName: getHostname(),
//
//
//   sender: "Dummy <" + SENDER_EMAIL + ">",
//   /*
//    * Contact account ()
//    */
//   contactAccount: nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: SENDER_EMAIL,
//       pass: SENDER_PASSWORD
//     }
//   }),
//   /*
//    * Hello Account
//   //  */
//   helloAccount: nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: SENDER_EMAIL,
//       pass: SENDER_PASSWORD
//     }
//
//
//   })
// };
//
// /**
//  get the hostname for angular project
// */
// function getHostname() {
//   // if (process.env.NODE_ENV === 'qa') {
//   //   return 'http://localhost:1337';
//   // }
//   // else if (process.env.NODE_ENV === 'production') {
//   //   return 'https://fullcast.maarko.com';
//   // } else if (process.env.NODE_ENV === 'uat') {
//   //   return 'https://ark.maarko.com';
//   // }
//   // else {
//     // give the ip address of local angular project
//     return 'http://localhost:1337';
//   // }
//
// }
