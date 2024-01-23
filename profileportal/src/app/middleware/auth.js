import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

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
    var token = req.headers.authorization
    if (token) {
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        })
    }
    next()
}

export const checkUserPermission = async ( req, res, next ) => {
    try {
        const decode = req.decoded
        const permission = new Set( ['PUT:/v1/appointments/comments', 'DELETE:/v1/appointments/comments'] );
        const user = decode.user.toLowerCase();
        console.log(`${req.method}:${req.originalUrl}`)
        if ( permission.has( `${req.method}:${req.originalUrl}` ) ) {
            let foundCommentById = await db.comments.findOne( { where: { id: req.params.commentId } } );
            if (!foundCommentById) {
                return res.status(404).send({ message: "Comment not found" });
            }
            if(foundCommentById.comment_name !== user) {
                return res.status(403).send({ message: "You are not allowed to update this comment" });
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error" });
    }
    next()
}
