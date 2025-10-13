const {
  checkKtaProv,
  checkKta,
  checkKtaPusat,
} = require("../helpers/checkKta");
const { checkTemp } = require("../helpers/checkTemp");
const { Participant, Temp, sequelize } = require("../models");

module.exports = class ProvController {
  static async cekKta(req, res, next) {
    const t = await sequelize.transaction();
    try {
      console.log("adfadskjfhda");

      let { peserta, peninjau } = req.body;
      if (peserta) {
        if (typeof peserta === "string") {
          peserta = JSON.parse(peserta);
        }
      }
      if (peninjau) {
        if (typeof peninjau === "string") {
          peninjau = JSON.parse(peninjau);
        }
      }
      let status = true;
      let result = null;
      let dataKetumCocok = null;
      if (peserta) {
        const checkKtaServer = await checkKta(peserta.kta, next);
        // console.log(checkKtaServer, "ini checkKtaServer dari provController");
        if (!checkKtaServer.status)
          // throw { name: "InvalidInput", message: "KTA bermasalah" };
          throw { name: "InvalidInput", message: checkKtaServer.message };
        const responseProv = await checkKtaProv(peserta.kta, next);
        // console.log(responseProv, "ini responseProv dari provController");
        let checkKetum = false;
        let ktaKetum = false;
        let isPengurusPusat = false;
        if (responseProv && responseProv.length > 0) {
          for (const elsatu of responseProv) {
            let normalPosition = elsatu.position.toLowerCase();
            if (
              normalPosition.includes("ketum") ||
              normalPosition.includes("ketua umum")
            ) {
              checkKetum = true;
            }
            if (elsatu.kta === peserta.kta) {
              ktaKetum = true;
            }
            if (checkKetum && ktaKetum) {
              dataKetumCocok = elsatu;
            }
          }
        } else {
          const responsePusat = await checkKtaPusat(peserta.kta, next);
          if (responsePusat) {
            checkKetum = true;
            ktaKetum = true;
            dataKetumCocok = responsePusat;
            isPengurusPusat = true;
          }
        }
        if (!checkKetum)
          throw {
            name: "InvalidInput",
            message: "Peserta harus berstatus ketua umum",
          };
        if (!ktaKetum)
          throw {
            name: "InvalidInput",
            message: "KTA peserta harus sesuai dengan ketua umum",
          };
        let nameInstitution = null;
        if (dataKetumCocok.position) {
          let upperCasePosition = dataKetumCocok.position.toUpperCase();
          if (
            upperCasePosition.includes("KETUM") ||
            upperCasePosition.includes("KETUA UMUM")
          ) {
            nameInstitution = upperCasePosition.split("KETUM")[1]
              ? upperCasePosition.split("KETUM")[1].trim()
              : upperCasePosition.split("KETUA UMUM")[1]
              ? upperCasePosition.split("KETUA UMUM")[1].trim()
              : null;
            console.log(nameInstitution, "ini name institution dari position");
          } else {
            nameInstitution = null;
          }
        }
        await checkTemp(
          dataKetumCocok.userId,
          peserta.kta,
          nameInstitution ? nameInstitution : dataKetumCocok.position,
          dataKetumCocok.name,
          dataKetumCocok.gender,
          dataKetumCocok.category,
          t,
          next
        );
        // console.log(dataKetumCocok, "ini dataKetumCocok dari provController");
        const findParticipant = await Participant.findOne({
          where: { id: dataKetumCocok.userId },
          attributes: ["delegate"],
        });
        // console.log(findParticipant, "ini findParticipant dari provController");

        let delegate = findParticipant ? findParticipant.delegate : 0;
        // if (!findParticipant) {
        //   throw {
        //     name: "InvalidInput",
        //     message: "Peserta belum terdaftar di sistem",
        //   };
        // }
        result = {
          message: `Posisi ${dataKetumCocok.position} dengan KTA ${peserta.kta} terverifikasi`,
          delegate: delegate,
          kta: peserta.kta,
          // email: checkKtaServer.email ? checkKtaServer.email : "", //when on development always set email to muhhlmy@gmail.com
          email: "muhhlmy@gmail.com",
          namaLengkap: dataKetumCocok.name
            ? dataKetumCocok.name
            : checkKtaServer.name,
          jabatan: dataKetumCocok.position ? dataKetumCocok.position : "",
          nomorTelepon: checkKtaServer.phone ? checkKtaServer.phone : "",
          category: dataKetumCocok.category ? dataKetumCocok.category : "",
        };
      }
      if (peninjau) {
        console.log("masuk peninjau");
        let resultPeninjau = [];
        let cekStatusBawahan = false;
        let cekKtaPeninjau = false;
        for (const el of peninjau) {
          // console.log(el,'ini el dari peninjau foreach');
          const { kta } = el;
          const checkKtaServer = await checkKta(kta, next);
          console.log(checkKtaServer, "ini checkKtaServer dari provController");
          if (!checkKtaServer.status) {
            resultPeninjau.push({
              nomor_urut: el.idx,
              status: checkKtaServer.message,
            });
            continue;
          }
          const responsePeninjau = await checkKtaProv(kta, next);
          const findPeninjau = [];
          //   console.log(
          //     responsePeninjau,
          //     "ini responsePeninjau dari provController"
          //   );
          if (responsePeninjau) {
            for (const elsatu of responsePeninjau) {
              if (elsatu.userId === dataKetumCocok.userId) {
                cekStatusBawahan = true;
              }
              if (elsatu.hasWkuk) {
                console.log("masuk hasWkuk");
                if (elsatu.Wkuks && elsatu.Wkuks.length > 0) {
                  for (const eldua of elsatu.Wkuks) {
                    if (eldua.kta === el.kta) {
                      cekKtaPeninjau = true;
                      await checkTemp(
                        eldua.userId,
                        el.kta,
                        null,
                        eldua.name,
                        eldua.gender,
                        eldua.category,
                        t,
                        next
                      );
                      findPeninjau.push(eldua);
                    }
                    if (eldua.Wkus && eldua.Wkus.length > 0) {
                      for (const eltiga of eldua.Wkus) {
                        if (eltiga.kta === el.kta) {
                          cekKtaPeninjau = true;
                          await checkTemp(
                            eltiga.userId,
                            el.kta,
                            null,
                            eltiga.name,
                            eltiga.gender,
                            eltiga.category,
                            t,
                            next
                          );
                          findPeninjau.push(eltiga);
                        }
                        if (eltiga.Komtaps && eltiga.Komtaps.length > 0) {
                          for (const elempat of eltiga.Komtaps) {
                            if (elempat.kta === el.kta) {
                              cekKtaPeninjau = true;
                              await checkTemp(
                                elempat.userId,
                                el.kta,
                                null,
                                elempat.name,
                                elempat.gender,
                                elempat.category,
                                t,
                                next
                              );
                              findPeninjau.push(elempat);
                            }
                            if (
                              elempat.Wakomtaps &&
                              elempat.Wakomtaps.length > 0
                            ) {
                              for (const ellima of elempat.Wakomtaps) {
                                if (ellima.kta === el.kta) {
                                  cekKtaPeninjau = true;
                                  await checkTemp(
                                    ellima.userId,
                                    el.kta,
                                    null,
                                    ellima.name,
                                    ellima.gender,
                                    ellima.category,
                                    t,
                                    next
                                  );
                                  findPeninjau.push(ellima);
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                console.log("masuk !hasWkuk");
                if (elsatu.Wkus && elsatu.Wkus.length > 0) {
                  for (const eldua of elsatu.Wkus) {
                    if (eldua.kta === el.kta) {
                      cekKtaPeninjau = true;
                      await checkTemp(
                        eldua.userId,
                        el.kta,
                        null,
                        eldua.name,
                        eldua.gender,
                        eldua.category,
                        t,
                        next
                      );
                      findPeninjau.push(eldua);
                    }
                    if (eldua.Komtaps && eldua.Komtaps.length > 0) {
                      for (const eltiga of eldua.Komtaps) {
                        if (eltiga.kta === el.kta) {
                          cekKtaPeninjau = true;
                          await checkTemp(
                            eltiga.userId,
                            el.kta,
                            null,
                            eltiga.name,
                            eltiga.gender,
                            eltiga.category,
                            t,
                            next
                          );
                          findPeninjau.push(eltiga);
                        }
                        if (eltiga.Wakomtaps && eltiga.Wakomtaps.length > 0) {
                          for (const elempat of eltiga.Wakomtaps) {
                            if (elempat.kta === el.kta) {
                              cekKtaPeninjau = true;
                              await checkTemp(
                                elempat.userId,
                                el.kta,
                                null,
                                elempat.name,
                                elempat.gender,
                                elempat.category,
                                t,
                                next
                              );
                              findPeninjau.push(elempat);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (cekStatusBawahan && cekKtaPeninjau) {
            console.log(
              "masuk cekStatusBawahan && cekKtaPeninjau",
              el,
              "lupa valuenya apa"
            );
            resultPeninjau.push({
              nomor_urut: el.idx,
              status: "terverifikasi",
              message: `Posisi ${findPeninjau[0].position} dengan KTA ${el.kta} terverifikasi`,
              kta: el.kta,
              email: checkKtaServer.email ? checkKtaServer.email : "",
              namaLengkap: findPeninjau[0].name
                ? findPeninjau[0].name
                : checkKtaServer.name,
              jabatan: findPeninjau[0].position ? findPeninjau[0].position : "",
              nomorTelepon: checkKtaServer.phone ? checkKtaServer.phone : "",
              category: findPeninjau[0].category
                ? findPeninjau[0].category
                : "",
            });
          } else {
            resultPeninjau.push({
              nomor_urut: el.idx,
              status: "tidak terverifikasi",
            });
          }
        }
        // console.log(resultPeninjau,'ini resultPeninjau setelah foreach');
        result.peninjau = resultPeninjau;
      }
      console.log("udah mau commit");
      await t.commit();
      res.status(200).json(result);
    } catch (error) {
      await t.rollback();
      console.log(error);
      next(error);
    }
  }
};
