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
