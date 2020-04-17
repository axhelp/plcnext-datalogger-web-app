const Table = `
SELECT
    name
FROM
    sqlite_master
WHERE
    type ='table'
`.trim();

const Data = (
    variableName: string,
    tableName: string,
    limit: number,
    from: Date,
    to: Date
) => {
    return `
SELECT Timestamp, "${variableName}"
FROM ${tableName}
WHERE "${variableName}" IS NOT NULL
AND Timestamp BETWEEN "${from.toISOString()}" AND "${to.toISOString()}"
ORDER BY random()
LIMIT ${limit}
`.trim();
};

const Embedded = (
    query: string
) => {
    return `
SELECT  *
FROM (
${query}
)
`.trim();
};

const UnionAll = `
UNION ALL
`;

const Notifications = (
    from: Date,
    to: Date
) => {
    return `
SELECT * FROM  notifications
WHERE timestamp BETWEEN "${from.toISOString()}" AND "${to.toISOString()}"
`.trim();
};

export const SqlStatements = {
    Table,
    Data,
    Embedded,
    UnionAll,
    Notifications
};
