
import { Op } from "sequelize";

const stausMap = {
  "TO_DO": "To Do",
  "IN_PROGRESS": "In Progress",
  "DONE": "Done",
  "KEEP": "Keep"
}

export async function getAppointmentService ( query ) {
  try {
    console.log( query )
    const { cur_page, per_page, offset, limit, ...rest } = query;
    console.log( 'offset', offset, 'limit', limit )
    console.log( 'rest', rest )
    const result = await appointmentDb.appointments.findAndCountAll({
      offset: offset,
      limit: limit,
      where: {
        status: { 
          [Op.ne]: 'KEEP'
        },
        ...rest,
      },
      order: [['create_datetime', 'ASC']]
    } );
    result.rows.map( item => {
      item.status = stausMap[item.status] || item.status;
      return item;
    } )
    
    return {
      appointments: result.rows,
      total_records: result.count,
      total_pages: Math.ceil(result.count / (per_page ? parseInt(per_page) : result.count)),
      curren_page: cur_page ? parseInt(cur_page) : 1,
      per_page: per_page ? parseInt(per_page) : result.count
    };

  } catch (e) {
    throw e;
  }
}

export async function createAppointmentService(data) {
  try {
    if (!data.status) data.status = 'TO_DO';
    if (!data.update_by) data.update_by = data.create_by;
    const obj = await appointmentDb.appointments.create(data);
    return obj;
  } catch (e) {
    throw e;
  }
}

export async function getAppointmentByIdService ( id ) {
  try {
    const result = await appointmentDb.appointments.findOne({
      where: { id: id },
    });
    if (!result) {
      throw new Error('Appointment not found');
    }
    return result;
  } catch (e) {
    throw e;
  }
}

export async function updateAppointmentService(id, data) {
  try {
    //check status
    if ( !data.status ) throw new Error( 'Status is required' );
    if ( !stausMap[data.status] ) throw new Error( 'Invalid status' );
    const exist = await appointmentDb.appointments.findOne({
      where: { id: id },
    });
    const result = await appointmentDb.appointments.update(data, {
      where: { id: id },
    } );
    if (result[0] === 0) {
      throw new Error('Appointment not found or no changes made');
    } 
    delete exist.dataValues.id;
    // update to history
    console.log({
      appointment_id: id,
      ...exist.dataValues
    })
    const history = await appointmentDb.update_history.create( {
      appointment_id: id,
      ...exist.dataValues
    } );
    console.log( history)
    return { message: 'Appointment updated successfully' };
  
  } catch (e) {
    throw e;
  }
}

export async function deleteAppointmentService(id) {
  try {
    const result = await appointmentDb.appointments.update(
      { status: 'KEEP' },
      { where: { id: id } }
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
