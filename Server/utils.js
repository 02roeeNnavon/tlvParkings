const Pool = require("pg").Pool;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Aa123456",
  database: "postgres",
});
const dbQuery = async (queryText, paramsArray = []) => {
  return pool.query(queryText,paramsArray);
};
const add = async (body) => {
  const id =
    (
      await dbQuery(
        'SELECT "ID" FROM roee.t_parkings ORDER BY "ID" DESC LIMIT 1',
      )
    ).rows[0]?.ID + 1;
  const result = await dbQuery(
    'INSERT INTO roee.t_parkings ("ID",x_coord,y_coord,address,time) VALUES ($1,$2,$3,$4,$5) RETURNING "ID"',
    [id || 0, body.x_coord, body.y_coord, body.address, body.time]
  );
  return result;
};
const getAll = async () => {
  const result = await dbQuery("SELECT * FROM roee.t_parkings",);
  return result;
};
const getById = async (id) => {
  const result = dbQuery('SELECT * FROM roee.t_parkings WHERE "ID" = $1', [id]);
  return result;
};
const deleteById = async (id) => {
  const result = dbQuery(
    'DELETE FROM roee.t_parkings WHERE "ID" = $1 RETURNING "ID"',
    [id]
  );
  return result;
};

module.exports = { dbQuery, add, getAll, getById, deleteById };
