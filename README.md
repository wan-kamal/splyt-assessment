# Splyt-Assessment

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**

Use these commands to serve the projects locally:

nx serve taxi-backend  
nx serve taxi-map  

### Note: If taxi-map failed to serve run this from root -> ./scripts/hotfix.sh

And to build use this...  

nx build taxi-backend  
nx build taxi-map  

check the dependencies using nx dep-graph  

## Core Dependencies

### taxi-backend
Node.js
Fastify
Axios

### taxi-map
React
Bootstrap
rxjs
react-leaflet

## Test
Unit and Integration tests uses Jest and e2e test uses cypress  

nx test taxi-backend  
nx test taxi-map  

nx e2e taxi-map  

Done within 4 hours
