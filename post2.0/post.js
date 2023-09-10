document.getElementById("form").addEventListener("submit", function(event){
 event.preventDefault();

    const name1 = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const date = document.getElementById("date").value;

    const datos = {
        name1:  name1,
        surname: surname,
        date: date
    };

    fetch('https://jsonplaceholder.typicode.com/users', {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json))
      .catch(err => console.log(err));
});