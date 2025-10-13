async function sendEmail(type, name, email, institution, code_number) {
  if (type === "sendLinkEditParticipant") {
  } else if (type === "regisApproved") {
  } else if (type === "submitRegist") {
  }
  console.log(adminId, "<<<<ini dari emailDaily");
  try {
    const imagePath = path.join(__dirname, "..", "public", "kadin.png");
    const inbox = await Inbox.findAll({
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.and]: [
                { [Op.gte]: new Date(new Date().setHours(0o0, 0o0, 0o0)) },
                { [Op.lte]: new Date() },
              ],
            },
          },
          // { isEmailSent: true },
        ],
      },
    });
    const outbox = await Outbox.findAll({
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.and]: [
                { [Op.gte]: new Date(new Date().setHours(0o0, 0o0, 0o0)) },
                { [Op.lte]: new Date() },
              ],
            },
          },
          { status: "approved", isInvoice: false },
        ],
      },
    });

    const inboxSent = inbox.filter((item) => item.isEmailSent).length;
    console.log(inboxSent, "ini inbox senttttt", inbox.length, "ini inboxnya");
    console.log(inbox, "ini inboxxxxxxxxxxxx");
    console.log(outbox, "ini outboxxxxxxxxxxxx");
    // if (!inbox) throw { name: "inboxNotFound" };
    // if (!outbox) throw { name: "outboxNotFound" };
    const findAdmin = await User.findByPk(adminId);
    if (!findAdmin) throw { name: "UserAdminNotFound" };
    // const fileInbox = await File.findByPk(inbox.InboxQrFile);
    // if (!fileInbox) throw { name: "FileNotFound" };
    // if (!findAdmin) throw { name: "userNotFound" };
    // let token = generateTokenReqOutbox(findAdmin, "approved", InboxId, "inbox");
    // console.log(process.env.FRONTEND_URL, "ini fe url");
    // let tokenAdmin = generateTokenReqOutbox(
    //   findAdmin,
    //   "approved",
    //   InboxId,
    //   "inbox"
    // );
    // let linkApprove = `${process.env.FRONTEND_URL}${tokenAdmin}`;
    // let linkWebApprove = `${process.env.FRONTEND_URL}${token}`;

    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "emailDaily.html"
    );
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    htmlContent = htmlContent.replace("{{name}}", findAdmin.name);
    htmlContent = htmlContent.replace("{{inbox}}", inbox.length);
    htmlContent = htmlContent.replace("{{inboxSent}}", inboxSent);
    htmlContent = htmlContent.replace("{{outboxApproved}}", outbox.length);
    // htmlContent = htmlContent.replace(
    //   "{{subject}}",
    //   inbox.subject.charAt(0).toUpperCase() + inbox.subject.slice(1)
    // );
    // htmlContent = htmlContent.replace("{{description}}", inbox.description);
    // htmlContent = htmlContent.replace("{{category}}", inbox.Category.name);
    // console.log(
    //   JSON.parse(JSON.stringify(inbox.senderInbox)),
    //   "ini senderrrrrrrrrrrrrrrrrrrrr"
    // );
    // console.log(
    //   `${inbox.senderInbox.name} - ${inbox.senderInbox.Institution.name}`
    // );
    // htmlContent = htmlContent.replace(
    //   "{{sender}}",
    //   `${inbox.senderInbox.name} - ${inbox.senderInbox.Institution.name}`
    // );
    // console.log(inbox.inboxCreatedBy.name, "ini namee createdByyyy");
    // console.log(inbox.subject, "ini subjectttttttttttt");
    // htmlContent = htmlContent.replace(
    //   "{{status}}",
    //   inbox.status.charAt(0).toUpperCase() + inbox.status.slice(1)
    // );
    // inbox.RecipientOutboxes = inbox.RecipientOutboxes.map(
    //   (recipient) => `${recipient.Position.name} - ${recipient.Position.Institution.name}`
    // );
    // htmlContent = htmlContent.replace(
    //   "{{receiver}}",
    //   inbox.RecipientOutboxes
    // );
    // htmlContent = htmlContent.replace(
    //   "{{receiver}}",
    //   inbox.RecipientInboxes.map(
    //     (item) =>
    //       `<li style="color: #000000;">${item.Position.name} - ${item.Position.Institution.name}</li>`
    //   ).join("")
    // );
    // htmlContent = htmlContent.replaceAll("{{linkApprove}}", linkApprove);
    // htmlContent = htmlContent.replaceAll("{{linkWebApprove}}", linkWebApprove);
    console.log(process.env.MAIL_FROM_NAME, "ini mail from name");
    console.log(process.env.MAIL_FROM_ADDRESS, "ini mail from address");
    const attachments = [
      {
        filename: "kadin.png",
        path: imagePath,
        cid: "kadinLogo",
      },
    ];
    if (inbox.length !== 0 || outbox.length !== 0) {
      const attachment = await createReport();
      console.log(attachment, "ini attachment");
      const fileSizeInBytes = attachment.length;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      console.log(fileSizeInMB, "ini file size");

      if (fileSizeInMB <= 20) {
        attachments.push({
          filename: `Daily Report ${formatTanggalHari(new Date())}.pdf`,
          content: attachment,
        });
      } else {
        console.log("File terlalu besar, tidak dikirim sebagai attachment.");
        // atau kamu bisa simpan file di storage dan kirim link-nya saja
      }
    }

    var mailOptions = {
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
      to: `${findAdmin.name} <${findAdmin.email}>`,
      subject: `Notifikasi Harian KADINOVA - ${formatTanggalHari(new Date())}`,
      attachments: attachments,
      html: htmlContent,
    };
    console.log("ini berhasilll");
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error, "<<<<ini error nodemailer");
        throw { name: "EmailNotSent" };
      } else {
        console.log("Email sent: " + info.response);
        throw { name: "EmailSent" };
      }
    });
  } catch (error) {
    console.log(error);
    // next(error);
    if (error.name === "UserCreatedNotFound") {
      res.status(404).json({ message: "User Created Not Found" });
    } else if (error.name === "UserAdminNotFound") {
      res.status(404).json({ message: "User Admin Not Found" });
    } else if (error.name === "inboxNotFound") {
      res.status(404).json({ message: "Outbox Not Found" });
    } else if (error.name === "EmailNotSent") {
      res.status(500).json({ message: "Email Not Sent" });
    } else if (error.name === "EmailSent") {
      res.status(200).json({ message: "Email Sent" });
    } else if (error.name === "FormDetailNotFound") {
      res.status(404).json({ message: "Form Detail Not Found" });
    } else if (error.name === "UserNotFound") {
      res.status(404).json({ message: "User Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
