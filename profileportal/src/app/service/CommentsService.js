export async function getComments(appointmentId) {
  try {
    const comments = await apiModels.comments.findAll({
      where: { appointment_id: appointmentId },
      order: [['create_date', 'ASC']],
    });
    return comments;
  } catch (e) {
    throw e;
  }
}

export async function addComment(appointmentId, commentData) {
  try {
    commentData.appointment_id = appointmentId;
    const newComment = await apiModels.comments.create(commentData);
    return newComment;
  } catch (e) {
    throw e;
  }
}

export async function updateComment(commentId, commentData) {
  try {
    const result = await apiModels.comments.update(commentData, {
      where: { id: commentId },
    });
    if (result[0] === 0) {
      throw new Error('Comment not found or no changes made');
    } else {
      return { message: 'Comment updated successfully' };
    }
  } catch (e) {
    throw e;
  }
}

export async function deleteComment(commentId) {
  try {
    const result = await apiModels.comments.destroy({
      where: { id: commentId },
    });
    if (result === 0) {
      throw new Error('Comment not found');
    } else {
      return { message: 'Comment deleted successfully' };
    }
  } catch (e) {
    throw e;
  }
}
