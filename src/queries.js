function graphQuery(query, processData) {
  baseQuery(JSON.stringify({query: query}), processData);
}

function graphQueryVars(query, vars, processData) {
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

export function categoriesQuery(processData) {
  graphQuery('{categories { name }}', processData);
}

export function currenciesQuery(processData) {
  graphQuery('{currencies { label symbol }}', processData);
}

export function productQuery(productId, processData) {
  graphQueryVars('query GetProduct($id: String!){product(id: $id)' +
  '{name gallery description brand inStock attributes {name type items {value}} prices {amount currency{symbol label}}}}',
    {id: productId}, processData);
}

export function categoryQuery(categoryName, processData) {
  graphQueryVars('query GetCategory($title: String!){category(input: {title: $title})' +
    ' { name products {id name gallery description brand inStock attributes ' +
    '{name type items {value}} prices {amount currency{symbol label}}}}}',
    {title: categoryName}, processData);
}
