export function graphQuery(query, processData) {
  baseQuery(JSON.stringify({query: query}), processData);
}

export function graphQueryVars(query, vars, processData) {
  baseQuery(JSON.stringify({query: query, variables: vars}), processData);
}

function baseQuery(body, processData) {
  return fetch('http://localhost:4000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: body
  })
  .then(r => r.json())
  .then(data => processData(data));
}
