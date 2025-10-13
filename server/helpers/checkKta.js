const { Setting } = require("../models");
const checkKta = async (kta, next) => {
  if (!kta) return null;
  try {
    const max_date_kta = await Setting.findAll().then((el) => {
      if (el && el.length > 0) return el[0].max_date_kta;
      return null;
    });

    let result = {};
    let status = false;
    const endOfYear = max_date_kta
      ? new Date(max_date_kta)
      : new Date(new Date().getFullYear(), 11, 31);
    // process.env.END_OF_YEAR || new Date(new Date().getFullYear(), 11, 31);
    console.log(endOfYear, "ini end of year");
    const checkKta = await fetch(`https://serv-kta.kadin360.id/${kta}`, {
      method: "GET",
    });
    const response = await checkKta.json();
    console.log(response, "ini responseee dari checkKta", typeof response);
    if (response && Object.keys(response).length > 0) {
      if (response.isActive && response.expired_at) {
        if (
          response.isActive === true &&
          new Date(response.expired_at) >= endOfYear
        ) {
          result = response;
          status = true;
        } else if (
          response.isActive === true &&
          new Date(response.expired_at) < endOfYear
        ) {
          status = false;
          result.message = `KTA aktif tetapi masa berlaku KTA berakhir pada ${new Date(
            response.expired_at
          ).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}, minimal harus berlaku sampai ${endOfYear.toLocaleString(
            "id-ID",
            { year: "numeric", month: "long", day: "numeric" }
          )}`;
        }
      } else if (response.isActive === false) {
        console.log("masuk kesini ga sih yg false ga aaktif");
        status = false;
        result.message = "KTA tidak aktif";
      }
    } else {
      console.log("masuk sini");
      status = false;
      result.message = "KTA tidak ditemukan";
    }
    result.status = status;
    console.log(result, "ini result dari checkKtaaaaaaaaaa");
    return result;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const checkKtaProv = async (kta, next) => {
  if (!kta) return null;
  try {
    //ini nanti ngecek kta nya jga
    const checkKta = await fetch(`https://stag-server-prov.kadin360.id/public?search=${kta}`, {
      method: "GET",
    });
    const response = await checkKta.json();
    console.log(response, "ini response dari checkKtaProv");
    
    // const response = [
    //   {
    //     id: "e622059b-a0c7-408e-816d-6c9173c670d8",
    //     userId: "68c86ab3-05b6-4c86-9c7e-5c8d8261ec48",
    //     name: "kurniawan",
    //     kta: "24293671-25010615001",
    //     position: "ketum test",
    //     hasWkuk: true,
    //     Wkuks: [
    //       {
    //         id: "6d356e66-148f-491f-95c0-6e3dfb88dd9d",
    //         userId: "13b3d1ee-8483-42f8-83ed-678fc7e7d280",
    //         name: "yuswadi kayanya",
    //         kta: "24293204-25010615001",
    //         position: "Badan1",
    //         gender: "male",
    //         role: "wkuk",
    //       },
    //       {
    //         id: "6d356e66-148f-491f-95c0-6e3dfb88dd9d",
    //         userId: "7b72f49d-b356-4369-bc72-50f2159af6ac",
    //         name: "maman",
    //         kta: "24293173-25010315002",
    //         position: "Badan2",
    //         gender: "male",
    //         role: "wkuk",
    //       },
    //     ],
    //     gender: "male",
    //     role: "ketum",
    //   },
    //   {
    //     id: "e7c0a7f8-d0d2-4f7b-9881-b326ff05b039",
    //     userId: "0cf27de6-9e41-4698-8b2c-594a8f869811",
    //     name: "agus",
    //     kta: "24292172-25010614001",
    //     position: "ketum test2",
    //     hasWkuk: false,
    //     Wkus: [
    //       {
    //         id: "6d356e66-148f-491f-95c0-6e3dfb88dd9d",
    //         userId: "b8e88d38-9d48-44d1-af41-0496c5d4c6e0",
    //         name: "budi",
    //         kta: "24291107-25010215001",
    //         position: "wkusnya",
    //         gender: "male",
    //         role: "wku",
    //       },
    //     ],
    //     gender: "male",
    //     role: "ketum",
    //   },
    // ];
    
    const addCategoryRecursively = (items) => {
      if (!Array.isArray(items)) return items;
      return items.map((it) => {
        const newIt = { ...it, category: "KPP" };
        if (Array.isArray(newIt.Wkus))
          newIt.Wkus = addCategoryRecursively(newIt.Wkus);
        if (Array.isArray(newIt.Komtaps))
          newIt.Komtaps = addCategoryRecursively(newIt.Komtaps);
        if (Array.isArray(newIt.Wakomtaps))
          newIt.Wakomtaps = addCategoryRecursively(newIt.Wakomtaps);
        return newIt;
      });
    };
    const flattenArray = response.map((data) => {
      // assign processed arrays back to object
      data.Wkuks = addCategoryRecursively(data.Wkuks);
      data.Wkus = addCategoryRecursively(data.Wkus);
      data.category = `KP ${String(data.role || "").toUpperCase()}`;
      return data;
    });
    console.log(flattenArray, "ini flatten array dari checkKtaProv");
    // console.log(flattenArray[0].Wkuks, "ini wkuks");
    // console.log(flattenArray[0].Wkus, "ini wkus");
    // console.log(flattenArray[0].Wkuks, "ini wkuks");
    // console.log(flattenArray[0].Wkus, "ini wkus");
    // console.log(flattenArray.Wkuks.Wkus, "ini nested array dari wkuks");
    // const peninjuauuu= [{"kta": "24291107-25010215001","idx": 1},{"kta": "24293173-25010312003","idx": 2}]
    // console.log(response, "ini responseee dari checkKta");
    return flattenArray;
    // return []
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const checkKtaPusat = async (kta, next) => {
  try {
    if (!kta) return null;

    const fetchPusat = await fetch(`https://server-board.kadin360.id/pengurus/${kta}`, {
      method: "GET",
    });
    const response = await fetchPusat.json();

    function flattenObject(obj) {
      const flattened = {};
      for (const key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          Object.assign(flattened, flattenObject(obj[key]));
        } else {
          flattened[key] = obj[key];
        }
      }
      return flattened;
    }

    const flattenedResponse = flattenObject(response);
    flattenedResponse.category = `KI ${flattenedResponse.role.toUpperCase()}`;
    flattenedResponse.userId = flattenedResponse.id;
    console.log(flattenedResponse, "ini response dari checkKtaPusat");

    return flattenedResponse;
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = { checkKta, checkKtaProv, checkKtaPusat };
