export function InvoiceSchema(id_user, totalList,date, details) {
    return [
      {
        id_user: {
          value: id_user,
          type: "number",
          empty: false,
        },
        totalList: {
          value: totalList,
          type: "number",
          empty: false
        },
        date: {
          value: date,
          type: "string",
          empty: false
        },
        details: {
            value: details,
            type: "string",
            empty: false,
          },
      }
    ];
  }