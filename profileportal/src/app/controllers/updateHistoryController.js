import { getUpdateHistoryService } from "../service/UpdateHistoryService";

export const getUpdateHistory = async (req, res) => {
    try {
        const result = await getUpdateHistoryService(req.params.appointmentId);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(400).send({ name: err.name, message: err.message });
    }
};
