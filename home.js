function show() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/blogs",
        //xử lý khi thành công
        success: function (blogs) {
            console.log(blogs)
            let str = '';
            for (const blog of blogs) {
                str += `<div class="col-sm-4">
                        <h2>${blog.title}</h2>
                        <img src="${blog.img}" width="300" height="200">
                         <p>${blog.content}</p>
                          <button type="button" class="btn btn-primary" onclick="showEdit(${blog.id})" data-bs-toggle="modal" data-bs-target="#myModalEdit">Edit</button>
                          <button type="button" class="btn btn-primary" onclick="deleteBlog(${blog.id})" >Delete</button>
                 
                        </div>`
            }

            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
}

show();


function create() {
    let blog = {
        "title": document.getElementById("title").value,
        "content": $("#content").val(),
        "img": $("#img").val(),
        "category": {
            "id": $("#idCategory").val(),
        }
    }
    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/blogs",
        data: JSON.stringify(blog),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showEdit(id) {
    $.ajax({
        type: "Get",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/blogs/" + id,
        //xử lý khi thành công
        success: function (blog) {
            document.getElementById("idEdit").value = blog.id;
            document.getElementById("titleEdit").value = blog.title;
            document.getElementById("contentEdit").value = blog.content;
            document.getElementById("imgEdit").value = blog.img;
            $("#idCategoryEdit").val(blog.category.id);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function updateBlog() {
    let blog = {
        "id":document.getElementById("idEdit").value,
        "title": document.getElementById("titleEdit").value,
        "content": $("#contentEdit").val(),
        "img": $("#imgEdit").val(),
        "category": {
            "id": $("#idCategoryEdit").val(),
        }
    }
    console.log(blog)
    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/blogs",
        data: JSON.stringify(blog),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}


function deleteBlog(id) {
    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/blogs/" + id,
        //xử lý khi thành công
        success: function () {
            alert("Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}



