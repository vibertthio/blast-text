const button = document.getElementsByClassName('btn')[0];
button.addEventListener('click', () => {

  const http = new XMLHttpRequest();
  const inputs = document.getElementsByClassName('inputs');
  let out = [];
  for (let i = 0; i < 10; i += 1) {
    console.log(inputs[i].value);
    if (inputs[i].value !== '') {
      out[i] = inputs[i].value;
    }
  }
  document.getElementById('debug').innerHTML = 'Sending...';

  const url = `/${out[0]}/${out[1]}/${out[2]}/${out[3]}/${out[4]}/${out[5]}/${out[6]}/${out[7]}/${out[8]}/${out[9]}`;
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
      console.log(http.responseText);
      document.getElementById('debug').innerHTML = 'Finish Sending! Click send again for to send another comment';
    }
  }
  http.send();
});
