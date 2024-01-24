// appointments.test.js
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
let token;
let appointmentIdCreated;

beforeAll(async () => {
    const res = await request.post('/profileportal/v1/auth/login')
        .send({
            username: process.env.USER_TESTSCRIPT,
            password: process.env.PASSWORD_TESTSCRIPT
        });

    expect(res.statusCode).toBe(200);
    token = res.body.token;
});

describe('Appointments API Tests', () => {
    test('GET /v1/appointments should return a list of appointments', async () => {
        const res = await request.get('/profileportal/v1/appointments')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.appointments).toBeInstanceOf(Array);
    });

    test('POST /v1/appointments should create a new appointment', async () => {
        const newAppointment = {
            topic: 'New Appointment Topic',
            description: 'New Appointment Description',
            status: 'TO_DO',
            created_by: 'User123'
        };

        const res = await request.post('/profileportal/v1/appointments')
            .set('Authorization', `Bearer ${token}`)
            .send(newAppointment);
        appointmentIdCreated = res.body.id;
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    test('GET /v1/appointments/:appointmentId should return an appointment', async () => {
        const res = await request.get(`/profileportal/v1/appointments/${appointmentIdCreated}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty('id');
    });

    test('PUT /v1/appointments/:appointmentId should update an existing appointment', async () => {
        const updatedAppointment = {
            topic: 'Updated Appointment Topic',
            description: 'Updated Appointment Description',
            status: 'IN_PROGRESS',
            created_by: 'User123'
        };

        const res = await request.put(`/profileportal/v1/appointments/${appointmentIdCreated}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedAppointment);

        expect(res.statusCode).toBe(204);
    });

    test('DELETE /v1/appointments/:appointmentId should delete an appointment', async () => {
        const res = await request.delete(`/profileportal/v1/appointments/${appointmentIdCreated}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(204);
    });
});
