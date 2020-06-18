//calls the request from the website, and checks if it returns anything
    function loadFeed(size) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          retrieveInfo(this, size);
        }
      };
      xmlhttp.open("GET", "https://discourse.medecio.com/top.json", true);
      xmlhttp.send();
    }
    //this retrieves the items from the JSON file and assigns them to variables
    function retrieveInfo(xml, size) {
      var doc = xml.responseXML;
      var postsInfo = JSON.parse(xml.responseText);
      var i;
      console.log(postsInfo)
      for (i = 0; i < 6; i++) {
          var postId = postsInfo.topic_list.topics[i].id;
          var categoryId = postsInfo.topic_list.topics[i].category_id;
          var postSlug = postsInfo.topic_list.topics[i].slug;
          var poster = postsInfo.topic_list.topics[i].posters[0].user_id;
          var avatar = "";
          var like_count = postsInfo.topic_list.topics[i].like_count;
          var view_count = postsInfo.topic_list.topics[i].views;

          // var replies = myArr.topic_list.topics[i].posts_count+myArr.topic_list.topics[i].reply_count-1;
          // var dateCreated = new Date(myArr.topic_list.topics[i].created_at);
          // var whenPosted = Math.round(((new Date()).getTime() - dateCreated.getTime())/(1000*60*60*24));

          for (j in postsInfo.users) {
            if(postsInfo.users[j].id == poster) {
              avatar = postsInfo.users[j].avatar_template;
              var index = avatar.indexOf("{size}")
              avatar = avatar.substring(0, index) + size + avatar.substring(index+6);

            }
          }
          //this is where the html is added to the inner html of the div block, the img has the "avatar" class, the link has the "post-link" class and the likes is just temporarily a paragraph,
          //all with breaks in between
          document.getElementById("container").innerHTML +=
            '<img class=\"avatar\" src=\"https://discourse.medecio.com' + avatar + '\">' +
            '<a href=\'https://discourse.medecio.com/t/' + postSlug + '/' + postId + '/' + categoryId + '\' class=\"post-link\">' + postsInfo.topic_list.topics[i].title + '</a>' +
            '<div class=\"metrics\"> Likes: ' + like_count +
            'Views: ' + view_count + '</div><br>';
      }
    }