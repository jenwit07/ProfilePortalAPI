export async function getCommentsService(appointmentId) {
  try {
    const comments = await appointmentDb.comments.findAll({
      where: { appointment_id: appointmentId },
      order: [['create_datetime', 'ASC']],
    });
    return comments;
  } catch (e) {
    throw e;
  }
}

export async function addCommentService(appointmentId, commentData) {
  try {
    const appointment = await appointmentDb.appointments.findOne({
      where: { id: appointmentId },
    } );
    if ( !appointment ) {
      throw new Error('Appointment not found');
    }

    commentData.appointment_id = appointmentId;
    const newComment = await appointmentDb.comments.create(commentData);
    return newComment;
  } catch (e) {
    throw e;
  }
}

export async function updateCommentService(commentId, commentData) {
  try {
    const result = await appointmentDb.comments.update(commentData, {
      where: { id: commentId },
    });
    if ( result[0] === 0 ) {
      return result;
    } else {
      return { message: 'Comment updated successfully' };
    }
  } catch (e) {
    throw e;
  }
}

export async function deleteCommentService(commentId) {
  try {
    const result = await appointmentDb.comments.destroy({
      where: { id: commentId },
    });
    if ( result === 0 ) {
      return result;
    } else {
      return { message: 'Comment deleted successfully' };
    }
  } catch (e) {
    throw e;
  }
}
