export async function getUpdateHistory(appointmentId) {
  try {
    const updateHistory = await global.apiModels.update_history.findAll({
      where: { appointment_id: appointmentId },
      order: [['update_date', 'ASC']],
    });
    return updateHistory;
  } catch (e) {
    throw e;
  }
}

export async function addUpdateHistory(appointmentId, updateData) {
  try {
    updateData.appointment_id = appointmentId;
    const newUpdate = await global.apiModels.update_history.create(updateData);
    return newUpdate;
  } catch (e) {
    throw e;
  }
}
