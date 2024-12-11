/*
* <license header>
*/

/* global fetch */

/**
 *
 * Invokes a web action
 *
 * @param  {string} actionUrl
 * @param {object} headers
 * @param  {object} params
 *
 * @returns {Promise<string|object>} the response
 *
 */

async function actionWebInvoke (actionUrl, headers = {}, params = {}, options = { method: 'POST' }) {
  const actionHeaders = {
    'Content-Type': 'application/json',
    ...headers
  }

  const fetchConfig = {
    headers: actionHeaders
  }

  if (window.location.hostname === 'localhost') {
    actionHeaders['x-ow-extra-logging'] = 'on'
  }

  fetchConfig.method = options.method.toUpperCase()

  if (fetchConfig.method === 'GET') {
    actionUrl = new URL(actionUrl)
    Object.keys(params).forEach(key => actionUrl.searchParams.append(key, params[key]))
  } else if (fetchConfig.method === 'POST') {
    fetchConfig.body = JSON.stringify(params)
  }

  const response = await fetch(actionUrl, fetchConfig)

  let content = await response.text()

  if (!response.ok) {
    throw new Error(`failed request to '${actionUrl}' with status: ${response.status} and message: ${content}`)
  }
  try {
    content = JSON.parse(content)
  } catch (e) {
    // response is not json
  }
  return content
}

export async function callAction(props, action, body = {}) {
  const imsToken = "eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MzM5MTc2NDU2NDVfNGFhNjA4Y2YtZWU2ZC00MGNlLWIzMmMtOWM4NWYyZWQ5MzljX3ZhNmMyIiwidHlwZSI6ImFjY2Vzc190b2tlbiIsImNsaWVudF9pZCI6ImFpby1jbGktY29uc29sZS1hdXRoIiwidXNlcl9pZCI6IjhGQTcxRTc4Njc1NzBGQkUwQTQ5NUVEREA2MzNiNGRkNDYyNDc2YmUxNDk1ZTkxLmUiLCJzdGF0ZSI6IntcImlkXCI6XCIxZDJlMjRlYlwiLFwiY29kZV90eXBlXCI6XCJhY2Nlc3NfdG9rZW5cIixcImNsaWVudF9pZFwiOlwiYWlvLWNsaS1jb25zb2xlLWF1dGhcIixcInBvcnRcIjpcIjY0OTYyXCIsXCJlbnZcIjpcInByb2RcIn0iLCJhcyI6Imltcy1uYTEiLCJhYV9pZCI6IjcwMUI1NTI5NUY1QjM5OTkwQTQ5NUU4MUBBZG9iZUlEIiwiY3RwIjowLCJmZyI6IlpBMkJPVUpBVlBQNTRIVUtITVFWWUhBQVhJIiwic2lkIjoiMTczMzc3Njk1OTY4Ml9kOTc0NjdmOS0xZDRjLTQwNjItYTc0OS0yOTNlYzZlODQwYzhfdmE2YzIiLCJydGlkIjoiMTczMzkxNzY0NTY0Nl81NzM0YWM0Mi01NGVmLTRhNDItYTAwNi0zZjk3NjY5M2RkZDVfdmE2YzIiLCJtb2kiOiJiNzE3ZWM4NSIsInBiYSI6Ik9SRyxNZWRTZWNOb0VWLExvd1NlYyIsInJ0ZWEiOiIxNzM1MTI3MjQ1NjQ2IiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwiY3JlYXRlZF9hdCI6IjE3MzM5MTc2NDU2NDUiLCJzY29wZSI6InNlcnZpY2VfcHJpbmNpcGFscy5yZWFkLG9wZW5pZCxBZG9iZUlELHJlYWRfb3JnYW5pemF0aW9ucyxnbmF2LHVuaWZpZWRfZGV2X3BvcnRhbCxyZWFkX3BjLmRtYV9idWxsc2V5ZSxhZG9iZWlvX2FwaSxzZXJ2aWNlX3ByaW5jaXBhbHMud3JpdGUscmVhZF9jbGllbnRfc2VjcmV0LGFkZGl0aW9uYWxfaW5mby5yb2xlcyxtYW5hZ2VfY2xpZW50X3NlY3JldHMsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0In0.c3qAGc8EvQ_P0ryrXni0Csdzi8P89xCvDppop18V1z6FENQ-DD-ygxEYAjSP6M1k3awahYqtKpHaHbyVUHgZkiWNYwVwLSeV9QpJ3PbPs7erXxZNl0caecFa8pNJlOfuJ6_5H2j2lntpP18eeiJXCZoz4KnuPAxfNA77ZOmuq2I3up0voq6eeydNnJpoYMuv3embL3wE8mhcEtMoYG7IBuSM5ptwQ2Wd41Pc-4gIQ7hQ0O3QOAksojydq2lQBN6BbLi-Yo_TzuFMYtd5uOlWyQfAN2lgvrOOElqa2dRBuIVn1J2gzQHS_PBjwcqN9o4nTUhZBf1bGkYFuNDMbMwHvg";

  const actions = require('./config.json')
  const res = await fetch('https://619283-salesandinsights-stage.adobeioruntime.net/api/v1/web/sales-insigts-dash/commerce', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-gw-ims-org-id': "18F3562360FF18580A495C3A@AdobeOrg",
      'authorization': `Bearer ${imsToken}`
    },
    body: JSON.stringify({
      ...body
    })
  })

  return await res.json()
}

