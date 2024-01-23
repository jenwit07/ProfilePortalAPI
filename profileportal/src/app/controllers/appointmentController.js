import { getAppointmentService, createAppointmentService, updateAppointmentService, deleteAppointmentService } from "../service/AppointmentsService";

export const getAppointments = async (req, res) => {
    try {
        const result = await getAppointmentService(req.query);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(400).send({ name: err.name, message: err.message });
    }
};

export const createAppointment = async (req, res) => {
    try {
        const result = await createAppointmentService(req.body);
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(400).send({ name: err.name, message: err.message });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const response = await updateAppointmentService(req.params.appointmentId, req.body);
        if (response[0] == 0) {
            return res.status(404).send({ message: "Appointment not found" });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const response = await deleteAppointmentService(req.params.appointmentId);
        if (response[0] == 0) {
            return res.status(404).send({ message: "Appointment not found" });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
};
