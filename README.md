## Description
Test case, apartment manager made using .NET for backend, angular for frontend and postgresql as database. The backend uses the REPR API pattern. Frontend uses redux (NgRx) pattern.

<b>[Try Out Web App.](https://ambitious-bush-08919b303.5.azurestaticapps.net/)</b>

API URL: https://app-eapartment-api-germanywestcentral-001.azurewebsites.net

<sub>PS. You can edit the apartment information, click on the apartment to edit it.</sub>
## API Endpoints
- Get all apartments, query is optional by default asc and -1 (ignore room amount) 
 ```bash
[GET] /api/apartments?sorting=desc&rooms=2
```
- Get specific apartment by id
 ```bash
[GET] /api/apartments/{id}
```
- Create a new apartment
```bash
[POST] /api/apartments
body:
{
  "rooms": 0,
  "name": "string",
  "price": 0,
  "description": "string"
}
```
- Update an apartment
```bash
[PUT] /api/apartments/{id}
body:
{
  "rooms": 0,
  "name": "string",
  "price": 0,
  "description": "string"
}
```
- Delete an apartment by id
```bash
[DELETE] /api/apartments/{id}
```
## Tests
#### Backend
```bash
# unit tests
dotnet test EApartmentManagerBackend/ApartmentApiTests
```
#### Frontend
```bash
# unit tests
npm run test --prefix EApartmentManagerFrontend
```
## Screenshots 
![image](https://github.com/TEGTO/EApartmentManager/assets/90476119/b578b179-b969-42d8-aa51-6230d4e202e8)
![image](https://github.com/TEGTO/EApartmentManager/assets/90476119/7059b3a6-af4b-45e3-a5ea-c1442c9c8fd0)
![image](https://github.com/TEGTO/EApartmentManager/assets/90476119/487215fc-b479-4f05-ae8c-daaf16f3149b)
![image](https://github.com/TEGTO/EApartmentManager/assets/90476119/5f5c0953-4eb9-4d4e-aa21-2769106d4b0f)
![image](https://github.com/TEGTO/EApartmentManager/assets/90476119/fee43f5b-9edc-4eb0-ac8f-c1d611a72219)





