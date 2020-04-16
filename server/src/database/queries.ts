import { Database } from "sqlite";
import { SqlStatements } from "./statements";

export const tablesNamesQuery = async (db: Database) => {
    const queryResult = await db.all(SqlStatements.Table);
    return queryResult.map((row) => row.name);
};

interface GetDataQueryOptions {
    limit: number;
    from: Date;
    to: Date;
    variableName: string;
}

export const dataQuery = async (db: Database, options: GetDataQueryOptions) => {
    const {limit, from, to, variableName} = options;

    const tablesNames = await tablesNamesQuery(db);
    const sqlStatements = tablesNames.map((tableName) =>
        SqlStatements.Data(variableName, tableName, limit, from, to)
    );

    const unionSqlStatements = sqlStatements.map((sqlStatement) =>
        SqlStatements.Embedded(sqlStatement)
    ).join(SqlStatements.UnionAll);

    return await db.all(unionSqlStatements);
};
