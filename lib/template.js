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
          
          background-color:#F2F5A9; 
          
        }
        a{
          text-decoration:none;
          background-color: skyblue;
        }
        h1{
          
          background-color: red;
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
          
          
        
          

          width: 300px;
          height: 50px;
          
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 1;
          overflow: hidden;

           

          background-color: red;
          border-radius: 8px;

          margin-bottom: 0px;
          padding: 0px;

          text-decoration : none;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          color: rgb(1, 253, 51);
          box-shadow: 3px 3px 5px 0px rgb(241, 5, 5);
        }
      </style>
    </head>
    <body>
      
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


     //const orderedDate 넣어서 시간순으로 출력 위에 데이터를 받고 이곳에서 시간순으로 정렬하고 밖으로 내보내야함


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
    `;
  }
}
