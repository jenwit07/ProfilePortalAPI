export async function getUpdateHistory(appointmentId) {
  try {
    const updateHistory = await appointmentDb.update_history.findAll({
      where: { appointment_id: appointmentId },
      order: [['update_date', 'ASC']],
    });
    return updateHistory;
  } catch (e) {
    throw e;
  }
}