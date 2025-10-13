const { File } = require("../models");
const { sequelize } = require("../models");

const processFile = async (file,t) => {
  if (!file) {
    return null;
  }
  // const t = await sequelize.transaction();
  const data = {
    name: file.name,
    type: file.mimetype,
    data: file.data,
  };
  const createFile = await File.create(data, {
    transaction: t,
    returning: true,
  });
  const fileId = createFile.id;
  // await t.commit();
  return fileId;
};
async function updateAndDestroyFiles(file, oldFileId, transaction) {
  if (!file) {
    return oldFileId;
  }

  if (oldFileId) {
    if (file === oldFileId) {
      return oldFileId;
    } else {
      console.log(file,'ini fileeeeeeeee yang di updateAndDestroyFiles');
      await File.update(
        {
          fileName: file.name,
          fileType: file.mimetype,
          data: file.data,
        },
        {
          where: { id: oldFileId },
          transaction,
        }
      );
    }
    return oldFileId;
  } else if (!oldFileId) {
    return await processFile(file);
  }
}

module.exports = {
  processFile,
  updateAndDestroyFiles,
};
