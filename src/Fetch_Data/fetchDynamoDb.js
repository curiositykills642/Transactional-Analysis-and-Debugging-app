// import axios from "axios";
// import {data} from "../Fetch_Data/data"

export async function fetchDynamoDb(stage , table) {

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let queryParams;
  if(table === "redeem")
    queryParams = "?table=redeem";
  else if(table === "send")
    queryParams = "?table=send"

  // api gateway links to th lambda
  // const preProd = "https://x5uz0eflbd.execute-api.ap-south-1.amazonaws.com/QA-Stage/qadashboard";
  // const prod = "https://gkjft0uii6.execute-api.ap-south-1.amazonaws.com/Prod/transections";

  // function url links to lambda
  const preProd = "https://6smd5kuiyutugpssqvojlv7zpa0wanoz.lambda-url.ap-south-1.on.aws/";
  const prod = "https://nh5mm7vacqkyz6rkdidjr5yjfi0nhyfs.lambda-url.ap-south-1.on.aws/";

  let link = stage === "pre-prod" ? preProd : prod ;

  const response = await fetch(link+queryParams, requestOptions);
  const jsonData = await (response.text());

  const data = JSON.parse(jsonData);
  
  return data;
}
