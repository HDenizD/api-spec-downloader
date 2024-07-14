const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchOpenApiSpec(url, loginUrl, credentials, outputPath) {
  try {
    // Authentifizieren und Token erhalten
    // const loginResponse = await axios.post(loginUrl, credentials);
    // const token = loginResponse.data.token;

    // Spezifikation abrufen
    const response = await axios.get(url, {
      // headers: {
      //   'Authorization': `Bearer ${token}`
      // }
    });

    // Spezifikation speichern
    fs.writeFileSync(outputPath, JSON.stringify(response.data, null, 2));
    console.log(`Spezifikation gespeichert: ${outputPath}`);
  } catch (error) {
    console.error(`Fehler beim Abrufen der Spezifikation: ${error}`);
  }
}

const services = [
  {
    name: 'Petstore',
    url: 'https://petstore.swagger.io/v2/swagger.json',
    loginUrl: 'https://example.com/api/auth/login',
    credentials: {
      username: 'your_username',
      password: 'your_password'
    },
    outputPath: path.join(__dirname, 'specs', 'petstore_openapi.json')
  },
];

services.forEach(service => {
  fetchOpenApiSpec(service.url, service.loginUrl, service.credentials, service.outputPath);
});