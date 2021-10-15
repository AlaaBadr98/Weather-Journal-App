// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
let APIKey="15472832dd451e9ee3e251c2cd0a282e"

// action after click on generate
//click event 
document.getElementById("generate").addEventListener("click",async ()=>{ 
  try {
    document.getElementById("error").innerHTML = '';
    // get zip code and feelings of user 
    const Zip =document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    document.getElementById("content").innerHTML = feelings;
    // get the weather 
    const URL=`https://api.openweathermap.org/data/2.5/weather?zip=${Zip}&appid=${APIKey}&units=metric`
    const res = await fetch(URL)
    const data= await res.json()
    const temp=data.main.temp
    console.log(data,temp);
      // post function 
        postData('http://localhost:3000/postData', {temperature: data.main.temp, date: newDate, user_response: feelings } )
        .then(function() {
          // update the information 
            updateUI()
        })
      }catch(err) {
        // remove information if the user inter wrong zip code
            document.getElementById("error").innerHTML = 'Your Zip Code Not Correct';
            document.getElementById("date").innerHTML = " ";
      document.getElementById("temp").innerHTML =" ";
      document.getElementById("content").innerHTML = " ";
          }
});

const postData = async ( url = '', data = {})=>{
  console.log(data);
    const postRequest = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',},      
    body: JSON.stringify(data), 
  });
    try {
      const newData = await postRequest.json();
      return newData;
    }catch(error) {
    }
}

updateUI = async()=>{
  const request=await fetch('http://localhost:3000/getData');
  const finalData=await request.json();
  document.getElementById("date").innerHTML = newDate;
    document.getElementById("temp").innerHTML =finalData.temperature + '&degC';
}

