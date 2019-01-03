angular.module('starter.controllers', [])

// controller de home 
.controller('HomeCtrl', function($scope, $state) {
	// para navegar para a página de feeds
  $scope.navigateToFeed = function() {
    $state.go('feed');
  }
})

// controller da listagem de feeds
.controller('FeedCtrl', function($scope, $ionicActionSheet, $state, Feeds) {
	// pegando todos os feeds do json fake
  $scope.feeds = Feeds.all();

  // abrindo o actionsheets do fab
  $scope.showActions = function() {
    $ionicActionSheet.show({
      buttons: [
        { text: 'Adicionar um Feed' },
      ],
      destructiveText: 'Apagar um Feed',
      titleText: 'O que você quer fazer?',
      cancelText: 'Cancelar',
      buttonClicked: function(index) {
        if(index == 0)
          // para navegar para a página de add-feeds
          $state.go('add-feed');
      },
      destructiveButtonClicked: function() {
        // para navegar para a página de remove-feeds passando todos os feeds como parametro
        var id = $scope.feeds.map(feed => feed.id).join(',');
        var name = $scope.feeds.map(feed => feed.name).join(',');
        var url = $scope.feeds.map(feed => feed.url).join(',');
        $state.go('remove-feed', { id: id, name: name, url: url });
      }
    });
  }

  $scope.navigateToPost = function(feed) {
    console.log(feed);
    $state.go('posts', { feedId: feed.id, feedName: feed.name });
  }
})

// controller de adicionar feed
.controller('AddFeedCtrl', function($scope, $state, Feeds) {
  // verifica se o campo url é de fato uma url
  $scope.checkUrl = function(url) {
    var urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
    $scope.urlInvalid = url.match(urlRegex);
  }

  // salva um novo feed
  $scope.addFeed = function(data) {
    Feeds.add(data);
    $state.go('feed');
  }

})

// controller de remover feed
.controller('RemoveFeedCtrl', function($scope, $stateParams, $state, Feeds) {
  // pegando todos os feeds passados por parametro e botando numa variavel 
  $scope.feeds = [];

  var id = $stateParams.id.split(',');
  var name = $stateParams.name.split(',');
  var url = $stateParams.url.split(',');

  let i = 0;
  while(id[i] && name[i] && url[i]) {
    $scope.feeds.push({id: id[i], name: name[i], url: url[i], selected: false});
    i++;
  }

  // chamando a função que deleta passando os selecionados
  $scope.removeFeeds = function() {
    var selecteds = [];
    for(let feed of $scope.feeds) {
      if(feed.selected) 
        selecteds.push(feed.id);
    }
    Feeds.remove(selecteds);
    $state.go('feed');
  }
})

// controller de listagem de posts de um feed
.controller('PostsCtrl', function($scope, $stateParams, $state, Posts) {
  // pegando os posts associados àquele feed
  $scope.feed = {
    id: $stateParams.feedId,
    name: $stateParams.feedName
  }
  $scope.posts = Posts.all($scope.feed.id);

  // navegando para os detalhes do pst
  $scope.navigateToDetails = function(post) {
    $state.go('post-details', { 
      feedId: $scope.feed.id, 
      feedName: $scope.feed.name, 
      postId: post.id, 
      title: post.title, 
      url: post.url, 
      text: post.text
    });
  }
})

// controller de detalhes de um post
.controller('PostDetailsCtrl', function($scope, $stateParams, $ionicHistory, Posts) {
  $scope.feed = {
    id: $stateParams.feedId,
    name: $stateParams.feedName
  }

  $scope.post = {
    id: $stateParams.postId,
    title: $stateParams.title,
    url: $stateParams.url,
    text: $stateParams.text
  }

  Posts.read($scope.post.id);

  $scope.navigateToFeed = function() {
    $ionicHistory.goBack(-2);
  }
})