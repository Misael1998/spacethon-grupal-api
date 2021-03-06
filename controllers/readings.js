const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const db = require("mssql");

//Constans
const TBL_TEMPERATURE = "TBL_TEMPERATURA";
const TBL_PRESSURE = "TBL_PRESION_ATMOSFERICA";
const TBL_RIVER = "TBL_ALTURA_RIO";
const TBL_PRECIPITATION = "TBL_PRECIPITACION";
const TBL_FLOW = "TBL_CAUDAL";

const TEMPERATURE_VALUE = "temperatura";
const PRESSURE_VAUE = "presion_atmosferica";
const RIVER_VALUE = "altura_rio";
const PRECIPITATION_VALUE = "precipitacion";
const FLOW_VALUE = "caudal";

//@desc     get records
//@route    GET /api/readings/:type
//@access   PRIVATE
exports.readings = asyncHandler(async (req, res, next) => {
  const { type } = req.params;
  let query = queryHeader(type, next);

  const request = await new db.Request().query(query);

  for (record of request.recordset) {
    const logs = await new db.Request()
      .input("user", db.Int, req.user.id)
      .input("reading", db.Int, record.id)
      .execute("SP_SAVE_LOG");
  }

  return res.status(200).json({
    data: request.recordset,
  });
});

//@desc     get records
//@route    GET /api/readings/:type/:dates
//@access   PRIVATE
exports.readindsByDate = asyncHandler(async (req, res, next) => {
  const { type, dates } = req.params;
  let dateFormat = dates.split("-");
  if (dateFormat.length !== 2) {
    return next(
      new ErrorResponse("Invalid format", 400, {
        message: "Dates must be input in date1-date2 format",
      })
    );
  }

  for (d of dateFormat) {
    newFormat = d.replace(/\./g, "-");
    if (
      !newFormat.match(
        /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
      )
    ) {
      return next(
        new ErrorResponse("Invalid format", 400, {
          message: "Date format must be YYYY.MM.DD",
        })
      );
    }
  }

  let query = queryHeader(type, next);
  query += `
  where fecha_medicion between '${dateFormat[0].replace(
    /\./g,
    "/"
  )}' and '${dateFormat[1].replace(/\./g, "/")}'`;

  console.log(query);

  let request = await new db.Request().query(query);

  for (record of request.recordset) {
    const logs = await new db.Request()
      .input("user", db.Int, req.user.id)
      .input("reading", db.Int, record.id)
      .execute("SP_SAVE_LOG");
  }

  return res.status(200).json({
    data: request.recordset,
  });
});

const queryHeader = (type, next) => {
  let query;
  switch (type) {
    case "temperature":
      query = `select top(20) fecha_medicion as date, 
      id_mediciones as id,
      ${TEMPERATURE_VALUE} as temperature 
      from ${TBL_TEMPERATURE} tp
      inner join TBL_MEDICIONES tm
      on tm.id_temperatura = tp.id_temperatura`;
      break;

    case "pressure":
      query = `select top(20) fecha_medicion as date, 
      id_mediciones as id,
      ${PRESSURE_VAUE} as pressure 
      from ${TBL_PRESSURE} pr
      inner join TBL_MEDICIONES tm
      on tm.id_presion_atmosferica = pr.id_presion_atmosferica`;
      break;

    case "river":
      query = `select top(20) fecha_medicion as date, 
      id_mediciones as id,
      ${RIVER_VALUE} as river 
      from ${TBL_RIVER} rv
      inner join TBL_MEDICIONES tm
      on tm.id_altura_rio = rv.id_altura_rio`;
      break;

    case "precipitation":
      query = `select top(20) fecha_medicion as date, 
      id_mediciones as id,
      ${PRECIPITATION_VALUE} as precipitation 
      from ${TBL_PRECIPITATION} pr
      inner join TBL_MEDICIONES tm
      on tm.id_precipitacion = pr.id_precipitacion`;
      break;

    case "flow":
      query = `select top(20) fecha_medicion as date, 
      id_mediciones as id,
      ${FLOW_VALUE} as flow from 
      ${TBL_FLOW} fl
      inner join TBL_MEDICIONES tm
      on tm.id_caudal = fl.id_caudal`;
      break;

    default:
      return next(
        new ErrorResponse(
          "Not found",
          404,
          `Cant get route /api/records/${type}`
        )
      );
      break;
  }
  return query;
};
