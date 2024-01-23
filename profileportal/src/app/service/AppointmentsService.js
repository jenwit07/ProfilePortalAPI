
import { Op } from "sequelize";

const stausMap = {
  "TO_DO": "To Do",
  "IN_PROGRESS": "In Progress",
  "DONE": "Done"
}

export async function getAppointmentService ( query ) {
  try {
    const { cur_page, per_page,...rest } = query;
    const obj = await apiModels.appointments.findAndCountAll({
      offset: query.offset,
      limit: query.limit,
      where: {
        status: { 
          [Op.ne]: 'KEEP'
        },
        ...rest,
      },
      order: [['create_date', 'ASC']]
    } );
    obj.rows.map( item => {
      item.status = stausMap[item.status];
      return item;
    })
    return obj.rows;
  } catch (e) {
    throw e;
  }
}

export async function createAppointmentService(data) {
  try {
    if (!data.status) data.status = 'TO_DO';
    if (!data.update_by) data.update_by = data.create_by;
    const obj = await apiModels.appointments.create(data);
    return obj;
  } catch (e) {
    throw e;
  }
}

export async function updateAppointmentService(id, data) {
  try {
    const exist = await apiModels.appointments.findOne({
      where: { id: id },
    });
    const result = await apiModels.appointments.update(data, {
      where: { id: id },
    } );
    if (result[0] === 0) {
      throw new Error('Appointment not found or no changes made');
    } 

    // update to history
    const history = await apiModels.appointments_history.create( exist.dataValues );
    console.log( history)
    return { message: 'Appointment updated successfully' };
  
  } catch (e) {
    throw e;
  }
}

export async function deleteAppointmentService(id) {
  try {
    const result = await apiModels.appointments.update(
      { status: 'KEEP' },
      { where: { id: appointmentId } }
    );
    if (result === 0) {
      throw new Error('Appointment not found');
    } else {
      return { message: 'Appointment deleted successfully' };
    }
  } catch (e) {
    throw e;
  }
}
