import { loginService, verifyTokenService, registerUserService } from "../service/AuthService";

export const loginUser = async (req, res) => {
    try {
        const result = await loginService(req.body);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(401).send({ name: err.name, message: err.message });
    }
};

export const verifyToken = async (req, res) => {
    try {
        const result = await verifyTokenService(req.headers.authorization);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(401).send({ name: err.name, message: err.message });
    }
};

export const registerUser = async ( req, res ) => {
    try {
        await registerUserService(req.body);
        res.status(201).send();
    } catch (err) {
        console.error(err);
        res.status(401).send({ name: err.name, message: err.message });
    }
}