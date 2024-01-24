export async function getUpdateHistoryService(appointmentId) {
  try {
    const updateHistory = await appointmentDb.update_history.findAll({
      where: { appointment_id: appointmentId },
      order: [['update_datetime', 'ASC']],
    });
    return updateHistory;
  } catch (e) {
    throw e;
  }
}