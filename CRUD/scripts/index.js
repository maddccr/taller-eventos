const search = document.getElementById("btnGet1");
const add = document.getElementById("btnPost");
const delete1 = document.getElementById("btnDelete");
const modify = document.getElementById("btnPut");

fetch("https://6544f3d85a0b4b04436d4e68.mockapi.io/user")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    search.addEventListener("click", function () {
      const id = document.getElementById("inputGet1Id").value;
      showResults(data, id);
    });

    add.addEventListener("click", function () {
      addUser(data);
    });

    delete1.addEventListener("click", function () {
      deleteUser(data);
    });

    window.addEventListener("load", function () {
      showResults(data);
    });
  })
  .catch((error) => {
    console.error("Error al cargar los datos", error);
  });

  function showResults(data, num) {
    const results = document.getElementById("results");
    let text = "";
  
    // Verificar si el ID proporcionado está presente en el array
    let id = data.find((elem) => elem.id === num);
  
    if (id !== undefined) {
      text += ` 
      <p>ID: ${id.id}</p> 
      <p>NAME: ${id.name}</p> 
      <p>LASTNAME: ${id.lastname}</p> `;
    } else if (num) {
      text = "No existe el ID.";
    } else {
      // Si no se proporciona un ID, mostrar todos los elementos del array
      data.forEach((id) => {
        text += ` 
    <p>ID: ${id.id}</p> 
    <p>NAME: ${id.name}</p> 
    <p>LASTNAME: ${id.lastname}</p> `;
      });
    }
  
    results.innerHTML = text;
  }
  
  

function addUser(data) {
  const nameInput = document.getElementById("inputPostNombre").value;
  const lastnameInput = document.getElementById("inputPostApellido").value;

  if (nameInput && lastnameInput) {
    // Create an object with the user's input
    const user = {
      name: nameInput,
      lastname: lastnameInput,
    };

    // Send a POST request to add the user
    fetch("https://6544f3d85a0b4b04436d4e68.mockapi.io/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((newUser) => {
        // Add the newly added user to the data array
        data.push(newUser);
        // Update the list of records
        showResults(data);
      })
      .catch((error) => {
        console.error("Error adding user", error);
      });
  }
}

function deleteUser(data) {
  const input = document.getElementById("inputDelete").value;
  let userIndex = data.findIndex((elem) => elem.id === input);

  if (userIndex !== -1) {
    fetch(`https://6544f3d85a0b4b04436d4e68.mockapi.io/user/${input}`, {
      method: "DELETE",
    })
      .then(() => {
        // Elimina el usuario directamente del array local
        data.splice(userIndex, 1);
        // Muestra los resultados actualizados
        showResults(data);
      })
      .catch((error) => {
        console.error("Error deleting user", error);
      });
  } else {
    alert("ID invalido");
  }
}

