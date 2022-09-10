var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');

var template = require('./template.js');




/*exports.home = function(request,response){
    db.query('SELECT * FROM topic', function(error,topics){
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(topics);
        var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
      });

}*/

exports.home = function(request,response){
  db.query('SELECT * FROM author',function(error2,authors){
      
      var html = template.HTML('', '<h1><a href="/">ballon</a></h1>', 
      `
      <form action="/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          ${template.authorSelcet(authors)}
        </p>
        <p>
          <input type="submit" value="catch!">
        </p>`
        ,
        `<a href="/create">my balloons -></a>`
      );
      response.writeHead(200);
      response.end(html);
  });
}


exports.page = function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
    db.query('SELECT * FROM topic', function(error,topics){
      if(error){
        throw error;
      }
      db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[queryData.id], function(error2, topic){
        if(error2){
          throw error2;
        }
        //console.log(topic[0].title)
       // db.query(`DATA_FORMAT(now(),’%Y-%m-%d’)`,function(error,times){
        var title = topic[0].title;
        var description = topic[0].description;
        var time = topic[0].created;
        var list = template.list(topics);
        var html = template.HTML(title,`<h1><a href="/">ballon</a></h1>${list}`,
          `<h3>${title}</h3>
          ${description}<br>
          <h5>${time}</h5>
          <p>
          <button style=" border-color:green; color:green">${topic[0].name}</button>
          </p>`,
          `<a href="/create">create</a>
            <a href="/update?id=${queryData.id}">update</a>
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${queryData.id}">
              <input type="submit" value="boom!">
            </form>`
        );
        response.writeHead(200);
        response.end(html);
        // });
      });  

    });
}

exports.create = function(request,response){
  db.query('SELECT * FROM topic', function(error,topics){
    db.query('SELECT * FROM author',function(error2,authors){
      var title = 'create';
      var list = template.list(topics);
      var html = template.HTML(title, `<h1><a href="/">ballon</a></h1>${list}`,
        `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
          ${template.authorSelcet(authors)}
          </p>
          <p>
            <input type="submit" value="catch!">
            
          </p>
        </form>`
        , 
        `<a href="/create">create</a>`
      );
      response.writeHead(200);
      response.end(html);
    });
  });
}

exports.create_process = function(request,response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      db.query(`
      INSERT INTO topic (title, description, created, author_id) 
       VALUES(?,?, NOW(),?)`,
      [post.title , post.description,post.author],
      function(error, result){
        if(error){
          throw error;
        }
        response.writeHead(302, {Location: `/?id=${result.insertId}`});
        response.end();  
      });
  });
}

exports.update = function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query('SELECT * FROM topic', function(error,topics){
    if(error){
      throw error;
    }
    db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id], function(error2, topic){
      if(error2){
        throw error2;
      }
      db.query('SELECT * FROM author',function(error2,authors){
        var list = template.list(topics);
      var html = template.HTML(topic[0].title,`<h1><a href="/">ballon</a></h1>${list}`,
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${topic[0].id}">
          <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
          <p>
            <textarea name="description" placeholder="description">${topic[0].description}</textarea>
          </p>
          <p>
           ${template.authorSelcet(authors, topic[0].author_id)}
          </p>
          <p>
            <input type="submit" value="catch!">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
      );
      response.writeHead(200);
      response.end(html);

      });
    });
  });

}

exports.update_process = function(request,response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?',
      [post.title, post.description, post.author, post.id],
      function(error,result){
        response.writeHead(302, {Location: `/?id=${post.id}`});
        response.end();
      });
  });
}

exports.delate_process = function(request,response){
  var body = '';
  request.on('data', function(data){
      body = body + data;
  });
  request.on('end', function(){
      var post = qs.parse(body);
      //var id = post.id;
      //var filteredId = path.parse(id).base;
      db.query('DELETE FROM topic WHERE id = ?',[post.id],function(error,result){
        if(error){
          throw error;
        }
        response.writeHead(302, {Location: `/create`});
        response.end();
      });
  });
} 


