var axios = require("axios");
var data =
  '{\r\n    "task_id": "74f4c926-250c-43ca-9c53-453e87ceacd1",\r\n    "group_id": "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e",\r\n    "data": {\r\n    "aadhaar_number": "<AADHAAR NUMBER>"\r\n    }\r\n}';

var config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://eve.idfy.com/v3/tasks/async/verify_with_source/aadhaar_lite",
  headers: {
    "api-key": "{{api-key}}",
    "account-id": "{{account-id}}",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
