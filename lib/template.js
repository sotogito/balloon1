module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      <style>
        body{
          text-decoration : none;
          background-color: white;

        }
        h1{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .profile{
          background-color: green;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          
        
        }
        .one{
          background-color: yellow;

          width: 300px;
          height: 50px;

          background-color: aliceblue;
          border-radius: 8px;

          margin-bottom: 10px;

          text-decoration : none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center; 
          font-size: 14px;
          font-weight: bold;
          color: rgb(1, 253, 51);
          box-shadow: 3px 3px 5px 0px rgb(241, 5, 5);

       

        
        
        }
      </style>
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
        //여기가 문제
  /*},list:function(topics){
    var list = '<ul class="profile">';
    var i = 0;
    while(i < topics.length){
      list = list + `<li class="one">    <a href="/?id=${topics[i].id}">${topics[i].title}</a>    </li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;*/
      ////테스트///

  },list:function(topics){
    var list = '<div class="profile">';
    var i = 0;
    while(i < topics.length){
      //메모 목록을 뜨게하고 싶으면 이곳 수정
      list = list + `<p class="one"><a href="/?id=${topics[i].id}">${topics[i].title}<br>${topics[i].description }</a></p>`;
      i = i + 1;
    }
    list = list+'</div>';
    return list;





  },authorSelcet:function(authors,author_id){
    var tag = '';
    var i = 0;
    while(i < authors.length){
      var tag2 = '';
      if(authors[i].id === author_id){
        tag2 = '  selected';
      }
      tag = tag + `<option value="${authors[i].id}"${tag2}>${authors[i].name}${tag2}</option>`;
      i++;
    }
    return `
      <select name="author">
      ${tag}
      </select>
    `
  }
}
