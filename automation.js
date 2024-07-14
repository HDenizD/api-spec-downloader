const shell = require('shelljs');

async function generateClients() {
  for (const service of services) {
    await fetchOpenApiSpec(service.url, service.loginUrl, service.credentials, service.outputPath);

    // OpenAPI Generator ausführen
    shell.exec(`openapi-generator-cli generate -i ${service.outputPath} -g typescript-axios -o ./clients/${service.name}`);
  }
}

generateClients().then(() => {
  console.log('Axios Clients erfolgreich generiert.');
}).catch(error => {
  console.error('Fehler bei der Generierung der Clients:', error);
});