import { Database } from "sqlite";
import { SqlStatements } from "./statements";

export const tablesNamesQuery = async (db: Database) => {
    const queryResult = await db.all(SqlStatements.Table);
    return queryResult.map((row) => row.name);
};

interface DataQueryOptions {
    limit: number;
    from: Date;
    to: Date;
    variableName: string;
}

export const dataQuery = async (db: Database, options: DataQueryOptions) => {
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

interface NotificationsQueryOptions {
    from: Date;
    to: Date;
}

export const notificationsQuery = async (db: Database, options: NotificationsQueryOptions) => {
    const {from, to} = options;

    return await db.all(SqlStatements.Notifications(from, to));
};
