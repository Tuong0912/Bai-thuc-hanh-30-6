function showAll() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city",
        success(data) {
            let context = ""
            context += `<table class="table table-bordered">
<tr>
<td>ID</td>
<td>Thành Phố</td>
<td>Quốc Gia</td>
</tr>`
            for (let i = 0; i < data.length; i++) {
                context += `<tr>
<td>${data[i].id}</td>
<td><input type="submit" onclick="view(${data[i].id})" value="${data[i].name}" class="btn btn-primary"></td>
<td>${data[i].country.name}</td>
<td><button onclick="deleteById(${data[i].id})" class="btn btn-danger">Delete</button></td>
<td><button onclick="updateForm(${data[i].id})" class="btn btn-warning">Update</button></td>
</tr>`
            }
            context += `</table>`

            document.getElementById("display").innerHTML = context;
        }
    })
}

function createForm() {
    let context = ""
    context = `<table class="table">
<tr>
<td>Name</td>
<td><input type="text" id="name" class="form-control"></td>
</tr>

<tr>
<td>Quốc Gia</td>
<td><select id="country" class="form-control"></select></td>
</tr>

<tr>
<td>Diện Tích</td>
<td><input type="number" id="dienTich" class="form-control"></td>
</tr>

<tr>
<td>Dân Số</td>
<td><input type="number" id="danSo" class="form-control"></td>
</tr>

<tr>
<td>GDP</td>
<td><input type="number" id="gdp" class="form-control"></td>
</tr>

<tr>
<td>Giới Thiệu</td>
<td><input type="text" id="status" class="form-control"></td>
</tr>
<tr>
<td><button onclick="create()" class="btn btn-success">Nhập thành phố</td>
<td><button onclick="backHome()" class="btn btn-secondary">Thoát</td>
</tr>
</table>`
    document.getElementById("display").innerHTML = context;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/country",
        success(data) {
            let text = ``
            for (let i = 0; i < data.length; i++) {
                text += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            text += ``
            document.getElementById("country").innerHTML = text
        }

    })
}

function create() {
    let name = $('#name').val()
    let country = document.getElementById("country").value
    let dienTich = $('#dienTich').val()
    let danSo = $('#danSo').val()
    let gdp = $('#gdp').val()
    let status = $('#status').val()
    let newStudent = {
        name: name,
        country: {
            "id": country
        },
        dienTich: dienTich,
        danSo: danSo,
        gdp: gdp,
        status: status
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        data: JSON.stringify(newStudent),
        url: "http://localhost:8080/city",
        success() {
            showAll()
        }, error() {
            alert("Nhập cẩn thận")
        }

    })
    event.defaultPrevented
}

function backHome() {
    showAll()
}

function deleteById(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/city/" + id,
        success() {
            showAll()
        }
    })
}

function updateForm(id) {
    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/city/" + id,
        success(data) {

            let context = ``
            context =
                `<table class="table">
<tr>
<td hidden="hidden">ID</td>
<td><input type="text" id="id" value="${data.id}" hidden="hidden"></td>
</tr>
<tr>
<td>Tên</td>
<td><input type="text" id="name" value="${data.name}" class="form-control"></td>
</tr>

<tr>
<td>Quốc gia</td>
<td><select id="country" class="form-control"></select></td>
</tr>

<tr>
<td>Diện tích</td>
<td><input type="number" id="dienTich" value="${data.dienTich}" class="form-control"></td>
</tr>

<tr>
<td>Dân số</td>
<td><input type="number" id="danSo" value="${data.danSo}" class="form-control"></td>
</tr>

<tr>
<td>GDP</td>
<td><input type="number" id="gdp" value="${data.gdp}" class="form-control"></td>
</tr>

<tr>
<td>Giới thiệu</td>
<td><input type="text" id="status" value="${data.status}" class="form-control"></td>
</tr>

<tr>
<td><button type="submit" onclick="update(${data.id})" class="btn btn-warning">Update</td>
<td><button onclick="backHome()" class="btn btn-secondary">Thoát</button> </td>
</tr>
</table>`
            document.getElementById("display").innerHTML = context;
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/country",
                success(arr) {

                    let text = ``
                    for (let i = 0; i < arr.length; i++) {
                        text += `<option value="${arr[i].id}">${arr[i].name}</option>`
                    }
                    document.getElementById("country").innerHTML = text;
                }
            })

        }
    })
    event.defaultPrevented
}

function update(id) {
    let name = $('#name').val()
    let country = document.getElementById("country").value
    let dienTich = $("#dienTich").val()
    let danSo = $('#danSo').val()
    let gdp = $('#gdp').val()
    let status = $('#status').val()
    let updateCity = {
        name: name,
        country: {
            "id": country
        },
        dienTich: dienTich,
        danSo: danSo,
        gdp: gdp,
        status: status
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "PUT",
        url: "http://localhost:8080/city/" + id,
        data: JSON.stringify(updateCity),
        success(data) {
            console.log(data)
            showAll()
        }, error() {
            alert("Có vấn đề khi nhập các ô, cẩn thận")
        }
    })
    event.defaultPrevented;
}

function view(id) {
    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/city/" + id,
        success(data) {
            document.getElementById("display").innerHTML = `<br>
<br> 

 
    
 <br>
 <br>

<table class="table">
<tr><td> <strong>Thành phố ${data.name}</strong><td><td>
<button onclick="showAll()" class="btn btn-primary"> Xem danh sách thành phố</button>
</td></tr>
<tr>
<td>Tên : </td>
<td>${data.name}</td></tr>


<tr>
<td>Quốc Gia : </td>
<td>${data.country.name}</td>
</tr>

<tr>
<td>Diện tích : </td>
<td>${data.dienTich}</td>
</tr>

<tr>
<td>Dân số : </td>
<td>${data.danSo}</td>
</tr>

<tr>
<td>DGP : </td>
<td>${data.gdp}</td>
</tr>

<tr>
<td>Giới thiệu : </td>
<td>${data.status}</td>
</tr>
<tr>
<td></td>
<td colspan="1"><button onclick="updateForm(${data.id})" class="btn btn-warning">Chỉnh sửa</button></td>
<td><button onclick="deleteById(${data.id})" class="btn btn-danger">Xoá</button></td>
</tr>
</table>`;
        }
    })
    event.defaultPrevented;
}

showAll()
