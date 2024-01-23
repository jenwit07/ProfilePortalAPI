import { getCommentsService, addCommentService, updateCommentService, deleteCommentService } from "../service/CommentsService";

export const getComments = async (req, res) => {
    try {
        const result = await getCommentsService(req.params.appointmentId);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(400).send({ name: err.name, message: err.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const result = await addCommentService(req.params.appointmentId, req.body);
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(400).send({ name: err.name, message: err.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const response = await updateCommentService(req.params.commentId, req.body);
        if (response[0] == 0) {
            return res.status(404).send({ message: "Comment not found" });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const response = await deleteCommentService(req.params.commentId);
        if (response[0] == 0) {
            return res.status(404).send({ message: "Comment not found" });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
};
