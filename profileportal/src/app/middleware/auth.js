// import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
// import commonKey from './commonKey'
// import db from '../config/db.config'

// const membersModel = db.membersModel

// module.exports = function (passport) {

//     return true

    // const jwtOptions = {
    //     jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    //     secretOrKey: commonKey.secreatKey
    // };

    // console.log(jwtOptions)

    // var jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {

    //     var _username = payload.sub

    //     membersModel.count({ where: { username: _username } }).then((c) => {
    //         if (c > 0) {
    //             return done(null, true);
    //         } else {
    //             done(null, false)
    //         }
    //     })
    // })

    // passport.use("jwt", jwtAuth);

// }

export const authenticate = ( req, res, next ) => {
    console.log( "authenticate" )
    console.log( req.headers.authorization )
    // passport.authenticate("jwt", { session: false });
    next()
}
