require("custom-env").env(`${process.env.NODE_ENV}`);
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = ( req, res, next ) => {
    var token = req.headers.authorization.replace( 'Bearer ', '')
    console.log( token )
    console.log( JWT_SECRET )
    if (token) {
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if ( err ) {
                console.log( err )
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
}

export const checkUserPermission = async ( req, res, next ) => {
    try {
        const decode = req.decoded
        const permission = new Set(['PUT:/profileportal/v1/appointments/comments', 'DELETE:/profileportal/v1/appointments/comments']);
        const user = decode.username.toLowerCase();
        if (!user) {
            return res.status(403).send({ message: "You are not allowed to update this comment" });
        }
        
        let modifiedUrl = req.originalUrl.split( '?' )[0];
        const commentIdIndex = modifiedUrl.lastIndexOf('/');
        modifiedUrl = modifiedUrl.substring(0, commentIdIndex);
        
        console.log(`${req.method}:${modifiedUrl}`);
        if (permission.has(`${req.method}:${modifiedUrl}`)) {
            let foundCommentById = await appointmentDb.comments.findOne({ where: { id: req.params.commentId } });
            if (!foundCommentById) {
                return res.status(404).send({ message: "Comment not found" });
            }
            if (foundCommentById.comment_name !== user) {
                return res.status(403).send({ message: "You are not allowed to update this comment" });
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error" });
    }
    next()
}