export async function callActionOrders(props, action, body = {}) {
  const imsToken = "eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MzM5MTc2NDU2NDVfNGFhNjA4Y2YtZWU2ZC00MGNlLWIzMmMtOWM4NWYyZWQ5MzljX3ZhNmMyIiwidHlwZSI6ImFjY2Vzc190b2tlbiIsImNsaWVudF9pZCI6ImFpby1jbGktY29uc29sZS1hdXRoIiwidXNlcl9pZCI6IjhGQTcxRTc4Njc1NzBGQkUwQTQ5NUVEREA2MzNiNGRkNDYyNDc2YmUxNDk1ZTkxLmUiLCJzdGF0ZSI6IntcImlkXCI6XCIxZDJlMjRlYlwiLFwiY29kZV90eXBlXCI6XCJhY2Nlc3NfdG9rZW5cIixcImNsaWVudF9pZFwiOlwiYWlvLWNsaS1jb25zb2xlLWF1dGhcIixcInBvcnRcIjpcIjY0OTYyXCIsXCJlbnZcIjpcInByb2RcIn0iLCJhcyI6Imltcy1uYTEiLCJhYV9pZCI6IjcwMUI1NTI5NUY1QjM5OTkwQTQ5NUU4MUBBZG9iZUlEIiwiY3RwIjowLCJmZyI6IlpBMkJPVUpBVlBQNTRIVUtITVFWWUhBQVhJIiwic2lkIjoiMTczMzc3Njk1OTY4Ml9kOTc0NjdmOS0xZDRjLTQwNjItYTc0OS0yOTNlYzZlODQwYzhfdmE2YzIiLCJydGlkIjoiMTczMzkxNzY0NTY0Nl81NzM0YWM0Mi01NGVmLTRhNDItYTAwNi0zZjk3NjY5M2RkZDVfdmE2YzIiLCJtb2kiOiJiNzE3ZWM4NSIsInBiYSI6Ik9SRyxNZWRTZWNOb0VWLExvd1NlYyIsInJ0ZWEiOiIxNzM1MTI3MjQ1NjQ2IiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwiY3JlYXRlZF9hdCI6IjE3MzM5MTc2NDU2NDUiLCJzY29wZSI6InNlcnZpY2VfcHJpbmNpcGFscy5yZWFkLG9wZW5pZCxBZG9iZUlELHJlYWRfb3JnYW5pemF0aW9ucyxnbmF2LHVuaWZpZWRfZGV2X3BvcnRhbCxyZWFkX3BjLmRtYV9idWxsc2V5ZSxhZG9iZWlvX2FwaSxzZXJ2aWNlX3ByaW5jaXBhbHMud3JpdGUscmVhZF9jbGllbnRfc2VjcmV0LGFkZGl0aW9uYWxfaW5mby5yb2xlcyxtYW5hZ2VfY2xpZW50X3NlY3JldHMsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0In0.c3qAGc8EvQ_P0ryrXni0Csdzi8P89xCvDppop18V1z6FENQ-DD-ygxEYAjSP6M1k3awahYqtKpHaHbyVUHgZkiWNYwVwLSeV9QpJ3PbPs7erXxZNl0caecFa8pNJlOfuJ6_5H2j2lntpP18eeiJXCZoz4KnuPAxfNA77ZOmuq2I3up0voq6eeydNnJpoYMuv3embL3wE8mhcEtMoYG7IBuSM5ptwQ2Wd41Pc-4gIQ7hQ0O3QOAksojydq2lQBN6BbLi-Yo_TzuFMYtd5uOlWyQfAN2lgvrOOElqa2dRBuIVn1J2gzQHS_PBjwcqN9o4nTUhZBf1bGkYFuNDMbMwHvg";

  const actions = require('./config.json')
  const res = await fetch('https://619283-salesandinsights-stage.adobeioruntime.net/api/v1/web/sales-insigts-dash/commerce-orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-gw-ims-org-id': "18F3562360FF18580A495C3A@AdobeOrg",
      'authorization': `Bearer ${imsToken}`
    },
    body: JSON.stringify({
      ...body
    })
  })

  console.log(res);

  return await res.json()
}

export default actionWebInvoke
