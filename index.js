function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/makanan");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML += "<td>" + object["namaMakanaminuman"] + "</td>";
        trHTML += "<td>" + object["jenisMakananminuman"] + "</td>";
        trHTML += "<td>" + object["harga"] + "</td>";
        trHTML +='<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' + object["id"] +')">Edit</button>';
        trHTML +='<button type="button" class="btn btn-outline-danger" onclick="makananDelete(' +object["id"] +')">Hapus</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}
loadTable();

function showUserCreateBox() {
  Swal.fire({
      title: 'Pangan',
      html: '<input id="id" type="hidden">' +          
          '<input id="namaMakananminuman" class="swal2-input" placeholder="Nama">' +
          '<input id="jenisMakananminuman" class="swal2-input" placeholder="Jenis">' +
          '<input id="harga" class="swal2-input" placeholder="Harga">',          
      focusConfirm: true,
      preConfirm: () => {userCreate();}
  })
}

function userCreate() {
  const namaMakananminuman = document.getElementById("namaMakananminuman").value;
  const jenisMakananminuman = document.getElementById("jenisMakananminuman").value;
  const harga = document.getElementById("harga").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:8080/makanan");
  xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhttp.send(JSON.stringify({
      "namaMakanaminuman": namaMakananminuman,
      "jenisMakananminuman": jenisMakananminuman,
      "harga": harga
  }));
  xhttp.onreadystatechange = function() {
      if (this.status == 200) {
          const objects = JSON.parse(this.responseText);
          Swal.fire(objects['message']);
          loadTable();
      }
  }
}

function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8080/makanan/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
          const user = objects["user"];
          console.log(user);
          Swal.fire({
              title: 'Edit ',
              html: '<input id="id" type="hidden" value="' + objects['id'] + '">' +
                  '<input id="namaMakanaminuman" class="swal2-input" placeholder="Nama" value="' + objects['namaMakanaminuman'] + '">' +
                  '<input id="jenisMakananminuman" class="swal2-input" placeholder="Jenis" value="' + objects['jenisMakananminuman'] + '">' +
                  '<input id="harga" class="swal2-input" placeholder="Harga" value="' + objects['harga'] + '">',
              focusConfirm: false,
              preConfirm: () => { userEdit(); }
          })
      }
  };
}

function userEdit() {
  const id = document.getElementById("id").value;
  const namaMakanaminuman = document.getElementById("namaMakanaminuman").value;
  const jenisMakananminuman = document.getElementById("jenisMakananminuman").value;
  const harga = document.getElementById("harga").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "http://localhost:8080/makanan/updatemakanan");
  xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhttp.send(JSON.stringify({
      "id": id,
      "namaMakanaminuman": namaMakanaminuman,
      "jenisMakananminuman": jenisMakananminuman,
      "harga": harga
  }));
  xhttp.onreadystatechange = function() {
      if (this.status == 200) {
          const objects = JSON.parse(this.responseText);
          Swal.fire(objects['message']);
          loadTable();
      }
  }
}


function makananDelete(id) {
 

  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:8080/makanan/" + id);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhttp.send(JSON.stringify({ "id": id }));
  xhttp.onreadystatechange = function() {
     var del = confirm("Anda yakin ingin menghapus data tersebut?");
      if (this.status == 200) {
          const objects = JSON.parse(this.responseText);
          Swal.fire(objects["message"]);
          loadTable();

        } else {
          return false;
       }
     }

}
