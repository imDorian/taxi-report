import React, { useState } from 'react'

const UberHistory = () => {
  const [authCode, setAuthCode] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [trips, setTrips] = useState([])

  const clientId = 'TU_CLIENT_ID'
  const clientSecret = 'TU_CLIENT_SECRET'
  const redirectUri = 'TU_REDIRECT_URI'

  const handleAuthCodeChange = (event) => {
    setAuthCode(event.target.value)
  }

  const handleGetAccessToken = async () => {
    try {
      const response = await fetch('https://login.uber.com/oauth/v2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
          code: authCode
        })
      })

      if (!response.ok) {
        throw new Error('Error al obtener el token de acceso')
      }

      const data = await response.json()
      setAccessToken(data.access_token)
    } catch (error) {
      console.error('Error obteniendo el token de acceso:', error)
    }
  }

  const handleGetTrips = async () => {
    try {
      const response = await fetch('https://api.uber.com/v1.2/history', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error al obtener el historial de viajes')
      }

      const data = await response.json()
      setTrips(data.history)
    } catch (error) {
      console.error('Error obteniendo el historial de viajes:', error)
    }
  }

  return (
    <div>
      <h1>Historial de Viajes de Uber</h1>
      <div>
        <label>
          Código de autorización:
          <input type='text' value={authCode} onChange={handleAuthCodeChange} />
        </label>
        <button onClick={handleGetAccessToken}>Obtener Token de Acceso</button>
      </div>
      <div>
        <button onClick={handleGetTrips} disabled={!accessToken}>
          Obtener Historial de Viajes
        </button>
      </div>
      <div>
        <h2>Viajes:</h2>
        <ul>
          {trips.map((trip) => (
            <li key={trip.request_id}>
              {trip.start_time} - {trip.distance} km
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UberHistory
